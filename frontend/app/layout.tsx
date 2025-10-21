import type { Metadata } from "next";
import type { SanityImageType } from "@/lib/utils/type";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { DraftModeToast } from "@/components/Sanity/DraftModeToast";
import { handleError } from "@/lib/utils/handle-error";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { settingsQuery } from "@/sanity/queries/queries";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import "./globals.css";
import { Navigation } from "@/components/Navigation/Navigation";
import { getNavigation } from "@/sanity/queries/fetch";

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
	const { data: settings } = await sanityFetch({
		query: settingsQuery,
		stega: false,
	});
	const title = settings?.title || "";
	const description = settings?.description || "";
	const ogImage = resolveOpenGraphImage(settings?.ogImage as SanityImageType);

	return {
		title: {
			template: `%s | ${title}`,
			default: title,
		},
		description: description,
		openGraph: {
			images: ogImage ? [ogImage] : [],
		},
	};
}

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	display: "swap",
});

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isEnabled: isDraftMode } = await draftMode();
	const data = await getNavigation();

	return (
		<html lang="en" className={`${inter.variable}`}>
			<body>
				<Toaster />
				{isDraftMode && (
					<>
						<DraftModeToast />
						<VisualEditing />
					</>
				)}
				<SanityLive onError={handleError} />
				<Navigation data={data} />
				<main>{children}</main>
				<SpeedInsights />
			</body>
		</html>
	);
}
