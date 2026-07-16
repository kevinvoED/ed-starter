---
name: frontend-create-primitive
description: Scaffolds a new custom UI primitive in frontend/components/primitives/,
  wrapping a matching Base UI (@base-ui/react) component when one exists, or
  building a plain HTML/React version when it doesn't. Produces cva-based
  variants for the root and each meaningful sub-component, a documentation
  comment block with usage examples, and handles interactivity (onClick,
  onCheckedChange, onValueChange, etc.) either by passing through Base UI's
  built-in handlers or by wrapping native handlers when no Base UI component
  exists. Use when asked to create a new primitive component, or to add a
  Base UI-backed component to frontend/components/primitives/.
disable-model-invocation: true
---

# Base UI primitive scaffold

## Step 0 - Check if this primitive already exists in the codebase
- Check if it exists in the codebase at `/frontend/components/primitives` first
- If it already exists, stop and exit this SKILL and explain that it already exists.
- Otherwise, continue to step 1.

## Step 1 — Decide: Base UI or custom HTML

Check whether `@base-ui/react` ships a matching component:

```bash
ls frontend/node_modules/@base-ui/react/
```

- **Match found** (e.g. `switch`, `accordion`, `select`, `checkbox`, `slider`) → wrap it. Read its root/`*.d.ts` file(s) under `@base-ui/react/<name>/` to know exact prop names, sub-parts, and `data-*` state attributes.
- **No match** → build a plain semantic HTML/React version (native element + ARIA attributes + local state via `useState`/`forwardRef`). Still follow the same file structure, doc comments, cva, and interactivity rules below.

Reference implementations already in this codebase: `frontend/components/primitives/Accordion/Accordion.tsx`, `frontend/components/primitives/Select/Select.tsx`, `frontend/components/primitives/Switch/Switch.tsx` (Base UI-backed), `frontend/components/primitives/Button/Button.tsx`, `frontend/components/primitives/Badge/Badge.tsx` (custom cva-only primitives).

## Step 2 — File location & naming

- Path: `frontend/components/primitives/<Name>/<Name>.tsx`
- Root component: named exactly `<Name>Root` if it wraps a Base UI `.Root` part and other named sub-parts exist (e.g. `SwitchRoot` + `SwitchThumb`). If there's only a single element with no sub-parts, name it just `<Name>` (e.g. `Badge`).
- Sub-components: `<Name><Part>` matching Base UI's own part names (`Trigger`, `Content`, `Item`, `Thumb`, `Icon`, etc.).
- Add `"use client"` at the top if the component uses hooks, event handlers, or a Base UI client component.
- Every rendered element gets a `data-slot="<kebab-name>"` attribute.

## Step 3 — Documentation comment block

Directly under the imports, add a `/* ... */` block (not JSDoc `/** */`) with:

1. One line stating what it's based on, with a `@docs` link if Base UI-backed (omit this line entirely for custom HTML primitives).
2. A short paragraph on where to configure default styling vs. overriding via `className`.
3. One or more `Usage Example: <Scenario>` sections with real, copy-pasteable JSX.

```tsx
/*
 * Based off of Base UI's <Name> component
 * @docs: https://base-ui.com/react/components/<name>
 *
 * Configure default styling here.
 * Remember that styles defined here must be generic as they will be applied to all <Name> components.
 * If your style is unique, you can override the styles by passing into `className` prop.
 * Otherwise, you can conditionally render or apply styles in here by extending props.
 *
 * ---------------------
 * Usage Example: Basic
 * ---------------------
 *  <NameRoot>...</NameRoot>
 */
```

Include usage examples proportional to what the component actually supports — don't invent props. Common scenarios to cover when relevant: basic/uncontrolled, controlled if interactivity is possible, disabled if possible,, and any other relevant states or common usages.

## Step 4 — cva variants

One `cva()` call per meaningful visual sub-part (always the root; plus any part that has its own visual identity, like a thumb, indicator, or panel — not every sub-part needs one).

**Split base string vs. variant slots:**
- First argument to `cva()` (base string): structural/behavioral classes only — layout (`flex`, `inline-flex`), sizing helpers that don't change look (`shrink-0`), cursor, transitions, focus-visible ring, `data-disabled:` states. These are identical across every variant.
- `variants.variant.default` / `variants.size.default`: the classes that define actual visual appearance — colors, backgrounds, borders, dimensions, translate offsets. Swapping these later (adding a new variant/size) never touches the base string.

Unless told otherwise, only define `variant.default` and `size.default` — don't speculate additional variants.

```tsx
const NameRootVariants = cva(
  "<structural classes only>",
  {
    variants: {
      variant: { default: "<color/appearance classes>" },
      size: { default: "<dimension classes>" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);
```

Do not re-export the `cva` variants from the file unless another file genuinely needs to compose them — the component's `className` prop is the extension point for callers.

## Step 5 — Component implementation

```tsx
type NameProps = <BaseUIPrimitive>.Root.Props & VariantProps<typeof NameRootVariants>;

function NameRoot({ className, variant, size, ...props }: NameProps) {
  return (
    <BaseUIPrimitive.Root
      data-slot="<kebab-name>"
      className={cn(NameRootVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

- Destructure only `className` and the cva variant keys (`variant`, `size`) — everything else (including interaction handlers) flows through `...props` untouched.
- For custom HTML primitives (no Base UI match), same shape but rendering the native element directly (`<button>`, `<div role="...">`, etc.) with explicit ARIA attributes.

## Step 6 — Interactivity

Check the Base UI part's prop types (under `frontend/node_modules/@base-ui/react/<name>/root/*.d.ts`) for a dedicated change handler (`onCheckedChange`, `onValueChange`, `onOpenChange`, etc.) and for native element props via `BaseUIComponentProps<'<tag>', State>` (which includes native `onClick`, `onKeyDown`, etc. through `React.ComponentPropsWithRef`).

- **Base UI already exposes it** → do nothing extra in the component body. Just document it: add a `Usage Example: Controlled with on<X>Change` (and a side-effect example, e.g. firing a mutation/analytics call from inside the handler) to the doc comment block, per Step 3. This is the common case — see `Switch.tsx`'s `onCheckedChange` examples.
- **Base UI does not expose it, or building a custom HTML primitive** → wrap the native handler yourself, following the `Button.tsx` pattern: destructure the caller's handler explicitly, build a local `handle<X>` that runs any needed internal logic then calls the caller's handler, and pass `handle<X>` to the rendered element instead of the raw prop.

```tsx
function NameRoot({ className, onClick, ...props }: NameProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // internal side effect, if any
    onClick?.(e);
  };

  return <button onClick={handleClick} {...props} />;
}
```

## Step 7 — Export

Named exports only, root + sub-parts, no default export:

```tsx
export { NameRoot, NameThumb };
```


## Step 8 - Create a test file for this Primitive component

- Path: `frontend/test/components/<Name>.test.tsx`
- This test file uses `@testing-library/react` and `vitest`
- Create basic unit tests for this component
- Include tests for the usage examples that were listed in the comments

## Step 9
- When you are done, summarize all the actions that you done into a checklist
- Your comments in each checklist item should not exceed more than 1 sentence
- Keep it brief and succinct
- It should incldue what files you've created, where they were created, what they were created for, the prominennt features of each file you've created.
- Finally, include a list of additional potential changes or features that we could add to improve the final product

## Checklist before done

- [ ] Checked `frontend/node_modules/@base-ui/react/` for a matching component before building custom HTML
- [ ] File at `frontend/components/primitives/<Name>/<Name>.tsx`
- [ ] `"use client"` present if needed
- [ ] Doc comment block with `@docs` link (Base UI) or omitted (custom), plus usage examples matching real supported props
- [ ] `data-slot` on every rendered element
- [ ] One `cva()` per meaningful visual sub-part, base string structural-only, variant/size slots hold the actual look
- [ ] Only `variant.default` / `size.default` defined unless told otherwise
- [ ] Interaction handlers verified against the Base UI part's prop types; documented if already supported, wrapped if not
- [ ] Named exports only, no default export, no unnecessary cva re-exports
- [ ] Refined and optimized the logic and maintain file cleanliness and readable. Keep it DRY principle.

## Anti-patterns

- Rebuilding interaction logic (`onCheckedChange`, `onValueChange`) that Base UI already forwards through `...props`.
- Mixing structural and color/visual classes in the same cva string instead of splitting base vs. variant slots.
- Inventing variants/sizes beyond `default` when not requested.
- Skipping the doc comment block or writing usage examples for props the component doesn't actually accept.
- Re-exporting `cva` variant objects when nothing outside the file consumes them.
