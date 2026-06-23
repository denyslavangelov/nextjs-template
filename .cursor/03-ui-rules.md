# UI, Frontend, and Design Rules

## Component Design

- Components should do one thing well.
- Keep components small, composable, and easy to scan.
- Extract reusable UI patterns instead of repeating large JSX blocks.
- Prefer clear component APIs over passing many loosely related props.
- Keep layout components separate from product-specific components when useful.

## State Management

- Keep state local when possible.
- Do not lift state unnecessarily.
- Derive values instead of duplicating state.
- Avoid prop drilling when composition solves it.
- Keep UI state predictable and easy to reset.

## Effects

- Avoid unnecessary `useEffect`.
- Do not use `useEffect` for logic that can run during render.
- Ensure dependencies are correct.
- Avoid effects that hide data-flow problems.

## Tailwind CSS

- Use Tailwind consistently.
- Keep class names readable and structured.
- Group classes logically:
  - layout
  - spacing
  - typography
  - colors
  - borders
  - effects
  - responsive states
- Extract reusable components instead of repeating long class strings.
- Avoid random one-off values unless they are needed for a precise visual result.

## Design Quality

Build clean, modern, premium UI, but do not default to boring SaaS templates.

Every design should have a clear visual idea. Before generating UI, decide what makes the screen memorable:

- unusual but usable layout
- strong editorial typography
- asymmetric composition
- refined spacing
- expressive cards or panels
- tasteful gradients, shadows, borders, or glass effects
- subtle motion
- distinctive empty states
- product-specific visual metaphors

Avoid standard AI design patterns:

- generic gradient hero sections
- floating random cards without meaning
- overused purple/blue SaaS palettes
- fake dashboard widgets that do not serve the product
- generic icon grids
- vague headings like “Powerful features for modern teams”
- excessive rounded cards with identical spacing everywhere
- sterile layouts that look like a template

## Typography and Fonts

Typography must feel intentional, modern, and appropriate for the content.

- Use strong type hierarchy: display, heading, body, caption, metadata.
- Avoid using only one font weight everywhere.
- Use generous line-height for body text and tighter tracking/line-height for large headings when appropriate.
- Pair fonts thoughtfully when the product benefits from it.
- Do not use fonts only because they are popular; choose them for the brand mood.

When the content is in Bulgarian or another Cyrillic language, use fonts with excellent Cyrillic support. Prefer modern Cyrillic-safe fonts such as:

- Manrope
- Inter
- IBM Plex Sans
- Commissioner
- Wix Madefor Text / Display
- PT Root UI
- Golos Text
- Onest
- Rubik
- Montserrat only when it fits the brand, not as a default

Before choosing a font for Cyrillic content, ensure Cyrillic characters render naturally and do not look visually weaker than Latin characters.

## Visual Direction

Do not generate a generic layout first and “decorate” it later. Start with a design concept.

For each new screen or landing page, consider:

- What emotion should it create?
- What should feel premium, playful, technical, trustworthy, or bold?
- What should be visually quieter?
- Where should the eye go first, second, and third?
- What can be removed?

Use whitespace as an active design element. A screen can be minimal, but it should not feel empty or unfinished.

## Color, Depth, and Texture

- Use a restrained palette with clear roles: background, surface, text, muted text, border, accent, danger/success.
- Avoid adding too many colors without a system.
- Prefer subtle depth over heavy shadows.
- Use texture, noise, gradients, or soft backgrounds only when they support the brand direction.
- Keep contrast accessible and readable.

## Layout and Composition

- Design mobile-first, but avoid simply stacking everything with no hierarchy.
- Use grids, rhythm, and alignment deliberately.
- Break symmetry when it improves the design.
- Avoid fragile layouts that depend on perfect content length.
- Ensure layouts work across breakpoints.
- Design for real content, long Bulgarian text, and empty states.

## Interaction States

Always consider:

- hover
- active
- focus
- disabled
- loading
- empty
- error
- success

Interaction states should feel polished, not like afterthoughts.

## Motion and Microinteractions

- Use motion sparingly and with purpose.
- Prefer subtle transitions that clarify state changes.
- Do not animate everything.
- Respect performance and accessibility.

## UX

- Make UI predictable and intuitive.
- Make the primary action obvious.
- Avoid confusing interactions.
- Provide clear feedback for user actions.
- Do not hide important information for the sake of minimalism.
- Use native, human microcopy instead of generic system text.

## Accessibility

- Use semantic HTML.
- Maintain sufficient color contrast.
- Ensure keyboard focus states are visible.
- Use proper labels for form fields.
- Do not communicate important information with color alone.
