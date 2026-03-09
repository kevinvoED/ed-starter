import { GoogleTagManager } from "@next/third-parties/google";
import { Lenis } from "@/components/layout/GSAP/Lenis";
import { GSAPRuntime } from "@/components/layout/GSAP/Runtime";
import { fontBody, fontHeading, fontMono } from "@/lib/styles/fonts";
import { cn } from "@/lib/utils/cn";
import "./globals.css";
import { GridGuideline } from "@/components/layout/GridGuideline/GridGuideline";
import { ScrollRestoration } from "@/components/layout/ScrollRestoration/ScrollRestoration";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID!;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" />
      {isProduction && GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <body
        className={cn(
          "relative min-h-dvh bg-white text-[#131416] antialiased",
          fontBody.variable,
          fontHeading.variable,
          fontMono.variable,
        )}
      >
        <div className="root">
          <NuqsAdapter>
            <Lenis>
              {children}
              {!isProduction && <GridGuideline />}
              {!isProduction && <ScrollRestoration />}
              <GSAPRuntime />
            </Lenis>
          </NuqsAdapter>
        </div>
      </body>
    </html>
  );
}
