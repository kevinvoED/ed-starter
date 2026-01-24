import type { ComponentProps } from "react";
import type { PAGE_QUERYResult } from "@/sanity.types";
import { Card2Up } from "@/components/Card/Card2Up";
import { Card3Up } from "@/components/Card/Card3Up";
import { CardCollapsible } from "@/components/Card/CardCollapsible/CardCollapsible";
import { CardGridMarquee } from "@/components/Card/CardGridMarquee";
import { CardList } from "@/components/Card/CardList";
import { CardPricing } from "@/components/Card/CardPricing";
import { DriverCta } from "@/components/Driver/DriverCta";
import { DriverList } from "@/components/Driver/DriverList";
import { HeroPrimary } from "@/components/Hero/HeroPrimary";
import { HeroQuaternary } from "@/components/Hero/HeroQuaternary";
import { HeroQuinary } from "@/components/Hero/HeroQuinary";
import { HeroSecondary } from "@/components/Hero/HeroSecondary";
import { HeroTertiary } from "@/components/Hero/HeroTertiary";
import { ImageTextTab } from "@/components/ImageText/ImageTextTab/ImageTextTab";
import { ImageTextTimeline } from "@/components/ImageText/ImageTextTimeline/ImageTextTimeline";
import { ListAccordion } from "@/components/List/ListAccordion";
import { ListCta3Up } from "@/components/List/ListCta3Up";
import { ListGridLogo } from "@/components/List/ListGridLogo";
import { ListIconScroll } from "@/components/List/ListIconScroll";
import { ListImageScroll } from "@/components/List/ListImageScroll";
import { ListMetric } from "@/components/List/ListMetric";
import { ListMultiAccordion } from "@/components/List/ListMultiAccordion";
import { ListTeam } from "@/components/List/ListTeam";
import { ListText } from "@/components/List/ListText";
import { Marquee } from "@/components/Marquee/Marquee";
import { FullImage } from "@/components/Media/FullImage";
import { FullVideo } from "@/components/Media/FullVideo";
import { Pattern } from "@/components/Media/Pattern";
import { InfographicModel } from "@/components/Misc/InfographicModel";
import { TableComparison } from "@/components/Table/TableComparison";
import { TableDataFeed } from "@/components/Table/TableDataFeed";
import { TableLogo } from "@/components/Table/TableLogo";
import { TableMultiCta } from "@/components/Table/TableMultiCta";
import { Text2Col } from "@/components/Text/Text2Col";
import { TextCta2Col } from "@/components/Text/TextCta2Col";
import { TextDial } from "@/components/Text/TextDial";
import { TextLogo } from "@/components/Text/TextLogo";
import { TextQuote } from "@/components/Text/TextQuote";
import { MyBlocksRendererErrorBoundary } from "./ErrorBoundary/ErrorBoundary";
import { PortableTextHighlightModule } from "./PortableText/PortableTextModule";

export type ModuleBlock = NonNullable<
  NonNullable<PAGE_QUERYResult>["blocks"]
>[number];

type ModuleBuilderProps = {
  blocks: ModuleBlock[];
};

const componentMap: {
  [K in ModuleBlock["_type"]]: React.ComponentType<
    Extract<ModuleBlock, { _type: K }>
  >;
} = {
  "hero-primary": HeroPrimary,
  "hero-secondary": HeroSecondary,
  "hero-tertiary": HeroTertiary,
  "hero-quaternary": HeroQuaternary,
  "hero-quinary": HeroQuinary,
  "full-image": FullImage,
  "text-2-col": Text2Col,
  "list-icon-scroll": ListIconScroll,
  "list-image-scroll": ListImageScroll,
  "list-metric": ListMetric,
  "card-grid-marquee": CardGridMarquee,
  "text-cta-2-col": TextCta2Col,
  pattern: Pattern,
  "portable-text-content-highlight": PortableTextHighlightModule,
  "driver-cta": DriverCta,
  "driver-list": DriverList,
  "list-accordion": ListAccordion,
  "text-quote": TextQuote,
  "list-multi-accordion": ListMultiAccordion,
  "card-3-up": Card3Up,
  "card-2-up": Card2Up,
  "card-collapsible": CardCollapsible,
  "card-list": CardList,
  "list-cta-3-up": ListCta3Up,
  "card-pricing": CardPricing,
  "list-grid-logo": ListGridLogo,
  "table-comparison": TableComparison,
  "table-logo": TableLogo,
  "table-multi-cta": TableMultiCta,
  marquee: Marquee,
  "list-text": ListText,
  "full-video": FullVideo,
  "image-text-timeline": ImageTextTimeline,
  "infographic-model": InfographicModel,
  "image-text-tab": ImageTextTab,
  "text-logo": TextLogo,
  "list-team": ListTeam,
  "text-dial": TextDial,
  "table-data-feed": TableDataFeed,
};

const LocalErrorFallback: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <div className="bg-[#993333] p-2 text-white">
    <h2 className="mb-2 font-bold text-xl">
      Something went wrong rendering a block
    </h2>
    <p>{children}</p>
  </div>
);

export const ModuleBuilder = ({ blocks }: ModuleBuilderProps) => {
  return (
    <>
      {blocks.map((block) => {
        const blockType = block._type as ModuleBlock["_type"];
        const Component =
          (componentMap[blockType] as React.ComponentType<
            Extract<ModuleBlock, { _type: ModuleBlock["_type"] }>
          >) || null;

        if (!Component) {
          console.error(
            `There was no component found for ${blockType || JSON.stringify(block)}`,
          );
          return (
            <LocalErrorFallback>
              There was no component found for{" "}
              {blockType || JSON.stringify(block)}
            </LocalErrorFallback>
          );
        }

        return (
          <section key={block._key + blockType} data-module={blockType}>
            <MyBlocksRendererErrorBoundary block={block}>
              <Component {...(block as ComponentProps<typeof Component>)} />
            </MyBlocksRendererErrorBoundary>
          </section>
        );
      })}
    </>
  );
};
