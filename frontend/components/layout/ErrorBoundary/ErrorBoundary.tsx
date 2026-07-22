/**
 * Per-module error boundary using Next.js unstable_catchError.
 * Isolates render failures in the page builder so a single broken module
 * displays a fallback UI without crashing the entire page.
 */
"use client";

import type { ModuleBlock } from "@/components/modules/ModuleBuilder";
import { RefreshCwIcon } from "lucide-react";
import { useEffect } from "react";
import { type ErrorInfo, unstable_catchError } from "next/error";
import { Button } from "@/components/primitives/Button/Button";
import { pascalCase } from "es-toolkit/string";

/** Props passed by consumers wrapping module content. */
type ErrorBoundaryUserProps = {
  module?: ModuleBlock;
};

type ErrorFallbackContentProps = ErrorBoundaryUserProps &
  Pick<ErrorInfo, "error" | "unstable_retry">;

/** Renders the visible fallback UI and logs the error for debugging. */
function ErrorFallbackContent({
  module,
  error,
  unstable_retry,
}: ErrorFallbackContentProps) {
  useEffect(() => {
    console.error({ module, error });
  }, [module, error]);

  const moduleType = module?._type ? pascalCase(module._type) : "unknown";
  return (
    <div className="f-py-4/8 f-gap-y-2/4 grid place-items-center bg-debug-red text-center text-white">
      <h2 className="font-bold text-2xl">
        Something went wrong {module && ` in "${moduleType}"`}
      </h2>

      <p className="font-medium">
        {!module &&
          `The module was "undefined". Maybe it was not added to the module component map or is missing in the query? `}
        {error instanceof Error ? error.message : "An unknown error occurred"}
      </p>

      <Button variant="errorBoundary" onClick={unstable_retry}>
        <RefreshCwIcon />
        Try again
      </Button>
    </div>
  );
}

/**
 * Fallback render function for unstable_catchError.
 * Receives user props as the first argument and error context as the second.
 */
function ErrorFallback(
  { module }: ErrorBoundaryUserProps,
  { error, unstable_retry }: ErrorInfo,
) {
  return (
    <ErrorFallbackContent
      module={module}
      error={error}
      unstable_retry={unstable_retry}
    />
  );
}

/** HOC that wraps children and renders ErrorFallback when a child throws. */
export const ErrorBoundary = unstable_catchError(ErrorFallback);
