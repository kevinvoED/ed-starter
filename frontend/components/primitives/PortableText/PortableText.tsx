import {
  type PortableTextProps,
  PortableText as PortableTextRenderer,
} from "@portabletext/react";
import { useMemo } from "react";
import Link from "next/link";
import { Dot } from "@/components/primitives/Dot/Dot";
import { SanityImage } from "@/components/primitives/Media/SanityImage";
import { PortableTextHeading } from "@/components/primitives/PortableText/PortableTextHeading";
import { PortableTextYoutube } from "@/components/primitives/PortableText/PortableTextYoutube";
import { cn } from "@/lib/utils/cn";

const portableTextComponents = (
  mode: "light" | "dark" = "light",
  style: "module" | "article" | "fragment" = "module",
  dotSize: "default" | "sm" = "default",
  className?: string,
): PortableTextProps["components"] => ({
  types: {
    image: ({ value }) => {
      return (
        <figure className="mb-12 max-h-fit">
          <SanityImage
            image={value}
            className="h-full max-h-[280px] w-full max-w-fit overflow-hidden rounded-lg object-contain object-left lg:max-h-138"
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
      if (style === "fragment") {
        return <>{children}</>;
      }

      return (
        <p
          className={cn(
            "type-body-1440 lg:type-body-1640",
            style === "article" ? "mb-12" : "",
            className,
          )}
        >
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
    blockquote: ({ children }) => {
      return (
        <blockquote className="type-body-1640 mb-12 border-black border-l-4 pl-6 italic">
          {children}
        </blockquote>
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
      <ul className="type-body-1640 mb-12 pl-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="type-body-1640 mb-12 list-decimal pl-5">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative mb-4">
        <Dot
          size={dotSize}
          color={mode === "light" ? "black" : "neon"}
          className={cn(
            "dot absolute -left-4.5",
            dotSize === "default" ? "top-2" : "top-2.5",
          )}
        />
        {children}
      </li>
    ),
    number: ({ children }) => <li className="mb-4">{children}</li>,
  },
});

// Style prop determines the rendering context:
// - "article": Used only on resource-type pages for full article content with proper spacing; outputs a <p>tag</p>
// - "module": Used for paragraph content in blocks and modules; outputs a <p>tag</p>
// - "fragment": Used for titles and heading elements; outputs a React Fragment
export const PortableText = ({
  value,
  mode = "light",
  style = "module",
  dotSize = "default",
  className,
}: {
  value: PortableTextProps["value"];
  mode?: "light" | "dark";
  style?: "article" | "module" | "fragment";
  dotSize?: "default" | "sm";
  className?: string;
}) => {
  const components = useMemo(
    () => portableTextComponents(mode, style, dotSize, className),
    [mode, style, dotSize, className],
  );

  return <PortableTextRenderer value={value} components={components} />;
};

export const ptFragment = ({
  value,
  mode = "light",
  style = "fragment",
  dotSize = "default",
  className,
}: {
  value: PortableTextProps["value"];
  mode?: "light" | "dark";
  style?: "article" | "module" | "fragment";
  dotSize?: "default" | "sm";
  className?: string;
}) => {
  const components = useMemo(
    () => portableTextComponents(mode, style, dotSize, className),
    [mode, style, dotSize, className],
  );

  return style === "article" ? (
    <article>
      <PortableTextRenderer value={value} components={components} />
    </article>
  ) : (
    <PortableTextRenderer value={value} components={components} />
  );
};
