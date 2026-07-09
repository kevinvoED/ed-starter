import type { DefaultDocumentNodeResolver } from "sanity/structure";
import { Iframe } from "sanity-plugin-iframe-pane";
import { RELATION_SCHEMA_TYPES } from "@/lib/consts";
import {
  SANITY_STUDIO_API_VERSION,
  SANITY_STUDIO_PREVIEW_URL,
} from "@/lib/env";

type PreviewDocumentType = {
  _type: string;
  slug: { current: string };
  parentPage?: { _ref: string };
};

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType, getClient },
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
            preview: async ({
              _type,
              slug,
              parentPage,
            }: PreviewDocumentType) => {
              let path = RELATION_SCHEMA.route;

              const isIndexPage =
                RELATION_SCHEMA?.schemaType.includes("index") &&
                !RELATION_SCHEMA?.route.endsWith("/");

              if (_type === "page") {
                if (slug?.current === "index") {
                  path = "/";
                } else if (slug?.current) {
                  let parentSlug: string | undefined;

                  if (parentPage?._ref) {
                    const client = getClient({
                      apiVersion: SANITY_STUDIO_API_VERSION,
                    });
                    parentSlug = await client.fetch(
                      "*[_id == $id][0].slug.current",
                      { id: parentPage._ref },
                    );
                  }

                  path = parentSlug
                    ? `/${parentSlug}/${slug.current}`
                    : `/${slug.current}`;
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
