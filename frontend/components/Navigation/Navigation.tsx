import type { NavigationQueryResult } from "@/sanity.types";

type NavigationProps = {
  data: NavigationQueryResult;
};

export const Navigation = ({ data }: NavigationProps) => {
  return (
    <div className="relative overflow-hidden py-8 lg:py-8">
      <div className="grid-custom container gap-y-6">
        <h1 className="col-span-full lg:col-span-5">{data?.title}</h1>
      </div>
    </div>
  );
};
