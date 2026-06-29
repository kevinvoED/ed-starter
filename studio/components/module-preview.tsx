import type { PreviewProps } from "sanity";
import { createElement, isValidElement } from "react";
import { Box, Flex, Text } from "@sanity/ui";

export function ModulePreview(props: PreviewProps) {
  const { title, subtitle, media } = props as PreviewProps & {
    title?: string;
    subtitle?: string;
  };

  const icon = (() => {
    if (isValidElement(media)) return media;
    if (media && (typeof media === "function" || typeof media === "object"))
      return createElement(media as React.ElementType, {});
    return null;
  })();

  return (
    <Flex align="center" gap={3} paddingRight={2}>
      <Box
        padding={2}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          border: "1px solid var(--card-border-color)",
          minWidth: "90px",
        }}
      >
        <span
          style={{
            color: "var(--card-muted-fg-color)",
            marginTop: "2px",
          }}
        >
          {icon}
        </span>
        {subtitle && (
          <Text
            size={0}
            style={{
              fontSize: "10px",
              fontWeight: 600,
              color: "var(--card-muted-fg-color)",
            }}
          >
            <span style={{ textTransform: "capitalize", whiteSpace: "nowrap" }}>
              {subtitle}
            </span>
          </Text>
        )}
      </Box>

      {title && (
        <div style={{ overflow: "hidden", minWidth: 0, flex: 1 }}>
          <span
            style={{
              display: "block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "13px",
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            {title}
          </span>
        </div>
      )}
    </Flex>
  );
}
