import { Hero } from "../components/HomeComponents/Hero";
import { Features } from "../components/HomeComponents/Features";
import { Arrivals } from "../components/HomeComponents/Arrivals";
import { Footer } from "../components/HomeComponents/Footer";
export function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <Arrivals />
        <Footer />
      </main>
    </>
  );
}
