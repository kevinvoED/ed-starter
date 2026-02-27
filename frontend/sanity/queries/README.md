# GROQ Query Organization
This directory contains all GROQ queries for fetching Sanity schema data in a modular, composable pattern. Queries are organized by type and purpose to promote reusability and maintainability.


## File Types & Purposes

### 1. `functions.ts` - GROQ Function Definitions

**Purpose**: Define reusable GROQ functions that can be called within queries to standardize data transformation.

**Contains**:
- `FN_IMAGE` - Image field expansion with asset metadata
- `FN_IMAGES` - Multiple images with asset metadata
- `FN_LOGO` - Logo image with asset metadata
- `FN_LINK` - Link field expansion with internal/external href resolution
- `FN_PT_PLAIN` - Plain portable text with link mark definitions
- `FN_PT` - Full portable text with link mark definitions
- `GROQ_FUNCTIONS` - Combined export of all functions
- `imageFields` - Raw image field projection (used by functions)
- `linkFields` - Raw link field projection with href resolution logic

**Example:**
```ts
export const FN_IMAGE = `
  fn fn::img($image) = $image {
    ${imageFields}
  };
`;
```

**Usage**: Import `GROQ_FUNCTIONS` at the top of any query that needs to use these functions via `fn::img()`, `fn::link()`, etc.

---

### 2. `fragments.ts` - Reusable Field Fragments

**Purpose**: Define small, reusable query fragments for common field patterns that can be interpolated into larger queries.

**Contains**:
- **Special Fragments**: Complex, composite fields
  - `metaFragment` - SEO metadata (title, description, image, relativeUrl, noindex)
  - `urlQuery` - Dynamic URL resolution based on document type

- **Common Fragments**: Standard field projections using GROQ functions
  - `titleFragment` - `"title": fn::ptPlain(title)`
  - `descriptionFragment` - `"description": fn::ptPlain(description)`
  - `imageFragment` - `"image": fn::img(image)`
  - `imagesFragment` - `"images": fn::imgs(images)`
  - `logoFragment` - `"logo": fn::logo(logo)`
  - `linkFragment` - `"link": fn::link(link)`
  - `portableTextFragment` - `"content": fn::pt(content)`
  - `videoFragment` - Video object with image fields

**Example:**
```ts
export const titleFragment = `
  "title": fn::ptPlain(title)
`;

export const metaFragment = `
  meta{
    "title": coalesce(title, select(...)),
    description,
    noindex,
    "relativeUrl": select(...),
    "image": coalesce(...)
  }
`;
```

**Usage**: Import specific fragments and interpolate them directly into queries.

---

### 3. `modules/` - Module Fragment Queries

**Purpose**: Define conditional query fragments for each module type in the page builder system. Each module represents a content block that can be added to pages.

**Pattern**: All module queries follow this structure:

```ts
// @sanity-typegen-ignore
export const MODULE_NAME_QUERY = defineQuery(`
  _type == "module-name" => {
    _type,
    _key,
    ${titleFragment},
    ${descriptionFragment},
    ${linkFragment},
    // ... other fields specific to this module
  }
`);
```

**Key Characteristics**:
- Use conditional matching: `_type == "module-name" => { ... }`
- Always include `_type` and `_key` for identification
- Annotated with `@sanity-typegen-ignore` (prevents individual type generation since they're composed into larger queries)
- Import and compose fragments from `fragments.ts`
- Located in subdirectories by category (card, hero, text, etc.)

**Examples**:
- `modules/hero/hero-primary.ts` - Hero module query
- `modules/card/card-example.ts` - Card module query
- `modules/text/rich-text.ts` - Rich text module query
- `modules/miscellaneous/global-module.ts` - Global module reference query

**Special Case - `global-module.ts`**:

This module references other modules and composes their queries:

```ts
export const GLOBAL_MODULE_QUERY = defineQuery(`
  _type == "global-module" => moduleRef->module[0]{
    _type,
    "_key": ^._key,
    ${CARD_EXAMPLE_QUERY},
    ${DRIVER_EXAMPLE_QUERY},
  }
`);
```

---

### 4. `documents/` - Document Queries

**Purpose**: Define complete queries for standalone document types (not modules). These are typically singleton or collection documents that are fetched independently.

**Pattern**: Document queries are standalone and fetch the entire document:

```ts
export const DOCUMENT_NAME_QUERY = defineQuery(`
  ${GROQ_FUNCTIONS}

  *[_type == "document-name"]{
    _key,
    _type,
    ${titleFragment},
    ${descriptionFragment},
    // ... other fields
  }
`);
```

**Key Characteristics**:
- Complete GROQ queries with filter syntax `*[_type == "..."]`
- Include `GROQ_FUNCTIONS` at the top when using functions
- NOT annotated with `@sanity-typegen-ignore` (generate types for these)
- Used for global/singleton data (navbar, footer, banner, etc.)

**Examples**:
- `documents/navbar.ts` - Navigation menu query
- `documents/footer.ts` - Footer data query
- `documents/banner.ts` - Banner announcement query

---

### 5. `queries.ts` - Main Query Orchestration

**Purpose**: The central orchestration file that composes all module queries, defines the main page queries, and exports complex queries for content types.

**Contains**:

#### A. Module Builder Fragment (`modulesFragment`)

Composes all module queries into a single fragment for page builder:

```ts
// @sanity-typegen-ignore
export const modulesFragment = defineQuery(`
  modules[]{
    ${GLOBAL_MODULE_QUERY},
    ${HERO_PRIMARY_QUERY},
    ${CARD_EXAMPLE_QUERY},
    // ... all other module queries
  }
`);
```

**Usage**: This fragment is interpolated into page queries to fetch all possible module types.

#### B. Page Queries

Core queries for fetching page data:

- `PAGE_QUERY` - Fetch a single page by slug
- `PAGE_SLUG_QUERY` - Generic page fetch by dynamic type and slug
- `PAGES_SLUGS_QUERY` - Get all page slugs for static params

**Example**:
```ts
export const PAGE_QUERY = defineQuery(`
  ${GROQ_FUNCTIONS}

  *[_type == "page" && slug.current == $slug][0]{
    _type,
    ${modulesFragment},
    ${metaFragment}
  }
`);
```

#### C. Content Type Queries

Complex queries for content index pages (blog, case studies):

- `GET_CONTENT_TYPE_INDEX_QUERY` - Fetch index page with posts, filters, pagination
- `GET_CONTENT_TYPE_SLUG_QUERY` - Fetch individual content document
- `GET_CONTENT_TYPE_SLUGS_STATIC_PARAMS_QUERY` - Get slugs for static generation

---

## Critical Rules & Conventions

### Imports
- **ALWAYS use relative imports** for GROQ queries (Sanity TypeGen doesn't support absolute imports)
- Comment at the top of `queries.ts` reminds developers of this rule

### TypeGen Annotations
- Module queries: Use `@sanity-typegen-ignore` (they're fragments, not complete queries)
- Document queries: Do NOT use `@sanity-typegen-ignore` (generate types for these)
- Composed queries in `queries.ts`: Some use `@sanity-typegen-ignore`, others don't (case-by-case)

### Query Definitions
- **ALWAYS wrap queries with `defineQuery()`** from `next-sanity`
- **ALWAYS use SCREAMING_SNAKE_CASE** for exported query constants

### Function Usage

Queries using `fn::img()`, `fn::link()`, `fn::pt()`, etc. must import `GROQ_FUNCTIONS` at the top:

```ts
export const MY_QUERY = defineQuery(`
  ${GROQ_FUNCTIONS}

  *[_type == "page"][0]{
    "image": fn::img(image)
  }
`);
```

### Module Queries
- **ALWAYS include conditional type matching**: `_type == "module-name" => { ... }`
- **ALWAYS include `_type` and `_key`** in the projection
- Use fragments for common fields to stay DRY

---

## Adding New Queries

### Adding a New Module

1. Create a new file in the appropriate subdirectory under `modules/`
2. Define the query with conditional type matching
3. Add `@sanity-typegen-ignore` annotation
4. Import relevant fragments from `fragments.ts`
5. Export the query constant
6. Import and add to `modulesFragment` in `queries.ts`

**Example**:
```ts
// modules/cta/cta-banner.ts
import { defineQuery } from "next-sanity";
import { titleFragment, linkFragment } from "../../fragments";

// @sanity-typegen-ignore
export const CTA_BANNER_QUERY = defineQuery(`
  _type == "cta-banner" => {
    _type,
    _key,
    ${titleFragment},
    ${linkFragment},
    theme
  }
`);
```

Then in `queries.ts`:
```ts
import { CTA_BANNER_QUERY } from "./modules/cta/cta-banner";

export const modulesFragment = defineQuery(`
  modules[]{
    ${GLOBAL_MODULE_QUERY},
    ${HERO_PRIMARY_QUERY},
    ${CTA_BANNER_QUERY},  // Add here
    // ... other modules
  }
`);
```

### Adding a New Document Query

1. Create a new file in `documents/`
2. Define a complete GROQ query with filters
3. Do NOT add `@sanity-typegen-ignore` (unless intentional)
4. Include `GROQ_FUNCTIONS` if using function calls
5. Export the query constant

**Example**:
```ts
// documents/settings.ts
import { defineQuery } from "next-sanity";
import { GROQ_FUNCTIONS } from "../functions";

export const SETTINGS_QUERY = defineQuery(`
  ${GROQ_FUNCTIONS}

  *[_type == "settings"][0]{
    _type,
    siteName,
    "logo": fn::img(logo)
  }
`);
```

### Adding a New Fragment

1. Add to `fragments.ts`
2. Use existing function calls when possible
3. Export as a template string
4. Use descriptive naming: `[fieldName]Fragment`

**Example**:
```ts
export const authorFragment = `
  "author": author->{
    _id,
    name,
    "image": fn::img(image)
  }
`;
```

### Adding a New GROQ Function

1. Add to `functions.ts`
2. Define field projection first (e.g., `authorFields`)
3. Create function definition using the fields
4. Add to `GROQ_FUNCTIONS` composite export

**Example**:
```ts
export const authorFields = `
  ...,
  "image": fn::img(image)
`;

export const FN_AUTHOR = `
  fn fn::author($author) = $author->{
    ${authorFields}
  };
`;

export const GROQ_FUNCTIONS = `
  ${FN_IMAGE}
  ${FN_LINK}
  ${FN_AUTHOR}  // Add here
  // ... other functions
`;
```

---

## Best Practices

- **Keep queries DRY** - Use fragments and functions for repeated patterns
- **Use descriptive names** - Query names should clearly indicate what they fetch
- **Document complex logic** - Add comments for non-obvious query behavior
- **Follow the pattern** - Maintain consistency with existing query structure
- **Run typegen** - Always run `pnpm typegen` after query changes

---

## Related Files

- `/studio/schemas/` - Schema definitions that these queries fetch
- `/frontend/sanity/lib/fetch.ts` - Query execution utilities
- `/frontend/sanity.types.ts` - Generated TypeScript types from queries
- `/studio/sanity.cli.ts` - TypeGen configuration