"use client";

import type { RESOURCE_TOPICS_COUNT_QUERYResult, Slug } from "@/sanity.types";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { parseAsString, useQueryStates } from "nuqs";
import { Dot } from "@/components/Dot/Dot";
import { kebabCase } from "es-toolkit/string";

type PostTopicItemProps = {
  _id: string;
  title: string | null;
  slug: Slug | null;
  logo: { asset?: { _ref: string } } | null;
  topicCount: RESOURCE_TOPICS_COUNT_QUERYResult;
};
export const PostTopicItem = ({
  slug,
  title,
  _id,
  topicCount,
}: PostTopicItemProps) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const [{ topic }, setQueryStates] = useQueryStates(
    {
      topic: parseAsString.withDefault("all"),
      page: parseAsString.withDefault("1"),
    },
    { shallow: false },
  );

  async function onSelect(item: string) {
    await setQueryStates({
      topic: item,
      page: null,
    });
  }

  useGSAP(() => {
    if (
      !containerRef.current ||
      !backgroundRef.current ||
      !textRef.current ||
      !dotRef.current
    ) {
      return;
    }

    gsap.set(textRef.current, { x: 0 });
    gsap.set(backgroundRef.current, { opacity: 0 });

    const handleMouseEnter = () => {
      if (!textRef.current) return;

      // Allow animation to trigger even if you quickly re-hover
      gsap.killTweensOf([
        textRef.current,
        backgroundRef.current,
        dotRef.current,
      ]);

      gsap.set(textRef.current, { x: 20, color: "#ffffff" });
      gsap.set(backgroundRef.current, {
        opacity: 1,
        width: "calc(100% + 20px)",
      });
      gsap.set(dotRef.current, { opacity: 1, x: -4 });
      gsap.to(dotRef.current, {
        x: 7,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (!textRef.current) return;

      gsap.killTweensOf([
        textRef.current,
        backgroundRef.current,
        dotRef.current,
      ]);

      gsap.to(textRef.current, {
        x: 0,
        color: "#000000",
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to(backgroundRef.current, {
        opacity: 0,
        width: "100%",
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(dotRef.current, {
        opacity: 0,
        x: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const container = containerRef.current;
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [topic, slug]);

  if (_id === "all" && !slug) {
    if (topic === "all") {
      return (
        <button
          type="button"
          disabled
          className="type-mono-1240 pointer-events-none relative flex items-center bg-black px-1 py-[1px] pr-[calc(0.25rem+20px)] text-left text-white uppercase"
        >
          <Dot color="neon" className="absolute top-1.5 left-1 translate-x-1" />
          <span className="relative z-10 translate-x-[20px]">
            {title} [{topicCount.totalTopicCount ?? 0}]
          </span>
        </button>
      );
    }
    return (
      <button
        type="button"
        ref={containerRef}
        className="relative flex items-center px-1 py-[1px]"
        onClick={() => onSelect("all")}
      >
        <div
          ref={backgroundRef}
          className="absolute inset-0 bg-black"
          aria-hidden="true"
        />

        <Dot
          color="neon"
          className="absolute top-1.5 left-1 translate-x-[-4px] opacity-0 will-change-transform"
          ref={dotRef}
        />

        <div
          className="!max-w-none type-mono-1240 relative z-10 w-full text-left uppercase"
          ref={textRef}
        >
          {title} [{topicCount.totalTopicCount ?? 0}]
        </div>
      </button>
    );
  }

  // Active topic button
  if (topic && slug?.current && kebabCase(topic) === kebabCase(slug.current)) {
    return (
      <button
        type="button"
        disabled
        className="type-mono-1240 pointer-events-none relative flex items-center bg-black px-1 py-[1px] pr-[calc(0.25rem+20px)] text-left text-white uppercase"
      >
        <Dot color="neon" className="absolute top-1.5 left-1 translate-x-1" />
        <span className="relative z-10 translate-x-[20px]">
          {" "}
          {title} [
          {topic === "all" ||
          !topic ||
          kebabCase(topic) === kebabCase(slug?.current ?? "")
            ? topicCount.topics?.find((c) => c._id === _id)?.count
            : 0}
          ]
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      ref={containerRef}
      className="relative flex items-center px-1 py-[1px]"
      onClick={() => onSelect(slug?.current ?? "")}
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-black"
        aria-hidden="true"
      />

      <Dot
        color="neon"
        className="absolute top-1.5 left-1 translate-x-[-4px] opacity-0 will-change-transform"
        ref={dotRef}
      />

      <div
        className="!max-w-none type-mono-1240 relative z-10 w-full text-left uppercase"
        ref={textRef}
      >
        {title} [
        {topic === "all" ||
        !topic ||
        kebabCase(topic) === kebabCase(slug?.current ?? "")
          ? topicCount.topics?.find((c) => c._id === _id)?.count
          : 0}
        ]
      </div>
    </button>
  );
};
