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
  scaleUp = true,
) => {
  const minVwRem = pxToRem(minVw);
  const midVwRem = pxToRem(midVw);
  const maxVwRem = pxToRem(maxVw);
  const valueAtMinRem = pxToRem(valueAtMinVw);
  const valueAtMidRem = pxToRem(valueAtMidVw);
  const valueAtMaxRem = pxToRem(valueAtMaxVw);

  // When valueAtMaxVw is undefined/null:
  if (!valueAtMaxVw) {
    const slope = (valueAtMidRem - valueAtMinRem) / (midVwRem - minVwRem);
    const intercept = valueAtMinRem - slope * minVwRem;
    const segment = `${(slope * 100).toFixed(4)}vw + ${intercept.toFixed(4)}rem`;

    if (scaleUp) {
      // Grows from min to mid, then continues growing infinitely
      return `max(${valueAtMinRem.toFixed(4)}rem, ${segment})`;
    }
    // Grows from min to mid, then caps at mid value
    return `clamp(${valueAtMinRem.toFixed(4)}rem, ${segment}, ${valueAtMidRem.toFixed(4)}rem)`;
  }

  // Segment 1: minVw to midVw
  const slope1 = (valueAtMidRem - valueAtMinRem) / (midVwRem - minVwRem);
  const intercept1 = valueAtMinRem - slope1 * minVwRem;
  const segment1 = `${(slope1 * 100).toFixed(4)}vw + ${intercept1.toFixed(4)}rem`;

  // Segment 2: midVw to maxVw (and beyond if scaleUp)
  const slope2 = (valueAtMaxRem - valueAtMidRem) / (maxVwRem - midVwRem);
  const intercept2 = valueAtMidRem - slope2 * midVwRem;
  const segment2 = `${(slope2 * 100).toFixed(4)}vw + ${intercept2.toFixed(4)}rem`;

  // First part: grows from valueAtMin to valueAtMid, then stops
  const part1 = `clamp(${valueAtMinRem.toFixed(4)}rem, ${segment1}, ${valueAtMidRem.toFixed(4)}rem)`;

  // Second part: stays at 0 until midVw, then grows from 0 to (valueAtMax - valueAtMid)
  const diff = `${segment2} - ${valueAtMidRem.toFixed(4)}rem`;
  const maxDiff = valueAtMaxRem - valueAtMidRem;

  if (scaleUp) {
    // No upper limit on second segment
    const part2 = `max(0rem, ${diff})`;
    return `calc(${part1} + ${part2})`;
  }

  // Cap second segment at maxDiff
  const part2 = `clamp(0rem, ${diff}, ${maxDiff.toFixed(4)}rem)`;
  return `calc(${part1} + ${part2})`;
};

/**
 * Generate responsive typography styles using fluid values with two or three breakpoints.
 * @param {string} prefix - The Tailwind class name prefix.
 * @param {object} baseFont - Shared font styles (e.g., fontFamily).
 * @param {object} config - Configuration object for the fluid type styles.
 * @param {object} config.min - Type config at minVw (fontSize, lineHeight, letterSpacing, fontWeight).
 * @param {object} config.mid - Type config at midVw (fontSize, lineHeight, letterSpacing, fontWeight).
 * @param {object} [config.max] - Type config at maxVw (fontSize, lineHeight, letterSpacing, fontWeight) (optional).
 * @param {number} [config.minVw=MIN_VW] - The minimum viewport width in pixels.
 * @param {number} [config.midVw=MID_VW] - The middle viewport width in pixels.
 * @param {number} [config.maxVw=MAX_VW] - The maximum viewport width in pixels.
 * @param {boolean} [config.scaleUp=false] - Flag to enable scaling beyond maxVw.
 * @returns {object} A style object for Tailwind's `addUtilities`.
 */
const generateFluidType = (
  prefix,
  baseFont,
  {
    min,
    mid,
    max,
    minVw = MIN_VW,
    midVw = MID_VW,
    maxVw = MAX_VW,
    scaleUp = true,
  },
) => ({
  [prefix]: {
    ...baseFont,
    fontSize: generateFluidValue(
      min.fontSize,
      mid.fontSize,
      max?.fontSize,
      minVw,
      midVw,
      maxVw,
      scaleUp,
    ),
    lineHeight: generateFluidValue(
      min.lineHeight,
      mid.lineHeight,
      max?.lineHeight,
      minVw,
      midVw,
      maxVw,
      scaleUp,
    ),
    fontWeight: min.fontWeight,
    letterSpacing: generateFluidValue(
      min.letterSpacing,
      mid.letterSpacing,
      max?.letterSpacing,
      minVw,
      midVw,
      maxVw,
      scaleUp,
    ),
  },
});

export default function typeGenerator() {
  return ({ addUtilities }) => {
    const fontHeading = {
      fontFamily: "var(--font-heading)",
      textWrap: "pretty",
    };
    const prefixFHeading = ".typef-heading-";

    const typeHeading2030 = {
      fontSize: 20,
      lineHeight: 22,
      letterSpacing: -0.32,
      fontWeight: 300,
    };

    const typeHeading2430 = {
      fontSize: 24,
      lineHeight: 28,
      letterSpacing: -0.48,
      fontWeight: 300,
    };

    const typeHeading2830 = {
      fontSize: 28,
      lineHeight: 29.12,
      letterSpacing: -0.84,
      fontWeight: 300,
    };

    const typeHeading3230 = {
      fontSize: 32,
      lineHeight: 34,
      letterSpacing: -0.96,
      fontWeight: 300,
    };

    const typeHeading4030 = {
      fontSize: 40,
      lineHeight: 41.6,
      letterSpacing: -3,
      fontWeight: 300,
    };

    const typeHeading4830 = {
      fontSize: 48,
      lineHeight: 48,
      letterSpacing: -2.112,
      fontWeight: 300,
    };

    const typeHeading6430 = {
      fontSize: 64,
      lineHeight: 61,
      letterSpacing: -3.328,
      fontWeight: 300,
    };
    const typeHeading8030 = {
      fontSize: 80,
      lineHeight: 80,
      letterSpacing: -4.8,
      fontWeight: 300,
    };
    const typeHeading12030 = {
      fontSize: 120,
      lineHeight: 120,
      letterSpacing: -7.44,
      fontWeight: 300,
    };

    const typeFHeadingStyles = {
      // 48-80
      ...generateFluidType(`${prefixFHeading}48-80`, fontHeading, {
        min: typeHeading4830,
        mid: typeHeading8030,
        scaleUp: false,
      }),
      // 20-28-32
      ...generateFluidType(`${prefixFHeading}20-28-32`, fontHeading, {
        min: typeHeading2030,
        mid: typeHeading2830,
        max: typeHeading3230,
        scaleUp: false,
      }),
      // 20-24-32
      ...generateFluidType(`${prefixFHeading}20-24-32`, fontHeading, {
        min: typeHeading2030,
        mid: typeHeading2430,
        max: typeHeading3230,
        scaleUp: false,
      }),
      // 24-40-48
      ...generateFluidType(`${prefixFHeading}24-32-48`, fontHeading, {
        min: typeHeading2430,
        mid: typeHeading3230,
        max: typeHeading4830,
        scaleUp: false,
      }),
      // 24-40-48
      ...generateFluidType(`${prefixFHeading}24-40-48`, fontHeading, {
        min: typeHeading2430,
        mid: typeHeading4030,
        max: typeHeading4830,
        scaleUp: false,
      }),
      // 32-48-64
      ...generateFluidType(`${prefixFHeading}32-48-64`, fontHeading, {
        min: typeHeading3230,
        mid: typeHeading4830,
        max: typeHeading6430,
        scaleUp: false,
      }),
      // 32-64-80
      ...generateFluidType(`${prefixFHeading}32-64-80`, fontHeading, {
        min: typeHeading3230,
        mid: typeHeading6430,
        max: typeHeading8030,
        scaleUp: false,
      }),
      // 48-64-80
      ...generateFluidType(`${prefixFHeading}48-64-80`, fontHeading, {
        min: typeHeading4830,
        mid: typeHeading6430,
        max: typeHeading8030,
        scaleUp: false,
      }),
      // 48-64-120
      ...generateFluidType(`${prefixFHeading}64-80-120`, fontHeading, {
        min: typeHeading6430,
        mid: typeHeading8030,
        max: typeHeading12030,
        scaleUp: false,
      }),
    };

    addUtilities(
      {
        ...typeFHeadingStyles,
      },
      ["responsive"],
    );
  };
}
