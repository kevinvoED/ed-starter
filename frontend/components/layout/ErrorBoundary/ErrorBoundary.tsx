"use client";

import type { ErrorInfo } from "react";
import type { ErrorBoundaryProps, FallbackProps } from "react-error-boundary";
import type { PAGE_QUERY_RESULT } from "@/sanity.types";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/primitives/Button/Button";

const logError = (error: unknown, info: ErrorInfo) => {
  console.error({ error, info });
};

type BlocksType = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>;

const getErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : "An unknown error occurred";
};

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="bg-[#993333] p-2 text-white">
      <h2 className="mb-2 font-bold text-xl">Something went wrong</h2>
      <p className="mb-4">{getErrorMessage(error)}</p>
      <Button variant="primary-white-large" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
};

const BlocksErrorFallback = ({
  block,
  error,
  resetErrorBoundary,
}: FallbackProps & { block?: BlocksType[number] }) => {
  return (
    <div className="bg-[#993333] p-2 text-white">
      <h2 className="mb-2 font-bold text-xl">
        Something went wrong{block ? ` in "${block._type}":` : ":"}
      </h2>
      <p className="mb-4">
        {block
          ? null
          : `The block was "undefined". Maybe it was not added to the block component map or is missing in the query? `}
        {getErrorMessage(error)}
      </p>
      <Button variant="primary-white-small" onClick={resetErrorBoundary}>
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

const logBlocksError =
  (block?: BlocksType[number]) => (error: unknown, info: ErrorInfo) => {
    console.error({ block, error, info });
  };

export const MyBlocksRendererErrorBoundary: React.FC<
  React.PropsWithChildren<
    Omit<
      ErrorBoundaryProps,
      "FallbackComponent" | "onError" | "fallback" | "fallbackRender"
    > & { block?: BlocksType[number] }
  >
> = ({ block, children, ...rest }) => {
  return (
    <ErrorBoundary
      FallbackComponent={undefined}
      fallbackRender={(props) => BlocksErrorFallback({ block, ...props })}
      onError={logBlocksError(block)}
      {...rest}
    >
      {children}
    </ErrorBoundary>
  );
};

export default MyErrorBoundary;
