import type { DefaultDocumentNodeResolver } from "sanity/structure";
import { Iframe } from "sanity-plugin-iframe-pane";
import { RELATION_SCHEMA_TYPES } from "@/lib/consts";
import { SANITY_STUDIO_PREVIEW_URL } from "@/lib/env";

type PreviewDocumentType = { _type: string; slug: { current: string } };

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) => {
  const RELATION_SCHEMA = RELATION_SCHEMA_TYPES.find(
    (r) => r.schemaType === schemaType,
  );

  // Add preview panes for schemas defined in RELATION_SCHEMA_TYPES
  if (RELATION_SCHEMA) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .title("Preview")
        .options({
          url: {
            origin: SANITY_STUDIO_PREVIEW_URL,
            preview: ({ _type, slug }: PreviewDocumentType) => {
              let path = RELATION_SCHEMA.route;

              const isIndexPage =
                RELATION_SCHEMA?.schemaType.includes("index") &&
                !RELATION_SCHEMA?.route.endsWith("/");

              if (_type === "page") {
                if (slug?.current === "index") {
                  path = "/";
                } else if (slug?.current) {
                  path = `/${slug.current}`;
                } else {
                  path = "/";
                }
              } else if (!isIndexPage && slug?.current) {
                path = `${RELATION_SCHEMA.route}${slug.current}`;
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

  return S.document().views([S.view.form()]);
};
