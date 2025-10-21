import { groq } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-07-04";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "development";

// we don't need apicnd because it's getting fetched once during deployment
const groqUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`;

/**
 * Added here because these queries are called "raw"
 */
const GET_REDIRECTS_AND_REWRITES = groq`
  *[_type == "configuration"][0] {
    redirects[] {
      source,
      destination,
      "permanent": redirectType == "permanent"
    },
    rewrites[] {
      source,
      "destination": url
    }
  }
`;

const getRewritesAndRedirects = async () => {
	if (String(projectId).length < 1) {
		return Promise.resolve({
			redirects: [],
			rewrites: [],
		});
	}

	const { redirects, rewrites } = (
		await (
			await fetch(groqUrl, {
				next: {
					tags: ["rewrite", "redirect"],
				},
				headers: {
					Accept: "application/json",
					"Cache-Control": "no-cache",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: GET_REDIRECTS_AND_REWRITES,
				}),
				method: "POST",
				mode: "cors",
				credentials: "include",
			})
		).json()
	).result || {
		redirects: [],
		rewrites: [],
	};

	return {
		redirects: redirects || [],
		rewrites: rewrites || [],
	};
};

export default getRewritesAndRedirects;
