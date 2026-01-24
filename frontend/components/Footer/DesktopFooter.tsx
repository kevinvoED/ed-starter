import type { FOOTER_QUERYResult } from "@/sanity.types";
import { Button } from "@/components/Button/Button";
import { Dot } from "@/components/Dot/Dot";
import { FooterLink } from "@/components/Footer/FooterLink";
import { SanityImage } from "@/components/Media/SanityImage";
import { cn } from "@/lib/utils";

const getColSpan = (index: number) => {
  if (index === 0) {
    return "col-span-2 lg:col-span-6 grid-cols-6";
  }
  if (index === 3) {
    return "col-span-full lg:col-span-9 grid-cols-9";
  }
  return "col-span-2 lg:col-span-3 grid-cols-3";
};

export const DesktopFooter = ({ data }: { data: FOOTER_QUERYResult }) => {
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
    <footer className="md:grid-custom hidden bg-black p-custom pt-20 pb-6 text-white md:gap-y-18 lg:pt-18">
      <div className="grid-custom col-span-full">
        <div className="col-span-2 lg:col-span-3">
          {smallLogo && (
            <SanityImage
              image={smallLogo}
              sizes="40px"
              className="h-8 w-10 object-contain"
            />
          )}
          <div className="flex flex-col pt-14">
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

          <div className="flex flex-col pt-6">
            {socialMediaLinks?.map((socialMediaLink) => (
              <FooterLink key={socialMediaLink._key} link={socialMediaLink} />
            ))}
          </div>
        </div>
        {mainLinks?.map((mainLink, index) => (
          <div
            key={mainLink._key}
            className={cn(
              getColSpan(index),
              "grid auto-rows-max gap-4 lg:gap-5",
            )}
          >
            <div
              className={cn(
                "col-span-full flex w-full items-center gap-x-6 border-b border-b-gunmetal pb-4",
                mainLink.hasIndexPage && mainLink.indexPageLink
                  ? "flex-col items-start md:flex-row md:items-center"
                  : "items-center",
              )}
            >
              <Dot color="neon" />
              <h3 className="type-body-1250 py-1 text-silver">
                {mainLink.title}
              </h3>
              {mainLink.hasIndexPage && mainLink.indexPageLink && (
                <Button
                  link={mainLink.indexPageLink[0]}
                  variant="tertiary-neon"
                  hasArrow={false}
                >
                  {mainLink.indexPageLink[0].title}
                </Button>
              )}
            </div>

            {mainLink.subCategories?.map((subCategory) => (
              <div
                key={subCategory._key}
                className="col-span-3 flex flex-col gap-y-4"
              >
                <h4 className="type-body-1250 text-silver">
                  {subCategory.title}
                </h4>
                <div className="flex w-full flex-col">
                  {subCategory.link.map((link) => (
                    <FooterLink key={link._key} link={link} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="col-span-full flex flex-col gap-y-4">
        {largeLogo && (
          <SanityImage
            image={largeLogo}
            sizes="100vw"
            className="h-full max-h-fit w-full object-contain"
          />
        )}

        <div className="flex items-center justify-between">
          <ul className="flex flex-wrap gap-x-4">
            {bottomLinks?.map((link) => (
              <li key={link._key} className="flex flex-wrap gap-x-4">
                <Button
                  key={link._key}
                  link={link}
                  variant="ghost"
                  className="type-body-1250"
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
    </footer>
  );
};
