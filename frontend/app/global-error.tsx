"use client";

import { useEffect } from "react";

/*
 * Next.js - Global Error Boundary
 *
 * @TODO: style this Error Boundary
 * @DOCS: https://nextjs.org/docs/app/getting-started/error-handling#global-errors
 */

export default function GlobalError({
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
    <html lang="en">
      <body>
        <h2>Something went wrong!</h2>
        <button type="button" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
}
