import Header from "@/components/layouts/header";
import Hero from "@/components/sections/hero/hero";
import Footer from "@/components/layouts/footer"

export default function Home() {
  return (
    <main className="w-full">
      <Header/>
        <Hero/>
      <Footer />
    </main>
  );
}
