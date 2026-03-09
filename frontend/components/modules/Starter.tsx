import { Eyebrow } from "@/components/primitives/Eyebrow/Eyebrow";
import { SanityLink } from "@/components/primitives/Link/SanityLink";

// ! DELETE AFTER PROJECT INITIALIZATION

export const Starter = () => {
  return (
    <section className="f-py-48/72 bg-white p-custom text-black">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Eyebrow>Engine Digital</Eyebrow>
          <h1 className="type-heading-4840">Starter Kit</h1>
          <p className="type-body-1640 text-balance text-black/50">
            Modern starter kit with Next.js, Tailwind CSS, Sanity, and Base/UI.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <SanityLink
            href="https://github.com/kevinvoED/ed-starter"
            id="cta"
            variant="ghost"
            width="fit"
            hasArrow={false}
            className="type-body-1450 rounded-none bg-black px-4 py-1.5 text-white hover:bg-black/90"
          >
            GitHub
          </SanityLink>
          <SanityLink
            href="http://localhost:3333/studio/structure"
            id="cta"
            variant="ghost"
            width="fit"
            hasArrow={false}
            className="type-body-1450 rounded-none bg-black px-4 py-1.5 text-white hover:bg-black/90"
          >
            Sanity Studio
          </SanityLink>
        </div>
      </div>
    </section>
  );
};
