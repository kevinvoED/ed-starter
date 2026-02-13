// create a unique list of domains joined with a space
const scriptDomains = [
  ...new Set([
    "https://www.google-analytics.com",
    "https://www.google.com/recaptcha",
    "https://www.gstatic.com/recaptcha",
    "https://www.googletagmanager.com",
    "https://vercel.live",
    "https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.js",
  ]),
].join(" ");

const styleDomains = [
  ...new Set([
    "https://www.google.com/recaptcha",
    "https://www.gstatic.com/recaptcha",
    "http://fonts.googleapis.com",
    "https://www.googletagmanager.com",
    "https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.css",
  ]),
].join(" ");

const connectDomains = [
  ...new Set([
    "https://cdn.jsdelivr.net",
    "https://cdn.hightouch-events.com",
    "https://www.google-analytics.com",
    "https://www.google.com/recaptcha",
    "https://www.gstatic.com/recaptcha",
    "https://www.googletagmanager.com",
  ]),
].join(" ");

const frameDomains = [
  ...new Set(["https://www.googletagmanager.com", "https://vercel.live"]),
].join(" ");

const frameAncestorDomains = [...new Set(["http://localhost:3333"])].join(" ");

const imageDomains = [...new Set(["https://cdn.sanity.io"])].join(" ");

const csp = `
  default-src 'self';
  worker-src 'self' blob:;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: ${scriptDomains};
  style-src 'self' 'unsafe-inline' ${styleDomains};
  img-src 'self' data: blob: ${imageDomains};
  media-src 'self' https://cdn.sanity.io;
  connect-src 'self' data: blob: ${connectDomains};
  font-src 'self' data: https://fonts.gstatic.com;
  frame-src 'self' ${frameDomains};
  frame-ancestors 'self' ${frameAncestorDomains};
`;

/**
 * The CSP header that can be used in the array of headers
 * @see https://nextjs.org/docs/app/guides/content-security-policy#without-nonces
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
 */
const cspHeader = {
  key: "Content-Security-Policy",
  value: csp.replace(/\n/g, ""),
};

export default cspHeader;
