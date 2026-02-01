import {
  type PortableTextProps,
  PortableText as PortableTextRenderer,
} from "@portabletext/react";
import Link from "next/link";
import { SanityImage } from "@/components/primitives/Image/SanityImage";
import { PortableTextHeading } from "@/components/primitives/PortableText/PortableTextHeading";
import { PortableTextYoutube } from "@/components/primitives/PortableText/PortableTextYoutube";
import { cn } from "@/lib/utils/cn";

/*
 * There are different types of styles associated with PortableText
 * style = "article" is used for resource-type pages for full article content with proper spacing
 * style = "module" is used when you want PortableText's <p></p> and <h1></h1> etc tags without bottom-margins
 * style = "fragment" is used for titles and heading elements; outputs a React Fragment
 */

export const PortableText = ({
  value,
  className,
  style = "module",
}: {
  value: PortableTextProps["value"];
  className?: string;
  style?: "article" | "module" | "fragment";
}) => {
  const components = portableTextComponents(style, className);

  return <PortableTextRenderer value={value} components={components} />;
};

export const PortableTextFragment = ({
  value,
  className,
  style = "fragment",
}: {
  value: PortableTextProps["value"];
  className?: string;
  style?: "article" | "module" | "fragment";
}) => {
  const components = portableTextComponents(style, className);

  return <PortableTextRenderer value={value} components={components} />;
};

const portableTextComponents = (
  style: "module" | "article" | "fragment" = "module",
  className?: string,
): PortableTextProps["components"] => ({
  types: {
    image: ({ value }) => {
      return (
        <figure className="mb-12 max-h-fit">
          <SanityImage
            image={value}
            className="h-full max-h-70 w-full max-w-fit overflow-hidden rounded-lg object-contain object-left lg:max-h-138"
            sizes="100vw"
            priority={true}
          />
        </figure>
      );
    },
    youtube: ({ value }) => {
      return <PortableTextYoutube {...value} />;
    },
  },
  block: {
    normal: ({ children }) => {
      /*
       * If the style is "fragment", return the children as is
       * Primarily used for titles and descriptions that don't need any styling
       * Triggered by using the PortableTextFragment component instead of PortableText
       */
      if (style === "fragment") {
        return <>{children}</>;
      }

      return (
        <p className={cn("", style === "article" ? "mb-12" : "", className)}>
          {children}
        </p>
      );
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
      <span style={{ color: value.value }}>{children}</span>
    ),
    highlightColor: ({ children, value }) => (
      <span style={{ background: value.value }}>{children}</span>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-10 list-disc pl-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-10 list-decimal pl-5">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-4">{children}</li>,
    number: ({ children }) => <li className="mb-4">{children}</li>,
  },
});
