import type { ComponentProps } from "react";
import type { NavTheme } from "@/lib/hooks/use-nav-theme";
import type { PAGE_QUERY_RESULT } from "@/sanity.types";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary/ErrorBoundary";
import { CardExample } from "@/components/modules/Card/CardExample";
import { DriverText } from "@/components/modules/Driver/DriverText";
import { HeroPrimary } from "@/components/modules/Hero/HeroPrimary";
import { Marquee } from "@/components/modules/Marquee/Marquee";
import { MediaFile } from "@/components/modules/Media/MediaFile";
import { Spacer } from "@/components/modules/Miscellaneous/Spacer";
import { RichText } from "@/components/modules/Text/RichText";

/*
 * Sanity page-builder that maps and links module blocks to their React components.
 * Each module is wrapped in a section with metadata for
 * debugging, nav theme detection, and isolated error handling.
 */

const DEFAULT_NAV_THEME: NavTheme = "default";

// Union of all module block types returned by the page query.
export type ModuleBlock = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["modules"]>[number],
  { _type: string }
>;

type ModuleBuilderProps = {
  modules: ModuleBlock[];
};

type ModuleEntry<K extends ModuleBlock["_type"]> = {
  component: React.ComponentType<Extract<ModuleBlock, { _type: K }>>;
  navTheme?: NavTheme; // @see use-nav-theme.ts custom hook
};

// Extend and add newly created schema modules to moduleMap.
const moduleMap: {
  [K in ModuleBlock["_type"]]: ModuleEntry<K>;
} = {
  spacer: { component: Spacer },
  marquee: { component: Marquee },
  "hero-primary": { component: HeroPrimary },
  "rich-text": { component: RichText },
  "card-example": { component: CardExample, navTheme: "dark" },
  "driver-text": { component: DriverText, navTheme: "dark" },
  "media-file": { component: MediaFile, navTheme: "dark" },
};

// Renders an ordered list of Sanity module blocks as page sections.
export const ModuleBuilder = ({ modules }: ModuleBuilderProps) => {
  return (
    <>
      {modules.map((module) => {
        const moduleType = module._type as ModuleBlock["_type"];
        const entry = moduleMap[moduleType];
        const Component =
          (entry?.component as React.ComponentType<
            Extract<ModuleBlock, { _type: ModuleBlock["_type"] }>
          >) ?? null;
        const navTheme = entry?.navTheme ?? DEFAULT_NAV_THEME;

        if (!Component) {
          console.error(
            `There was no component found for ${moduleType || JSON.stringify(module)}`,
          );

          return (
            <div className="bg-debug-red p-2 text-white">
              <h2 className="mb-2 font-bold text-xl">
                Something went wrong rendering a block
              </h2>
              <p>
                There was no component found for{" "}
                {moduleType || JSON.stringify(module)}
              </p>
            </div>
          );
        }

        return (
          <section
            key={module._key + moduleType}
            data-module={moduleType}
            data-nav-theme={navTheme}
          >
            <ErrorBoundary module={module}>
              <Component {...(module as ComponentProps<typeof Component>)} />
            </ErrorBoundary>
          </section>
        );
      })}
    </>
  );
};
