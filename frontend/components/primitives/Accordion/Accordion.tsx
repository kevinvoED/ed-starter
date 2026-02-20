"use client";

import { ChevronDownIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

/*
 * Based off of Base/UI's Accordion component
 * @docs: https://base-ui.com/react/components/accordion
 *
 * Configure default styling here.
 * Remember that styles defined here must be generic as they will be applied to all Accordion components.
 * If your style is unique, you can override the styles by passing into `className` prop.
 * Otherwise, you can conditionally render or apply styles in here by extending props.
 *
 * ---------------------
 * Usage Example: Basic
 * ---------------------
 *  <Accordion defaultValue={[DATA?.[1].title]} multiple={true} className="col-span-full">
 *    {DATA.map((item) => (
 *      <AccordionItem key={item.title} value={item.title}>
 *        <AccordionTrigger display="flex" icon="plus">
 *          {item.title && <PortableText value={item.title} />}
 *        </AccordionTrigger>
 *        <AccordionContent>
 *          {item.content && <PortableText value={item.content} />
 *        </AccordionContent>
 *      </AccordionItem>
 *    ))}
 *  </Accordion>
 *
 * ---------------------
 * Usage Example: Grid
 * ---------------------
 *  <Accordion defaultValue={[DATA?.[1].title]} multiple={true} className="col-span-full">
 *    {DATA.map((item, index) => (
 *      <AccordionItem key={item.title} value={item.title}>
 *        <AccordionTrigger display="grid" icon="chevron">
 *          <div className="col-span-1">0{index + 1}</div>
 *          {item.title && <PortableText value={item.title} className="col-span-8 col-start-3"/>}
 *        </AccordionTrigger>
 *        <AccordionContent>
 *          {item.content && <PortableText value={item.content} />}
 *        </AccordionContent>
 *      </AccordionItem>
 *    ))}
 *  </Accordion>
 *
 * ---------------------
 * Usage Example: Flex
 * ---------------------
 *  <Accordion defaultValue={[DATA?.[1].title]} multiple={true} className="col-span-full">
 *    {DATA.map((item, index) => (
 *      <AccordionItem key={item.title} value={item.title}>
 *        <AccordionTrigger display="flex" icon="chevron">
 *          {item.title && <PortableText value={item.title} />}
 *        </AccordionTrigger>
 *        <AccordionContent>
 *          {item.content && <PortableText value={item.content} />}
 *        </AccordionContent>
 *      </AccordionItem>
 *    ))}
 *  </Accordion>
 */

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  display,
  icon = "chevron",
  ...props
}: AccordionPrimitive.Trigger.Props & {
  display: "grid" | "flex";
  icon?: "chevron" | "plus";
}) {
  return (
    <AccordionPrimitive.Header className="flex w-full">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex-1 border border-transparent text-left outline-none transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-5",
          display === "grid" && "grid-custom",
          display === "flex" && "flex items-center justify-between",
          className,
        )}
        {...props}
      >
        {children}

        {icon === "chevron" && (
          <ChevronDownIcon
            data-slot="accordion-trigger-icon"
            className="pointer-events-none col-start-4 shrink-0 transition-transform duration-180 ease-in-out group-aria-expanded/accordion-trigger:rotate-180 lg:col-start-12"
          />
        )}
        {icon === "plus" && (
          <PlusIcon
            data-slot="accordion-trigger-icon"
            className="pointer-events-none shrink-0 transition-transform duration-180 ease-in-out group-aria-expanded/accordion-trigger:rotate-45"
          />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-sm data-closed:animate-accordion-up data-open:animate-accordion-down",
        className,
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
