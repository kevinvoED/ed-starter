import type { PreviewProps } from "sanity";
import { Badge, Box, Card, Flex, Stack, Text } from "@sanity/ui";

interface DetailItem {
  title?: string;
  value?: {
    type?: string;
    values?: string[];
  };
}

interface DetailsPreviewProps extends PreviewProps {
  items?: DetailItem[];
}

export function DetailsPreview(props: DetailsPreviewProps) {
  const { items } = props;

  return (
    <Card padding={2} radius={2} tone="primary">
      <Stack space={2}>
        {items && Array.isArray(items) && items.length > 0 ? (
          items.slice(0, 3).map((item: DetailItem, _index: number) => {
            const valueCount = item.value?.values?.length || 0;
            const displayType = item.value?.type || "list";

            return (
              <Card
                key={item.value?.type}
                padding={2}
                radius={1}
                tone="default"
                border
              >
                <Flex align="center" justify="space-between">
                  <Text size={1} weight="medium">
                    {item.title || "Untitled Detail"}
                  </Text>
                  <Flex align="center" gap={1}>
                    <Badge
                      tone={displayType === "list" ? "primary" : "positive"}
                      mode="outline"
                    >
                      {displayType === "list" ? "List" : "Comma"}
                    </Badge>
                    <Badge tone="default" mode="outline">
                      {valueCount}
                    </Badge>
                  </Flex>
                </Flex>
                {item.value?.values && item.value.values.length > 0 && (
                  <Box marginTop={1}>
                    <Text size={0} muted>
                      {item.value.values.slice(0, 2).join(", ")}
                      {item.value.values.length > 2 && "..."}
                    </Text>
                  </Box>
                )}
              </Card>
            );
          })
        ) : (
          <Card
            padding={3}
            radius={1}
            tone="transparent"
            border
            style={{ borderStyle: "dashed" }}
          >
            <Flex align="center" justify="center">
              <Text size={1} muted>
                No details added
              </Text>
            </Flex>
          </Card>
        )}
        {items && Array.isArray(items) && items.length > 3 && (
          <Card padding={2} radius={1} tone="caution" border>
            <Flex align="center" justify="center">
              <Text size={1} weight="medium">
                +{items.length - 3} more detail
                {items.length - 3 !== 1 ? "s" : ""}
              </Text>
            </Flex>
          </Card>
        )}
      </Stack>
    </Card>
  );
}
