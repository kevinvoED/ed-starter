"use client";

import { ChevronDownIcon, PlusIcon } from "lucide-react";
import { createContext, use } from "react";
import { cva } from "class-variance-authority";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cn } from "cnfast";

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
 *  <Accordion display="flex" defaultValue={[DATA?.[1].title]} multiple={true} className="col-span-full">
 *    {DATA.map((item) => (
 *      <AccordionItem key={item.title} value={item.title}>
 *        <AccordionTrigger icon="plus">
 *          {item.title && <PortableText value={item.title} />}
 *        </AccordionTrigger>
 *        <AccordionContent>
 *          {item.content && <PortableText value={item.content} />}
 *        </AccordionContent>
 *      </AccordionItem>
 *    ))}
 *  </Accordion>
 *
 * ---------------------
 * Usage Example: Theme
 * ---------------------
 *  <Accordion theme="new-theme" ...>
 *    ...
 *  </Accordion>
 *
 * ---------------------
 * Usage Example: Grid
 * ---------------------
 *  <Accordion display="grid" className="col-span-full" ...>
 *   ...
 *  </Accordion>
 *
 * ---------------------
 * Usage Example: Flex
 * ---------------------
 *  <Accordion display="flex" ...>
 *    ...
 *  </Accordion>
 */

type AccordionTheme = "default" | "second-theme";

const AccordionThemeContext = createContext<AccordionTheme>("default");

const accordionItemVariants = cva("", {
  variants: {
    theme: {
      default: "not-last:border-b",
      "second-theme": "not-last:border-b",
    },
  },
  defaultVariants: { theme: "default" },
});

const accordionTriggerVariants = cva(
  "group/accordion-trigger group-data-[display=grid]/accordion:grid-custom relative flex-1 gap-2 border border-transparent outline-none transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-5 group-data-[display=flex]/accordion:flex group-data-[display=flex]/accordion:items-center group-data-[display=flex]/accordion:justify-between",
  {
    variants: {
      theme: {
        default: "py-2.5 text-left",
        "second-theme": "py-4 text-left",
      },
    },
    defaultVariants: { theme: "default" },
  },
);

const accordionContentVariants = cva(
  "group-data-[display=grid]/accordion:grid-custom overflow-hidden data-closed:animate-accordion-up data-open:animate-accordion-down group-data-[display=flex]/accordion:flex",
  {
    variants: {
      theme: {
        default: "text-sm",
        "second-theme": "",
      },
    },
    defaultVariants: { theme: "default" },
  },
);

const accordionContentInnerVariants = cva(
  "group-data-[display=grid]/accordion:col-span-full group-data-[display=grid]/accordion:col-start-3",
  {
    variants: {
      theme: {
        default: "pb-2.5",
        "second-theme": "pb-4",
      },
    },
    defaultVariants: { theme: "default" },
  },
);

function Accordion({
  className,
  display,
  theme = "default",
  ...props
}: AccordionPrimitive.Root.Props & {
  display: "grid" | "flex";
  theme?: AccordionTheme;
}) {
  return (
    <AccordionThemeContext value={theme}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        data-display={display}
        className={cn("group/accordion flex w-full flex-col", className)}
        {...props}
      />
    </AccordionThemeContext>
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  const theme = use(AccordionThemeContext);
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(accordionItemVariants({ theme }), className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  icon = "chevron",
  ...props
}: AccordionPrimitive.Trigger.Props & {
  icon?: "chevron" | "plus";
}) {
  const theme = use(AccordionThemeContext);
  return (
    <AccordionPrimitive.Header className="flex w-full">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(accordionTriggerVariants({ theme }), className)}
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
  const theme = use(AccordionThemeContext);
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={accordionContentVariants({ theme })}
      {...props}
    >
      <div className={cn(accordionContentInnerVariants({ theme }), className)}>
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
