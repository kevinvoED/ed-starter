import type { ComponentProps } from "react";
import type { PAGE_QUERY_RESULT } from "@/sanity.types";
import { CardExample } from "@/components/modules/Card/CardExample";
import { DriverExample } from "@/components/modules/Driver/DriverExample";
import { HeroPrimary } from "@/components/modules/Hero/HeroPrimary";
import { ListExample } from "@/components/modules/List/ListExample";
import { Marquee } from "@/components/modules/Marquee/Marquee";
import { TableExample } from "@/components/modules/Table/TableExample";
import { TextExample } from "@/components/modules/Text/TextExample";
import { MyModulesRendererErrorBoundary } from "../layout/ErrorBoundary/ErrorBoundary";

export type ModuleBlock = NonNullable<
  NonNullable<PAGE_QUERY_RESULT>["modules"]
>[number];

type ModuleBuilderProps = {
  modules: ModuleBlock[];
};

const componentMap: {
  [K in ModuleBlock["_type"]]: React.ComponentType<
    Extract<ModuleBlock, { _type: K }>
  >;
} = {
  "hero-primary": HeroPrimary,
  marquee: Marquee,
  "card-example": CardExample,
  "driver-example": DriverExample,
  "list-example": ListExample,
  "table-example": TableExample,
  "text-example": TextExample,
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
