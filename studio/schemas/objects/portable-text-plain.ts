import { HighlightIcon } from "@sanity/icons";
import {
  type ArrayRule,
  defineArrayMember,
  defineField,
  type Rule,
  type ValidationBuilder,
} from "sanity";
import { colorOptions } from "@/schemas/objects/color-variants";

interface PortableTextPlainProps {
  name?: string;
  title?: string;
  description?: string;
  oneLine?: boolean;
  enableHighlight?: boolean;
  enableLink?: boolean;
  enableBold?: boolean;
  enableItalic?: boolean;
  enableBulletList?: boolean;
  enableNumberList?: boolean;
  enableTypeStyle?: boolean;
  validation?: boolean | ValidationBuilder<ArrayRule<unknown[]>, unknown[]>;
  hidden?: boolean | ((props: { parent: Record<string, unknown> }) => boolean);
}

const typeStyleFields = [
  { title: "Normal", value: "normal" },
  { title: "H1", value: "h1" },
  { title: "H2", value: "h2" },
  { title: "H3", value: "h3" },
  { title: "H4", value: "h4" },
];
const boldDecoratorField = { title: "Bold", value: "strong" };
const italicDecoratorField = { title: "Italic", value: "em" };
const bulletListField = { title: "Bullet", value: "bullet" };
const numberListField = { title: "Number", value: "number" };

const linkAnnotationField = {
  name: "link",
  type: "object",
  title: "Link",
  fields: [
    {
      name: "isExternal",
      type: "boolean",
      title: "Is External",
      initialValue: false,
    },
    {
      name: "internalLink",
      type: "reference",
      title: "Internal Link",
      to: [
        { type: "page" },
        { type: "post" },
        { type: "post-index" },
        { type: "platform-index" },
        { type: "platform-child" },
      ],
      hidden: ({ parent }: { parent: { isExternal: boolean } }) =>
        parent?.isExternal,
    },
    {
      name: "href",
      title: "href",
      type: "url",
      hidden: ({ parent }: { parent: { isExternal: boolean } }) =>
        !parent?.isExternal,
      validation: (Rule: Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto", "tel"],
        }),
    },
    {
      name: "openInNewTab",
      type: "boolean",
      title: "Open in new tab",
      initialValue: false,
      hidden: ({ parent }: { parent: { isExternal: boolean } }) =>
        !parent?.isExternal,
    },
  ],
};

const highlightAnnotationField = {
  name: "highlight",
  type: "object",
  title: "Highlight",
  options: {
    modal: {
      type: "popover",
      width: "auto",
    },
  },
  icon: HighlightIcon,
  fields: [
    {
      name: "backgroundColor",
      title: "Change Background Color",
      type: "string",
      description: "Optional. Select the new background highlight color.",
      options: {
        list: colorOptions,
      },
    },
    {
      name: "textColor",
      title: "Change Text Color",
      type: "string",
      description: "Optional. Select the new text highlight color.",
      options: {
        list: colorOptions,
      },
    },
  ],
};

export const portableTextPlain = ({
  name = "content",
  title = "Portable Text",
  description = "Supplementary text using the Rich Text editor.",
  enableHighlight = false,
  enableLink = false,
  enableBold = false,
  enableItalic = false,
  enableBulletList = false,
  enableNumberList = false,
  enableTypeStyle = false,
  oneLine = false,
  validation = true,
  hidden = false,
}: PortableTextPlainProps) => {
  // Extract the validation logic before the return statement
  // Then for the validation logic:
  const getValidation = ():
    | ValidationBuilder<ArrayRule<unknown[]>, unknown[]>
    | undefined => {
    if (typeof validation === "function") {
      return validation;
    }

    if (validation === true) {
      return (Rule) => Rule.required();
    }

    return undefined;
  };

  return defineField({
    name,
    title,
    description,
    type: "array",
    of: [
      defineArrayMember({
        title: "Block",
        type: "block",
        options: {
          oneLine: oneLine,
        },
        styles: [...(enableTypeStyle ? typeStyleFields : [])],
        lists: [
          ...(enableBulletList ? [bulletListField] : []),
          ...(enableNumberList ? [numberListField] : []),
        ],
        marks: {
          decorators: [
            ...(enableBold ? [boldDecoratorField] : []),
            ...(enableItalic ? [italicDecoratorField] : []),
          ],
          annotations: [
            ...(enableLink ? [linkAnnotationField] : []),
            ...(enableHighlight ? [highlightAnnotationField] : []),
          ],
        },
      }),
    ],
    validation: getValidation(),
    hidden: hidden,
  });
};
