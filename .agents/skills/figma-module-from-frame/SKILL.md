---
name: figma-module-from-frame
description: Recreates a selected Figma frame as a frontend module. Uses Figma Desktop MCP once for design context, maps colors to frontend/lib/styles/colors.css, and implements React with ModuleProps and existing primitives. It also makes use of Tailwind v4 and existing css tokens outlined in our styles and css files. Use when the user selects a Figma frame and asks to recreate it as a module (e.g. ListText, CardImage), or mentions Figma MCP + Sanity module. This is only for creating a module.
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

## React component

- Path: `frontend/components/modules/<PascalName>.tsx` (or `modules/<Category>/<PascalName>.tsx` if matching category folder).
- Props: destructure only fields from `ModuleProps<"<module-type>">`.
- Guard optional arrays: `link?.map`, `items?.map`; early return if required block content is missing (e.g. `if (!title) return null`).
- Match Figma layout with Tailwind + project utilities (`p-custom`, `grid-custom`, `f-py-*`, `f-gap-*`, fluid type classes). Mobile-first.
- Register in `frontend/components/modules/ModuleBuilder.tsx` `componentMap`.
- Use `'use client'` only if the module needs client-only APIs; `SanityLink` can be used from a server parent.

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
- [ ] No hardcoded CMS strings or Figma localhost images
- [ ] `SanityLink` / `SanityImage` / `PortableText` used
- [ ] `ModuleProps<"<module-type>">` for component props
- [ ] Colors from `colors.css` where close; documented hex otherwise
- [ ] Biome clean on touched files

## Anti-patterns

- Static prototypes like hardcoded `CARD_ITEMS` arrays for production modules.
- `link.map` without null guard.
- Duplicating `Button`/`Link` components already covered by `SanityLink`.
- Skipping schema/query and typing props by hand.
- Multiple redundant Figma MCP round-trips.

## Reference implementations

- Sanity module: `frontend/components/modules/Hero/HeroPrimary.tsx`
