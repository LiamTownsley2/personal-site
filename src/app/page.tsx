import IndexHero from "@/components/index-hero";
import Main from "@/components/page-section";
import { SiteFooter } from "@/layouts/SiteFooter";
import { SiteHeader } from "@/layouts/SiteHeader";


export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <Main>
        <IndexHero />
      </Main>
      <SiteFooter />
    </div>
  );
}
