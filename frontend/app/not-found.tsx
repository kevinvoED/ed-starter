import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

// TODO: create 404 page
export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container">
        <h1 className="type-heading-3230 text-center">Missing page</h1>
      </div>
    </div>
  );
}
