/**
 * Rich Text Editor component.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
  type PortableTextBlock,
  type PortableTextComponents,
  PortableText as SanityPortableText,
} from "next-sanity";
import { Button } from "@/components/Button/Button";

export const PortableText = ({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) => {
  const components: PortableTextComponents = {
    types: {
      cta: ({ value: cta }) => {
        return (
          <Button cta={cta} className="not-prose">
            {cta?.label}
          </Button>
        );
      },
    },
    block: {
      normal: ({ children }) => <p className="mb-4">{children}</p>,
      h1: ({ children }) => <h1>{children}</h1>,
      h2: ({ children }) => <h2>{children}</h2>,
    },
    marks: {
      internalLink: ({ value, children }) => {
        const { slug = {} } = value;
        const href = `/${slug}`;
        return <a href={href}>{children}</a>;
      },
      link: ({ value, children }) => {
        const { blank, href } = value;
        return blank ? (
          <a href={href} target="_blank" rel="noopener">
            {children}
          </a>
        ) : (
          <a href={href}>{children}</a>
        );
      },
    },
  };

  return (
    <div className={["prose", className].filter(Boolean).join(" ")}>
      <SanityPortableText components={components} value={value} />
    </div>
  );
};
