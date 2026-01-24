"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { spurTheme } from "@/components/Code/SpurTheme";
import { CustomEase } from "gsap/all";
import { Highlight } from "prism-react-renderer";

type CodeSnippetProps = {
  codeBlock: string;
  duration?: number;
  delay?: number;
  resetYPosition?: number;
  fontSize?: string;
  scale?: number;
};

gsap.registerPlugin(CustomEase);

const LINE_HEIGHT = 24;

export const CodeSnippet = ({
  codeBlock,
  duration = 1,
  delay = 0,
  resetYPosition = 72,
  fontSize = "1rem",
  scale = 1,
}: CodeSnippetProps) => {
  const preRef = useRef<HTMLPreElement>(null);
  const clampedScale = Math.min(Math.max(scale, 0.4), 1);

  useGSAP(() => {
    if (!preRef.current) return;

    // Clamp the scale between 0.4 and 1

    const timeline = gsap.timeline({
      repeat: -1,
      onRepeat: () => {
        delay = 0; // Reset delay to 0 after the first animation cycle finishes
      },
      delay: delay,
    });

    const lines = codeBlock.split("\n").filter((v) => v);
    const lineCount = lines.length;

    // Immediately set the initial state so the code is not visible
    gsap.set(preRef.current, { opacity: 1 });
    gsap.set(preRef.current, { y: resetYPosition });

    for (let i = 0; i < lineCount; i++) {
      timeline.to(preRef.current, {
        y: resetYPosition - LINE_HEIGHT * clampedScale * (i + 1),
        duration: duration,
        repeat: 0,
        ease: CustomEase.create("customEase", "1, 0, 0, 1"),
      });
    }

    // Reeset the code back to its initial state with a short animation
    timeline.to(preRef.current, {
      y: resetYPosition,
      duration: 0,
      delay: 0,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <div
      id="code-container"
      className="overflow-hidden"
      style={{ height: LINE_HEIGHT * clampedScale * 3 }}
    >
      <Highlight theme={spurTheme} code={codeBlock} language="tsx">
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            ref={preRef}
            style={{
              ...style,
              transform: "translateY(-70px)",
              opacity: 0,
              fontSize,
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="text-charcoal">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};
