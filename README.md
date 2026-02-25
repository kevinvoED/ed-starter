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

| Tool| Action|
| :------------------------ | :----------------------------------------------- |
| `Node.js`| Version specified in `.nvmrc` (use `nvm use`)|
| `pnpm`| `~10.19.0` (installed automatically via `packageManager` field)|

> If you are having trouble with `corepack` not being able to install `pnpm`, try clearing the cache with `corepack cache clean`.


## Setup & Development

```typescript
// Set up ENV variables
$ cp frontend/.env.local.example frontend/.env.local
$ cp studio/.env.local.example studio/.env.local

// Set your node version
$ nvm use

//Install dependencies in root, frontend, and studio folders
$ pnpm install

// Run `pnpm run dev` in root folder to run frontend and studio dev environments in parallel
$ pnpm run dev
```

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

## Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev and local Sanity studio servers in parallel|
| `pnpm run dev:next`        | Starts local dev server at localhost:3000|
| `pnpm run dev:studio`      | Starts Sanity Studio server at localhost:3333    |
| `pnpm run typegen`         | Autogenerates types using Sanity TypeGen         |
| `pnpm run typecheck`       | TypeScript type checking                         |
| `pnpm run format`          | Formats and lints code with Biome                |

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

## FAQ

### How do I create a new Sanity schema and component?
1. Create your schema inside `/studio/schemas` in the appropriate folder
2. Add your schema to `/studio/schema.ts`
3. Add your schema to `/studio/moduleTypes.ts`
4. Add your schema image preview to `/studio/schemas/previews`
5. Create a query for your schema at `/frontend/sanity/queries`
6. Add that query to `/frontend/sanity/queries/page.ts`
7. Create your component in `/frontend/components`
8. Add your component and schema to `/frontend/components/ModuleBuilder.tsx`
9. Make good use of `sharedFields.ts` for schemas and the `shared` fragments for queries

### Creating field previews

1. Install `imagemagick` with `brew install imagemagick`
2. Check it installed the convert tool with `magick --help` and it should return a path
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

// MyComponent.tsx
import { ScrollTrigger } from "gsap/all";
```

## To-Do List

- [ ] llms.txt (auto-generated with Sanity?)
- [ ] Global-referenced modules (e.g. drivers)
- [ ] Swiper? Embla? Carousel?
- [ ] Spacer module?
- [ ] Nav bar theme and direction-aware
- [ ] Image aspect ratio + size description validation in Sanity Schemas
- [ ] update next.config.mjs
