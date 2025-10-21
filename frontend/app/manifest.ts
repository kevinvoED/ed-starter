import type { MetadataRoute } from "next";

// This is a special file that Next.js uses to generate a manifest.json file
// Learn more: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Starter Kit",
		short_name: "Starter Kit",
		description: "Next.js Starter Kit",
		start_url: "/",
		display: "standalone",
		// Update extra settings
		background_color: "#fff",
		theme_color: "#fff",
		// icons: [
		//   {
		//     src: '/favicon.ico',
		//     sizes: 'any',
		//     type: 'image/x-icon',
		//   },
		// ],
	};
}
