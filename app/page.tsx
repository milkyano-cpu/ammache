import Header from "@/components/layouts/header";
import Hero from "@/components/sections/hero/hero";
import About from "@/components/sections/about/about";
import Stats from "@/components/sections/stats/stats";
import Projects from "@/components/sections/projects/projects";
import Studio from "@/components/sections/studio/studio";
import CTA from "@/components/sections/cta/cta";
import Footer from "@/components/layouts/footer"

export default function Home() {
  return (
    <main className="w-full">
      <Header/>
        <Hero/>
        <About />
        <Stats />
        <Projects />
        <Studio />
        <CTA />
      <Footer />
    </main>
  );
}
