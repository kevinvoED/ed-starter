import { GoogleTagManager } from "@next/third-parties/google";
import { Lenis } from "@/components/layout/GSAP/Lenis";
import { GSAPRuntime } from "@/components/layout/GSAP/Runtime";
import { fontBody, fontHeading, fontMono } from "@/lib/styles/fonts";
import { cn } from "@/lib/utils/cn";
import "./globals.css";
import { ScrollRestoration } from "@/components/miscellaneous/ScrollRestoration";
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
          "type-body-1640 min-h-screen bg-gunmetal text-white antialiased",
          fontBody.variable,
          fontHeading.variable,
          fontMono.variable,
        )}
      >
        <NuqsAdapter>
          <Lenis>
            {children}
            <GSAPRuntime />
            <ScrollRestoration />
          </Lenis>
        </NuqsAdapter>
      </body>
    </html>
  );
}
