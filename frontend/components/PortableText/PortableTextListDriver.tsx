import type { ResolvedLinkType } from "@/components/Button/Button";
import { DriverListItem } from "@/components/Driver/DriverListItem";

type PortableTextListDriverProps = {
  title?: string;
  items?: Array<{
    eyebrow?: string;
    link?: ResolvedLinkType;
    _type: "item";
    _key: string;
  }>;
};

export const PortableTextListDriver = ({
  title,
  items,
}: PortableTextListDriverProps) => {
  return (
    <div className="mb-12 space-y-4 lg:space-y-10">
      <h2 className="type-heading-4830">{title}</h2>

      <ul>
        {items?.map((item, index) => (
          <li key={item._key} className="group">
            {item.link && (
              <DriverListItem
                link={item.link}
                eyebrow={item.eyebrow}
                size="lg"
                className={`border-alabaster border-b ${index === items.length - 1 ? "border-b-0" : ""}`}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
