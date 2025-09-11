import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: {
    studioUrl: studioUrl,
    filter: (props) => {
      // Disable stega for specific field names that commonly need cleaning
      const fieldsToDisableStega = [
        "populateThisListHere",
      ];
      if (fieldsToDisableStega.includes(props.sourcePath.at(-1) as string)) {
        return false;
      }
      return props.filterDefault(props);
    },
  },
});
