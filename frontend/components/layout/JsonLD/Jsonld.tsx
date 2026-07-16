import type {
  GET_CONTENT_TYPE_INDEX_QUERY_RESULT,
  GET_CONTENT_TYPE_SLUG_QUERY_RESULT,
  ORGANIZATION_QUERY_RESULT,
  PAGE_QUERY_RESULT,
} from "@/sanity.types";
import generateJsonldMetadata, {
  generateOrganizationSchema,
} from "@/lib/site/generate-jsonld-metadata";

export type JSONLDScriptProps = {
  document: NonNullable<
    | PAGE_QUERY_RESULT
    | GET_CONTENT_TYPE_SLUG_QUERY_RESULT
    | GET_CONTENT_TYPE_INDEX_QUERY_RESULT
  >;
};

// type ListAccordionProps = ModuleProps<"list-accordion">;

export const JSONLDScript = ({
  document,
  ...rest
}: JSONLDScriptProps & React.HTMLAttributes<HTMLScriptElement>) => {
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

export const OrganizationJSONLDScript = ({
  organization,
  ...rest
}: {
  organization: ORGANIZATION_QUERY_RESULT;
} & React.HTMLAttributes<HTMLScriptElement>) => {
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

// export const FaqJSONLDScript = ({ items, ...rest }: { items: ListAccordionProps["items"] } & React.HTMLAttributes<HTMLScriptElement>) => {
//   {
//   const jsonLd = generateFaqSchema(items);
//   if (!jsonLd) return null;
//   return (
//     <script
//     type="application/ld+json"
//     dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//     {...rest}
//   />
// );
