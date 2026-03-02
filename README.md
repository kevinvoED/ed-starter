# ED - Starter Kit
[![Next.js][next-js]][next-js-url] [![Sanity][sanity]][sanity-url] [![React][react]][react-url] [![Tailwind][tailwind]][tailwind-url]

[react-url]: https://reactjs.org/
[next-js-url]: https://nextjs.org/
[tailwind-url]: https://tailwindcss.com/
[sanity-url]: https://www.sanity.io/
[react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[next-js]: https://img.shields.io/badge/Next.js-20232A?style=for-the-badge&logo=Next.js
[tailwind]: https://img.shields.io/badge/Tailwind_CSS-20232A?style=for-the-badge&logo=tailwindcss&logoColor=319795
[sanity]: https://img.shields.io/badge/Sanity-20232A?style=for-the-badge&logo=sanity&logoColor=F97316

## Pre-requisites
> If you are having trouble with `corepack` not being able to install `pnpm`, try clearing the cache with `corepack cache clean`.

| Tool| Action|
| :------------------------ | :----------------------------------------------- |
| `Node.js`| Version specified in `.nvmrc` (use `nvm use`)|
| `pnpm`| `~10.19.0` (installed automatically via `packageManager` field)|




## Setup & Development

```typescript
// Set your node version
$ nvm use

// Set up .env variables
$ pnpm setup-env

// Install dependencies in root, frontend, and studio folders
$ pnpm install

// Run in root folder to start frontend and studio dev environments in parallel
$ pnpm dev
```

## Commands

| Command                | Action                                                         |
| :--------------------- | :--------------------------------------------------------------|
| `pnpm install`         | Installs dependencies                                          |
| `pnpm dev`             | Starts local dev and local Sanity studio servers in parallel   |
| `pnpm dev:next`        | Starts local dev server at localhost:3000                      |
| `pnpm dev:studio`      | Starts Sanity Studio server at localhost:3333                  |
| `pnpm typegen`         | Autogenerates types using Sanity TypeGen                       |
| `pnpm typecheck`       | TypeScript type checking                                       |
| `pnpm format`          | Formats and lints code with Biome                              |
| `pnpm setup-env`       | Symlinks root .env.local to frontend and studio folders        |

## Naming Conventions
>Note that Biome.js will warn you during the linting process if a file does not match properly.

- `/frontend/components`: `PascalCase`
  - ✅ `Author.tsx`
  - ✅ `HeroPrimary.tsx`
  - ✅ `CardGrid.tsx`
  - ❌ `blog-category.tsx`
  - ❌ `blogCategory.tsx`

- `studio/schemas` & `frontend/sanity/queries`: `kebab-case`
  - ✅ `author.ts`
  - ✅ `hero-primary.ts`
  - ✅ `card-grid.ts`
  - ❌ `BlogCategory.ts`
  - ❌ `blogCategory.ts`

## Project Structure

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

## FAQ

### How do I create a new Sanity-powered module?
1. In root, run `pnpm run plop` and select `Add New Module`
2. Plop will then auto-generate a component, query, and schema file
3. Add your schema to `/studio/schemas/schema.ts` and `/studio/schemas/moduleTypes.ts`
4. Add your schema image preview to `/studio/schemas/previews`
5. Add your query to `/frontend/sanity/queries/queries.ts`
6. Add your component and schema to `/frontend/components/modules/ModuleBuilder.tsx`
7. Run `pnpm run typegen` to auto-generate new types. Done!

### How do I create a global-referenced module?
1. Follow steps above to create a Sanity-powered module
2. Add the schema to `globalModuleBlocks` in `/studio/schemas/moduleTypes.ts`
3. Add the relevant query to `GLOBAL_MODULE_QUERY` in `/frontend/sanity/modules/miscellaneous/global-module.ts`
4. In Sanity Studio, you can now create a reference instance of your module under `Global Modules`
5. On any page with a Module Builder, you can now select `Global Module` and select that specific module instance

### Creating field previews
1. Install `imagemagick` with `brew install imagemagick`
2. Run `magick --help` to return a path to ensure its installed the convert tool
3. Export the frame of the component (use JPG)
4. Extract the JPG
5. Crop and resize to `536x336`

```bash
# resizes within 536x336 pixels while maintaining aspect ratio, then crops it to 536x336 from the top
magick "~/Downloads/exported-component-frame-from-figma.jpg" -resize 536x336^ -gravity North -extent 536x336 -quality 95 "studio/schemas/previews/component-name-output.jpg"
```

### Using ModuleProps is a type-safe way of typing your components

```typescript
import type { ModuleProps } from "@/sanity/lib/fetch";

// replace hero-primary with any schema name
type HeroPrimaryProps = ModuleProps<"hero-primary">;

// and you'll be able to access all props with intellisense
export const HeroPrimary = ({ title, content }: HeroPrimaryProps) => { ...
```

### Use function return types for prop types

```typescript
interface Props {
  // now, any changes to the `fetchSanityFooter` function will be caught here!
  footer: Awaited<ReturnType<typeof fetchSanityFooter>>;
  class?: ClassValue[];
}

// or, create a type that can wrap this up for you
export type FetchedSanityFooter = Awaited<ReturnType<typeof fetchSanityFooter>>;
```

### Your components do not need to start with a section tag

```typescript

// All modules are already pre-wrapped with a <section> tag in ModuleBuilder.tsx
return (
  <section key={_key} data-module={_type}>
    <Component>...</Component>
```

### Each component does not need to initialize ScrollTrigger

```typescript

// We already register ScrollTrigger in ScrollTrigger.tsx which lives in our root layout

// ScrollTrigger.tsx
if (typeof window !== "undefined") {
  gsap.registerPlugin(GSAPScrollTrigger, SplitText);
  GSAPScrollTrigger.clearScrollMemory("manual");
}

// You do have to import ScrollTrigger if you plan on using its methods though
import { ScrollTrigger } from "gsap/all";
```

## To-Do List

- [ ] llms.txt (auto-generated with Sanity?)
- [ ] Spacer module?
- [ ] Nav bar theme and direction-aware
- [ ] Componetize pages and layouts so its easily testable
- [ ] Update the fluid.css with Kele's v4
