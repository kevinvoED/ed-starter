import { Button, type ResolvedLinkType } from "@/components/Button/Button";
import {
  type ResolvedImageType,
  SanityImage,
} from "@/components/Media/SanityImage";

type PortableTextPromoCardProps = {
  title: string;
  description: string;
  image: ResolvedImageType;
  link: ResolvedLinkType;
};

export const PortableTextPromoCard = ({
  title,
  description,
  image,
  link,
}: PortableTextPromoCardProps) => {
  return (
    <article className="mb-20 flex flex-col gap-5 bg-white p-6 lg:gap-0">
      {image && (
        <SanityImage
          image={image}
          sizes="140px"
          className="size-35 self-end object-contain"
        />
      )}
      <div className="space-y-4 lg:space-y-6">
        {title && <h3 className="typef-heading-32-48-64">{title}</h3>}
        {description && <p className="type-body-1640">{description}</p>}
        {link && (
          <Button link={link} variant="secondary-black" className="mt-4">
            {link.title}
          </Button>
        )}
      </div>
    </article>
  );
};
