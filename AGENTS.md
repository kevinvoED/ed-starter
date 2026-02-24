# AI Agents & Tools Instructions

This file provides comprehensive guidance for AI agents, tools, and automated systems working with the Far Niente codebase.

## Sanity Project

This is a Sanity-powered project. Use the Knowledge Router below to find Sanity guidance for your task. Available as a [Claude Code and Cursor plugin](https://github.com/sanity-io/agent-toolkit#option-3-install-plugin).

## Project Overview

**Engine Digital Starter** is a sophisticated Next.js and Sanity starter kit built with:
- **Framework**: Next.js 16 (App Router)
- **CMS**: Sanity (headless CMS)
- **Styling**: Tailwind CSS 4.1

**NOTE:** the Next config is at `/frontend/next.config.mjs` and NOT `/frontend/next.config.ts`

## Tech Stack

### Frontend Core Dependencies
- **React 19.2.3** - UI framework
- **Next.js 16.1.4** - Full-stack framework with App Router
- **TypeScript** - Type safety (strict mode enabled)
- **Tailwind CSS 4.1.18** - Utility-first CSS
- **GSAP 3.14.2** - Advanced animations with ScrollTrigger
- **Lenis 1.3.17** - Smooth scrolling

### Sanity Core Dependencies
- **Sanity 5.6.0** - Headless CMS with real-time previews

### UI & Components
- **Base UI** - Unstyled, accessible component primitives (accordion, dialog, popover, tabs, etc.)
- **Portable Text** - Rich Text rendering from Sanity
- **Lucide Icons** - Icon library
- **Sanity Icons** - Icon library
- **nuqs** - URL state management
- **React Player** - Video player component

### Code Quality
- **Biome 2.3.12** - Linting, formatting, and code organization

## Skills

The following AI skills are installed and available for this project (located in `.agents/skills/`):

### next-best-practices
- **Purpose**: Comprehensive Next.js 16 App Router best practices covering routing, data fetching, caching, server/client components, metadata, images, fonts, Suspense boundaries, and more
- **When to use**: When building Next.js pages, implementing data fetching patterns, configuring caching strategies, or working with App Router features
- **How to invoke**: Use `load(source: "next-best-practices")`
- **Key topics**: Route handlers, parallel/intercepting routes, `generateStaticParams`, ISR, server actions, metadata & OG images, Suspense boundaries for `useSearchParams`/`usePathname`

### next-cache-components
- **Purpose**: Guide for Next.js 16's new `cacheComponents` feature and `use cache` directive, replacing `unstable_cache`
- **When to use**: When implementing caching strategies, migrating from `unstable_cache`, or configuring PPR (Partial Prerendering)
- **How to invoke**: Use `load(source: "next-cache-components")`
- **Key topics**: `'use cache'` directive, `cacheLife()`, `cacheTag()`, migration from `unstable_cache`, PPR configuration

### vercel-react-best-practices
- **Purpose**: React and Next.js performance optimization guidelines from Vercel Engineering. Contains 57 rules across 8 categories prioritized by impact
- **When to use**: When writing, reviewing, or refactoring React/Next.js code to ensure optimal performance patterns
- **How to invoke**: Use `load(source: "vercel-react-best-practices")`
- **Key categories**:
  - **CRITICAL**: Eliminating Waterfalls (`async-*`), Bundle Size Optimization (`bundle-*`)
  - **HIGH**: Server-Side Performance (`server-*`)
  - **MEDIUM**: Client-Side Data Fetching (`client-*`), Re-render Optimization (`rerender-*`), Rendering Performance (`rendering-*`)
  - **LOW-MEDIUM**: JavaScript Performance (`js-*`), Advanced Patterns (`advanced-*`)

### sanity-best-practices (Knowledge Router)

If the Sanity MCP server (`https://mcp.sanity.io`) is available, use `list_sanity_rules` and `get_sanity_rules` to load always up-to-date rules on demand. Otherwise, use the table below to find local rule files.

| Topic | Trigger Keywords | Rule File |
| :--- | :--- | :--- |
| **Project Structure** | `structure`, `monorepo`, `embedded studio`, `file naming` | `rules/sanity-project-structure.mdc` |
| **Onboarding** | `start`, `setup`, `init`, `new project` | `rules/sanity-get-started.mdc` |
| **Schema** | `schema`, `model`, `document`, `field`, `defineType` | `rules/sanity-schema.mdc` |
| **Deprecation** | `deprecate`, `remove field`, `legacy`, `migration` | `rules/sanity-schema.mdc` |
| **Import/Migration** | `import`, `wordpress`, `html`, `markdown`, `migrate` | `rules/sanity-migration.mdc` |
| **Next.js** | `next.js`, `app router`, `server component`, `fetch` | `rules/sanity-nextjs.mdc` |
| **Nuxt** | `nuxt`, `vue`, `nuxt.js` | `rules/sanity-nuxt.mdc` |
| **Astro** | `astro`, `islands` | `rules/sanity-astro.mdc` |
| **Remix/React Router** | `remix`, `react router`, `loader` | `rules/sanity-remix.mdc` |
| **Svelte** | `svelte`, `sveltekit`, `kit` | `rules/sanity-svelte.mdc` |
| **Visual Editing** | `stega`, `visual editing`, `clean`, `overlay`, `presentation`, `usePresentationQuery` | `rules/sanity-visual-editing.mdc` |
| **Page Builder** | `page builder`, `pageBuilder`, `block component`, `alignment`, `switch render` | `rules/sanity-page-builder.mdc` |
| **Rich Text** | `portable text`, `rich text`, `block content`, `serializer`, `PTE`, `marks`, `annotations` | `rules/sanity-portable-text.mdc` |
| **Images** | `image`, `urlFor`, `crop`, `hotspot`, `lqip` | `rules/sanity-image.mdc` |
| **Studio Structure** | `structure`, `desk`, `sidebar`, `singleton`, `grouping` | `rules/sanity-studio-structure.mdc` |
| **Localization** | `i18n`, `translation`, `localization`, `language`, `multilingual`, `localized singleton` | `rules/sanity-localization.mdc` |
| **SEO** | `seo`, `metadata`, `sitemap`, `og image`, `open graph`, `json-ld`, `redirect` | `rules/sanity-seo.mdc` |
| **Shopify/Hydrogen** | `shopify`, `hydrogen`, `e-commerce`, `storefront`, `sanity connect` | `rules/sanity-hydrogen.mdc` |
| **GROQ** | `groq`, `query`, `defineQuery`, `projection`, `filter`, `order` | `rules/sanity-groq.mdc` |
| **TypeGen** | `typegen`, `typescript`, `types`, `infer`, `satisfies`, `type generation` | `rules/sanity-typegen.mdc` |
| **App SDK** | `app sdk`, `custom app`, `useDocuments`, `useDocument`, `DocumentHandle`, `SanityApp`, `sdk-react` | `rules/sanity-app-sdk.mdc` |
| **Blueprints** | `blueprints`, `IaC`, `infrastructure`, `stack`, `defineBlueprint`, | `rules/sanity-blueprints.mdc` |

### Using the Knowledge Router

**Before modifying any code:**
1. Identify which topics from the table above apply to your task
2. Read the corresponding rule file(s) using the file path
3. Follow the patterns and constraints defined in those rules

Example: If asked to "create a blog post schema", read `rules/sanity-schema.mdc` first.

## Agent Behavior

- Specialize in **Structured Content**, **GROQ**, and **Sanity Studio** configuration.
- Write best-practice, type-safe code using **Sanity TypeGen**.
- Build scalable content platforms, not just websites.
- **Detect the user's framework** from `package.json` and consult the appropriate rule file.

## MCP Tools Priority

This project has Model Context Protocol (MCP) tools available for Sanity and Next.js. **MCP tools take precedence over skills** for direct interactions with these services.

### Next.js MCP Tools
- **Purpose**: Interact with the running Next.js development server for diagnostics, debugging, and inspection.
- **When to use**: When investigating errors, checking runtime behavior, viewing routes, or debugging the Next.js application.
- **Tools**:
  - `next-devtools_init`: Initialize the Next.js MCP context.
  - `next-devtools_nextjs_index`: Discover running servers and available tools.
  - `next-devtools_nextjs_call`: Execute specific MCP tools on the server.
  - `next-devtools_nextjs_docs`: Fetch official Next.js documentation.
  - `next-devtools_enable_cache_components`: Migrate to Next.js 16 Cache Components.
  - `next-devtools_upgrade_nextjs_16`: Upgrade to Next.js 16.

### Sanity MCP Tools
See [Sanity CMS Integration](#sanity-cms-integration) for details on prioritizing `sanity_*` tools for all CMS operations.

## Directory Structure

```
ED Starter
│
├── 📂 .cursor
├── 📂 .agents
├── 📂 frontend
│   ├── 📂 app
│   ├── 📂 components
│   │   ├── 📂 animations
│   │   ├── 📂 layout
│   │   ├── 📂 miscellaneous
│   │   ├── 📂 modules
│   │   └── 📂 primitives
│   ├── 📂 public
│   ├── 📂 lib
│   │   ├── 📂 hooks
│   │   ├── 📂 site
│   │   ├── 📂 styles
│   │   └── 📂 utils
│   ├── 📂 sanity
│   │   ├── 📂 lib
│   │   └── 📂 queries
│   ├── 📄 sanity.types.ts
│   └── 📄 package.json
├── 📂 studio
│   ├── 📂 actions
│   ├── 📂 components
│   ├── 📂 lib
│   ├── 📂 schemas
│   │   ├── 📂 documents
│   │   ├── 📂 modules
│   │   ├── 📂 objects
│   │   ├── 📂 pages
│   │   ├── 📂 previews
│   │   ├── 📄 moduleTypes.ts
│   │   ├── 📄 schema.ts
│   │   └── 📄 sharedFields.ts
│   ├── 📄 sanity.cli.ts
│   ├── 📄 sanity.config.ts
│   └── 📄 package.json
├── 📄 biome.json
└── 📄 package.json
```

## Code Style & Standards

### TypeScript & Type Safety
- **Strict Mode**: Enabled in `tsconfig.json`
- Always type function parameters and return types
- Use `Awaited<ReturnType<typeof fn>>` for async function return typing
- Example:
  ```tsx
  const [discount, setDiscount] = useState<Awaited<ReturnType<typeof getDiscount>>>(null);
  ```

### Component Patterns

#### Functional Components Structure
```tsx
'use client';  // Mark interactive components

import React, { useState } from 'react';
import { useEffect } from 'react';

interface ComponentProps {
  title: string;
  onClick?: () => void;
}

export const MyComponent = ({
  title,
  onClick,
  className,
  ...rest
}: ComponentProps & React.HTMLAttributes<HTMLDivElement>) => {
  const [state, setState] = useState<string>('');

  useEffect(() => {
    // Side effects
  }, []);

  return (
      <div {...rest} className={className}>
        {title}
      </div>
  );
};

export default MyComponent;
```

#### Key Component Features
- Use `'use client'` directive for interactive/client-side components
- Wrap with `MyErrorBoundary` for error handling
- Export both named and default exports
- Combine with `React.HTMLAttributes<HTMLElement>` for standard HTML attributes
- Use `Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>` to exclude conflicting props

### Import Path Aliases
Use configured path aliases from `tsconfig.json`:
```tsx
// ✅ Preferred
import { Button } from '@components/primitives/Button';
import { cn } from '@lib/utils/cn';

// ❌ Avoid
import { Button } from '../../../../components/primitives/Button';
import { cn} from '../../lib/utils/cn';
```

### Tailwind CSS

#### Custom Grid System
- 12-column responsive grid
- Use `grid-custom` and span classes like `col-span-12`
- Breakpoints: mobile-first (sm, md, lg, xl, 2xl)

#### Custom Classes & Utilities
```tsx
import cn from '@lib/utils/cn';

<div className={cn('bg-black', isActive && 'text-white')}>
  Content
</div>
```

### Animations & Interactions

#### GSAP Animations
- Use `@gsap/react` hook (`useGSAP`)
- Register plugins: `gsap.registerPlugin(ScrollTrigger)`
- Example:
  ```tsx
  const { contextSafe } = useGSAP(() => {
    gsap.to(ref.current, {
      duration: 0.5,
      opacity: 1,
      ease: 'power2.inOut',
    });
  }, []);
  ```

#### Scroll Interactions
- Use `ScrollTrigger` for scroll-triggered animations

### Forms & Validation

#### Server Actions
```tsx
// In app/actions.ts
'use server';

export async function myServerAction(formData: FormData) {
  // Validation & business logic
  return { success: true, data: {...} };
}
```

#### Client Forms
```tsx
'use client';
import { useFormState, useFormStatus } from 'react-dom';

const { pending } = useFormStatus();
const [formState, formAction] = useFormState(serverAction, null);
```

### Error Handling
- Wrap components with `<MyErrorBoundary>`
- Use `react-error-boundary` for error boundaries
- Location: `components/ErrorBoundary/`


## Sanity CMS Integration

### MCP Tool Priority (CRITICAL)
**ALWAYS** use the provided Sanity MCP tools (`sanity_*`) as your primary method for interacting with the CMS. These tools are optimized for this environment and take precedence over manual API implementation or generic skills.

- **Querying**: Use `sanity_query_documents` (GROQ) to fetch content. Do not write custom `fetch()` scripts.
- **Content Updates**: Use `sanity_create_*` and `sanity_patch_*` tools for content creation and mutation.
- **Schema Inspection**: Use `sanity_get_schema` to understand the current content model before planning changes.
- **Best Practices**: Use `sanity_get_sanity_rules` to load specific development guidelines (e.g., `sanity-nextjs`, `sanity-groq`).

### Sanity MCP Configuration
- **Project ID**: `cncla7g4`
- **Dataset**: `migration`

These values must always be used when working with Sanity MCP tools.

### Development Guidelines
1. **Schema Changes**: Modify schema definitions in the local codebase (`sanity/schema/`). **DO NOT** use `sanity_deploy_schema` unless explicitly instructed for a cloud-only migration task.
2. **Visual Editing & SEO**: When fetching data for metadata, SEO, or `generateStaticParams`, you **MUST** ensure Stega (invisible characters) is disabled.
   - If using `sanity_query_documents`, ensure the perspective is correct.
   - If writing Next.js code, set `stega: false` in `sanityFetch`.
3. **Client Setup**: For application code, use the client exported from `sanity/lib/clientClient`.

### Schema Types
- Auto-generated types in `sanity/types.ts`

## Code Quality Standards

Biome: 80 char line width, 2 space indent, double quotes, semicolons required.

```bash
pnpm format          # Format code
pnpm lint           # Lint code
pnpm lint:fix       # Fix lint issues
```

Key rules: strict null checking, no console.log in production, no unused vars/imports, no `var` (use `const`/`let`), consistent import paths.

Avoid: `@/utility/*` → use `@utility/*` instead

## Important Conventions

### Naming Conventions
- **Files**: PascalCase for components, camelCase for utilities
- **React Components**: PascalCase
- **Constants**: UPPER_CASE
- **Interfaces**: PascalCase (add `Type` suffix for complex types)
- **Variables**: camelCase

### Comments & Documentation
- Use JSDoc for functions with complex logic
- Add `@see` references for related files
- Comment non-obvious implementations
- Keep comments updated

## Performance Optimization

For other patterns (dynamic imports, suspense, etc.), use the `vercel-react-best-practices` skill.

### Image Optimization
- Use `next/image` for all images
- Use `SanityImage.tsx` for Sanity Images

## Environment Variables

### Required Public Variables
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
NEXT_PUBLIC_SANITY_API_DATASET=
NEXT_PUBLIC_TESTING=
```

### Scripts & Commands
```bash
# Development
pnpm dev                # Start dev server
pnpm dev:inspect        # Debug mode

# Building
pnpm build              # Build for production
pnpm start              # Run production build

# Code Quality
pnpm format             # Format with Biome
pnpm lint               # Lint with Biome
pnpm lint:fix           # Fix lint issues
pnpm ci                 # Run Biome CI checks

# Type Checking
pnpm typecheck          # Run TypeScript type checking

# Type Generation
pnpm typegen            # Generate Sanity & GraphQL types

```

## Best Practices

- Use TypeScript strict mode - always type props and returns
- Use `'use client'` for interactive components
- Implement proper error boundaries
- Test components with Jest snapshots
- Use Biome for consistent code style
- Break large components into smaller sub-components
- Memoize expensive computations with `useMemo`
- Use `useCallback` for event handlers passed as props
- Load async data server-side when possible
- Use React.FC types for all components

- Avoid: `any` types, mixing client/server logic, prop drilling, hardcoded env vars, `console.log` in production, `var` declarations

## Debugging & Troubleshooting

- **HTTPS Required**: Run `pnpm run dev --experimental-https` for Klaviyo forms
- **Type Errors**: Run `pnpm typegen` to refresh Sanity types
- **Component Not Rendering**: Check `'use client'` directive for interactive features
- **Styling Issues**: Ensure Tailwind classes are spelled correctly and use aliases
- **Debug**: Run `pnpm run dev:inspect` for Node inspector on localhost:9229

---

**Last Updated**: February 2026
**Node Version**: ^24.13.0
**Package Manager**: pnpm ^10.29.0

## MCP Server (Preferred for Content Operations)

**Prefer** MCP tools over writing scripts for content operations:

**Content Operations:**

| Tool | Use For |
|------|---------|
| `query_documents` | Run GROQ queries |
| `get_document` | Fetch a single document by exact ID |
| `create_documents_from_json` | Create draft documents from JSON |
| `create_documents_from_markdown` | Create draft documents from markdown |
| `patch_document_from_json` | Apply precise modifications to document fields |
| `patch_document_from_markdown` | Patch a field using markdown content |
| `publish_documents` | Publish one or more drafts |
| `unpublish_documents` | Unpublish documents (move back to drafts) |
| `discard_drafts` | Discard drafts while keeping published documents |

**Schema & Development:**

| Tool | Use For |
|------|---------|
| `get_schema` | Get full schema of the current workspace |
| `list_workspace_schemas` | List all available workspace schema names |
| `deploy_schema` | Deploy schema types to the cloud |
| `search_docs` / `read_docs` | Search and read Sanity documentation |
| `list_sanity_rules` / `get_sanity_rules` | Load best-practice development rules |
| `migration_guide` | Get guides for migrating from other CMSs |

**Media & AI:**

| Tool | Use For |
|------|---------|
| `generate_image` | AI image generation for a document field |
| `transform_image` | AI transformation of an existing image |

**Releases:**

| Tool | Use For |
|------|---------|
| `create_version` | Create a version document for a release |
| `version_replace_document` | Replace version contents from another document |
| `version_discard` | Discard document versions from a release |
| `version_unpublish_document` | Mark document to be unpublished when release runs |

**Project Management:**

| Tool | Use For |
|------|---------|
| `list_projects` / `list_organizations` | List projects and organizations |
| `create_project` | Create a new Sanity project |
| `list_datasets` / `create_dataset` / `update_dataset` | Manage datasets |
| `add_cors_origin` | Add CORS origins for client-side requests |
| `list_embeddings_indices` / `semantic_search` | Semantic search on embeddings |

**Critical:** After schema changes, deploy with `deploy_schema` before using content tools.

## Boundaries
- **Always:**
  - Use `defineQuery` for all GROQ queries.
  - Prefer MCP tools for content operations (query, create, update, patch). For bulk migrations or when MCP is unavailable, NDJSON scripts are a valid alternative. Never use NDJSON scripts when MCP tools can accomplish the same task more simply.
  - Run `deploy_schema` after schema changes — required before using content tools. If a local Studio exists, update schema files first to keep them in sync with the deployed schema.
  - Follow the "Deprecation Pattern" when removing fields (ReadOnly -> Hidden -> Deprecated).
  - Run `npm run typegen` after schema or query changes (or enable automatic generation with `typegen.enabled: true` in `sanity.cli.ts`).
- **Ask First:**
  - Before modifying `sanity.config.ts`.
  - Before deleting any schema definition file.
- **Never:**
  - Hardcode API tokens (use `process.env`).
  - Use loose types (`any`) for Sanity content.