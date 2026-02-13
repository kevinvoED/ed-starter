import type { DocumentActionComponent, Slug } from "sanity";
import { LinkIcon } from "@sanity/icons";
import { useToast } from "@sanity/ui";
import { linkMapper } from "../../frontend/lib/utils/url-mapper";

/**
 * Custom action to open the document's URL in a new browser tab.
 * This action assumes the document has a 'url' field of type slug
 * and that you have configured the FRONTEND_BASE_URL.
 */
export const OpenDocumentUrlAction: DocumentActionComponent = (props) => {
  const { published } = props;
  const toast = useToast();

  const onHandle = async () => {
    if (!published || !published.slug || !(published.slug as Slug).current) {
      toast.push({
        status: "error",
        title: "Cannot open URL",
        description: "Document is not published or has no URL defined.",
      });
      return;
    }

    const siteOrigin = process.env.SANITY_STUDIO_PREVIEW_URL;

    if (!siteOrigin) {
      toast.push({
        status: "error",
        title: "Configuration Error",
        description:
          "The SANITY_STUDIO_PREVIEW_URL is not set in the environment variables.",
      });
      return;
    }

    try {
      // Ensure there's no double slash if BASE_URL already ends with one
      const baseUrl = siteOrigin.endsWith("/")
        ? siteOrigin.slice(0, -1)
        : siteOrigin;
      const fullUrl = `${baseUrl}${linkMapper(published._type, published.slug as Slug)}`;

      window.open(fullUrl, "_blank");

      toast.push({
        status: "success",
        title: "Opening document URL",
        description: `Opened: ${fullUrl}`,
      });
    } catch (error) {
      toast.push({
        status: "error",
        title: "Failed to open URL",
        description: (error as Record<string, string>).message,
      });
    }
  };

  // Disable if not published or if URL is missing
  const isDisabled =
    !published || !published.slug || !(published.slug as Slug).current;

  return {
    label: "View On Website",
    onHandle,
    icon: LinkIcon, // Using the Link icon from phosphor-react
    disabled: isDisabled,
  };
};
