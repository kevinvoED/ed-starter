import type { BlockProps } from "@/sanity/lib/fetch";
import { Button } from "@/components/Button/Button";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import { SanityImage } from "@/components/Media/SanityImage";
import { PortableTextFragment } from "@/components/PortableText/PortableText";
import { cn } from "@/lib/utils";

type Card3UpProps = BlockProps<"card-3-up">;

export const Card3Up = ({
  variant,
  eyebrow,
  title,
  description,
  link,
  cards,
}: Card3UpProps) => {
  const isDarkMode = variant === "dark";

  return (
    <div
      className={cn(
        "space-y-15 py-20 lg:space-y-14 lg:py-25",
        isDarkMode && "bg-black text-white",
      )}
      data-nav-theme={variant === "dark" ? "dark" : "light"}
    >
      <div className="p-custom">
        <div className="grid-custom gap-y-4 lg:gap-y-10">
          <div
            className={cn(
              "relative col-span-full space-y-4 lg:col-span-6 lg:space-y-0",
              isDarkMode && "text-white",
            )}
          >
            {eyebrow && (
              <Transition duration={1.5}>
                <Eyebrow
                  variant={isDarkMode ? "dot-neon" : "dot-black"}
                  className="top-2 left-0 lg:absolute"
                >
                  {eyebrow}
                </Eyebrow>
              </Transition>
            )}
            {title && (
              <Transition>
                <h2 className="typef-heading-32-48-64 lg:indent-2col">
                  <PortableTextFragment value={title} />
                </h2>
              </Transition>
            )}
          </div>

          <div className="col-span-full space-y-4 lg:col-span-4 lg:col-start-5 lg:space-y-6">
            {description && (
              <Transition>
                <p className="type-body-1440 text-balance">
                  <PortableTextFragment value={description} />
                </p>
              </Transition>
            )}

            {link?.map((link) => (
              <Transition key={link._key}>
                <Button
                  variant={isDarkMode ? "tertiary-neon" : "tertiary-black"}
                  link={link}
                >
                  {link.title}
                </Button>
              </Transition>
            ))}
          </div>
        </div>
      </div>

      <ul className="lg:grid-custom col-span-full flex gap-2 overflow-x-auto pl-6 last:pr-6 lg:gap-5 lg:overflow-x-visible lg:p-custom">
        {cards?.map((card, index) => (
          <li
            key={card._key}
            className={cn(
              "col-span-3 w-[73.5%] shrink-0 lg:w-full",
              cards.length === 2 ? "lg:col-span-6" : "lg:col-span-4",
            )}
          >
            <Transition
              animation="fadeInUp"
              delay={0.15 + index * 0.15}
              className={cn(
                "group flex h-full min-h-85 flex-col justify-between p-4 lg:min-h-125",
                isDarkMode
                  ? "border border-charcoal border-dashed bg-black text-white"
                  : "bg-white text-black",
                card.link &&
                  card.link.length > 0 &&
                  "transition-colors duration-500 ease-(--button-bezier) hover:bg-neon",
              )}
            >
              <div className="flex justify-between">
                <span
                  className={cn(
                    "py type-mono-1240 max-w-fit self-start bg-neon px-[2px] text-black",
                    card.link &&
                      card.link.length > 0 &&
                      "transition-colors duration-500 ease-(--button-bezier) group-hover:bg-black group-hover:text-white",
                  )}
                >
                  0{index + 1}
                </span>
                {card.logo && (
                  <SanityImage
                    image={card.logo}
                    sizes="(max-width: 768px) 38px, 62px"
                    className={cn(
                      "size-9.5 lg:size-18",
                      isDarkMode && "invert",
                      isDarkMode &&
                        card.link &&
                        card.link.length > 0 &&
                        "transition-all duration-500 ease-(--button-bezier) group-hover:invert-0",
                    )}
                  />
                )}
              </div>
              <div className="space-y-4 lg:space-y-3">
                {card.title && (
                  <h3
                    className={cn(
                      "type-heading-2030 lg:type-heading-3230 text-balance",
                      isDarkMode &&
                        card.link &&
                        card.link.length > 0 &&
                        "transition-colors duration-500 ease-(--button-bezier) group-hover:text-black",
                    )}
                  >
                    <PortableTextFragment value={card.title} />
                  </h3>
                )}
                {card.description && (
                  <p className="type-body-1440">
                    <PortableTextFragment
                      value={card.description}
                      className={`${
                        isDarkMode &&
                        card.link &&
                        card.link.length > 0 &&
                        "transition-colors duration-500 ease-(--button-bezier) group-hover:text-black"
                      }`}
                    />
                  </p>
                )}
                {card.link?.map((link) => (
                  <Button
                    key={link._key}
                    link={link}
                    variant={isDarkMode ? "tertiary-neon" : "tertiary-black"}
                    className={cn(
                      "whitespace-normal after:absolute after:inset-0 after:z-20 after:content-['']",
                      isDarkMode && "group-hover:text-black",
                    )}
                  >
                    {link.title}
                  </Button>
                ))}
              </div>
            </Transition>
          </li>
        ))}
      </ul>
    </div>
  );
};
