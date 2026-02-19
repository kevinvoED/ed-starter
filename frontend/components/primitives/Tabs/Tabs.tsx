"use client";

import { cn } from "@/lib/utils/cn";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

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
        "h-10 px-2 hover:text-alabaster data-[active]:text-black",
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

function TabsIndicator({ className, ...props }: TabsPrimitive.Indicator.Props) {
  return (
    <TabsPrimitive.Indicator
      className={cn(
        "absolute top-1/2 left-0 z-[-1] w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] -translate-y-1/2 transition-transform",
        "h-8 rounded-sm bg-debug-red",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsIndicator };
