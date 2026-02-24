"use client";

import { useEffect } from "react";

/*
 * Next.js - Regular Error Boundary
 *
 * @TODO: style this Error Boundary
 * @DOCS: https://nextjs.org/docs/app/getting-started/error-handling#nested-error-boundaries
 */

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error); // Log the error to an error reporting service
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
