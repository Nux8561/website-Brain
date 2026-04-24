import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServicesBento } from "@/components/ServicesBento";
import { Pourquoi } from "@/components/Pourquoi";
import { Process } from "@/components/Process";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { FindUsMap } from "@/components/FindUsMap";
import { Faq } from "@/components/Faq";
import { CtaFooter } from "@/components/CtaFooter";

export default function App() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ServicesBento />
        <Pourquoi />
        <Process />
        <Stats />
        <Testimonials />
        <FindUsMap />
        <Faq />
        <CtaFooter />
      </main>
    </div>
  );
}
