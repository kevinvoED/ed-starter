import type { ModuleBlock } from "@/components/ModuleBuilder";
import MyErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import { PortableTextHighlightModule } from "@/components/PortableText/PortableTextModule";
import { Text2ColNude } from "@/components/Text/Text2Col";

export type SimpleModuleBuilderProps = {
  blocks: Extract<
    ModuleBlock,
    { _type: "text-2-col" } | { _type: "portable-text-content-highlight" }
  >[];
};

/** A simpler block loop for nested modules. Be aware of recursive blocks! */
export const SimpleModuleBuilder: React.FC<
  SimpleModuleBuilderProps & Omit<React.HTMLAttributes<HTMLDivElement>, "title">
> = ({ blocks, ...rest }) => {
  return (
    <MyErrorBoundary>
      {blocks.map((block, index) => {
        if ("_type" in block === false) {
          throw new Error("Malformed block");
        }

        if (block._type === "text-2-col") {
          return (
            <Text2ColNude key={block._type + index} {...rest} {...block} />
          );
        }

        if (block._type === "portable-text-content-highlight") {
          return (
            <div key={block._type + index} {...rest}>
              <PortableTextHighlightModule {...block} />
            </div>
          );
        }

        throw new Error(`Missing component for ${JSON.stringify(block)}`);
      })}
    </MyErrorBoundary>
  );
};

export default SimpleModuleBuilder;
