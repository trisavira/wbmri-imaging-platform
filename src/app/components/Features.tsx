import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Brain, ScanLine, BarChart3, Network } from "lucide-react";

const features = [
  { icon: ScanLine,   num: "01", title: "Whole-Body Coverage",     description: "Vertex to toes in a single exam with consistent diagnostic quality across all anatomical regions.", color: "#e7751d" },
  { icon: Brain,      num: "02", title: "AI-Assisted Detection",   description: "Deep learning trained on 500K+ cases automatically flags lesions, measures volumes, and tracks change.", color: "#cf4520" },
  { icon: BarChart3,  num: "03", title: "Quantitative Biomarkers", description: "Standardized ADC maps, fat fraction, and T1/T2 relaxometry for objective, reproducible monitoring.", color: "#b31b1b" },
  { icon: Network,    num: "04", title: "PACS Integration",        description: "Native DICOM, HL7 FHIR, and REST API connectivity with zero disruption to your existing workflow.", color: "#cf4520" },
];

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section id="platform" ref={ref} className="relative py-16 overflow-hidden" style={{ background: "#f8f9fb" }}>
      {/* Animated gradient top border */}
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(207,69,32,0.5) 30%, rgba(231,117,29,0.8) 50%, rgba(207,69,32,0.5) 70%, transparent)" }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.08) 70%, transparent)" }} />

      <motion.div style={{ y }} className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-8" style={{ background: "#b31b1b" }} />
            <span style={{ fontSize: "12px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>PLATFORM CAPABILITIES</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4" style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: "4px", overflow: "hidden" }}>
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                className="group relative p-5 cursor-default bg-white overflow-hidden"
                style={{
                  borderRight: (i % 4 !== 3) ? "1px solid rgba(0,0,0,0.08)" : "none",
                  borderBottom: "none",
                }}
                whileHover={{ backgroundColor: "#fafafa" }}
              >
                {/* Hover glow */}
                <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                  style={{ background: `radial-gradient(ellipse at top left, ${feat.color}08 0%, transparent 60%)` }}
                />

                <div className="mb-4 flex items-center gap-2">
                  <Icon className="w-4 h-4" style={{ color: feat.color }} />
                </div>
                <h3 className="mb-3" style={{ fontSize: "14px", fontWeight: 600, color: "#111827", lineHeight: 1.3 }}>{feat.title}</h3>
                <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: 1.75 }}>{feat.description}</p>

                {/* Bottom accent line */}
                <motion.div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-400 ease-out"
                  style={{ background: `linear-gradient(to right, ${feat.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10"
        >
          <motion.a href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm"
            style={{ background: "rgba(179,27,27,0.08)", border: "1px solid rgba(179,27,27,0.2)", color: "#b31b1b", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}
            whileHover={{ background: "rgba(179,27,27,0.14)", borderColor: "rgba(179,27,27,0.35)" }}
          >
            View full specification sheet →
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
