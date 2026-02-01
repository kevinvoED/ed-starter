import { File } from "lucide-react";
import { createPageType } from "@/schemas/pages/pageBuilder";

/*
 * This is a parent-specific page type that is used to display the landing page.
 * If your route does not need a parent-level schema page but does need child pages, then do not create a parent-level page.
 * This is paired with the following page.tsx file:
 * Platform Landing Page - /frontend/app/(main)/platform/page.tsx
 */

export default createPageType({
  name: "platform-index",
  title: "Platform Landing Page",
  icon: File,
});
