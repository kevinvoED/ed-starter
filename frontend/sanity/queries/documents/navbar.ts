import { defineQuery } from "next-sanity";
import {
  descriptionFragment,
  imageFragment,
  linkFragment,
  logoFragment,
} from "../fragments";
import { GROQ_FUNCTIONS, linkFields } from "../functions";

export const NAVBAR_QUERY = defineQuery(`
  ${GROQ_FUNCTIONS}

  *[_type == "navbar"]{
    _key,
    _type,
    ${logoFragment},
    mainLinks[]{
      _type,
      _key,
      _type == "standaloneLink" => {
        ${linkFragment}
      },
      _type == "group" => {
        title,
        group[]{
          _type,
          _key,
          _type == "card" => {
            title,
            ${descriptionFragment},
            ${linkFragment}
          },
          _type == "link-group" => {
            title,
            ${linkFragment}
          },
          _type == "resources" => {
            resources[]->{
              _id,
              "_type": "resource",
              title,
              slug,
              "href": select(
                _type == "post" => "/blog/" + slug.current,
                _type == "case-study" => "/case-studies/" + slug.current,
                _type == "resource" => "/resources/" + slug.current,
                _type == "event" => "/events/" + slug.current,
                _type == "news-article" => "/news/" + slug.current,
              ),
              "buttonText": select(
                _type == "post" => "Read Post",
                _type == "case-study" => "Read Case Study",
                _type == "resource" => "Learn More",
                _type == "event" => "Learn More",
                _type == "news-article" => "Read Article",
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
    ctaLinks[]{
      ${linkFields}
    }
  }
`);
