import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { cn } from "cnfast";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { GridGuideline } from "@/components/layout/GridGuideline/GridGuideline";
import { Lenis } from "@/components/layout/GSAP/Lenis";
import { GSAPRuntime } from "@/components/layout/GSAP/Runtime";
import { ScrollToTopOnNavigate } from "@/components/layout/GSAP/ScrollToTopOnNavigate";
import { ScrollRestoration } from "@/components/layout/ScrollRestoration/ScrollRestoration";
import { fontBody, fontHeading, fontMono } from "@/lib/styles/fonts";
import "./globals.css";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID!;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <link rel="icon" href="/favicon.ico" />
      {isProduction && GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <body
        className={cn(
          "relative min-h-svh bg-white text-black antialiased",
          fontBody.variable,
          fontHeading.variable,
          fontMono.variable,
        )}
      >
        <div className="root">
          <NuqsAdapter>
            <Lenis>
              <ScrollToTopOnNavigate />
              {children}
              {!isProduction && <GridGuideline />}
              {!isProduction && <ScrollRestoration />}
              {isProduction && <Analytics />}
              <GSAPRuntime />
            </Lenis>
          </NuqsAdapter>
        </div>
      </body>
    </html>
  );
}
