export const metaQuery = `
  meta{
    // use the title assigned in meta or the parent document title
    "title": coalesce(title, select(^.title[0]._type == "block" => pt::text(^.title), ^.title)),
    description,
    noindex,
    "relativeUrl": select(
      ^.slug.current == "index" => "/",
      ^._type == "post" => "/blog/" + ^.slug.current,
      ^._type == "post-index" => "/blog",
      ^._type == "case-study" => "/case-studies/" + ^.slug.current,
      ^._type == "case-study-index" => "/case-studies",
      ^._type == "resource" => "/resources/" + ^.slug.current,
      ^._type == "resource-index" => "/resources",
      ^._type == "platform-index" => "/platform",
      ^._type == "platform-child" => "/platform/" + ^.slug.current,
      ^._type == "solutions-child" => "/solutions/" + ^.slug.current,
      ^._type == "event" => "/events/" + ^.slug.current,
      ^._type == "events-index" => "/events",
      "/" + ^.slug.current
    ),
    // the dimensions are the recommended meta image size
    "image": coalesce(
      // use the image directly assigned in meta
      image.asset->url + "?w=1200&h=630&fit=max",
      // use the image directly on this document
      ^.image.asset->url + "?w=1200&h=630&fit=max",
      // find and use the first hero image
      select(^.blocks[0]._type match "hero*" => ^.blocks[0].image.asset->url + "?w=1200&h=630&fit=max", null),
      // find and use the organization image
      *[_type == "organization"][0].organization.image.asset->url + "?w=1200&h=630&fit=max"
    )
  }
`;
