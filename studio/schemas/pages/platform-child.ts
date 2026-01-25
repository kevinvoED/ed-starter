import { DocumentIcon } from "@sanity/icons";
import { createPageType } from "@/schemas/pages/pageBuilder";

export default createPageType({
  name: "platform-child",
  title: "Platform Page",
  icon: DocumentIcon,
});
