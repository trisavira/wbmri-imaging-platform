import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { StatsBar } from "./components/StatsBar";
import { WhatIsWBMRI } from "./components/WhatIsWBMRI";
import { WhyConsider } from "./components/WhyConsider";
import { Features } from "./components/Features";
import { BodyExplorer } from "./components/BodyExplorer";
import { Limitations } from "./components/Limitations";
import { Workflow } from "./components/Workflow";
import { ReportPreview } from "./components/ReportPreview";
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
    <div style={{
      background: "#0c0e15",
      fontFamily: "'Open Sans', system-ui, sans-serif",
      height: "100vh",
      overflowY: "scroll",
      scrollSnapType: "y mandatory",
      scrollBehavior: "smooth",
    }}>
      <Navbar />
      <Hero />
      <StatsBar />
      <WhatIsWBMRI />
      <WhyConsider />
      <Features />
      <BodyExplorer />
      <Limitations />
      <Workflow />
      <ReportPreview />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}
