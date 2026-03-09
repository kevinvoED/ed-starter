import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/sanity/lib/live";
import { DisableDraftMode } from "@/components/layout/DraftMode/DisableDraftMode";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { SkipToMain } from "@/components/layout/Header/SkipToMain";
import { Starter } from "@/components/modules/Starter";
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
      <main>
        <Starter />
        {children}
      </main>
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
      <Footer />
    </>
  );
}
