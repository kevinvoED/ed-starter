import type { BlockProps } from "@/sanity/lib/fetch";
import { Transition } from "@/components/GSAP/Transition";
import { SanityImage } from "@/components/Media/SanityImage";
import { PortableText } from "@/components/PortableText/PortableText";

type ListGridLogoProps = BlockProps<"list-grid-logo">;

export const ListGridLogo = ({ title, logos }: ListGridLogoProps) => {
  // Inserting an empty logo space after every X logos where X follows 3,3,2,repeat...
  const createGridWithSpaces = () => {
    if (!logos || logos.length === 0) return [];

    const pattern = [3, 3, 2];
    const result = [];
    let logoIndex = 0;
    let patternIndex = 0;

    while (logoIndex < logos.length) {
      const itemsInRow = pattern[patternIndex % pattern.length];

      // Add logos
      for (let i = 0; i < itemsInRow && logoIndex < logos.length; i++) {
        result.push({ type: "logo", data: logos[logoIndex] });
        logoIndex++;
      }

      // Add empty space
      if (logoIndex < logos.length) {
        result.push({ type: "empty", key: crypto.randomUUID() });
      }

      patternIndex++;
    }

    return result;
  };

  const gridItems = createGridWithSpaces();

  return (
    <div
      className="grid-custom gap-y-15 p-custom py-60-100-220 lg:gap-y-20"
      data-nav-theme="light"
    >
      {title && (
        <Transition className="col-span-full lg:col-span-8">
          <h2>
            <PortableText
              value={title}
              className="typef-heading-32-48-64! text-balance"
            />
          </h2>
        </Transition>
      )}

      <ul className="grid-custom col-span-full gap-2 lg:gap-x-5 lg:gap-y-4">
        {gridItems.map((item, index) => {
          if (item.type === "empty") {
            return (
              <li
                key={item.key}
                className="hidden lg:col-span-2 lg:block"
                aria-hidden="true"
              />
            );
          }

          return (
            <li key={item?.data?._key} className="col-span-2">
              <Transition
                className="grid min-h-37.5 w-full place-items-center rounded-[2px] border border-silver border-dashed p-6 lg:col-span-2"
                delay={0.05 * index}
              >
                {item?.data?.logo && (
                  <SanityImage image={item.data.logo} sizes="100px" />
                )}
              </Transition>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
