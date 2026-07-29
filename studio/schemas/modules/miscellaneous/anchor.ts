import { LinkIcon } from "@sanity/icons/Link";
import { defineType } from "sanity";
import { ModulePreview } from "@/components/module-preview";
import { anchorText } from "@/schemas/common";

export default defineType({
  name: "anchor",
  title: "Anchor",
  type: "object",
  icon: LinkIcon,
  fields: [anchorText],
  components: { preview: ModulePreview },
  preview: {
    select: {
      title: "anchorText.current",
    },
    prepare({ title }) {
      return {
        title: title || "Untitled Anchor",
        subtitle: "Anchor",
        media: LinkIcon,
      };
    },
  },
});
