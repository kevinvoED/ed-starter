import { cn } from "cnfast";

/*
 * AspectRatio Component
 *
 * Configure default styling here.
 * Remember that styles defined here must be generic as they will be applied to all AspectRatio components.
 * If your style is unique, you can override the styles by passing into `className` prop.
 * Otherwise, you can conditionally render or apply styles in here by extending props.
 *
 * ---------------------
 * Usage Example: Basic
 * ---------------------
 *  <AspectRatio ratio={16/9}>
 *    <SanityImage image={image} sizes="(max-width: 768px) 100vw, 50vw" />
 *  </AspectRatio>
 */

type AspectRatioProps = {
  ratio: number;
};

function AspectRatio({
  ratio,
  className,
  ...props
}: AspectRatioProps & React.ComponentProps<"div">) {
  return (
    <div
      data-slot="aspect-ratio"
      style={
        {
          "--ratio": ratio,
        } as React.CSSProperties
      }
      className={cn("relative aspect-(--ratio)", className)}
      {...props}
    />
  );
}
export { AspectRatio };
