/**
 * Type style generator with clamp for responsive typography and font weight
 * @param {string} prefix - Prefix for the tw class name
 * @param {object} baseFont - Base font family and other consistent style properties
 * @param {number} minFontSize - Minimum font size in px
 * @param {number} maxFontSize - Maximum font size in px
 * @param {number} minLineHeight - Minimum line height in px
 * @param {number} maxLineHeight - Maximum line height in px
 * @param {number} fontWeight - Font weight value as a number (e.g., 400, 700)
 * @param {number} letterSpacing - Letter spacing in px
 */
const pxToRem = (px) => px / 16;

// Generate fluid types
const generateTypeFStyles = (
  prefix,
  baseFont,
  minFontSize,
  maxFontSize,
  minLineHeight,
  maxLineHeight,
  fontWeight,
  letterSpacing,
) => {
  const calculateClamp = (minValue, maxValue) => {
    const MAX_BREAKPOINT = 1512;
    const MIN_BREAKPOINT = 390;
    const slope = (maxValue - minValue) / (MAX_BREAKPOINT - MIN_BREAKPOINT);
    const baseRem = pxToRem(minValue) - pxToRem(slope * MIN_BREAKPOINT);
    return `clamp(${pxToRem(minValue)}rem, ${(slope * 100).toFixed(3)}vw + ${baseRem.toFixed(
      3,
    )}rem, ${pxToRem(maxValue)}rem)`;
  };

  return {
    [`${prefix}`]: {
      ...baseFont,
      fontSize: calculateClamp(minFontSize, maxFontSize),
      lineHeight: calculateClamp(minLineHeight, maxLineHeight),
      fontWeight,
      letterSpacing: `${letterSpacing / 16}rem`,
    },
  };
};

// Generate static types
const generateTypeStyles = (
  prefix,
  baseFont,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
) => {
  return {
    [`${prefix}`]: {
      ...baseFont,
      fontSize: `${fontSize / 16}rem`,
      lineHeight: `${lineHeight / 16}rem`,
      fontWeight,
      letterSpacing: `${letterSpacing / 16}rem`,
    },
  };
};

export default function typeGenerator() {
  return ({ addUtilities }) => {
    const baseSans = {
      fontFamily: "var(--font-sans)",
    };
    const baseMono = {
      fontFamily: "var(--font-mono)",
    };
    const sansFPrefix = ".typef-sans-";
    const sansPrefix = ".type-sans-";
    const monoPrefix = ".type-mono-";

    // fluid font is not used in the project for now, served as a reference
    const typeFSansStyles = {
      // 14 -> 16
      ...generateTypeFStyles(
        `${sansFPrefix}1640`,
        baseSans,
        14,
        16,
        14 * 1.3,
        16 * 1.3,
        400,
        0,
      ),
    };

    const typeSansStyles = {
      ...generateTypeStyles(
        `${sansPrefix}1440`,
        baseSans,
        14,
        14 * 1.42857,
        400,
        0.28,
      ),
      ...generateTypeStyles(
        `${sansPrefix}1450`,
        baseSans,
        14,
        14 * 1.42857,
        500,
        0.28,
      ),
      ...generateTypeStyles(
        `${sansPrefix}1640`,
        baseSans,
        16,
        16 * 1.5,
        400,
        0.16,
      ),
      ...generateTypeStyles(
        `${sansPrefix}1650`,
        baseSans,
        16,
        16 * 1.25,
        500,
        0.16,
      ),
      ...generateTypeStyles(
        `${sansPrefix}1840`,
        baseSans,
        18,
        18 * 1.5556,
        400,
        0,
      ),
      ...generateTypeStyles(
        `${sansPrefix}1850`,
        baseSans,
        18,
        18 * 1.5556,
        500,
        0,
      ),
      ...generateTypeStyles(
        `${sansPrefix}2440`,
        baseSans,
        24,
        24 * 1.33333,
        400,
        0,
      ),
      ...generateTypeStyles(
        `${sansPrefix}2450`,
        baseSans,
        24,
        24 * 1.33333,
        500,
        0.48,
      ),
      ...generateTypeStyles(
        `${sansPrefix}3240`,
        baseSans,
        32,
        32 * 1.25,
        400,
        0,
      ),
      ...generateTypeStyles(
        `${sansPrefix}3640`,
        baseSans,
        36,
        36 * 1.15,
        400,
        0.72,
      ),
      ...generateTypeStyles(
        `${sansPrefix}4040`,
        baseSans,
        40,
        40 * 1.2,
        400,
        0,
      ),
      ...generateTypeStyles(
        `${sansPrefix}4840`,
        baseSans,
        48,
        48 * 1.16667,
        400,
        0,
      ),
      ...generateTypeStyles(
        `${sansPrefix}5640`,
        baseSans,
        56,
        56 * 1.07143,
        400,
        -1.12,
      ),
      ...generateTypeStyles(
        `${sansPrefix}6440`,
        baseSans,
        64,
        64 * 1.09375,
        400,
        -1.28,
      ),
      ...generateTypeStyles(
        `${sansPrefix}12040`,
        baseSans,
        120,
        120 * 0.95,
        400,
        -2.4,
      ),

      ...generateTypeStyles(`${sansPrefix}8040`, baseSans, 80, 80, 400, -1.6),
    };

    const typeMonoStyles = {
      ...generateTypeStyles(
        `${monoPrefix}1040`,
        baseMono,
        10,
        10 * 1.8,
        400,
        0.8,
      ),
      ...generateTypeStyles(
        `${monoPrefix}1240`,
        baseMono,
        12,
        12 * 1.5,
        400,
        0.96,
      ),
    };

    addUtilities(
      {
        ...typeFSansStyles,
        ...typeSansStyles,
        ...typeMonoStyles,
      },
      ["responsive"],
    );
  };
}
