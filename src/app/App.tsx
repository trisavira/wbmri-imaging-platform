import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { StatsBar } from "./components/StatsBar";
import { Features } from "./components/Features";
import { BodyExplorer } from "./components/BodyExplorer";
import { ClinicalData } from "./components/ClinicalData";
import { Workflow } from "./components/Workflow";
import { Technology } from "./components/Technology";
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
      <Hero />
      <StatsBar />
      <Features />
      <BodyExplorer />
      <ClinicalData />
      <Workflow />
      <Technology />
      <CTASection />
      <Footer />
    </div>
  );
}
