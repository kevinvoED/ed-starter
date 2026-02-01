import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";

export default async function EDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
