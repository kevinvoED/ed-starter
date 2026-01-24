const MIN_VW = 340;
const MID_VW = 1512;
const MAX_VW = 3840;

/**
 * Convert pixel value to rem. Assumes a base font size of 16px.
 * @param {number} px The pixel value to convert.
 * @returns {number} The equivalent rem value.
 */
const pxToRem = (px) => px / 16;

/**
 * Generate a responsive fluid value with two or three breakpoints.
 * When max value is omitted, creates a single linear function from minVw to midVw.
 * When max value is provided, creates a piecewise linear function with two segments.
 * @param {number} valueAtMinVw - The pixel value at the minimum viewport width.
 * @param {number} valueAtMidVw - The pixel value at the middle viewport width.
 * @param {number} [valueAtMaxVw] - The pixel value at the maximum viewport width (optional).
 * @param {number} [minVw=MIN_VW] - The minimum viewport width in pixels.
 * @param {number} [midVw=MID_VW] - The middle viewport width in pixels.
 * @param {number} [maxVw=MAX_VW] - The maximum viewport width in pixels.
 * @param {boolean} [scaleUp=false] - Whether to allow scaling beyond the max viewport.
 * @returns {string} A CSS function string using clamp() and max()/min().
 */

const generateFluidValue = (
  valueAtMinVw,
  valueAtMidVw,
  valueAtMaxVw,
  minVw = MIN_VW,
  midVw = MID_VW,
  maxVw = MAX_VW,
  scaleUp = false,
) => {
  const minVwRem = pxToRem(minVw);
  const midVwRem = pxToRem(midVw);
  const valueAtMinRem = pxToRem(valueAtMinVw);
  const valueAtMidRem = pxToRem(valueAtMidVw);

  // Calculate slope and intercept for first segment (minVw to midVw)
  const slope1 = (valueAtMidRem - valueAtMinRem) / (midVwRem - minVwRem);
  const intercept1 = valueAtMinRem - slope1 * minVwRem;
  const segment1 = `${(slope1 * 100).toFixed(4)}vw + ${intercept1.toFixed(4)}rem`;

  // Three-value case
  const maxVwRem = pxToRem(maxVw);
  const valueAtMaxRem = pxToRem(valueAtMaxVw);

  const minValue = Math.min(valueAtMinVw, valueAtMidVw, valueAtMaxVw);
  const maxValue = Math.max(valueAtMinVw, valueAtMidVw, valueAtMaxVw);

  if (scaleUp) {
    // For scaleUp: use mid→max slope so it scales correctly beyond maxVw
    const slope = (valueAtMaxRem - valueAtMidRem) / (maxVwRem - midVwRem);
    const intercept = valueAtMaxRem - slope * maxVwRem;
    const segment = `${(slope * 100).toFixed(4)}vw + ${intercept.toFixed(4)}rem`;

    // Clamp to min at bottom, hit mid exactly at midVw, hit max at maxVw, scale beyond
    return `max(${pxToRem(minValue)}rem, min(max(${segment1}, ${segment}), ${segment}))`;
  }

  // For non-scaleUp: use min→mid slope and clamp at max
  return `clamp(${pxToRem(minValue)}rem, ${segment1}, ${pxToRem(maxValue)}rem)`;
};

/**
 * Generate fluid spacing utilities for padding with two or three breakpoints.
 * @param {object} config - Configuration object for the fluid spacing styles.
 * @param {number} config.minPadding - Padding value at minVw in pixels.
 * @param {number} config.midPadding - Padding value at midVw in pixels.
 * @param {number} [config.maxPadding] - Padding value at maxVw in pixels (optional).
 * @param {number} [config.minVw=MIN_VW] - The minimum viewport width in pixels.
 * @param {number} [config.midVw=MID_VW] - The middle viewport width in pixels.
 * @param {number} [config.maxVw=MAX_VW] - The maximum viewport width in pixels.
 * @param {boolean} [config.scaleUp=true] - Flag to enable scaling beyond maxVw.
 * @returns {object} A style object for Tailwind's `addUtilities`.
 */
const generateFluidPadding = ({
  minPadding,
  midPadding,
  maxPadding,
  minVw = MIN_VW,
  midVw = MID_VW,
  maxVw = MAX_VW,
  scaleUp = false,
}) => {
  const fluidValue = generateFluidValue(
    minPadding,
    midPadding,
    maxPadding,
    minVw,
    midVw,
    maxVw,
    scaleUp,
  );

  const className =
    maxPadding !== undefined && maxPadding !== null
      ? `${minPadding}-${midPadding}-${maxPadding}`
      : `${minPadding}-${midPadding}`;

  return {
    [`.p-${className}`]: {
      padding: fluidValue,
    },
    [`.px-${className}`]: {
      paddingLeft: fluidValue,
      paddingRight: fluidValue,
    },
    [`.py-${className}`]: {
      paddingTop: fluidValue,
      paddingBottom: fluidValue,
    },
    [`.pt-${className}`]: {
      paddingTop: fluidValue,
    },
    [`.pr-${className}`]: {
      paddingRight: fluidValue,
    },
    [`.pb-${className}`]: {
      paddingBottom: fluidValue,
    },
    [`.pl-${className}`]: {
      paddingLeft: fluidValue,
    },
  };
};

const generateFluidMargin = ({
  minMargin,
  midMargin,
  maxMargin,
  minVw = MIN_VW,
  midVw = MID_VW,
  maxVw = MAX_VW,
  scaleUp = false,
}) => {
  const fluidValue = generateFluidValue(
    minMargin,
    midMargin,
    maxMargin,
    minVw,
    midVw,
    maxVw,
    scaleUp,
  );

  const className =
    maxMargin !== undefined && maxMargin !== null
      ? `${minMargin}-${midMargin}-${maxMargin}`
      : `${minMargin}-${midMargin}`;

  return {
    [`.m-${className}`]: {
      margin: fluidValue,
    },
    [`.mx-${className}`]: {
      marginLeft: fluidValue,
      marginRight: fluidValue,
    },
    [`.my-${className}`]: {
      marginTop: fluidValue,
      marginBottom: fluidValue,
    },
    [`.mt-${className}`]: {
      marginTop: fluidValue,
    },
    [`.mr-${className}`]: {
      marginRight: fluidValue,
    },
    [`.mb-${className}`]: {
      marginBottom: fluidValue,
    },
    [`.ml-${className}`]: {
      marginLeft: fluidValue,
    },
  };
};

const generateFluidGap = ({
  minGap,
  midGap,
  maxGap,
  minVw = MIN_VW,
  midVw = MID_VW,
  maxVw = MAX_VW,
  scaleUp = false,
}) => {
  const fluidValue = generateFluidValue(
    minGap,
    midGap,
    maxGap,
    minVw,
    midVw,
    maxVw,
    scaleUp,
  );

  const className =
    maxGap !== undefined && maxGap !== null
      ? `${minGap}-${midGap}-${maxGap}`
      : `${minGap}-${midGap}`;

  return {
    [`.gap-${className}`]: {
      gap: fluidValue,
    },
    [`.gap-x-${className}`]: {
      columnGap: fluidValue,
    },
    [`.gap-y-${className}`]: {
      rowGap: fluidValue,
    },
  };
};

const generateFluidSpace = ({
  minSpace,
  midSpace,
  maxSpace,
  minVw = MIN_VW,
  midVw = MID_VW,
  maxVw = MAX_VW,
  scaleUp = false,
}) => {
  const fluidValue = generateFluidValue(
    minSpace,
    midSpace,
    maxSpace,
    minVw,
    midVw,
    maxVw,
    scaleUp,
  );

  const className =
    maxSpace !== undefined && maxSpace !== null
      ? `${minSpace}-${midSpace}-${maxSpace}`
      : `${minSpace}-${midSpace}`;

  return {
    [`.space-x-${className}`]: {
      "--tw-space-x-reverse": fluidValue,
      "& > :not([hidden]) ~ :not([hidden])": {
        "--tw-space-x": fluidValue,
        marginLeft:
          "calc(var(--tw-space-x) * calc(1 - var(--tw-space-x-reverse)))",
        marginRight: "calc(var(--tw-space-x) * var(--tw-space-x-reverse))",
      },
    },
    [`.space-y-${className}`]: {
      "--tw-space-y-reverse": fluidValue,
      "& > :not([hidden]) ~ :not([hidden])": {
        "--tw-space-y": fluidValue,
        marginTop:
          "calc(var(--tw-space-y) * calc(1 - var(--tw-space-y-reverse)))",
        marginBottom: "calc(var(--tw-space-y) * var(--tw-space-y-reverse))",
      },
    },
  };
};

/**
 * Generate all fluid spacing utilities (padding, margin, gap, and space) at once.
 * @param {object} config - Configuration object for the fluid spacing styles.
 * @param {number} config.minValue - Minimum spacing value at minVw in pixels.
 * @param {number} config.midValue - Middle spacing value at midVw in pixels.
 * @param {number} [config.maxValue] - Maximum spacing value at maxVw in pixels (optional).
 * @param {number} [config.minVw=MIN_VW] - The minimum viewport width in pixels.
 * @param {number} [config.midVw=MID_VW] - The middle viewport width in pixels.
 * @param {number} [config.maxVw=MAX_VW] - The maximum viewport width in pixels.
 * @param {boolean} [config.scaleUp=true] - Flag to enable scaling beyond maxVw.
 * @returns {object} A merged style object containing all spacing utilities.
 */
const generateAllFluidClasses = ({
  minValue,
  midValue,
  maxValue,
  minVw = MIN_VW,
  midVw = MID_VW,
  maxVw = MAX_VW,
  scaleUp = false,
}) => {
  return {
    ...generateFluidPadding({
      minPadding: minValue,
      midPadding: midValue,
      maxPadding: maxValue,
      minVw,
      midVw,
      maxVw,
      scaleUp,
    }),
    ...generateFluidMargin({
      minMargin: minValue,
      midMargin: midValue,
      maxMargin: maxValue,
      minVw,
      midVw,
      maxVw,
      scaleUp,
    }),
    ...generateFluidGap({
      minGap: minValue,
      midGap: midValue,
      maxGap: maxValue,
      minVw,
      midVw,
      maxVw,
      scaleUp,
    }),
    ...generateFluidSpace({
      minSpace: minValue,
      midSpace: midValue,
      maxSpace: maxValue,
      minVw,
      midVw,
      maxVw,
      scaleUp,
    }),
  };
};

/**
 * Main function to be exported for use in `tailwind.config.js`.
 * Try to maintain sorting the classes by min value from lowest to highest.
 */
export default function spacingGenerator() {
  return ({ addUtilities }) => {
    const spacingUtilities = {
      // 80-180-240
      ...generateAllFluidClasses({
        minValue: 80,
        midValue: 180,
        maxValue: 220,
      }),
      // 80-160-220
      ...generateAllFluidClasses({
        minValue: 80,
        midValue: 160,
        maxValue: 220,
      }),
      // 80-140-220
      ...generateAllFluidClasses({
        minValue: 80,
        midValue: 140,
        maxValue: 220,
      }),

      //60-180-220
      ...generateAllFluidClasses({
        minValue: 60,
        midValue: 180,
        maxValue: 220,
      }),
      //60-160-220
      ...generateAllFluidClasses({
        minValue: 60,
        midValue: 160,
        maxValue: 220,
      }),
      // 60-140-220
      ...generateAllFluidClasses({
        minValue: 60,
        midValue: 140,
        maxValue: 220,
      }),
      //60-120-220
      ...generateAllFluidClasses({
        minValue: 60,
        midValue: 120,
        maxValue: 220,
      }),
      //60-100-220
      ...generateAllFluidClasses({
        minValue: 60,
        midValue: 100,
        maxValue: 220,
      }),
      //60-80-160
      ...generateAllFluidClasses({
        minValue: 60,
        midValue: 80,
        maxValue: 160,
      }),

      //40-80-160
      ...generateAllFluidClasses({
        minValue: 40,
        midValue: 80,
        maxValue: 160,
      }),
      //40-60-120
      ...generateAllFluidClasses({
        minValue: 40,
        midValue: 60,
        maxValue: 120,
      }),

      // ONE-OFFS

      // 20-40-60 (one-off on AccordionIconScroll)
      ...generateAllFluidClasses({
        minValue: 20,
        midValue: 40,
        maxValue: 60,
      }),
      // 40-60-100 (one-off on HeroSecondary)
      ...generateAllFluidClasses({
        minValue: 40,
        midValue: 60,
        maxValue: 100,
      }),
      // 80-120-160 (one-off on HeroSecondary)
      ...generateAllFluidClasses({
        minValue: 80,
        midValue: 120,
        maxValue: 160,
      }),
    };

    addUtilities(spacingUtilities, ["responsive"]);
  };
}
