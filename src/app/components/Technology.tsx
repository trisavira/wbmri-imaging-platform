import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ShieldCheck, Brain, Award, Microscope, Users2, BadgeCheck } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const SCANNER_URL =
  "https://images.unsplash.com/photo-1666214280165-20e3d73d70bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxNUkklMjBzY2FubmVyJTIwbWVkaWNhbCUyMGltYWdpbmclMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc4MDQ5Nzg4Mnww&ixlib=rb-4.1.0&q=80&w=1080";

const specs = [
  { icon: Microscope, title: "Scanner Technology", value: "3T MRI",        sub: "Wide-bore, high-field imaging",      color: "#e7751d" },
  { icon: Brain,      title: "AI Detection",       value: "AI-Enhanced",   sub: "Deep-learning assisted protocols",   color: "#cf4520" },
  { icon: Award,      title: "Radiologists",       value: "Subspecialty",  sub: "Expert review on every scan",        color: "#b31b1b" },
  { icon: ShieldCheck,title: "Radiation",          value: "Zero",          sub: "Completely radiation-free",          color: "#cf4520" },
  { icon: Users2,     title: "Referral Required",  value: "None",          sub: "Self-schedule directly",             color: "#e7751d" },
  { icon: BadgeCheck, title: "Accreditation",      value: "ACR",           sub: "American College of Radiology",      color: "#b31b1b" },
];

export function Technology() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const sectionY = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section id="technology" ref={ref} className="relative overflow-hidden"
      style={{ background: "#F8F2EE", height: "100vh", scrollSnapAlign: "start" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(179,27,27,0.5) 30%, rgba(207,69,32,0.8) 50%, rgba(179,27,27,0.5) 70%, transparent)" }}
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />

      <motion.div style={{ y: sectionY }} className="relative h-full flex items-center max-w-7xl mx-auto px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="relative">
            <motion.div style={{ y: imageY }} className="relative rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(179,27,27,0.2)", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
            >
              <ImageWithFallback src={SCANNER_URL} alt="3T MRI scanner at Weill Cornell Medicine" className="w-full object-cover" style={{ height: "320px", filter: "saturate(0.85)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #f8f9fb 0%, transparent 50%)" }} />
              <motion.div className="absolute left-0 right-0 h-px"
                style={{ background: "linear-gradient(to right, transparent, rgba(179,27,27,0.9), transparent)", filter: "blur(1px)" }}
                animate={{ top: ["12%", "88%", "12%"] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Floating badge */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1, y: [0, -8, 0] } : {}}
              transition={{ opacity: { duration: 0.5, delay: 0.5 }, scale: { duration: 0.5, delay: 0.5 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
              className="absolute -bottom-8 -right-4 rounded-xl p-4"
              style={{ background: "#FDF8F5", border: "1px solid rgba(179,27,27,0.2)", boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
            >
              <div className="flex items-baseline gap-1.5 mb-0.5">
                <span className="text-transparent bg-clip-text" style={{ fontSize: "24px", fontWeight: 700, backgroundImage: "linear-gradient(135deg, #0f1117, #374151)" }}>3T</span>
                <span style={{ fontSize: "13px", color: "#e7751d" }}>Wide-bore Scanner</span>
              </div>
              <p style={{ fontSize: "12px", color: "#666666" }}>Weill Cornell Imaging</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: "#b31b1b" }} />
                <span style={{ fontSize: "12px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>OUR TECHNOLOGY & EXPERTISE</span>
              </div>
              <h2 className="mb-3" style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", fontWeight: 700, color: "#111111", lineHeight: 1.2 }}>
                Advanced imaging meets <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e7751d, #b31b1b)" }}>expert oversight</span>
              </h2>
              <p className="mb-8" style={{ fontSize: "14px", lineHeight: 1.7, color: "#666666", maxWidth: "380px" }}>
                Our state-of-the-art 3T scanners combined with AI-enhanced protocols and subspecialty radiologist review deliver clinical-grade precision for your preventive care.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {specs.map((spec, i) => {
                const Icon = spec.icon;
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                    className="rounded-xl p-4 cursor-default bg-white"
                    style={{ border: `1px solid ${spec.color}20`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
                    animate={{ y: hovered === i ? -4 : 0, boxShadow: hovered === i ? `0 10px 28px rgba(0,0,0,0.1), 0 0 0 1px ${spec.color}30` : "0 1px 4px rgba(0,0,0,0.05)" }}
                    transition={{ duration: 0.25 }}
                    onHoverStart={() => setHovered(i)}
                    onHoverEnd={() => setHovered(null)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div animate={{ scale: hovered === i ? 1.2 : 1 }} transition={{ duration: 0.2 }}>
                        <Icon className="w-4 h-4" style={{ color: spec.color }} />
                      </motion.div>
                      <span style={{ fontSize: "11px", color: "#666666" }}>{spec.title}</span>
                    </div>
                    <div className="text-transparent bg-clip-text" style={{ fontSize: "17px", fontWeight: 700, backgroundImage: `linear-gradient(135deg, ${spec.color}, ${spec.color}cc)` }}>{spec.value}</div>
                    <motion.div
                      animate={{ opacity: hovered === i ? 1 : 0, y: hovered === i ? 0 : 6, height: hovered === i ? "auto" : 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ fontSize: "11px", color: "#666666", overflow: "hidden" }}
                    >{spec.sub}</motion.div>
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
