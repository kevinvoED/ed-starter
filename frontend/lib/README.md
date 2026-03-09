# Lib

```
lib/
├── hooks/      → Custom React hooks
├── site/       → Site-wide metadata and SEO utilities
├── styles/     → Global styles, fonts, and animations
└── utils/      → Pure utility functions
```

## Hooks
| Hook                | Purpose                                                        |
| :------------------ | :--------------------------------------------------------------|
| `useNavTheme`       | Detects section overlap with navbar and returns theme          |
| `useIsMobile`       | Provides screen size and mobile breakpoint detection           |

## Site
| Utility                      | Purpose                                                        |
| :--------------------------- | :--------------------------------------------------------------|
| `metadata`                   | Generates Next.js metadata for SEO and Open Graph              |
| `generate-jsonld-metadata`   | Creates structured JSON-LD data for search engines             |

## Styles
| File                | Purpose                                                        |
| :------------------ | :--------------------------------------------------------------|
| `fonts`             | Custom font definitions using next/font/local                  |
| `animations`        | GSAP helper functions                                          |
| `reset.css`         | CSS reset stylesheet                                           |
| `fluid.css`         | Fluid typography and spacing utilities                         |

## Utils
| Utility              | Purpose                                                        |
| :------------------- | :--------------------------------------------------------------|
| `cn`                 | Merges Tailwind classes  (clsx + twMerge)                      |
| `date`               | Date formatting utilities                                      |
| `filter`             | Filter helpers for content category/topic filtering            |
| `pagination`         | Creates page URLs with query parameters for pagination         |
| `url-mapper`         | Maps Sanity document types to frontend URLs                    |
| `types`              | Shared TypeScript type definitions                             |
| `generic`            | Generic helper functions                                       |