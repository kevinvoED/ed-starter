import type React from "react";
import { Card, Text } from "@sanity/ui";
import { defineType, useFormValue } from "sanity";
import { formatDate } from "../../frontend/lib/date";

const CreatedAt: React.FC = () => {
  const document = useFormValue([]) as { _createdAt?: string };

  // Get the creation date from the document
  const createdAt = document?._createdAt;
  const formattedDate = createdAt ? formatDate(createdAt) : "Not set";

  return (
    <Card padding={3} radius={2} shadow={1}>
      <Text size={2} weight="medium">
        {formattedDate}
      </Text>
    </Card>
  );
};

export default CreatedAt;

// Define as a custom object type for Sanity
export const createdAtType = defineType({
  name: "created-at",
  title: "Created At",
  type: "object",
  description: "Initial creation date. Not editable.",
  fields: [
    {
      name: "placeholder",
      type: "string",
    },
  ],
  components: {
    input: CreatedAt,
  },
});
