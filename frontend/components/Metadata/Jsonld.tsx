import type {
  BLOG_QUERYResult,
  BLOG_SLUG_QUERYResult,
  CASE_STUDIES_QUERYResult,
  CASE_STUDIES_SLUG_QUERYResult,
  EVENTS_QUERYResult,
  EVENTS_SLUG_QUERYResult,
  ORGANIZATION_QUERYResult,
  PAGE_QUERYResult,
  RESOURCE_QUERYResult,
  RESOURCE_SLUG_QUERYResult,
} from "@/sanity.types";
import generateJsonldMetadata, {
  generateOrganizationSchema,
} from "@/lib/generate-jsonld-metadata";

export type JSONLDScriptProps = {
  document: NonNullable<
    | PAGE_QUERYResult
    | BLOG_QUERYResult
    | BLOG_SLUG_QUERYResult
    | CASE_STUDIES_QUERYResult
    | CASE_STUDIES_SLUG_QUERYResult
    | EVENTS_QUERYResult
    | EVENTS_SLUG_QUERYResult
    | RESOURCE_QUERYResult
    | RESOURCE_SLUG_QUERYResult
  >;
};

// type ListAccordionProps = BlockProps<"list-accordion">;

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
    organization: ORGANIZATION_QUERYResult;
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
