import { cn } from "@/lib/utils";

type ResourceFilterContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export const ResourceFilterContainer = ({
  className,
  children,
}: ResourceFilterContainerProps) => {
  return (
    <div
      className={cn(
        "col-span-full lg:col-span-2 lg:row-start-2 lg:divide-y lg:divide-alabaster",
        className,
      )}
    >
      {children}
    </div>
  );
};
