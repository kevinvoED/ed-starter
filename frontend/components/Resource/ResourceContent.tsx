import { cn } from "@/lib/utils";

type ResourceContentProps = {
  className?: string;
  children: React.ReactNode;
};

export const ResourceContent = ({
  className,
  children,
}: ResourceContentProps) => {
  return (
    <div
      className={cn(
        "grid-custom mt-10 p-custom pb-20 lg:mt-14 lg:gap-y-9 lg:pb-35",
        className,
      )}
    >
      {children}
    </div>
  );
};
