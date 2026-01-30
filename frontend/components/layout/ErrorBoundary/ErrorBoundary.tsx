"use client";

import type { ErrorInfo } from "react";
import type { ErrorBoundaryProps, FallbackProps } from "react-error-boundary";
import type { PAGE_QUERY_RESULT } from "@/sanity.types";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/primitives/Button/Button";

const logError = (error: unknown, info: ErrorInfo) => {
  console.error({ error, info });
};

type ModulesType = NonNullable<NonNullable<PAGE_QUERY_RESULT>["modules"]>;

const getErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : "An unknown error occurred";
};

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="bg-[#993333] p-2 text-white">
      <h2 className="mb-2 font-bold text-xl">Something went wrong</h2>
      <p className="mb-4">{getErrorMessage(error)}</p>
      <Button variant="ghost" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
};

const ModulesErrorFallback = ({
  module,
  error,
  resetErrorBoundary,
}: FallbackProps & { module?: ModulesType[number] }) => {
  return (
    <div className="bg-[#993333] p-2 text-white">
      <h2 className="mb-2 font-bold text-xl">
        Something went wrong{module ? ` in "${module._type}":` : ":"}
      </h2>
      <p className="mb-4">
        {module
          ? null
          : `The module was "undefined". Maybe it was not added to the module component map or is missing in the query? `}
        {getErrorMessage(error)}
      </p>
      <Button variant="ghost" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
};

export const MyErrorBoundary: React.FC<
  React.PropsWithChildren<
    Omit<
      ErrorBoundaryProps,
      "FallbackComponent" | "onError" | "fallback" | "fallbackRender"
    >
  >
> = ({ children, ...rest }) => {
  return (
    <ErrorBoundary
      FallbackComponent={undefined}
      fallbackRender={ErrorFallback}
      onError={logError}
      {...rest}
    >
      {children}
    </ErrorBoundary>
  );
};

const logModulesError =
  (module?: ModulesType[number]) => (error: unknown, info: ErrorInfo) => {
    console.error({ module, error, info });
  };

export const MyModulesRendererErrorBoundary: React.FC<
  React.PropsWithChildren<
    Omit<
      ErrorBoundaryProps,
      "FallbackComponent" | "onError" | "fallback" | "fallbackRender"
    > & { module?: ModulesType[number] }
  >
> = ({ module, children, ...rest }) => {
  return (
    <ErrorBoundary
      FallbackComponent={undefined}
      fallbackRender={(props) => ModulesErrorFallback({ module, ...props })}
      onError={logModulesError(module)}
      {...rest}
    >
      {children}
    </ErrorBoundary>
  );
};

export default MyErrorBoundary;
