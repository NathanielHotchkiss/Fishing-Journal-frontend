import Hero from "../components/Hero";
import FeaturesGrid from "../components/FeaturesGrid";
import LogoCloud from "../components/LogoCloud";
import Footer from "../components/Footer"

export default function Home() {
  return (
    <div className="bg-zinc-800">
      <Hero />
      <FeaturesGrid />
      <LogoCloud />
      <Footer />
    </div>
  );
}
