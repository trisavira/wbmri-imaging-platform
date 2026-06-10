import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Brain, ScanLine, BarChart3, Network } from "lucide-react";

const features = [
  { icon: ScanLine,   title: "Whole-Body Coverage",     description: "Vertex to toes in a single exam with consistent diagnostic quality across all anatomical regions.", color: "#e7751d" },
  { icon: Brain,      title: "AI-Assisted Detection",   description: "Deep learning trained on 500K+ cases automatically flags lesions, measures volumes, and tracks change.", color: "#cf4520" },
  { icon: BarChart3,  title: "Quantitative Biomarkers", description: "Standardized ADC maps, fat fraction, and T1/T2 relaxometry for objective, reproducible monitoring.", color: "#b31b1b" },
  { icon: Network,    title: "PACS Integration",        description: "Native DICOM, HL7 FHIR, and REST API connectivity with zero disruption to your existing workflow.", color: "#cf4520" },
];

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section id="platform" ref={ref} className="relative overflow-hidden"
      style={{ background: "#f8f9fb", height: "100vh", scrollSnapAlign: "start" }}
    >
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(207,69,32,0.5) 30%, rgba(231,117,29,0.8) 50%, rgba(207,69,32,0.5) 70%, transparent)" }}
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.08) 70%, transparent)" }} />

      <motion.div style={{ y }} className="relative h-full flex flex-col max-w-7xl mx-auto px-10 w-full py-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#b31b1b" }} />
              <span style={{ fontSize: "11px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>PLATFORM CAPABILITIES</span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#0f1117", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
              Everything a modern<br />imaging department needs
            </h2>
          </div>
          <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#6b7280", maxWidth: "340px" }}>
            Purpose-built for oncology, inflammatory disease, and preventive screening — integrated into your existing infrastructure.
          </p>
        </motion.div>

        {/* Cards — flex-1 so they fill remaining space */}
        <div className="grid grid-cols-2 lg:grid-cols-4 flex-1 gap-0"
          style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", overflow: "hidden" }}
        >
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative flex flex-col cursor-default bg-white overflow-hidden"
                style={{ borderRight: (i % 4 !== 3) ? "1px solid rgba(0,0,0,0.08)" : "none", padding: "10% 8%" }}
                whileHover={{ backgroundColor: "#fafafa" }}
              >
                <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                  style={{ background: `radial-gradient(ellipse at top left, ${feat.color}08 0%, transparent 60%)` }}
                />
                <motion.div whileHover={{ scale: 1.15 }} transition={{ duration: 0.2 }} className="mb-6">
                  <Icon className="w-7 h-7" style={{ color: feat.color }} />
                </motion.div>
                <h3 className="mb-3" style={{ fontSize: "17px", fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>{feat.title}</h3>
                <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7 }}>{feat.description}</p>
                <motion.div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: `linear-gradient(to right, ${feat.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
