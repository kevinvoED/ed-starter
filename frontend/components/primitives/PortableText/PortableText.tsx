import type { ResolvedSanityLinkType } from "@/lib/utils/types";
import { type ElementType, Fragment } from "react";
import {
  type PortableTextProps,
  PortableText as PortableTextRenderer,
} from "@portabletext/react";
import { cn } from "cnfast";
import { SanityLink } from "@/components/primitives/Link/SanityLink";
import { PortableTextHeading } from "@/components/primitives/PortableText/PortableTextHeading";
import { PortableTextImage } from "@/components/primitives/PortableText/PortableTextImage";
import { PortableTextRichTable } from "@/components/primitives/PortableText/PortableTextRichTable";
import { PortableTextTable } from "@/components/primitives/PortableText/PortableTextTable";
import { PortableTextYoutube } from "@/components/primitives/PortableText/PortableTextYoutube";

/*
 * PortableText component for rendering Sanity's Rich Text Editor content
 * @docs: https://www.sanity.io/docs/studio/portable-text-editor-configuration
 *
 * ---------------------
 * Usage Example: Basic
 * ---------------------
 * <PortableText value={post.content} />
 *
 * ---------------------
 * Usage Example: Article Style
 * ---------------------
 * <PortableText value={post.content} style="article"/>
 *
 * ---------------------
 * Usage Example: Module Style
 * ---------------------
 * <PortableText value={post.content} style="module"/>
 *
 * ---------------------
 * Usage Example: Spacing controlled by parent
 * ---------------------
 * <Transition className="[&_p]:mb-24">
 *   <PortableText value={description} />
 * </Transition>
 *
 * ---------------------
 * Usage Example: Styling typography
 * ---------------------
 * <PortableText value={title} as="h1" className="type-heading-3230"/>
 *
 * ---------------------
 * Usage Example: Slotting any HTML element to override the default `<p>` tag; includes React.Fragment
 * ---------------------
 * <PortableText value={eyebrow} as="span" />
 * <PortableText value={title} as="h1" />
 * <PortableText value={description} as="fragment" />
 */

type PortableTextComponentProps = {
  className?: string;
  value: PortableTextProps["value"];
  style?: "article" | "module";
  as?: ElementType | "Fragment";
};

export const PortableText = ({
  className,
  value,
  as,
  style = "module",
}: PortableTextComponentProps) => {
  const components = portableTextComponents(style, as);

  return (
    <div className={cn(!as && "[&_p:last-of-type]:mb-0", className)}>
      <PortableTextRenderer value={value} components={components} />
    </div>
  );
};

const portableTextComponents = (
  style: "module" | "article" = "module",
  as?: ElementType | "Fragment",
): PortableTextProps["components"] => ({
  /*
   * Special custom components that users can inject directly into their PortableText field
   * Create a new custom component and then add it to the `types` object
   */
  types: {
    image: ({ value }) => {
      return <PortableTextImage {...value} />;
    },
    youtube: ({ value }) => {
      return <PortableTextYoutube {...value} />;
    },
    richTable: ({ value }) => {
      return <PortableTextRichTable {...value} />;
    },
    table: ({ value }) => {
      return <PortableTextTable {...value} />;
    },
  },
  block: {
    normal: ({ children }) => {
      /*
       * If `slot` is provided, return the children wrapped in the slot element
       * Otherwise output a regular `<p>` tag, with optional margin spacing based on `style`
       */
      if (as) {
        const Slot = as === "Fragment" ? Fragment : as;
        return <Slot>{children}</Slot>;
      }

      return (
        <p
          className={cn(
            "ftype type-body-1440 to-type-body-1640",
            style === "article" && "mb-12",
            style === "module" && "mb-4",
          )}
        >
          {children}
        </p>
      );
    },
    h1: ({ children }) => {
      return (
        <PortableTextHeading heading="h1" className="type-heading-3240">
          {children}
        </PortableTextHeading>
      );
    },
    h2: ({ children }) => {
      return (
        <PortableTextHeading heading="h2" className="type-heading-3240">
          {children}
        </PortableTextHeading>
      );
    },
    h3: ({ children }) => {
      return (
        <PortableTextHeading heading="h3" className="type-heading-3240">
          {children}
        </PortableTextHeading>
      );
    },
    h4: ({ children }) => {
      return (
        <PortableTextHeading heading="h4" className="type-heading-3240">
          {children}
        </PortableTextHeading>
      );
    },
    h5: ({ children }) => {
      return (
        <PortableTextHeading heading="h5" className="type-heading-3230">
          {children}
        </PortableTextHeading>
      );
    },
    h6: ({ children }) => {
      return (
        <PortableTextHeading heading="h6" className="type-heading-3230">
          {children}
        </PortableTextHeading>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const linkValue = value as ResolvedSanityLinkType | undefined;

      if (!linkValue?.href) {
        return <>{children}</>;
      }

      return (
        <SanityLink
          variant="portableText"
          link={linkValue}
          openInNewTab={linkValue.openInNewTab ?? false}
          id="cta"
        >
          {children}
        </SanityLink>
      );
    },
    textColor: ({ children, value }) => (
      // @see: https://github.com/cositehq/sanity-plugin-simpler-color-input
      <span style={{ color: value.value }}>{children}</span>
    ),
    highlightColor: ({ children, value }) => (
      // @see: https://github.com/cositehq/sanity-plugin-simpler-color-input
      <span style={{ background: value.value }}>{children}</span>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className={cn("list-disc pl-5", style === "article" ? "mb-12" : "")}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className={cn("list-decimal pl-5", style === "article" ? "mb-12" : "")}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className={`${style === "article" ? "mb-4" : "mb-2"}`}>{children}</li>
    ),
    number: ({ children }) => (
      <li className={`${style === "article" ? "mb-4" : "mb-2"}`}>{children}</li>
    ),
  },
});
