import { linkFields } from "./link";

export const portableTextPlainFragment = `
  ...,
  markDefs[]{
    ...,
    _type == "link" => {
      ${linkFields}
    }
  },
  _type == "link" => {
    ${linkFields}
  },
`;
