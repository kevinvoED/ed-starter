import type { PrismTheme } from "prism-react-renderer";

export const spurTheme: PrismTheme = {
  plain: {
    color: "#FAFAFA",
    backgroundColor: "#141414",
  },
  styles: [
    {
      types: ["string"],
      style: {
        color: "#CEFF00",
      },
    },
    {
      types: ["keyword"],
      style: {
        color: "#569CD6",
      },
    },
    {
      types: ["function"],
      style: {
        color: "#DCDCAA",
      },
    },
  ],
};
