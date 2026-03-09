# Components
UI components organized by purpose.
```
components/
├── animations/      → Pre-defined GSAP animations
├── layout/          → Global layout components
├── modules/         → Sanity-schema powered modules
└── primitives/      → Basic common components
```

## Animations
| Component                | Purpose                                                        |
| :----------------------- | :--------------------------------------------------------------|
| `TextReveal`             | GSAP-powered text reveal animation with SplitText              |
| `TextScramble`           | Animated text scrambling effect with GSAP                      |
| `TextMask`               | Text masking animation for reveal effects                      |
| `Transition`             | General-purpose transition wrapper for GSAP animations         |

## Layout
| Component                      | Purpose                                                         |
| :----------------------------- | :--------------------------------------------------------------|
| `Header`                       | Global header with desktop and mobile navigation               |
| `Footer`                       | Global footer with desktop and mobile variants                 |
| `Page`                         | Root page wrapper component                                    |
| `Lenis`                        | Smooth scrolling provider wrapper                              |
| `ScrollTrigger`                | GSAP ScrollTrigger initialization                              |
| `Tempus`                       | GSAP Tempus plugin initialization                              |
| `Runtime`                      | GSAP runtime configuration                                     |
| `GridGuideline`                | Visual grid overlay for development                            |
| `SkipToMain`                   | Accessibility skip-to-main-content link                        |
| `ContentPagination`            | Pagination controls for content lists                          |
| `ContentPaginationScrollHandler` | Auto-scroll handler for pagination                           |
| `ContentCategoryFilter`        | Category filtering UI for content                              |
| `ContentTopicFilter`           | Topic filtering UI for content                                 |
| `ErrorBoundary`                | React error boundary for error handling                        |
| `DraftMode`                    | Draft mode toggle for Sanity preview                           |
| `DisableDraftMode`             | Component to exit draft preview mode                           |
| `ScrollRestoration`            | Browser scroll position restoration utility                    |
| `JsonLD`                       | Structured data JSON-LD component for SEO                      |

## Modules
| Component                | Purpose                                                        |
| :----------------------- | :--------------------------------------------------------------|
| `ModuleBuilder`          | Dynamic component mapper for Sanity modules                    |
| `RichText`               | Portable Text renderer                                         |
| `FullImage`              | Full-width image module                                        |
| `FullVideo`              | Full-width video module                                        |
| `Marquee`                | Infinite scrolling marquee module                              |
| `Spacer`                 | Vertical spacing utility module                                |
| `HeroPrimary`            | Primary hero section with title, content, and media            |

## Primitives
| Component                | Purpose                                                        |
| :----------------------- | :--------------------------------------------------------------|
| `Button`                 | Reusable button with variants                                  |
| `SanityLink`             | Dynamic Link component for Sanity link objects                 |
| `SanityImage`            | Optimized image component for Sanity assets                    |
| `PortableText`           | Portable Text renderer with custom serializers                 |
| `Accordion`              | Collapsible accordion component                                |
| `Tabs`                   | Tab navigation component                                       |
| `Sheet`                  | Slide-out drawer/sheet component                               |
| `Banner`                 | Announcement banner component                                  |
| `Carousel`               | Image/content carousel component                               |
| `TextMarquee`            | Text-based infinite scrolling marquee                          |
| `ImageMarquee`           | Image-based infinite scrolling marquee                         |
| `Table`                  | Styled table component                                         |
| `NativeSelect`           | Native HTML select dropdown                                    |
| `Icon`                   | Icon component                                                 |

## Best Practices
```typescript
// ✅ Always use our custom SanityImage
import { SanityImage } from "@/components/primitives/Image/SanityImage";
{image && <SanityImage image={image} sizes="(max-width: 768px) 100vw, 75vw" />}

// ✅ Always use our custom SanityLink for links
import { SanityLink } from "@/components/primitives/Link/SanityLink";
{link?.map((link) => (
  <SanityLink key={link._key} link={link} variant="primary" width="fit">
    {link.label}
  </SanityLink>
))}
```