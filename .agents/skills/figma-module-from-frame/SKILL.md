---
name: figma-module-from-frame
description: Recreates a selected Figma frame as a full Sanity module — schema, GROQ query, React component, and test. Uses Figma Desktop MCP once for design context, maps colors to frontend/lib/styles/colors.css, and implements React with ModuleProps and existing primitives. It also makes use of Tailwind v4 and existing css tokens outlined in our styles and css files. Use when the user selects a Figma frame and asks to recreate it as a module (e.g. ListText, CardImage), or mentions Figma MCP + Sanity module. This is only for creating a module.
disable-model-invocation: true
---

# Figma frame → Sanity module

## Prerequisites

- Figma Desktop open with the **target frame selected** (or a `node-id` URL).
- Figma Desktop MCP server enabled (`user-Figma Desktop`).
- Module name agreed (kebab-case schema type, e.g. `list-text` → `ListText.tsx`).

## Figma (call once)

1. **`get_design_context`** — primary source (layout, typography, spacing, generated reference). Pass `clientLanguages: typescript`, `clientFrameworks: react`. If Code Connect blocks, re-call with explicit `nodeId` from the URL (`1-2` → `1:2`).
2. **`get_screenshot`** — visual verification (same `nodeId` if used).
3. **`get_metadata`** — only if structure/layer names are unclear.

Do **not** repeat these calls unless the user changes the selection.

Ignore `data-node-id`, `data-design-annotations`, and `data-development-annotations` in output.

## Hard rules (user parameters)

- **Colors**: Read `frontend/lib/styles/colors.css`. If a Figma color is close to an existing token (`bg-porcelain`, `text-gunmetal`, `bg-black`, etc.), use the token. Otherwise hardcode with a named constant and a one-line comment (Figma hex + reason).
- **Primitives**: Reuse project primitives — never `next/link` for CTAs (`SanityLink`), images (`SanityImage`), rich text (`PortableText`), icons (`Icon` / `@/components/primitives/Icon/*`). Do not add parallel components, ctas and buttons using our SanityLink with different variants.
- **Content**: Do **not** hardcode title, description, images, links, or list rows. All copy and media come from Sanity props.
- **Types**: `type XxxProps = ModuleProps<"<module-type>">` (e.g. `ModuleProps<"list-text">`). No local interfaces duplicating CMS shape.
- **Figma assets**: Do not ship `localhost:3845` URLs. Model images/video in Sanity; render with `SanityImage` / `<video>` from query `asset->url`.
- **Classnames**: Do not separate classNames to their own const variables. All classnames should be inline on the HTML elements itself.
- **Arbritrary values**: Do not use tailwind arbritrary values like `lg:gap-[7.3rem]`. Instead, use existing tailwind classes like `lg:gap-30`. Round upwards to the the nearest.

## Execution order

Complete the steps **in this order**. Do not skip ahead to the React component before the schema and query exist.

### 1 — Sanity schema

- **Path**: `studio/schemas/modules/<category>/<module-name>.ts`
  - Use the closest existing category folder (`hero`, `card`, `list`, `image`, `media`, `text`, `driver`, `table`, `miscellaneous`). Create a new category folder only if none fit.
- Use `defineType`, `defineField`, `defineArrayMember` from `sanity`.
- Reuse shared fields from `studio/schemas/common.ts` (e.g. `title`, `description`, `image`, `link`).
- Every schema must have:
  - `icon` from `lucide-react` (appropriate to content)
  - `preview` with a meaningful `title`,`subtitle` and `media` set to `image`or `icon` if no image is present.
  - `groups` if the type has more than a few fields
- String fields with ≤4 options → `options.layout: "radio"`.
- No `boolean` fields; use `string` with `options.list` instead.
- No single `reference` fields; always `array` of references.
- Field order: most important first, least-used last.
- When using existing shared fields from `studio/schemas/common.ts`, use `eyebrow` instead of `defineField({ ...eyebrow })` unless you are extending it.

**Register the schema — update both files:**

1. `studio/schemas/schema.ts` — add import and include the schema in the `types` array under `// Modules`.
2. `studio/schemas/moduleTypes.ts` — add `{ type: "<module-name>" }` to `moduleBlocks` and to the appropriate group in `moduleGroups`. Both arrays use `sortBy` so insertion position doesn't matter.

### 2 — GROQ query fragment

- **Path**: `frontend/sanity/queries/modules/<category>/<module-name>.ts`
  - Mirror the same category used for the schema.
- Import `defineQuery` from `next-sanity`.
- Import only the fragment helpers you actually need from `../../fragments` (e.g. `titleFragment`, `descriptionFragment`, `imageFragment`, `linkFragment`, `portableTextFragment`).
- Export a single named const in `SCREAMING_SNAKE_CASE` (e.g. `HERO_PRIMARY_QUERY`).
- Always annotate with `// @sanity-typegen-ignore`.
- Pattern:

```ts
// @sanity-typegen-ignore
export const MY_MODULE_QUERY = defineQuery(`
  _type == "my-module" => {
    _type,
    _key,
    ${titleFragment},
    ${descriptionFragment},
    ${linkFragment},
  }
`);
```

- For nested arrays (e.g. cards, items), expand each nested object inline with its own fragments.
- Use `fn::img`, `fn::link`, `fn::ptPlain`, `fn::pt` via the fragment aliases — do not hand-roll asset dereferences that already exist in `fragments.ts`.

**Register in `frontend/sanity/queries/queries.ts`:**

1. Add an import for the new query constant (relative path, e.g. `./modules/<category>/<module-name>`).
2. Add `${MY_MODULE_QUERY},` inside the `modulesFragment` `defineQuery` template literal.

> All imports in `queries.ts` must use relative paths. Absolute imports break Sanity TypeGen.

### 3 — React component

- Path: `frontend/components/modules/<PascalName>.tsx` (or `modules/<Category>/<PascalName>.tsx` if matching category folder).
- Props: destructure only fields from `ModuleProps<"<module-type>">`.
- Guard optional arrays: `link?.map`, `items?.map`; early return if required block content is missing (e.g. `if (!title) return null`).
- Match Figma layout with Tailwind + project utilities (`p-custom`, `grid-custom`, `f-py-*`, `f-gap-*`, fluid type classes). Mobile-first.
- Register in `frontend/components/modules/ModuleBuilder.tsx` `componentMap`.
- Use `'use client'` only if the module needs client-only APIs; `SanityLink` can be used from a server parent.
- Don't use native text-related Tailwind classes like `font-thin` or `tracking-tight`. These should be covered with our custom typography classes in `fluid.css`.

### 4 — Test file

- **Path**: `frontend/test/components/<PascalName>.test.tsx`
- Import `ModuleProps` from `@/sanity/lib/fetch` and use `ModuleProps<"<module-type>">` for the props fixture — no hand-written interfaces.
- Build a minimal but realistic `props` constant that covers required fields. Use inline portable-text block shapes for title/description (see `CardExample.test.tsx` for reference shape).
- Use `vitest` (`describe`, `test`, `expect`) and `@testing-library/react` (`render`).
- Include at least:
  1. A render test for the primary text content.
  2. A snapshot test (`asFragment().toMatchSnapshot()`).
  3. A conditional test for an optional field (e.g. link or image), if the schema has one.

### 5 — Create sanity image preview
- Grab the screenshot of the module from the initial `get_screenshot` command.
- Generate a .jpg file inside `/studio/schemas/previews` and rename it as the schema in kebab-case.
- This new image file should be 536x336 dimensions.

## Color mapping reference (this project)

| Figma (common) | Token |
|----------------|--------|
| `#FAFAF8`, Cloud/25 | `bg-porcelain` |
| `#333333`, Primary/Slate | `text-gunmetal` / `bg-gunmetal` |
| `#FFFFFF` | `bg-white` / `text-white` |
| `#141414` | `text-black` / `bg-black` |
| Brand violet `#9B40EA` | Not in theme — hardcode constant |

Use `color-mix(in oklch, var(--color-gunmetal) 10%, transparent)` for subtle borders instead of raw rgba when appropriate.

## Checklist before done

- [ ] Figma MCP called once (context + screenshot)
- [ ] Schema file created in `studio/schemas/modules/<category>/`
- [ ] `studio/schemas/schema.ts` import + `types` entry added
- [ ] `studio/schemas/moduleTypes.ts` `moduleBlocks` + `moduleGroups` entries added
- [ ] Query file created in `frontend/sanity/queries/modules/<category>/`
- [ ] Query imported and added to `modulesFragment` in `frontend/sanity/queries/queries.ts`
- [ ] No hardcoded CMS strings or Figma localhost images
- [ ] `SanityLink` / `SanityImage` / `PortableText` used in component
- [ ] Component registered in `ModuleBuilder.tsx` `componentMap`
- [ ] `ModuleProps<"<module-type>">` for component props
- [ ] Colors from `colors.css` where close; documented hex otherwise
- [ ] Test file created in `frontend/test/components/`

## Anti-patterns

- Static prototypes like hardcoded `CARD_ITEMS` arrays for production modules.
- `link.map` without null guard.
- Duplicating `Button`/`Link` components already covered by `SanityLink`.
- Skipping schema/query and typing props by hand.
- Multiple redundant Figma MCP round-trips.
- Absolute imports in `queries.ts` (breaks TypeGen).
- Adding to `globalModuleBlocks` in `moduleTypes.ts` unless the module is explicitly designed to be reusable as a global module.

## Reference implementations

- Schema: `studio/schemas/modules/hero/hero-primary.ts`
- Query: `frontend/sanity/queries/modules/hero/hero-primary.ts`
- Component: `frontend/components/modules/Hero/HeroPrimary.tsx`
- Test: `frontend/test/components/CardExample.test.tsx`
