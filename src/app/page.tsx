import Background from "@/components/common/background/Background";

import Navbar from "@/components/layout/navbar/Navbar";
import Hero from "@/components/sections/hero/Hero";
import Features from "@/components/sections/features/Features";
import AIPreview from "@/components/sections/ai-preview/AIPreview";
import DashboardPreview from "@/components/sections/dashboard-preview/DashboardPreview";
import CTA from "@/components/sections/cta/CTA";
import Footer from "@/components/layout/footer/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030712] text-white">
      <Background />

      <Navbar />

      <Hero />

      <Features />

      <AIPreview />

      <DashboardPreview />

      <CTA />

      <Footer />
    </main>
  );
}