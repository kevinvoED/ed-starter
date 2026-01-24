import { cn } from "@/lib/utils";

type ResourcePostContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export const ResourcePostContainer = ({
  className,
  children,
}: ResourcePostContainerProps) => {
  return (
    <div
      className={cn(
        "col-span-full mt-9 grid grid-cols-6 gap-2 md:gap-5 lg:col-span-10",
        className,
      )}
    >
      {children}
    </div>
  );
};
