import { defineQuery } from "next-sanity";
import { linkFields, linkFragment } from "../sharedFragments";

export const FOOTER_QUERY = defineQuery(`
  *[_type == "footer"]{
    _key,
    _type,
    smallLogo{
      ...,
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      }
    },
    largeLogo{
      ...,
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      }
    },
    actionlink[]{
      ${linkFields}
    },
    socialMedialink[]{
      ${linkFields}
    },
    mainlink[]{
      _key,
      title,
      hasIndexPage,
      indexPageLink[]{
        ${linkFields}
      },
      subCategories[]{
        _key,
        title,
        ${linkFragment}
      }
    },
    bottomlink[]{
      _key,
      ${linkFields}
    },
  }
`);
