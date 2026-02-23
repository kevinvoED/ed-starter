import type * as React from "react";
import type { NAVBAR_QUERY_RESULT } from "@/sanity.types";
import { SanityImage } from "@/components/primitives/Image/SanityImage";
import { SanityLink } from "@/components/primitives/Link/SanityLink";
import { PortableText } from "@/components/primitives/PortableText/PortableText";
import { NavigationMenu } from "@base-ui/react/navigation-menu";

export const DesktopNavbar = ({ data }: { data: NAVBAR_QUERY_RESULT }) => {
  if (!data || data.length <= 0) return null;

  return (
    <NavigationMenu.Root className="min-w-max bg-white p-custom py-4 text-black">
      {data.map((item) => (
        <NavigationMenu.List
          key={item._key}
          className="relative flex items-center gap-4"
        >
          <li key={item.logo.asset?._id}>
            <figure>
              {item.logo && <SanityImage image={item.logo} sizes="100vw" />}
            </figure>
          </li>

          {item.mainLinks?.map((mainLink) => {
            if (mainLink._type === "standaloneLink") {
              return (
                <NavigationMenu.Item key={mainLink._key}>
                  <SanityLink
                    key={mainLink._key}
                    href={mainLink.link[0].href!}
                    id="nav"
                    variant="ghost"
                    width="fit"
                    hasArrow={false}
                    className={triggerClassName}
                  >
                    {mainLink.link[0].label}
                  </SanityLink>
                </NavigationMenu.Item>
              );
            }

            if (mainLink._type === "group") {
              return (
                <NavigationMenu.Item key={mainLink._key}>
                  <NavigationMenu.Trigger className={triggerClassName}>
                    {mainLink.title && <PortableText value={mainLink.title} />}
                    <NavigationMenu.Icon className="transition-transform duration-200 ease-in-out data-[popup-open]:rotate-180">
                      <ChevronDownIcon />
                    </NavigationMenu.Icon>
                  </NavigationMenu.Trigger>

                  <NavigationMenu.Content className={contentClassName}>
                    <div className="flex max-w-[400px] justify-between">
                      {mainLink.group?.map((item) => {
                        if (item._type === "link-group") {
                          return (
                            <div
                              key={item._key}
                              className="flex flex-col gap-4 divide-y divide-white"
                            >
                              <h3>
                                {item.title && (
                                  <PortableText value={item.title} />
                                )}
                              </h3>
                              <ul className="flex flex-col">
                                {item.link?.map((item) => (
                                  <li key={item._key}>
                                    <SanityLink
                                      key={item._key}
                                      href={item.href!}
                                      id="nav"
                                      variant="ghost"
                                      width="fit"
                                      hasArrow={false}
                                    >
                                      {item.label}
                                    </SanityLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              );
            }
            return null;
          })}
        </NavigationMenu.List>
      ))}

      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          sideOffset={10}
          collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
          collisionAvoidance={{ side: "none" }}
          className="box-border h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom] duration-[var(--duration)] ease-[var(--easing)] before:absolute before:content-[''] data-[instant]:transition-none data-[side=bottom]:before:top-[-10px] data-[side=left]:before:top-0 data-[side=right]:before:top-0 data-[side=bottom]:before:right-0 data-[side=left]:before:right-[-10px] data-[side=top]:before:right-0 data-[side=left]:before:bottom-0 data-[side=right]:before:bottom-0 data-[side=top]:before:bottom-[-10px] data-[side=bottom]:before:left-0 data-[side=right]:before:left-[-10px] data-[side=top]:before:left-0 data-[side=bottom]:before:h-2.5 data-[side=top]:before:h-2.5 data-[side=left]:before:w-2.5 data-[side=right]:before:w-2.5"
          style={{
            ["--duration" as string]: "0.35s",
            ["--easing" as string]: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <NavigationMenu.Popup className="data-[ending-style]:easing-[ease] relative h-[var(--popup-height)] w-[var(--popup-width)] origin-[var(--transform-origin)] rounded-lg bg-[canvas] text-white shadow-gray-200 shadow-lg outline outline-white transition-[opacity,transform,width,height,scale,translate] duration-[var(--duration)] ease-[var(--easing)] data-[ending-style]:scale-90 data-[starting-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[ending-style]:duration-150 min-[32rem]:w-[var(--popup-width)]">
            <NavigationMenu.Arrow className="flex transition-[left] duration-[var(--duration)] ease-[var(--easing)] data-[side=bottom]:top-[-7px] data-[side=left]:right-[-13px] data-[side=top]:bottom-[-8px] data-[side=right]:left-[-13px] data-[side=left]:rotate-90 data-[side=right]:-rotate-90 data-[side=top]:rotate-180">
              <ArrowSvg />
            </NavigationMenu.Arrow>
            <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
};

function ChevronDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
      <title>Chevron Down</title>
      <path d="M1 3.5L5 7.5L9 3.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <title>Arrow</title>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-[canvas]"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-white" // controls the border color of the arrow
      />
      <path d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z" />
    </svg>
  );
}

const triggerClassName =
  "box-border flex items-center justify-center gap-1.5 h-10 " +
  "px-2 min-[32rem]:px-3.5 m-0 rounded-md bg-gray-50 text-gray-900 font-medium " +
  "text-[0.925rem] min-[32rem]:text-base leading-6 select-none no-underline " +
  "hover:bg-gray-100 active:bg-gray-100 data-[popup-open]:bg-gray-100 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 focus-visible:relative";

const contentClassName =
  "w-[calc(100vw_-_40px)] h-full p-6 min-[32rem]:w-max min-[32rem]:min-w-[400px] min-[32rem]:w-max " +
  "transition-[opacity,transform,translate] duration-[var(--duration)] ease-[var(--easing)] " +
  "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 " +
  "data-[starting-style]:data-[activation-direction=left]:translate-x-[-50%] " +
  "data-[starting-style]:data-[activation-direction=right]:translate-x-[50%] " +
  "data-[ending-style]:data-[activation-direction=left]:translate-x-[50%] " +
  "data-[ending-style]:data-[activation-direction=right]:translate-x-[-50%]";
