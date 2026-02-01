import type { JSONLDScriptProps } from "@/components/layout/JsonLD/Jsonld";
import type { ORGANIZATION_QUERY_RESULT } from "@/sanity.types";
import type { ViewableTypes } from "../utils/url-mapper";
import { generatePageMetadata } from "./metadata";
import { get } from "es-toolkit/compat";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

// type ListAccordionProps = ModuleProps<"list-accordion">;

const typeMap = {
  page: "WebPage",
  "platform-index": "WebPage",
  "platform-child": "WebPage",
  "blog-index": "WebPage",
  "blog-post": "Article",
  "case-studies-index": "WebPage",
  "case-study": "Article",
} as Record<ViewableTypes, "WebPage" | "Article" | "Event">;

// const getAdditionalData = (
//   type: ViewableTypes,
//   document: JSONLDScriptProps["document"],
// ) => {
//   const results: Record<string, unknown> = {};

//   if (type === "event") {
//     const doc = document as NonNullable<EVENTS_SLUG_QUERY_RESULT>;
//     results.url = doc.eventLink?.href || `${SITE_URL}${doc.meta?.relativeUrl}`;
//     results.eventStatus = "https://schema.org/EventScheduled";
//     results.eventAttendanceMode =
//       doc?.type === "webinar"
//         ? "https://schema.org/OnlineEventAttendanceMode"
//         : "https://schema.org/OfflineEventAttendanceMode";
//     results.location = {
//       "@type": doc.type === "webinar" ? "VirtualLocation" : "Place",
//       name: doc.location,
//       /** @todo bring back map link? */
//       // map: get(doc, "location.googleMapsLink"),
//       // address: {
//       //   "@type": "PostalAddress",
//       //   streetAddress: get(doc, "location.address"),
//       //   addressLocality: get(doc, "location.city"),
//       //   addressRegion: get(doc, "location.state"),
//       //   postalCode: get(doc, "location.zip"),
//       //   addressCountry: "US",
//       // },
//     };
//     results.startDate = doc.startDate;
//     results.endDate = doc.endDate;
//   }

//   return results;
// };

/** @see https://json-ld.org/playground/ */
/** @see https://search.google.com/test/rich-results */
export default function generateJsonldMetadata(
  document: JSONLDScriptProps["document"],
) {
  const type = (document._type || "page") as keyof typeof typeMap;
  const ldType = get(typeMap, type);

  if (!ldType) {
    console.error("JSONLD error:", JSON.stringify(document));

    return {};
  }

  const metadata = generatePageMetadata(document);

  return {
    "@context": "https://schema.org",
    "@type": ldType,
    name: metadata.title,
    identifier: get(document, "_id", get(document, "_key")),
    description: metadata.description || document.meta?.description,
    image: Array.isArray(metadata.openGraph?.images)
      ? {
          "@type": "ImageObject",
          url: get(metadata, "openGraph.images[0].url"),
          width: get(metadata, "openGraph.images[0].width"),
          height: get(metadata, "openGraph.images[0].height"),
        }
      : null,
  };
}

export function generateOrganizationSchema(
  organization: ORGANIZATION_QUERY_RESULT,
) {
  if (!organization) return null;
  if (!organization.organization) return null;
  const organizationData = organization.organization;

  if (!organizationData.name || !SITE_URL) return null;

  const socialMediaUrls =
    organizationData.socialMediaUrls
      ?.map((social) => social?.url)
      .filter(Boolean) || [];

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organizationData.name,
    url: SITE_URL,
    logo: organizationData.logo?.asset
      ? {
          "@type": "ImageObject",
          url: organizationData.logo?.asset?.url,
        }
      : null,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": SITE_URL,
    },
  };

  if (organizationData.description?.trim()) {
    schema.description = organizationData.description;
  }

  if (organizationData.foundingDate) {
    schema.foundingDate = organizationData.foundingDate;
  }

  if (
    organizationData.contactPhone?.trim() ||
    organizationData.contactEmail?.trim()
  ) {
    schema.contactPoint = {
      "@type": "ContactPoint",
      contactType: "customer service",
    };

    if (organizationData.contactPhone?.trim()) {
      (schema.contactPoint as Record<string, unknown>).telephone =
        organizationData.contactPhone;
    }

    if (organizationData.contactEmail?.trim()) {
      (schema.contactPoint as Record<string, unknown>).email =
        organizationData.contactEmail;
    }
  }

  if (organizationData.headquarters?.trim()) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: organizationData.headquarters,
    };
  }

  if (socialMediaUrls.length > 0) {
    schema.sameAs = socialMediaUrls;
  }

  return schema;
}

// export function generateFaqSchema(items: ListAccordionProps["items"]) {
//   if (!items || items.length === 0) return null;

//   const mainEntity = items
//     .filter((item) => item.title) // Only include items with titles
//     .map((item) => ({
//       "@type": "Question",
//       name: toPlainText(item.title || []),
//       acceptedAnswer: {
//         "@type": "Answer",
//         text: toPlainText(item.description || []),
//       },
//     }));

//   if (mainEntity.length === 0) return null;

//   return {
//     "@context": "https://schema.org",
//     "@type": "FAQPage",
//     mainEntity,
//   };
// }
