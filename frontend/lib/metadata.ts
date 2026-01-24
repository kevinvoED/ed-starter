import type { Metadata } from "next";
import type {
	BLOG_QUERYResult,
	BLOG_SLUG_QUERYResult,
	CASE_STUDIES_QUERYResult,
	CASE_STUDIES_SLUG_QUERYResult,
	EVENTS_QUERYResult,
	EVENTS_SLUG_QUERYResult,
	PAGE_QUERYResult,
	RESOURCE_QUERYResult,
	RESOURCE_SLUG_QUERYResult,
} from "@/sanity.types";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export function generatePageMetadata(
	page: NonNullable<
		| BLOG_QUERYResult
		| BLOG_SLUG_QUERYResult
		| PAGE_QUERYResult
		| CASE_STUDIES_QUERYResult
		| CASE_STUDIES_SLUG_QUERYResult
		| EVENTS_QUERYResult
		| EVENTS_SLUG_QUERYResult
		| RESOURCE_QUERYResult
		| RESOURCE_SLUG_QUERYResult
	>,
): Metadata {
	const additionalOpenGraphProperties: Record<
		string,
		Record<string, string>
	> = {};

	if (page._type === "event") {
		const event = page as NonNullable<EVENTS_SLUG_QUERYResult>;
		additionalOpenGraphProperties.event = {};
		additionalOpenGraphProperties.event.start_time = event.startDate;
		additionalOpenGraphProperties.event.end_time = event.endDate;
	}

	if (page._type === "post") {
		const post = page as NonNullable<BLOG_SLUG_QUERYResult>;
		additionalOpenGraphProperties.article = {};
		// Add article-specific Open Graph properties
		if (post.publishedDate) {
			additionalOpenGraphProperties.article.published_time = post.publishedDate;
		}

		if (post.author) {
			additionalOpenGraphProperties.article.author = post.author.name;
		}

		const tags = Array.from(post.topics || []).concat(post.categories || []);
		if (tags.length > 0) {
			additionalOpenGraphProperties.article.tag = tags
				.map((c) => c.title)
				.filter(Boolean)
				.join(",");
		}

		if (post.estimatedReadingTime) {
			// Add estimatedReadingTime as a custom Open Graph property.
			// Note: This is not a standard 'article:' property, but will be rendered as <meta property="og:estimatedReadingTime" content="...">
			additionalOpenGraphProperties.article.estimatedReadingTime = String(
				post.estimatedReadingTime,
			);
		}
	}

	const indexRules = page?.meta?.noindex ? "noindex" : "index, follow";

	return {
		title: String(page?.meta?.title),
		description: page?.meta?.description,
		openGraph: {
			siteName: "Engine Digital",
			countryName: "Canada",
			url: `${process.env.NEXT_PUBLIC_SITE_URL}${page?.meta?.relativeUrl}`,
			images: page?.meta?.image
				? [
						{
							url: page?.meta?.image,
							// dimensions are set/forced in the meta query
							width: 1200,
							height: 630,
						},
					]
				: undefined,
			locale: "en_US",
			...additionalOpenGraphProperties,
		},
		// ignore indexing rules when not in production (aka, don’t track staging pages)
		robots: isProduction ? indexRules : "noindex, nofollow",
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${page?.meta?.relativeUrl}`,
		},
	};
}
