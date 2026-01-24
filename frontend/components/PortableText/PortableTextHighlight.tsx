type PortableTextHighlightProps = {
  children: React.ReactNode;
  textColor?:
    | "white"
    | "black"
    | "neon"
    | "gunmetal"
    | "ash"
    | "charcoal"
    | "silver"
    | "alabaster"
    | "platinum"
    | "porcelain";
  backgroundColor?:
    | "white"
    | "black"
    | "neon"
    | "gunmetal"
    | "ash"
    | "charcoal"
    | "silver"
    | "alabaster"
    | "platinum"
    | "porcelain";
};

export const PortableTextHighlight = ({
  children,
  textColor,
  backgroundColor,
}: PortableTextHighlightProps) => {
  let textColorClass = "";
  if (textColor === "neon") {
    textColorClass = "text-neon";
  } else if (textColor === "white") {
    textColorClass = "text-white";
  } else if (textColor === "black") {
    textColorClass = "text-black";
  } else if (textColor === "gunmetal") {
    textColorClass = "text-gunmetal";
  } else if (textColor === "ash") {
    textColorClass = "text-ash";
  } else if (textColor === "charcoal") {
    textColorClass = "text-charcoal";
  } else if (textColor === "silver") {
    textColorClass = "text-silver";
  } else if (textColor === "alabaster") {
    textColorClass = "text-alabaster";
  } else if (textColor === "platinum") {
    textColorClass = "text-platinum";
  } else if (textColor === "porcelain") {
    textColorClass = "text-porcelain";
  }

  let backgroundColorClass = "";
  if (backgroundColor === "neon") {
    backgroundColorClass = "bg-neon";
  } else if (backgroundColor === "white") {
    backgroundColorClass = "bg-white";
  } else if (backgroundColor === "black") {
    backgroundColorClass = "bg-black";
  } else if (backgroundColor === "gunmetal") {
    backgroundColorClass = "bg-gunmetal";
  } else if (backgroundColor === "ash") {
    backgroundColorClass = "bg-ash";
  } else if (backgroundColor === "charcoal") {
    backgroundColorClass = "bg-charcoal";
  } else if (backgroundColor === "silver") {
    backgroundColorClass = "bg-silver";
  } else if (backgroundColor === "alabaster") {
    backgroundColorClass = "bg-alabaster";
  } else if (backgroundColor === "platinum") {
    backgroundColorClass = "bg-platinum";
  } else if (backgroundColor === "porcelain") {
    backgroundColorClass = "bg-porcelain";
  }

  return (
    <span className={`${textColorClass} ${backgroundColorClass}`}>
      {children}
      {"\u200B"}
    </span>
  );
};
