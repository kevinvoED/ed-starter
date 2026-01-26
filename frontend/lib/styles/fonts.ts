import localFont from "next/font/local";

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
