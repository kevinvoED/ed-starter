import type { Metadata } from "next";
import type { GetPageQueryResult } from "@/sanity.types";
import { notFound } from "next/navigation";
import { PageBuilder } from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { getPageBySlug } from "@/sanity/queries/fetch";
import { pagesSlugs } from "@/sanity/queries/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const page = await getPageBySlug(params);

  return {
    title: page?.title,
    description: page?.description,
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const page = await getPageBySlug(params);

  if (!page?._id) {
    return notFound();
  }

  return <PageBuilder page={page as GetPageQueryResult} />;
}
