import {
  type PortableTextProps,
  PortableText as PortableTextRenderer,
} from "@portabletext/react";
import { type ElementType, Fragment } from "react";
import Link from "next/link";
import { SanityImage } from "@/components/primitives/Image/SanityImage";
import { PortableTextHeading } from "@/components/primitives/PortableText/PortableTextHeading";
import { PortableTextRichTable } from "@/components/primitives/PortableText/PortableTextRichTable";
import { PortableTextYoutube } from "@/components/primitives/PortableText/PortableTextYoutube";
import { cn } from "@/lib/utils/cn";

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
 * <PortableText value={title} slot="h1" className="type-heading-3230"/>
 *
 * ---------------------
 * Usage Example: Slotting any HTML element to override the default `<p>` tag; includes React.Fragment
 * ---------------------
 * <PortableText value={eyebrow} slot="span" />
 * <PortableText value={title} slot="h1" />
 * <PortableText value={description} slot="fragment" />
 */

type PortableTextComponentProps = {
  className?: string;
  value: PortableTextProps["value"];
  style?: "article" | "module";
  slot?: ElementType | "Fragment";
};

export const PortableText = ({
  className,
  value,
  slot,
  style = "module",
}: PortableTextComponentProps) => {
  const components = portableTextComponents(style, slot);

  if (className && className.length > 0) {
    return (
      <div className={className}>
        <PortableTextRenderer value={value} components={components} />
      </div>
    );
  }
  return <PortableTextRenderer value={value} components={components} />;
};

const portableTextComponents = (
  style: "module" | "article" = "module",
  slot?: ElementType | "Fragment",
): PortableTextProps["components"] => ({
  /*
   * Special custom components that users can inject directly into their PortableText field
   * You can create a new custom component in this directory and then add it t this `types` object
   */
  types: {
    image: ({ value }) => {
      return (
        <figure className="mb-12 max-h-fit">
          <SanityImage
            image={value}
            className={cn(
              "overflow-hidden object-contain",
              "h-full max-h-70 w-full max-w-fit lg:max-h-138",
            )}
            sizes="(max-width: 768px) 100vw, 75vw"
            priority={true}
          />
        </figure>
      );
    },
    youtube: ({ value }) => {
      return <PortableTextYoutube {...value} />;
    },
    richTable: ({ value }) => {
      return <PortableTextRichTable {...value} />;
    },
  },
  block: {
    normal: ({ children }) => {
      /*
       * If `slot` is provided, return the children wrapped in the slot element
       * Otherwise output a regular `<p>` tag, with optional margin spacing based on `style`
       */
      if (slot) {
        const Slot = slot === "Fragment" ? Fragment : slot;
        return <Slot>{children}</Slot>;
      }

      return <p className={style === "article" ? "mb-12" : ""}>{children}</p>;
    },
    h1: ({ children }) => {
      return (
        <PortableTextHeading heading="h1" className="type-heading-3230">
          {children}
        </PortableTextHeading>
      );
    },
    h2: ({ children }) => {
      return (
        <PortableTextHeading heading="h2" className="type-heading-3230">
          {children}
        </PortableTextHeading>
      );
    },
    h3: ({ children }) => {
      return (
        <PortableTextHeading heading="h3" className="type-heading-3230">
          {children}
        </PortableTextHeading>
      );
    },
    h4: ({ children }) => {
      return (
        <PortableTextHeading heading="h4" className="type-heading-3230">
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
      return (
        <Link
          href={value?.href || ""}
          target={value.openInNewTab ? "_blank" : undefined}
          rel={value.openInNewTab ? "noopener" : undefined}
          className="underline"
        >
          {children}
        </Link>
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
