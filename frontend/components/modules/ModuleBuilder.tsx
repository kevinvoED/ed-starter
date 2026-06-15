import type { ComponentProps } from "react";
import type { PAGE_QUERY_RESULT } from "@/sanity.types";
import { CardExample } from "@/components/modules/Card/CardExample";
import { DriverText } from "@/components/modules/Driver/DriverText";
import { HeroPrimary } from "@/components/modules/Hero/HeroPrimary";
import { Marquee } from "@/components/modules/Marquee/Marquee";
import { FullImage } from "@/components/modules/Media/FullImage";
import { FullVideo } from "@/components/modules/Media/FullVideo";
import { Spacer } from "@/components/modules/Miscellaneous/Spacer";
import { RichText } from "@/components/modules/Text/RichText";
import { MyModulesRendererErrorBoundary } from "../layout/ErrorBoundary/ErrorBoundary";

export type ModuleBlock = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["modules"]>[number],
  { _type: string }
>;

type ModuleBuilderProps = {
  modules: ModuleBlock[];
};

const componentMap: {
  [K in ModuleBlock["_type"]]: React.ComponentType<
    Extract<ModuleBlock, { _type: K }>
  >;
} = {
  spacer: Spacer,
  marquee: Marquee,
  "hero-primary": HeroPrimary,
  "rich-text": RichText,
  "full-image": FullImage,
  "full-video": FullVideo,
  "card-example": CardExample,
  "driver-text": DriverText,
};

const LocalErrorFallback = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-debug-red p-2 text-white">
    <h2 className="mb-2 font-bold text-xl">
      Something went wrong rendering a block
    </h2>
    <p>{children}</p>
  </div>
);

export const ModuleBuilder = ({ modules }: ModuleBuilderProps) => {
  return (
    <>
      {modules.map((module) => {
        const moduleType = module._type as ModuleBlock["_type"];
        const Component =
          (componentMap[moduleType] as React.ComponentType<
            Extract<ModuleBlock, { _type: ModuleBlock["_type"] }>
          >) || null;

        if (!Component) {
          console.error(
            `There was no component found for ${moduleType || JSON.stringify(module)}`,
          );
          return (
            <LocalErrorFallback>
              There was no component found for{" "}
              {moduleType || JSON.stringify(module)}
            </LocalErrorFallback>
          );
        }

        return (
          <section key={module._key + moduleType} data-module={moduleType}>
            <MyModulesRendererErrorBoundary module={module}>
              <Component {...(module as ComponentProps<typeof Component>)} />
            </MyModulesRendererErrorBoundary>
          </section>
        );
      })}
    </>
  );
};
