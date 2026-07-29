"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "cnfast";

/*
 * Based off of Base/UI's Tabs component
 * @docs: https://base-ui.com/react/components/tabs
 *
 * Configure default styling here.
 * Remember that styles defined here must be generic as they will be applied to all Accordion components.
 * If your style is unique, you can override the styles by passing into `className` prop.
 * Otherwise, you can conditionally render or apply styles in here by extending props.
 *
 * ---------------------
 * Usage Example: Basic
 * ---------------------
 *
 * <Tabs className="col-span-full lg:col-span-4 lg:col-start-5" defaultValue={DATA?.[0].title}>
 *   <TabsList>
 *     {DATA.map((item) => (
 *       <TabsTrigger key={item.title} value={item.title}>
 *         {item.title && <PortableText value={item.title} />}
 *       </TabsTrigger>
 *     ))}
 *     <TabsIndicator />
 *   </TabsList>
 *   {DATA.map((item) => (
 *     <TabsContent key={item.description} value={item.description}>
 *       {item.description && <PortableText value={item.description} />}
 *     </TabsContent>
 *   ))}
 * </Tabs>
 *
 * ---------------------
 * Usage Example: Underline Indicator
 * ---------------------
 *
 * <TabsIndicator variant="underline"/>
 */

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return <TabsPrimitive.Root className={cn(className)} {...props} />;
}

function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      className={cn("relative z-0 flex", "gap-1 p-custom py-2", className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      className={cn(
        "flex select-none items-center justify-center whitespace-nowrap break-keep border-0 outline-none transition-colors before:inset-x-0 before:inset-y-1 before:rounded-sm before:outline-debug-blue before:-outline-offset-1 focus-visible:relative focus-visible:before:absolute focus-visible:before:outline-2",
        "h-10 px-2 hover:text-alabaster data-active:text-black",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      className={cn(
        "relative flex items-center justify-center outline-debug-blue -outline-offset-1 focus-visible:rounded-md focus-visible:outline-2",
        "p-custom py-4",
        className,
      )}
      {...props}
    />
  );
}

type TabsIndicatorVariant = "pill" | "underline";

type TabsIndicatorProps = TabsPrimitive.Indicator.Props & {
  variant?: TabsIndicatorVariant;
};

function TabsIndicator({
  className,
  variant = "pill",
  ...props
}: TabsIndicatorProps) {
  return (
    <TabsPrimitive.Indicator
      className={cn(
        "absolute left-0 z-[-1] w-(--active-tab-width) translate-x-(--active-tab-left) transition-transform",
        variant === "pill" &&
          "top-1/2 h-8 -translate-y-1/2 rounded-sm bg-debug-red",
        variant === "underline" && "bottom-0 h-px bg-debug-red",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger };
