import { cn } from "@/lib/utils";

type ResourcePostListProps = {
  className?: string;
  id?: string;
  children: React.ReactNode;
};

export const ResourcePostList = ({
  className,
  id,
  children,
}: ResourcePostListProps) => {
  return (
    <div className={cn("grid-custom col-span-full gap-y-5", className)} id={id}>
      {children}
    </div>
  );
};
