/*
 * Dynamically generating a llms-full.txt file (full content dump for LLM consumption)
 * @see: https://llmstxt.org/
 * @see: https://www.pixelmojo.io/blogs/llms-txt-static-vs-dynamic-implementation-guide
 */

import { VIEWABLE_TYPES } from "@/lib/utils/url-mapper";
import { getDynamicFetchOptions, sanityFetchMetadata } from "@/sanity/lib/live";
import {
  LLMS_FULL_QUERY,
  ORGANIZATION_LLMS_QUERY,
} from "@/sanity/queries/queries";

type EntryItem = {
  title: string;
  url: string;
  _type: string;
  description: string | null;
  publishedDate: string | null;
  content: string | null;
};

/* Formats a single document as a titled block with metadata and full content */
function formatDocument(doc: EntryItem): string[] {
  const lines: string[] = [`# ${doc.title}`, ""];

  lines.push(`URL: ${doc.url}`);

  if (doc.publishedDate) {
    lines.push(`Published: ${doc.publishedDate.slice(0, 10)}`);
  }

  if (doc.description) {
    lines.push("", doc.description);
  }

  if (doc.content) {
    lines.push("", doc.content);
  }

  lines.push("", "---", "");

  return lines;
}

export async function GET() {
  const { perspective } = await getDynamicFetchOptions();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const [{ data }, { data: org }] = await Promise.all([
    sanityFetchMetadata({
      query: LLMS_FULL_QUERY,
      params: { baseUrl, viewableTypes: Array.from(VIEWABLE_TYPES) },
      perspective,
    }),
    sanityFetchMetadata({
      query: ORGANIZATION_LLMS_QUERY,
      perspective,
    }),
  ]);

  const siteName = org?.organization?.name ?? "ED Starter";
  const siteDescription =
    org?.organization?.description ?? "ED Starter description";
  const documents = (data ?? []) as EntryItem[];

  const lines = [
    `# ${siteName}`,
    "",
    `> ${siteDescription}`,
    "",
    `Source: ${baseUrl}`,
    "",
    "---",
    "",
    ...documents.flatMap(formatDocument),
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
