// Removes "https" and "www" from the beginning of the Button href
export const sanitizeForId = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/^www\./, "");
