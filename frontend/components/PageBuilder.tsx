"use client";

import type { SanityDocument } from "next-sanity";
import type { GetPageQueryResult } from "@/sanity.types";
import Link from "next/link";
import { useOptimistic } from "next-sanity/hooks";
import { ModuleBuilder } from "@/components/ModuleBuilder";
import { studioUrl } from "@/sanity/lib/api";

type PageBuilderPageProps = {
	page: GetPageQueryResult;
};

type PageBuilderSection = {
	_key: string;
	_type: string;
};

type PageData = {
	_id: string;
	_type: string;
	modules?: PageBuilderSection[];
};

function renderSections(
	pageBuilderSections: PageBuilderSection[],
	page: GetPageQueryResult,
) {
	if (!page) {
		return null;
	}
	return (
		<>
			{pageBuilderSections.map((block) => (
				<ModuleBuilder key={block._key} block={block} />
			))}
		</>
	);
}

function renderEmptyState(page: GetPageQueryResult) {
	if (!page) {
		return null;
	}

	return (
		<div className="container">
			<h1 className="font-extrabold text-4xl text-gray-900 tracking-tight sm:text-5xl">
				This page has no content!
			</h1>
			<p className="mt-2 text-base text-gray-500">
				Open the page in Sanity Studio to add content.
			</p>
			<div className="mt-10 flex">
				<Link
					className="mr-6 flex items-center gap-2 rounded-full bg-black px-6 py-3 text-white transition-colors duration-200 hover:bg-brand focus:bg-blue"
					href={`${studioUrl}/structure/intent/edit/template=page;type=page;path=pageBuilder;id=${page._id}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					Add content to this page
				</Link>
			</div>
		</div>
	);
}

// This component is responsible for rendering the blocks from the `pageBuilder` field in the Page type in your Sanity Studio.
export default function PageBuilder({ page }: PageBuilderPageProps) {
	const pageBuilderSections = useOptimistic<
		PageBuilderSection[] | undefined,
		SanityDocument<PageData>
	>(page?.modules || [], (currentSections, action) => {
		// The action contains updated document data from Sanity when someone makes an edit in the Studio

		// If the edit was to a different document, ignore it
		if (action.id !== page?._id) {
			return currentSections;
		}

		// If there are sections in the updated document, use them
		if (action.document.modules) {
			// Reconcile References. https://www.sanity.io/docs/enabling-drag-and-drop#ffe728eea8c1
			return action.document.modules.map(
				(section) =>
					currentSections?.find((s) => s._key === section?._key) || section,
			);
		}

		// Otherwise keep the current sections
		return currentSections;
	});

	if (!page) {
		return renderEmptyState(page);
	}

	return pageBuilderSections && pageBuilderSections.length > 0
		? renderSections(pageBuilderSections, page)
		: renderEmptyState(page);
}
