import type { ModuleProps } from "@/sanity/lib/fetch";
import { TextBoxReveal } from "@/components/animations/TextBoxReveal";
import { TextLineReveal } from "@/components/animations/TextLineReveal";
import { PortableText } from "@/components/primitives/PortableText/PortableText";

const Blob = ({
  background,
  animationDelay,
  className,
}: {
  background: string;
  animationDelay: string;
  className: string;
}) => {
  return (
    <div
      className={className}
      style={{
        background: background,
        filter: "blur(80px)",
        animationDelay: animationDelay,
      }}
    />
  );
};

export const HeroPrimary = ({
  title,
  description,
}: ModuleProps<"hero-primary">) => {
  return (
    <div className="grid-custom f-px-12/16 grid-rows-[auto_1fr] gap-10 overflow-x-clip pb-10 md:gap-20">
      <div className="f-pt-24/55 z-50 col-span-full flex max-h-fit flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-0">
        <TextBoxReveal
          animateOnScroll={false}
          as="h1"
          delay={0.3}
          className="max-w-200"
        >
          <PortableText
            value={title}
            as="Fragment"
            className="ftype type-heading-3230 to-type-heading-4830 md:text-balance"
          />
        </TextBoxReveal>
        <TextLineReveal animateOnScroll={false} delay={2} duration={1.2}>
          <PortableText
            value={description}
            className="max-w-prose text-charcoal"
          />
        </TextLineReveal>
      </div>

      <div className="relative col-span-full h-75 overflow-hidden rounded-3xl bg-debug-blue/45 md:h-100">
        <Blob
          animationDelay="-7s"
          background="radial-gradient(circle, #F8E8DB 0%, transparent 65%)"
          className="absolute -bottom-2/5 left-1/2 h-3/4 w-3/4 -translate-x-1/2 animate-blob-float rounded-full"
        />

        <Blob
          animationDelay="-2s"
          background="radial-gradient(circle, #FFD487 0%, transparent 45%)"
          className="absolute -right-1/10 -bottom-2/4 h-3/4 w-3/4 animate-blob-float rounded-full"
        />

        <Blob
          animationDelay="-6s"
          background="radial-gradient(circle, #C4DEE8 0%, transparent 100%)"
          className="absolute -right-1/4 -bottom-1/4 h-3/4 w-3/4 animate-blob-float rounded-full"
        />

        <Blob
          animationDelay="-1s"
          background="radial-gradient(circle, #F8E8DB 0%, transparent 40%)"
          className="absolute -right-1/4 -bottom-1/4 h-3/4 w-3/4 animate-blob-float rounded-full"
        />
      </div>
    </div>
  );
};
