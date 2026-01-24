import { DocumentIcon } from "@sanity/icons";
import { createPageType } from "@/schemas/pageBuilder";

export default createPageType({
  name: "platform-child",
  title: "Platform Page",
  icon: DocumentIcon,
});
