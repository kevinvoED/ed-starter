import type { Metadata } from "next";
import type { GetPageQueryResult } from "@/sanity.types";
import { notFound } from "next/navigation";
import { PageBuilder } from "@/components/PageBuilder";
import { getHomepage } from "@/sanity/queries/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomepage();

  return {
    title: page?.title,
    description: page?.description,
  };
}

export default async function Page() {
  const page = await getHomepage();

  if (!page?._id) {
    return notFound();
  }

  return <PageBuilder page={page as GetPageQueryResult} />;
}
