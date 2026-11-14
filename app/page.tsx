import { Approach } from "@/components/Approach";
import { Capabilities } from "@/components/Capabilities";
import { Clients } from "@/components/Clients";
import { Contact } from "@/components/Contact";
import { Domains } from "@/components/Domains";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Stats } from "@/components/Stats";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Clients />
        <Domains />
        <Capabilities />
        <Work />
        <Approach />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
