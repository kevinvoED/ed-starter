import type { BlockProps } from "@/sanity/lib/fetch";
import { Button } from "@/components/Button/Button";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import { SanityImage } from "@/components/Media/SanityImage";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";

type ListMetricProps = BlockProps<"list-metric">;

export const ListMetric = ({
  eyebrow,
  title,
  description,
  logo,
  metrics,
}: ListMetricProps) => {
  return (
    <div
      className="grid-custom gap-y-40-80-160 overflow-hidden py-80-140-220"
      data-nav-theme="light"
    >
      <div className="grid-custom col-span-full gap-y-4 p-custom lg:gap-y-0 lg:pr-0">
        {eyebrow && (
          <Transition className="col-span-full pb-4 lg:col-span-3 lg:pb-0">
            <Eyebrow variant="dot-black">{eyebrow}</Eyebrow>
          </Transition>
        )}

        <div className="col-span-full row-start-2 flex flex-col gap-y-6 lg:col-span-5 lg:col-start-5 lg:row-start-1 lg:gap-y-8">
          {title && (
            <Transition>
              <h2 className="typef-heading-32-48-64">
                <PortableTextFragment value={title} />
              </h2>
            </Transition>
          )}

          {description && (
            <Transition className="4xl:col-span-2 col-span-3 4xl:col-start-5 col-start-5 row-start-2 max-w-[40ch] text-balance">
              <PortableText value={description} />
            </Transition>
          )}
        </div>

        {logo && (
          <Transition className="col-span-2 col-start-4 row-start-2 hidden justify-self-end lg:col-start-12 lg:row-start-1 lg:block">
            <SanityImage
              image={logo}
              sizes="140px"
              className="h-full max-w-35 translate-x-8 object-contain"
            />
          </Transition>
        )}
      </div>

      <ul className="lg:grid-custom col-span-full flex gap-x-4 overflow-x-auto pb-2 pl-5 lg:grid lg:gap-x-0 lg:overflow-visible lg:pl-6">
        {metrics?.map((metric, index) => (
          <li
            key={metric._key}
            className="col-span-3 h-83 w-[62.5%] flex-shrink-0 lg:col-span-4 lg:w-full"
          >
            <Transition
              delay={0.25 + index * 0.15}
              className="flex h-full flex-col justify-between border-dashed-l pl-5"
            >
              {metric.eyebrow && (
                <Eyebrow variant="dot-black">{eyebrow}</Eyebrow>
              )}

              {metric.eyebrow ? (
                <div className="space-y-4 lg:space-y-6">
                  {metric.title && (
                    <h3 className="typef-heading-48-80">
                      <PortableTextFragment value={metric.title} />
                    </h3>
                  )}
                  {metric.description && (
                    <PortableText
                      value={metric.description}
                      className="lg:max-w-4/5"
                    />
                  )}
                  {metric.link?.map((link) => (
                    <Button
                      key={link._key}
                      link={link}
                      variant="tertiary-black"
                    >
                      {link.title}
                    </Button>
                  ))}
                </div>
              ) : (
                <>
                  {metric.title && (
                    <h3 className="typef-heading-48-80">
                      <PortableTextFragment value={metric.title} />
                    </h3>
                  )}
                  {metric.description && (
                    <PortableText
                      value={metric.description}
                      className="lg:max-w-4/5"
                    />
                  )}
                  {metric.link?.map((link) => (
                    <Button
                      key={link._key}
                      link={link}
                      variant="tertiary-black"
                    >
                      {link.title}
                    </Button>
                  ))}
                </>
              )}
            </Transition>
          </li>
        ))}
      </ul>
    </div>
  );
};
