"use client";

import type { SanityDocument } from "next-sanity";
import type { GetPageQueryResult } from "@/sanity.types";
import { useOptimistic } from "next-sanity/hooks";
import { Button } from "@/components/Button/Button";
import { ModuleBuilder } from "@/components/ModuleBuilder";
import { studioUrl } from "@/sanity/lib/api";

type PageBuilderProps = {
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
		<div className="container space-y-6 mt-1">
			<div className="space-y-2 text-center">
				<h2 className="type-sans-5640">Oops, there is nothing here yet!</h2>
				<p className="type-sans-1440 text-gray-500">
					Click the button below to start adding content.
				</p>
			</div>

			<div className="flex justify-center">
				<Button
					href={`${studioUrl}/structure/intent/edit/template=page;type=page;path=pageBuilder;id=${page._id}`}
					openInNewTab={true}
				>
					Open in Sanity Studio
				</Button>
			</div>
		</div>
	);
}

// This component is responsible for rendering the blocks from the `pageBuilder` field in the Page type in your Sanity Studio.
export const PageBuilder = ({ page }: PageBuilderProps) => {
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
};
