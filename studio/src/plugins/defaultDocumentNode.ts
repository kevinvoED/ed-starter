import type { DefaultDocumentNodeResolver } from "sanity/structure";
import { Iframe } from "sanity-plugin-iframe-pane";

const SANITY_STUDIO_PREVIEW_URL =
	process.env.SANITY_STUDIO_PREVIEW_URL || "http://localhost:3000";

// Add to the list of document types that should have preview panes
const previewSchemaTypes = ["page", "post"];

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
	S,
	{ schemaType },
) => {
	if (previewSchemaTypes.includes(schemaType)) {
		return S.document().views([
			S.view.form(),
			S.view
				.component(Iframe)
				.title("Preview")
				.options({
					url: {
						origin: SANITY_STUDIO_PREVIEW_URL,
						preview: (doc: { _type: string; slug: { current: string } }) => {
							let path = "/";

							switch (doc._type) {
								case "page": {
									const slug = doc.slug?.current;
									path = slug === "index" ? "/" : slug ? `/${slug}` : "/";
									break;
								}
								case "post":
									path = doc.slug?.current
										? `/blog/${doc.slug.current}`
										: "/blog";
									break;
								case "post-index":
									path = "/blog";
									break;
								default:
									path = "/";
							}
							return `${path}?iframe=true`;
						},
						draftMode: "/api/draft-mode/enable",
					},
					defaultSize: "desktop",
					reload: {
						button: true,
					},
				}),
		]);
	}

	// Return default views for other document types
	return S.document().views([S.view.form()]);
};
