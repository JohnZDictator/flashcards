import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import PricingSection from "@/components/PricingSection";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <PricingSection />
    </main>
  );
}
