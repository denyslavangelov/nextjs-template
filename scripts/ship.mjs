#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const cwd = process.cwd();
const args = process.argv.slice(2);

const options = {
  repo: process.env.SHIP_REPO_NAME || basename(cwd),
  visibility: process.env.SHIP_VISIBILITY || 'private',
  github: true,
  vercel: true,
};

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg === '--repo' && args[i + 1]) options.repo = args[++i];
  else if (arg === '--public') options.visibility = 'public';
  else if (arg === '--private') options.visibility = 'private';
  else if (arg === '--no-github') options.github = false;
  else if (arg === '--no-vercel') options.vercel = false;
  else if (arg === '--help' || arg === '-h') {
    console.log(`Usage:
  npm run ship
  npm run ship -- --repo my-project-name
  npm run ship -- --repo my-project-name --public
  npm run ship -- --no-github
  npm run ship -- --no-vercel

Environment variables:
  SHIP_REPO_NAME=my-project-name
  SHIP_VISIBILITY=private|public`);
    process.exit(0);
  }
}

function commandExists(command) {
  const result = spawnSync(command, ['--version'], { stdio: 'ignore', shell: process.platform === 'win32' });
  return result.status === 0;
}

function run(command, commandArgs = [], opts = {}) {
  console.log(`\n$ ${[command, ...commandArgs].join(' ')}`);
  const result = spawnSync(command, commandArgs, {
    cwd,
    stdio: opts.capture ? 'pipe' : 'inherit',
    encoding: 'utf8',
    shell: process.platform === 'win32',
    env: process.env,
  });

  if (opts.capture) {
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
  }

  if (result.status !== 0) {
    throw new Error(`Command failed: ${command} ${commandArgs.join(' ')}`);
  }

  return `${result.stdout || ''}${result.stderr || ''}`.trim();
}

function tryRun(command, commandArgs = [], opts = {}) {
  try {
    return run(command, commandArgs, opts);
  } catch {
    return null;
  }
}

function readPackageJson() {
  const packagePath = resolve(cwd, 'package.json');
  if (!existsSync(packagePath)) {
    throw new Error('No package.json found. Run this from the project root.');
  }
  return JSON.parse(readFileSync(packagePath, 'utf8'));
}

function detectPackageManager() {
  if (existsSync(resolve(cwd, 'pnpm-lock.yaml'))) return { name: 'pnpm', run: ['pnpm'], install: ['pnpm', ['install', '--frozen-lockfile']] };
  if (existsSync(resolve(cwd, 'yarn.lock'))) return { name: 'yarn', run: ['yarn'], install: ['yarn', ['install', '--frozen-lockfile']] };
  if (existsSync(resolve(cwd, 'bun.lockb')) || existsSync(resolve(cwd, 'bun.lock'))) return { name: 'bun', run: ['bun', 'run'], install: ['bun', ['install', '--frozen-lockfile']] };
  if (existsSync(resolve(cwd, 'package-lock.json'))) return { name: 'npm', run: ['npm', 'run'], install: ['npm', ['ci']] };
  return { name: 'npm', run: ['npm', 'run'], install: ['npm', ['install']] };
}

function runScript(pm, scriptName) {
  const [cmd, ...baseArgs] = pm.run;
  run(cmd, [...baseArgs, scriptName]);
}

function getCurrentBranch() {
  const branch = tryRun('git', ['branch', '--show-current'], { capture: true });
  return branch && branch.trim() ? branch.trim() : 'main';
}

function hasGitRemote() {
  const remote = tryRun('git', ['remote', 'get-url', 'origin'], { capture: true });
  return Boolean(remote && remote.trim());
}

function hasChangesToCommit() {
  const status = tryRun('git', ['status', '--porcelain'], { capture: true });
  return Boolean(status && status.trim());
}

function hasAnyCommit() {
  const result = spawnSync('git', ['rev-parse', '--verify', 'HEAD'], { cwd, stdio: 'ignore', shell: process.platform === 'win32' });
  return result.status === 0;
}

function extractVercelUrl(output) {
  const urls = output.match(/https:\/\/[^\s]+/g) || [];
  const cleanUrls = urls.map((url) => url.replace(/[)\],.]+$/, ''));
  const production = cleanUrls.find((url) => !url.includes('vercel.com/'));
  return production || cleanUrls.at(-1) || null;
}

try {
  const pkg = readPackageJson();
  const scripts = pkg.scripts || {};
  const pm = detectPackageManager();

  if (!scripts.build) {
    throw new Error('No build script found in package.json. Add a build script before shipping.');
  }

  if (!commandExists('git')) throw new Error('git is not installed or not available in PATH.');
  if (!commandExists(pm.name)) {
    const installHint = pm.name === 'pnpm' || pm.name === 'yarn' ? 'Run `corepack enable`, then rerun this script.' : `Install ${pm.name}, then rerun this script.`;
    throw new Error(`${pm.name} is required because this project has a ${pm.name} lockfile. ${installHint}`);
  }

  console.log(`\nShipping ${pkg.name || basename(cwd)} with ${pm.name}.`);
  console.log(`Repository target: ${options.repo} (${options.visibility})`);

  if (!existsSync(resolve(cwd, 'node_modules'))) {
    const [installCmd, installArgs] = pm.install;
    run(installCmd, installArgs);
  }

  if (scripts.typecheck) runScript(pm, 'typecheck');
  if (scripts.lint) runScript(pm, 'lint');
  runScript(pm, 'build');

  let githubUrl = null;

  if (options.github) {
    if (!commandExists('gh')) {
      throw new Error('GitHub CLI is not installed. Install it, run `gh auth login`, then rerun this script.');
    }

    if (!tryRun('gh', ['auth', 'status'], { capture: true })) {
      throw new Error('GitHub CLI is not authenticated. Run `gh auth login`, then rerun this script.');
    }

    if (!existsSync(resolve(cwd, '.git'))) {
      run('git', ['init']);
      run('git', ['branch', '-M', 'main']);
    }

    if (hasChangesToCommit()) {
      run('git', ['add', '-A']);
      const message = hasAnyCommit() ? 'Finalize production deployment' : 'Initial production-ready version';
      run('git', ['commit', '-m', message]);
    } else {
      console.log('\nNo git changes to commit.');
    }

    const branch = getCurrentBranch();

    if (!hasGitRemote()) {
      run('gh', ['repo', 'create', options.repo, `--${options.visibility}`, '--source', '.', '--remote', 'origin', '--push']);
    } else {
      run('git', ['push', '-u', 'origin', branch]);
    }

    githubUrl = tryRun('gh', ['repo', 'view', '--json', 'url', '-q', '.url'], { capture: true });
  }

  let vercelUrl = null;

  if (options.vercel) {
    const vercelCommand = commandExists('vercel')
      ? { command: 'vercel', args: [] }
      : { command: 'npx', args: ['--yes', 'vercel@latest'] };

    const whoami = tryRun(vercelCommand.command, [...vercelCommand.args, 'whoami'], { capture: true });
    if (!whoami) {
      throw new Error('Vercel CLI is not authenticated. Run `vercel login` or `npx --yes vercel@latest login`, then rerun this script.');
    }

    const output = run(vercelCommand.command, [...vercelCommand.args, 'deploy', '--prod', '--yes'], { capture: true });
    vercelUrl = extractVercelUrl(output);
  }

  console.log('\n✅ Ship complete');
  if (githubUrl) console.log(`GitHub: ${githubUrl.trim()}`);
  if (vercelUrl) console.log(`Vercel: ${vercelUrl}`);
  if (!vercelUrl && options.vercel) console.log('Vercel deployed, but no URL was detected in the CLI output. Check the output above.');
} catch (error) {
  console.error(`\n❌ Ship failed: ${error.message}`);
  console.error('\nFix the issue above and rerun this script. Do not continue to deployment until build passes.');
  process.exit(1);
}
