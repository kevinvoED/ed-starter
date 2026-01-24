import { GoogleTagManager } from "@next/third-parties/google";
import { Lenis } from "@/components/GSAP/Lenis";
import { GSAPRuntime } from "@/components/GSAP/Runtime";
import { fontBody, fontHeading, fontMono } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ScrollRestoration } from "@/components/GSAP/ScrollRestoration";
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
          "type-body-1640 min-h-screen bg-platinum text-black antialiased",
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
