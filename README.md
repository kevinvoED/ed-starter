# Spur
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
- **Node.js**: Version specified in `.nvmrc` (use `nvm use`)
- **pnpm**: `~10.19.0` (installed automatically via `packageManager` field)

> If you are having trouble with `corepack` not being able to install `pnpm`, try clearing the cache with `corepack cache clean`


## Initial Setup

1. **Set Up ENV**:

```bash
cp frontend/.env.local.example frontend/.env.local
cp studio/.env.local.example studio/.env.local
```

Refer to Keeper to find keys and secrets

2. **Set Node Version**:

```bash
nvm use
```

3. **Install Dependencies**:

```bash
pnpm install
```


## Development

Running this command will run frontend and studio in parallel:

```bash
pnpm dev
```

This starts:

- **Frontend**: `http://localhost:3000` (Next.js)
- **Studio**: `http://localhost:3333` (Sanity Studio)

## Project Structure

```
spur-us/
├── frontend/          # Next.js Frontend
│   ├── app
│   ├── components
│   ├── lib
│   └── sanity
│   └── package.json
├── studio/            # Sanity Studio
│   ├── lib
│   ├── schemas
│   └── package.json
├── package.json       # Root workspace config
└── pnpm-workspace.yaml
```

## Naming Conventions

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

>Note that Biome.js will warn you during the linting process if a file does not match properly.

## Commands

> Commands ran from the root of the project, in a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev and local Sanity studio servers in parallel|
| `pnpm run dev:next`        | Starts local dev server at localhost:3000|
| `pnpm run dev:studio`      | Starts Sanity Studio server at localhost:3333    |
| `pnpm run typegen`         | Autogenerates types using Sanity TypeGen         |
| `pnpm run typecheck`       | TypeScript type checking                         |
| `pnpm run format`          | Formats and lints code with Biome                |

## PortableText

### PortableText

There are two different `PortableText` types used in this project:

`PortableText`: primarily used for long-form article content with access to all rich text features and embedded components.

```typescript
// studio/schemas/modules/documents/post.ts

// Usage in a schema
...,
defineField({
  ...portableText,
  group: "content",
})

// GROQ querying the schema; note by default the 'name' is 'content'
...
content[]{
  ${portableTextFragment}
}

// In your component, remember to import our custom PortableText
import { PortableText } from "@/components/PortableText/PortableText";
...
<h1><PortableText value={content}/></h1>

//You can also pass in a mode for light or dark depending on the background of the module and you can't control the text for whatever reason
<PortableText
  value={content}
  mode="light" // or "dark"
/>

// You can also pass in a style (article, module, or fragment) which applies different styling or outputs a different HTML tag. By default, it's set to 'module' which outputs a <p> tag without any spacing.
<PortableText
  value={content}
  mode="module" // "article" / "fragment"
/>
```
### PortableTextPlain
`PortableTextPlain`: primarily used for text fields within modules

```typescript
// There are pre-defined common usages for 'PortableTextPlain' in 'sharedFields.ts'
defineField({
  ...ptTitle,
})

// Example: Creating custom portable-text-plain field
import { portableTextPlain } from "@/schemas/objects/portable-text-plain";

defineField(
  portableTextPlain({
    name: "title", // defaults to 'content' unless specified
    title: "Title",
    enableLink: true,
    enableBold: true,
  })
)

// You can enable any combination of flags, by default they are all false except for validation.
defineField(
  portableTextPlain({
    name: "richContent",
    title: "Rich Content",
    description: "Full featured text editor for module content.",
    enableTypeStyle: true,
    enableBold: true,
    enableItalic: true,
    enableBulletList: true,
    enableNumberList: true,
    enableHighlight: true,
    enableLink: true,
  })
)

// Sometimes your schema field might be too long in comparison to the text content that will be inside it. This happens mainly with titles as they do not contain very many characters. You can enable 'oneLine' to turn the field into only one line. Note that this inherently disables line breaks.
defineField(
  portableTextPlain({
    name: "quote",
    title: "Quote",
    oneLine: true,
  })
)
```
## Tips & Tricks

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

### Using BlockProps is a type-safe way of typing your components

```typescript
import type { BlockProps } from "@/sanity/lib/fetch";

// replace hero-primary with any schema name
type HeroPrimaryProps = BlockProps<"hero-primary">;

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

### Properly typing Radix components

While using RadixUI components, you may notice a TypeScript error regarding props passed in or errors complaining about there being no children prop. ForwardRefExoticComponent no longer accepts 'children' prop in React 18.2+ and TypeScript 5.x+. We can instead extend each component in `globals.d.ts`.

![alt text](https://github.com/spurintel/spur-us/blob/main/frontend/public/images/readme-globals.png "Image")

```typescript
declare module "@radix-ui/react-accordion" {
  export interface AccordionSingleProps extends PropsWithChildren {
    className?: string;
  }
  ...
}
```



## Bug Bounty
> List of outstanding bugs that need fixing; the prize for clearing one of the bounties is the self-satisfaction of getting this list one step closer to its complete and utter demise.

- absolute imports don't work inside `/sanity/queries` and is presumably conflicting with Sanity TypeGen somehow
