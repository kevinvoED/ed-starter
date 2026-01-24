import { groq } from "next-sanity";
import { linkFields, linkFragment } from "../shared/link";

export const FOOTER_QUERY = groq`
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
    actionLinks[]{
      ${linkFields}
    },
    socialMediaLinks[]{
      ${linkFields}
    },
    mainLinks[]{
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
    bottomLinks[]{
      _key,
      ${linkFields}
    },
  }
`;
