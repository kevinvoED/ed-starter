import { cn } from "@/lib/utils";

type ResourceContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export const ResourceContainer = ({
  className,
  children,
}: ResourceContainerProps) => {
  return (
    <div
      className={cn("bg-platinum pt-31 md:pt-35", className)}
      data-nav-theme="light"
    >
      {children}
    </div>
  );
};
