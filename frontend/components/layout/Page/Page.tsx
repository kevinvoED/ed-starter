import type {
  GET_CONTENT_TYPE_INDEX_QUERY_RESULT,
  GET_CONTENT_TYPE_SLUG_QUERY_RESULT,
  PAGE_QUERY_RESULT,
} from "@/sanity.types";
import { JSONLDScript } from "@/components/layout/JsonLD/Jsonld";
import {
  type ModuleBlock,
  ModuleBuilder,
} from "@/components/modules/ModuleBuilder";
import { cn } from "cnfast";

type PageProps = {
  page:
    | PAGE_QUERY_RESULT
    | GET_CONTENT_TYPE_INDEX_QUERY_RESULT
    | GET_CONTENT_TYPE_SLUG_QUERY_RESULT;
  disableJsonLd?: boolean;
  disableModules?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export const Page = ({
  page,
  disableJsonLd,
  disableModules,
  className,
  children,
}: PageProps) => {
  return (
    <div className={cn("", className)}>
      {page && !disableJsonLd && <JSONLDScript document={page} />}
      {children && children}
      {page?.modules && !disableModules && (
        <ModuleBuilder
          modules={page.modules.filter((m): m is ModuleBlock => "_type" in m)}
        />
      )}
    </div>
  );
};
