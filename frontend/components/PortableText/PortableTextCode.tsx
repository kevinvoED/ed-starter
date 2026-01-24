import type { Code as CodeType } from "@/sanity.types";
import { Highlight, themes } from "prism-react-renderer";

export const PortableTextCode = ({ language, filename, code }: CodeType) => {
  if (!code) return null;

  return (
    <div className="my-4 grid min-w-full overflow-x-auto rounded-lg border border-border bg-accent text-xs lg:text-sm">
      <div className="type-mono-1240 flex items-center justify-between border-border border-b px-4 py-2 text-foreground">
        {filename && <div>{filename || ""}</div>}
        {/* {code && <CopyButton code={code || ""} />} */}
      </div>
      <Highlight
        theme={themes.vsLight}
        code={code}
        language={language || "typescript"}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={{
              ...style,
              padding: "1.5rem",
              margin: 0,
              overflow: "auto",
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
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
