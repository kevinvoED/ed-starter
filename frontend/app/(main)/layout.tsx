import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/sanity/lib/live";
import { DisableDraftMode } from "@/components/layout/DraftMode/DisableDraftMode";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { Banner } from "@/components/primitives/Banner/Banner";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        id="skipToMain"
        className="absolute top-4 left-4 z-9999 -translate-y-16 bg-white px-3 py-1.5 text-black transition focus:translate-y-0"
      >
        Skip to main content
      </a>
      <Banner />
      <Header />
      <main>{children}</main>
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
