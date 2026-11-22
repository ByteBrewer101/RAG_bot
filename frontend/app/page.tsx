import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Footer } from "@/components/landing/footer";
import { PageBlurTransition } from "@/components/motion/page-blur-transition";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-transparent text-foreground">
      <Navbar />
      <PageBlurTransition>
        <main className="flex-1">
          <Hero />
          <Features />
          <HowItWorks />
        </main>
        <Footer />
      </PageBlurTransition>
    </div>
  );
}
