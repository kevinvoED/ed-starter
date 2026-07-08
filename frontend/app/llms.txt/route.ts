/*
 * Dynamically generating a llms.txt file
 * @see: https://llmstxt.org/
 * @see: https://www.pixelmojo.io/blogs/llms-txt-static-vs-dynamic-implementation-guide
 */

import { getDynamicFetchOptions, sanityFetchMetadata } from "@/sanity/lib/live";
import { LLMS_QUERY, ORGANIZATION_LLMS_QUERY } from "@/sanity/queries/queries";
import { VIEWABLE_TYPES } from "@/lib/utils/url-mapper";

type EntryItem = {
  title: string;
  url: string;
  description: string | null;
};

function formatEntry(entry: EntryItem, indentAmount = 0) {
  const prefix = `${"  ".repeat(indentAmount)}- `;
  const desc = entry.description ? `: ${entry.description}` : "";
  return `${prefix}[${entry.title}](${entry.url})${desc}`;
}

function formatSection(
  pageTitle: string,
  indexPage: EntryItem | null | undefined,
  childPages: EntryItem[] | null | undefined,
) {
  if (!indexPage) return [];

  return [
    `## ${pageTitle}`,
    "",
    formatEntry(indexPage),
    ...(childPages ?? []).map((c) => formatEntry(c, 1)),
    "",
  ];
}

export async function GET() {
  const { perspective } = await getDynamicFetchOptions();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const [{ data }, { data: org }] = await Promise.all([
    sanityFetchMetadata({
      query: LLMS_QUERY,
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
  const pages = (data?.pages ?? []) as EntryItem[];
  const homepage = pages.find(
    (p) => p.url === baseUrl || p.url === `${baseUrl}/`,
  );
  const otherPages = pages.filter((p) => p !== homepage);

  const lines = [
    `# ${siteName}`,
    "",
    `[${siteName}](${baseUrl}): ${siteDescription}`,
    "",
    ...(homepage ? [formatEntry(homepage), ""] : []),
    ...(otherPages.length > 0
      ? ["## Pages", "", ...otherPages.map((p) => formatEntry(p)), ""]
      : []),
    ...formatSection(
      "Platform",
      data?.platform?.index,
      data?.platform?.children,
    ),
    ...formatSection("Blog", data?.blog?.index, data?.blog?.posts),
    ...formatSection(
      "Case Studies",
      data?.caseStudies?.index,
      data?.caseStudies?.posts,
    ),
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
