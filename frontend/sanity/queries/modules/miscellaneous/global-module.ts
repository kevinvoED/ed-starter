import { defineQuery } from "next-sanity";
import { CARD_EXAMPLE_QUERY } from "../card/card-example";
import { DRIVER_EXAMPLE_QUERY } from "../driver/driver-example";

// @sanity-typegen-ignore
export const GLOBAL_MODULE_QUERY = defineQuery(`
  _type == "global-module" => moduleRef->module[0]{
    _type,
    "_key": ^._key,
    ${CARD_EXAMPLE_QUERY},
    ${DRIVER_EXAMPLE_QUERY},
  }
`);
