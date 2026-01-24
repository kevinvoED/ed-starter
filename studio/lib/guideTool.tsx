/** @see https://www.sanity.io/docs/studio/custom-studio-tool */

import type { Tool } from "sanity";
import { BookIcon } from "@sanity/icons";
import { Card, Grid } from "@sanity/ui";
import Guide from "@/components/guide";

export const guideTool = () => {
  return {
    title: "Guide",
    name: "guide", // localhost:3333/guide
    icon: BookIcon,
    component: (_) => (
      <Grid columns={5} gap={3} padding={4}>
        <Card column={[6, 6, 4, 3]} columnStart={[0, 0, 1, 2]}>
          <Guide />
        </Card>
      </Grid>
    ),
  } as Tool;
};

export default guideTool;
