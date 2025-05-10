import { SiteFooter } from "@/layouts/SiteFooter";
import { SiteHeader } from "@/layouts/SiteHeader";
import Home from "@/pages/Home";


export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <Home />
      <SiteFooter />
    </div>
  );
}
