export const ArrowRightIcon = ({
  className,
  strokeWidth = 1,
}: {
  className: string;
  strokeWidth: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      className={className}
      strokeWidth={strokeWidth}
    >
      <title>Arrow Right</title>
      <g clipPath="url(#clip0_3611_4127)">
        <path d="M1 5H10M10 5L6 0.5M10 5L6 9.5" stroke="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_3611_4127">
          <rect width="11" height="11" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
};
