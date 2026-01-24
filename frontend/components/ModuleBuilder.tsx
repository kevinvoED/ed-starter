import type { ComponentProps } from "react";
import type { PAGE_QUERYResult } from "@/sanity.types";
import { HeroPrimary } from "@/components/Hero/HeroPrimary";
import { MyBlocksRendererErrorBoundary } from "./ErrorBoundary/ErrorBoundary";

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
