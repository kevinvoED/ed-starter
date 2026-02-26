import localFont from "next/font/local";

/*
 * Custom fonts are loaded using localFont from next/font/local
 * @docs: https://nextjs.org/docs/app/getting-started/fonts#local-fonts
 *
 * Place custom font files in public/fonts.
 * Typical projects will always have a fontHeading, fontBody, and sometimes fontMono variables.
 * These variables are used in frontend/app/globals.css and frontend/app/layout.tsx
 */

export const fontHeading = localFont({
  src: [
    {
      path: "../../public/fonts/KMR-Apparat-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/KMR-Apparat-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/KMR-Apparat-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-heading",
});

export const fontBody = localFont({
  src: [
    {
      path: "../../public/fonts/Inter-VariableFont.ttf",
      style: "normal",
    },
    {
      path: "../../public/fonts/Inter-VariableFont.ttf",
      style: "italic",
    },
  ],
  variable: "--font-body",
});

export const fontMono = localFont({
  src: [
    {
      path: "../../public/fonts/FragmentMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/FragmentMono-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-mono",
});
