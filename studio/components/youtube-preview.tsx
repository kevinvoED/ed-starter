import type { PreviewProps } from "sanity";
import { SquarePlay } from "lucide-react";
import { lazy, Suspense } from "react";
import { Flex, Text } from "@sanity/ui";

// Lazy load ReactPlayer to avoid ESM/CommonJS conflicts
const ReactPlayer = lazy(() => import("react-player"));

export function YouTubePreview(props: PreviewProps) {
  const { title: videoId } = props;

  return (
    <Flex padding={3} align="center" justify="center">
      {typeof videoId === "string" ? (
        <Suspense fallback={<Text>Loading preview...</Text>}>
          <ReactPlayer
            src={`https://www.youtube.com/watch?v=${videoId}`}
            width="100%"
            height="300px"
          />
        </Suspense>
      ) : (
        <Flex align="center" justify="center">
          <SquarePlay />
          <Text>Add a YouTube Video ID</Text>
        </Flex>
      )}
    </Flex>
  );
}
