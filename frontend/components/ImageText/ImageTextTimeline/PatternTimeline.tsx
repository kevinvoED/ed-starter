import { cn } from "@/lib/utils";

export const PatternTimeline = ({
  className,
  hideFirstLine = false,
  hideLastLine = false,
  trimHalf = false,
}: {
  className?: string;
  hideFirstLine?: boolean;
  hideLastLine?: boolean;
  trimHalf?: boolean;
}) => {
  return (
    <svg
      width="23"
      height="100%"
      viewBox="0 0 23 381"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <g>
        <path
          d="M0 1L23 1"
          stroke="#b3b3b3"
          className={cn(hideFirstLine && "hidden")}
        />
        <path d="M0 10.5L9 10.5" stroke="#B3B3B3" />
        <path d="M0 20L9 20" stroke="#B3B3B3" />
        <path d="M0 29.5L9 29.5" stroke="#B3B3B3" />
        <path d="M0 39L9 39" stroke="#B3B3B3" />
        <path d="M0 48.5L9 48.5" stroke="#B3B3B3" />
        <path d="M0 58L9 58" stroke="#B3B3B3" />
        <path d="M0 67.5L9 67.5" stroke="#B3B3B3" />
        <path d="M0 77L9 77" stroke="#B3B3B3" />
        <path d="M0 86.5L9 86.5" stroke="#B3B3B3" />
        <path d="M0 96L9 96" stroke="#B3B3B3" />
        <path d="M0 105.5L9 105.5" stroke="#B3B3B3" />
        <path d="M0 115L9 115" stroke="#B3B3B3" />
        <path d="M0 124.5L9 124.5" stroke="#B3B3B3" />
        <path d="M0 134L9 134" stroke="#B3B3B3" />
        <path d="M0 143.5L9 143.5" stroke="#B3B3B3" />
        <path d="M0 153L9 153" stroke="#B3B3B3" />
        <path d="M0 162.5L9 162.5" stroke="#B3B3B3" />
        <path d="M0 172L9 172" stroke="#B3B3B3" />
        <path d="M0 181.5L9 181.5" stroke="#B3B3B3" />
        <path d="M0 191L9 191" stroke="#B3B3B3" />
        <path d="M0 200.5L9 200.5" stroke="#B3B3B3" />
        <path d="M0 210L9 210" stroke="#B3B3B3" />
        <path d="M0 219.5L9 219.5" stroke="#B3B3B3" />
        {!trimHalf && (
          <>
            <path d="M0 229L9 229" stroke="#B3B3B3" />
            <path d="M0 238.5L9 238.5" stroke="#B3B3B3" />
            <path d="M0 248L9 248" stroke="#B3B3B3" />
            <path d="M0 257.5L9 257.5" stroke="#B3B3B3" />
            <path d="M0 267L9 267" stroke="#B3B3B3" />
            <path d="M0 276.5L9 276.5" stroke="#B3B3B3" />
            <path d="M0 286L9 286" stroke="#B3B3B3" />
            <path d="M0 295.5L9 295.5" stroke="#B3B3B3" />
            <path d="M0 305L9 305" stroke="#B3B3B3" />
            <path d="M0 314.5L9 314.5" stroke="#B3B3B3" />
            <path d="M0 324L9 324" stroke="#B3B3B3" />
            <path d="M0 333.5L9 333.5" stroke="#B3B3B3" />
            <path d="M0 343L9 343" stroke="#B3B3B3" />
            <path d="M0 352.5L9 352.5" stroke="#B3B3B3" />
            <path d="M0 362L9 362" stroke="#B3B3B3" />
            <path d="M0 371.5L9 371.5" stroke="#B3B3B3" />
          </>
        )}
        {hideLastLine ? (
          <path
            d="M0 381L9 381"
            stroke="#B3B3B3"
            className={`${trimHalf && "hidden"}`}
          />
        ) : (
          <path
            d="M0 381L23 381"
            stroke="#414141"
            className={`${trimHalf && "hidden"}`}
          />
        )}
      </g>
    </svg>
  );
};
