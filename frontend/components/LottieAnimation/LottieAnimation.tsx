// @ts-nocheck - nextjs build errors about missing types despite them erroring out in the IDE

import type React from "react";
import { useEffect, useRef } from "react";
import {
  DotLottieReact,
  type DotLottieReactProps,
} from "@lottiefiles/dotlottie-react";

/** The valid animations and their paths to the public folder */
type MyLottieAnimations =
  | "API"
  | "Comparison"
  | "DataCentre"
  | "DataFeeds"
  | "ExploreData"
  | "GeoLocation"
  | "Integrations"
  | "OnPrem"
  | "ResidentialProxy"
  | "SessionEnrichment"
  | "VPNDetection";

/** The valid animations and their paths to the public folder */
const ANIMATION_FILES = new Set<MyLottieAnimations>([
  "API",
  "Comparison",
  "DataCentre",
  "DataFeeds",
  "ExploreData",
  "GeoLocation",
  "Integrations",
  "OnPrem",
  "ResidentialProxy",
  "SessionEnrichment",
  "VPNDetection",
]);

type LottieAnimationProps = {
  play: boolean;
  animation: MyLottieAnimations;
} & Omit<DotLottieReactProps, "src">;

export const LottieAnimation: React.FC<LottieAnimationProps> = ({
  play,
  animation,
  ...rest
}) => {
  if (!ANIMATION_FILES.has(animation)) {
    throw new Error(
      `The animation "${animation}" does not exist in the file mapping`,
    );
  }

  const dotLottieRef = useRef(null);

  useEffect(() => {
    if (dotLottieRef.current && play) {
      dotLottieRef.current?.play();
    }
  });

  return (
    <DotLottieReact
      key={`/lottie/${animation}.lottie`}
      src={`/lottie/${animation}.lottie`}
      loop
      // these are the dimensions of the lottie animation
      width="476"
      height="534"
      className="h-auto w-full"
      dotLottieRefCallback={(dotLottie) => {
        dotLottieRef.current = dotLottie;
      }}
      {...rest}
    />
  );
};

export default LottieAnimation;
