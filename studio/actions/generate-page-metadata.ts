import type { SanityImageObject } from "@sanity/image-url";
import type { DocumentActionComponent, PortableTextBlock } from "sanity";
import { toPlainText } from "@portabletext/react";
import { TextIcon } from "@sanity/icons/Text";
import { useToast } from "@sanity/ui";
import { useDocumentOperation } from "sanity";
import { HERO_DOCUMENT_TYPES } from "@/lib/consts";
import { SANITY_STUDIO_AI_PROVIDER_API_KEY } from "@/lib/env";
import { GoogleGenAI } from "@google/genai";

type DocumentModuleType = {
  _type: string;
  content?: PortableTextBlock[];
  description?: PortableTextBlock[];
  image?: SanityImageObject;
};

type PageDocumentType = {
  _id: string;
  _type: string;
  title?: string;
  modules?: DocumentModuleType[];
  meta?: {
    title?: string;
    description?: string;
    image?: SanityImageObject;
  };
};

/*
 * Custom action to automatically generate the page's SEO metadata.
 * Metadata's title is generated from the document's title.
 * Metadata's description is generated from the first instance of a Hero-related module's PortableText content and then summarized using an AI Provider.
 * Metadata's image is generated from the first instance of a Hero-related module's image.
 * This action assumes the document is published and configured the AI_PROVIDER_API_KEY env.
 */
export const GeneratePageMetadataAction: DocumentActionComponent = (props) => {
  const toast = useToast();
  const { patch, publish } = useDocumentOperation(props.id, props.type);
  const { published: document } = props as {
    published: PageDocumentType | null;
  } & typeof props;

  const formatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  });

  const ai = new GoogleGenAI({ apiKey: SANITY_STUDIO_AI_PROVIDER_API_KEY });

  const onHandle = async () => {
    if (!document) {
      toast.push({
        status: "error",
        title: "Cannot generate page metadata",
        description: "Document is not published or does not exist.",
      });
      return;
    }

    if (!SANITY_STUDIO_AI_PROVIDER_API_KEY) {
      toast.push({
        status: "error",
        title: "Configuration Error",
        description:
          "The SANITY_STUDIO_AI_PROVIDER_API_KEY is not set in the environment variables.",
      });
      return;
    }

    try {
      // Get page's module list
      const DOC_MODULES = document?.modules as DocumentModuleType[];

      // Get first instance of a Hero-related module
      const heroModule = DOC_MODULES?.find((module) =>
        HERO_DOCUMENT_TYPES.has(module._type),
      );

      const heroContent = heroModule?.content ?? heroModule?.description;
      const heroImage = heroModule?.image;

      // Determine if any changes were made
      const changes = [];

      // Update the page's SEO meta title to the document's title
      if (!document?.meta?.title) {
        patch.execute([{ set: { "meta.title": document.title } }]);
        changes.push("title");
      }
      // Update the page's SEO meta image to the Hero's image
      if (heroModule && heroImage && !document?.meta?.image) {
        patch.execute([{ set: { "meta.image": heroImage } }]);
        changes.push("image");
      }

      // Update the page's SEO meta description to the Hero's PortableText content
      if (heroModule && heroContent && !document?.meta?.description) {
        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: `Generate a SEO metadata description for the following page: ${document.title} based on the following content: ${toPlainText(heroContent)}. It should be concise and max 4 sentences. Avoid including content that is not relevant to the page or the content found inside ${toPlainText(heroContent)}.`,
        });

        patch.execute([{ set: { "meta.description": response.text } }]);
        changes.push("description");
      }

      // Publish the document
      if (changes.length > 0) {
        publish.execute();
      }

      toast.push({
        status: changes.length > 0 ? "success" : "warning",
        title:
          changes.length > 0
            ? "Successfully updated page metadata"
            : "No changes were made.",
        description:
          changes.length > 0
            ? `The SEO ${formatter.format(changes)} ${changes.length > 1 ? "have" : "has"} been updated and the document was published.`
            : "All SEO metadata fields were already pre-filled so no changes were made.",
      });
    } catch (error) {
      toast.push({
        status: "error",
        title: "Failed to update page metadata",
        description: (error as Record<string, string>).message,
      });
    }
  };

  return {
    label: "Generate page metadata",
    icon: TextIcon,
    disabled: !document,
    onHandle,
  };
};
