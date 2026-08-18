import { defineQuery } from "next-sanity";
import { DRIVER_TEXT_QUERY } from "../driver/driver-text";

// @sanity-typegen-ignore
export const GLOBAL_MODULE_QUERY = defineQuery(`
  _type == "global-module" => moduleRef->module[0]{
    _type,
    "_key": ^._key,
    ${DRIVER_TEXT_QUERY},
  }
`);
