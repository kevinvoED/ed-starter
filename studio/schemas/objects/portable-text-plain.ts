import {
  type ArrayRule,
  defineArrayMember,
  defineField,
  type ValidationBuilder,
} from "sanity";
import {
  ptAnnotationHighlightFields,
  ptAnnotationLinkFields,
  ptDecoratorFields,
  ptListFields,
  ptStyleHeadingFields,
} from "@/schemas/sharedFields";

/*
 * PortableTextPlain (Rich Text Editor)
 * @docs: https://www.sanity.io/docs/studio/portable-text-editor-configuration
 *
 * There are two different PortableText types used: PortableText and PortableTextPlain.
 * When using this in a custom schema, make sure to use one from 'sharedFields.ts' instead.
 * @see: @/schemas/objects/portable-text.ts
 *
 * PortableTextPlain does NOT have the entire toolbox of features and sub-modules built in.
 * This is primarily used to replace traditional text and string fields with a customizable RichText editor.
 * By default, the 'name' field is set to 'content', although you should override it in your custom schema.
 * All fields can be overwritten with your own custom values if needed and are all false by default.
 *
 *
 * EXAMPLE USAGE:
 *
 * import { portableTextPlain } from "@/schemas/objects/portable-text-plain";
 *
 * defineField(
 *   portableTextPlain({
 *     name: "title",
 *     title: "Title",
 *     description: "Main title for this section or module.",
 *     enableLink: true,
 *   })
 * )
 *
 * Alternatively, there are pre-defined common usages of PortableTextPlain in 'sharedFields.ts'
 *
 *  EXAMPLE USAGE:
 *
 * import { titleHighlight } from "@/schemas/sharedFields";
 *
 * defineField({
 *   ...titleHighlight,
 * })
 */

interface PortableTextPlainProps {
  name?: string;
  title?: string;
  description?: string;
  oneLine?: boolean;
  enableHighlight?: boolean;
  enableLink?: boolean;
  enableDecorator?: boolean;
  enableList?: boolean;
  enableTypeStyle?: boolean;
  validation?: boolean | ValidationBuilder<ArrayRule<unknown[]>, unknown[]>;
  hidden?: boolean | ((props: { parent: Record<string, unknown> }) => boolean);
}

export const portableTextPlain = ({
  name = "content",
  title = "Portable Text",
  description = "Supplementary text using the Rich Text editor.",
  enableHighlight = false,
  enableLink = false,
  enableDecorator = false,
  enableList = false,
  enableTypeStyle = false,
  oneLine = false,
  validation = true,
  hidden = false,
}: PortableTextPlainProps) => {
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
        styles: [...(enableTypeStyle ? ptStyleHeadingFields : [])],
        lists: [...(enableList ? ptListFields : [])],
        marks: {
          decorators: [...(enableDecorator ? ptDecoratorFields : [])],
          annotations: [
            ...(enableLink ? ptAnnotationLinkFields : []),
            ...(enableHighlight ? ptAnnotationHighlightFields : []),
          ],
        },
      }),
    ],
    validation: getValidation(),
    hidden: hidden,
  });
};
