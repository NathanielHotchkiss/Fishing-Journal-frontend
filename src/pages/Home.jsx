import ProductFeatures from "../components/ProductFeatures";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="bg-zinc-800">
      <Hero />
      <ProductFeatures />
    </div>
  );
}
