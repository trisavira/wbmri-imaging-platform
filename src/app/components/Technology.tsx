import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Cpu, Database, Globe, Lock, ServerCrash, Layers3 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const PATIENT_URL =
  "https://images.unsplash.com/photo-1666214280165-20e3d73d70bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxNUkklMjBzY2FubmVyJTIwbWVkaWNhbCUyMGltYWdpbmclMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc4MDQ5Nzg4Mnww&ixlib=rb-4.1.0&q=80&w=1080";

const specs = [
  { icon: Cpu,         title: "GPU Inference Engine", value: "< 8 min",         sub: "Full-body AI processing",      color: "#e7751d" },
  { icon: Layers3,     title: "Sequence Library",      value: "24+",             sub: "Optimized MR protocols",       color: "#cf4520" },
  { icon: Database,    title: "Training Dataset",       value: "500K+",           sub: "Annotated imaging cases",      color: "#b31b1b" },
  { icon: Globe,       title: "Deployment",             value: "On-Prem / Cloud", sub: "Hybrid deployment",            color: "#cf4520" },
  { icon: Lock,        title: "Security",               value: "ISO 27001",       sub: "Certified infrastructure",     color: "#e7751d" },
  { icon: ServerCrash, title: "Uptime SLA",             value: "99.9%",           sub: "Enterprise-grade reliability", color: "#b31b1b" },
];

export function Technology() {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const sectionY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="technology" ref={ref} className="relative py-24 overflow-hidden" style={{ background: "#f8f9fb" }}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(207,69,32,0.5) 30%, rgba(231,117,29,0.8) 50%, rgba(207,69,32,0.5) 70%, transparent)" }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div style={{ y: sectionY }} className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image with parallax */}
          <motion.div ref={imgRef}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <motion.div style={{ y: imageY }} className="relative rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(207,69,32,0.2)", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
            >
              <ImageWithFallback src={PATIENT_URL} alt="Patient in WB-MRI scanner" className="w-full object-cover" style={{ height: "300px", filter: "saturate(0.85)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #f8f9fb 0%, transparent 50%)" }} />
              <motion.div
                className="absolute left-0 right-0 h-px"
                style={{ background: "linear-gradient(to right, transparent, rgba(231,117,29,0.9), transparent)", filter: "blur(1px)", boxShadow: "0 0 12px rgba(231,117,29,0.4)" }}
                animate={{ top: ["12%", "88%", "12%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((cls, i) => (
                <motion.div key={i} className={`absolute w-5 h-5 ${cls}`}
                  style={{ borderColor: "rgba(231,117,29,0.5)" }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                />
              ))}
            </motion.div>

            {/* Floating spec card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1, y: [0, -8, 0] } : {}}
              transition={{ opacity: { duration: 0.5, delay: 0.5 }, scale: { duration: 0.5, delay: 0.5 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
              className="absolute -bottom-8 -right-4 rounded-xl p-4"
              style={{ background: "#ffffff", border: "1px solid rgba(231,117,29,0.25)", boxShadow: "0 12px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(231,117,29,0.08)" }}
            >
              <div className="flex items-baseline gap-1.5 mb-0.5">
                <span className="text-transparent bg-clip-text" style={{ fontSize: "26px", fontWeight: 700, backgroundImage: "linear-gradient(135deg, #0f1117, #374151)" }}>3T</span>
                <span style={{ fontSize: "13px", color: "#e7751d" }}>Field Strength</span>
              </div>
              <p style={{ fontSize: "12px", color: "#6b7280" }}>Wide-bore 70cm gantry</p>
              <div className="mt-2.5 flex gap-1 items-end">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div key={i} className="w-1 rounded-full" style={{ background: `linear-gradient(to top, #b31b1b, #e7751d)` }}
                    animate={{ height: [6, 16, 6] }}
                    transition={{ duration: 0.7, delay: i * 0.09, repeat: Infinity, ease: "easeInOut" }} />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: "#b31b1b" }} />
                <span style={{ fontSize: "12px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>TECHNICAL SPECIFICATIONS</span>
              </div>
              <h2 className="mb-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, color: "#0f1117" }}>
                Built for enterprise{" "}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e7751d, #b31b1b)" }}>clinical scale</span>
              </h2>
              <p className="mb-8" style={{ fontSize: "15px", lineHeight: 1.75, color: "#374151" }}>
                Purpose-engineered hardware and software co-design — from magnet homogeneity to cloud inference pipelines — delivers consistent diagnostic quality at scale.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {specs.map((spec, i) => {
                const Icon = spec.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                    whileHover={{ y: -2, boxShadow: `0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px ${spec.color}30` }}
                    className="rounded-xl p-4 cursor-default bg-white"
                    style={{ border: `1px solid ${spec.color}25`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4" style={{ color: spec.color }} />
                      <span style={{ fontSize: "11px", color: "#6b7280" }}>{spec.title}</span>
                    </div>
                    <div className="text-transparent bg-clip-text" style={{ fontSize: "17px", fontWeight: 700, backgroundImage: `linear-gradient(135deg, ${spec.color}, ${spec.color}cc)` }}>{spec.value}</div>
                    <div style={{ fontSize: "11px", color: "#6b7280" }}>{spec.sub}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
