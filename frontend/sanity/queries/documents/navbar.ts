import { groq } from "next-sanity";
import { imageFragment, logoFragment } from "../shared/image";
import { linkFields, linkFragment } from "../shared/link";
import { portableTextPlainFragment } from "../shared/portable-text-plain";

export const NAVBAR_QUERY = groq`
  *[_type == "navbar"]{
    _type,
    ${logoFragment},
    link[]{
      _type,
      _key,
      _type == "link" => {
        ${linkFields}
      },
      _type == "group" => {
        title,
        group[]{
          _type,
          _key,
          _type == "card" => {
            title,
            description[]{
              ${portableTextPlainFragment}
            },
            link{
              ${linkFields}
            }
          },
          _type == "link-group" => {
            title,
            ${linkFragment}
          },
          _type == "resources" => {
            resources[]->{
              "_type": "resource",
              _key,
              title,
              slug,
              "href": select(
                _type == "post" => "/blog/" + slug.current,
              ),
              ${imageFragment}
            }
          }
        }
      },
      _type == "divider" => {
        type,
      }
    },
    ctalink[]{
      ${linkFields}
    }
  }
`;
