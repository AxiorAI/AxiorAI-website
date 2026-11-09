import { Approach } from "@/components/Approach";
import { Capabilities } from "@/components/Capabilities";
import { Clients } from "@/components/Clients";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Nav } from "@/components/Nav";
import { Stats } from "@/components/Stats";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Capabilities />
        <Work />
        <Approach />
        <Stats />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
