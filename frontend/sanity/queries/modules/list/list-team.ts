import { groq } from "next-sanity";
import { linkFields } from "../../shared/link";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const listTeamQuery = groq`
  _type == "list-team" => {
    _type,
    _key,
    eyebrow,
    staffMembers[]{
      _key,
      staff->{
        name,
        role,
        links[]{
          ${linkFields}
        },
        bio[]{
          ${portableTextPlainFragment}
        },
      },
      description[]{
        ${portableTextPlainFragment}
      },
      articles[]->{
        _key,
        _type,
        title,
        "href": select(
          _type == "case-study" => "/case-studies/" + slug.current,
          _type == "post" => "/blog/" + slug.current,
          _type == "resource" => "/resources/" + slug.current,
          _type == "event" => "/events/" + slug.current,
          "/" + slug.current
        ),
      },
  }
}
`;
