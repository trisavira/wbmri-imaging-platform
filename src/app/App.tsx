import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { StatsBar } from "./components/StatsBar";
import { WhatIsWBMRI } from "./components/WhatIsWBMRI";
import { WhyConsider } from "./components/WhyConsider";
import { Features } from "./components/Features";
import { BodyExplorer } from "./components/BodyExplorer";
import { Limitations } from "./components/Limitations";
import { ClinicalData } from "./components/ClinicalData";
import { Workflow } from "./components/Workflow";
import { ReportPreview } from "./components/ReportPreview";
import { Technology } from "./components/Technology";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.style.background = "#0c0e15";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  return (
    <div
      style={{
        background: "#0c0e15",
        fontFamily: "'Open Sans', system-ui, sans-serif",
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
      }}
    >
      <Navbar />

      {/* Stage 1: Value proposition */}
      <Hero />
      <StatsBar />

      {/* Stage 2: What it is */}
      <WhatIsWBMRI />

      {/* Stage 3: Why consider it */}
      <WhyConsider />

      {/* Stage 4: Why choose WCM */}
      <Features />

      {/* Stage 5: What it detects */}
      <BodyExplorer />

      {/* Responsible positioning */}
      <Limitations />

      {/* Evidence */}
      <ClinicalData />

      {/* Stage 6: What to expect */}
      <Workflow />

      {/* Report experience */}
      <ReportPreview />

      {/* Technology & expertise */}
      <Technology />

      {/* Social proof */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Stage 7: Next step */}
      <CTASection />
      <Footer />
    </div>
  );
}
