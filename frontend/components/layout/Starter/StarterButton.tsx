import { SanityLink } from "@/components/primitives/Link/SanityLink";

export const StarterButton = () => {
  return (
    <div className="flex flex-col gap-5">
      <SanityLink variant="primary" id="cta" href="/" hasArrow={false}>
        Primary Button
      </SanityLink>
      <SanityLink variant="secondary" id="cta" href="/" hasArrow={false}>
        Secondary Button
      </SanityLink>
      <SanityLink variant="ghost" id="cta" href="/" hasArrow={false}>
        Ghost Button
      </SanityLink>
    </div>
  );
};
