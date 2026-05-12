import { draftMode } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";
import { DraftModeOverlay } from "@/components/layout/DraftMode/DraftModeOverlay";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { SkipToMain } from "@/components/layout/Header/SkipToMain";
import { Banner } from "@/components/primitives/Banner/Banner";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SkipToMain />
      <Banner />
      <Header />
      <main>{children}</main>
      <SanityLive />
      {(await draftMode()).isEnabled && <DraftModeOverlay />}
      <Footer />
    </>
  );
}
