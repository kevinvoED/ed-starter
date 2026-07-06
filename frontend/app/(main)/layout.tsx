import { Suspense } from "react";
import { draftMode } from "next/headers";
import { getDynamicFetchOptions, SanityLive } from "@/sanity/lib/live";
import { DraftModeOverlay } from "@/components/layout/DraftMode/DraftModeOverlay";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { SkipToMain } from "@/components/layout/Header/SkipToMain";
import { Starter } from "@/components/layout/Starter/Starter";
import { Banner } from "@/components/primitives/Banner/Banner";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <>
      <SkipToMain />

      {isDraftMode ? (
        <Suspense fallback={null}>
          <DynamicBanner />
        </Suspense>
      ) : (
        <Banner perspective="published" stega={false} />
      )}

      {isDraftMode ? (
        <Suspense fallback={null}>
          <DynamicHeader />
        </Suspense>
      ) : (
        <Header perspective="published" stega={false} />
      )}

      <main className="w-full">
        <Suspense
          fallback={<section className="h-svh bg-debug-blue text-white" />}
        >
          <Starter />
        </Suspense>
        {children}
      </main>

      <SanityLive includeDrafts={isDraftMode} />
      {isDraftMode && <DraftModeOverlay />}

      {isDraftMode ? (
        <Suspense fallback={null}>
          <DynamicFooter />
        </Suspense>
      ) : (
        <Footer perspective="published" stega={false} />
      )}
    </>
  );
}

async function DynamicBanner() {
  const { perspective, stega } = await getDynamicFetchOptions();
  return <Banner perspective={perspective} stega={stega} />;
}

async function DynamicHeader() {
  const { perspective, stega } = await getDynamicFetchOptions();
  return <Header perspective={perspective} stega={stega} />;
}

async function DynamicFooter() {
  const { perspective, stega } = await getDynamicFetchOptions();
  return <Footer perspective={perspective} stega={stega} />;
}
