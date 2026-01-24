import type { BlockProps } from "@/sanity/lib/fetch";
import { PortableText } from "./PortableText";

type PortableTextHighlightModuleProps =
  BlockProps<"portable-text-content-highlight">;

export const PortableTextHighlightModule = ({
  content,
}: PortableTextHighlightModuleProps) => <PortableText value={content || []} />;
