"use client";

import type { ModuleBlock } from "@/components/modules/ModuleBuilder";
import { RefreshCwIcon } from "lucide-react";
import { useEffect } from "react";
import { type ErrorInfo, unstable_catchError } from "next/error";
import { Button } from "@/components/primitives/Button/Button";
import { pascalCase } from "es-toolkit/string";

type ErrorFallbackProps = {
  module?: ModuleBlock;
  error: ErrorInfo["error"];
  unstable_retry: ErrorInfo["unstable_retry"];
};

function ErrorFallback({ module, error, unstable_retry }: ErrorFallbackProps) {
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

export const ErrorBoundary = unstable_catchError(ErrorFallback);
