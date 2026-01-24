import type { FOOTER_QUERYResult } from "@/sanity.types";
import { Button } from "@/components/Button/Button";
import { Dot } from "@/components/Dot/Dot";
import { FooterLink } from "@/components/Footer/FooterLink";
import { Icon } from "@/components/Icon/Icon";
import { SanityImage } from "@/components/Media/SanityImage";
import * as Accordion from "@radix-ui/react-accordion";

export const MobileFooter = ({ data }: { data: FOOTER_QUERYResult }) => {
  if (!data) {
    return null;
  }

  const {
    smallLogo,
    largeLogo,
    actionLinks,
    socialMediaLinks,
    bottomLinks,
    mainLinks,
  } = data[0];

  return (
    <footer className="grid-custom gap-y-18 bg-black p-custom pt-20 pb-6 text-white md:hidden">
      <div className="grid-custom col-span-full gap-y-15">
        {smallLogo && (
          <SanityImage
            image={smallLogo}
            sizes="32px"
            className="col-span-full size-8 object-contain"
          />
        )}

        <div className="col-span-2">
          {actionLinks?.map((actionLink) => (
            <Button
              key={actionLink._key}
              link={actionLink}
              variant="tertiary-neon"
              hasArrow={false}
            >
              {actionLink.title}
            </Button>
          ))}
        </div>

        <div className="col-span-2">
          {socialMediaLinks?.map((socialMediaLink) => (
            <FooterLink key={socialMediaLink._key} link={socialMediaLink} />
          ))}
        </div>

        <Accordion.Root
          type="single"
          collapsible
          className="col-span-full space-y-5"
        >
          {mainLinks?.map((item, _index) => (
            <Accordion.Item
              value={item._key}
              key={item._key}
              className="w-full"
            >
              <Accordion.Trigger className="group flex w-full justify-between border-alabaster border-b pb-4">
                <div className="flex items-center gap-x-5">
                  <h3 className="type-body-1250 flex items-center gap-3">
                    <Dot color="neon" />
                    {item.title}
                  </h3>
                </div>

                <div className="self-end">
                  <Icon
                    variant="category-x"
                    strokeWidth={0.2}
                    className="size-3 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-45"
                  />
                </div>
              </Accordion.Trigger>
              <Accordion.Content className="w-full overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                <div className="space-y-5 pt-5 pb-14">
                  {item.hasIndexPage && item.indexPageLink && (
                    <Button
                      link={item.indexPageLink[0]}
                      variant="tertiary-neon"
                    >
                      {item.indexPageLink[0].title}
                    </Button>
                  )}

                  {item.subCategories?.map((subCategory) => (
                    <div
                      key={subCategory._key}
                      className="flex flex-col gap-y-4"
                    >
                      {subCategory.title && (
                        <h4 className="type-body-1250 text-alabaster">
                          {subCategory.title}
                        </h4>
                      )}

                      <div className="space-y-px">
                        {subCategory.link.map((link) => (
                          <Button
                            key={link._key}
                            link={link}
                            variant="footer-link"
                            hasArrow={false}
                            className="!max-w-none w-full"
                          >
                            {link.title}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <div className="col-span-full space-y-1">
          {largeLogo && (
            <SanityImage
              image={largeLogo}
              sizes="100vw"
              className="col-span-full h-full max-h-fit w-full object-contain"
            />
          )}

          <div className="col-span-full flex flex-col gap-y-1">
            <ul className="flex flex-wrap gap-x-4">
              {bottomLinks?.map((link) => (
                <li key={link._key} className="flex flex-wrap gap-x-4">
                  <Button
                    key={link._key}
                    link={link}
                    variant="ghost"
                    className="!type-body-1050"
                    hasArrow={false}
                  >
                    {link.title}
                  </Button>
                </li>
              ))}
            </ul>

            <p className="type-body-1250 text-silver">
              &copy; {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
