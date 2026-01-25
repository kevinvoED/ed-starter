import type {
  BLOG_QUERY_RESULT,
  BLOG_SLUG_QUERY_RESULT,
  ORGANIZATION_QUERY_RESULT,
  PAGE_QUERY_RESULT,
} from "@/sanity.types";
import generateJsonldMetadata, {
  generateOrganizationSchema,
} from "@/lib/generate-jsonld-metadata";

export type JSONLDScriptProps = {
  document: NonNullable<
    PAGE_QUERY_RESULT | BLOG_QUERY_RESULT | BLOG_SLUG_QUERY_RESULT
  >;
};

// type ListAccordionProps = ModuleProps<"list-accordion">;

export const JSONLDScript: React.FC<
  JSONLDScriptProps & React.HTMLAttributes<HTMLScriptElement>
> = ({ document, ...rest }) => {
  const jsonLd = generateJsonldMetadata(
    document as Parameters<typeof generateJsonldMetadata>[0],
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      {...rest}
    />
  );
};

export default JSONLDScript;

export const OrganizationJSONLDScript: React.FC<
  {
    organization: ORGANIZATION_QUERY_RESULT;
  } & React.HTMLAttributes<HTMLScriptElement>
> = ({ organization, ...rest }) => {
  const jsonLd = generateOrganizationSchema(organization);

  if (!jsonLd) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      {...rest}
    />
  );
};

// export const FaqJSONLDScript: React.FC<
//   {
//     items: ListAccordionProps["items"];
//   } & React.HTMLAttributes<HTMLScriptElement>
// > = ({ items, ...rest }) => {
//   const jsonLd = generateFaqSchema(items);

//   if (!jsonLd) return null;

//   return (
//     <script
//       type="application/ld+json"
//       dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       {...rest}
//     />
//   );
// };
