import type { ModuleProps } from "@/sanity/lib/fetch";

export const Anchor = ({ anchorText }: ModuleProps<"anchor">) => {
  return (
    <div className="relative">
      <div className="absolute -top-25 left-0" id={anchorText?.current || ""} />
    </div>
  );
};
