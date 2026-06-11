import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Heart, Users, Search, Star } from "lucide-react";

const profiles = [
  {
    icon: Heart,
    label: "Family History",
    sublabel: "Cancer or chronic disease",
    description: "If a parent, sibling, or close relative has been diagnosed with cancer or a chronic illness, Whole-Body MRI can provide an early baseline and help monitor your health proactively.",
    color: "#cf4520",
  },
  {
    icon: Star,
    label: "Proactive Health",
    sublabel: "Ages 30–60, health-conscious",
    description: "If you take an active role in your wellbeing — annual check-ups, regular exercise, preventive screenings — Whole-Body MRI adds a comprehensive layer of visibility to your preventive care routine.",
    color: "#e7751d",
  },
  {
    icon: Search,
    label: "Peace of Mind",
    sublabel: "Seeking a baseline snapshot",
    description: "For those who simply want to know more about what's happening inside their body, Whole-Body MRI provides a comprehensive, medically reviewed baseline — giving you clarity and confidence.",
    color: "#b31b1b",
  },
  {
    icon: Users,
    label: "Executive Health",
    sublabel: "Complement to annual programs",
    description: "Whole-Body MRI pairs naturally with executive health programs, providing a whole-body view that complements standard bloodwork, stress tests, and targeted screenings.",
    color: "#cf4520",
  },
];

export function WhyConsider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section id="why-consider" ref={ref} className="relative overflow-hidden"
      style={{ background: "#0c0e15", height: "100vh", scrollSnapAlign: "start" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(179,27,27,0.4) 30%, rgba(207,69,32,0.7) 50%, rgba(179,27,27,0.4) 70%, transparent)" }}
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3.5, repeat: Infinity }}
      />

      <motion.div style={{ y }} className="relative h-full flex flex-col justify-between max-w-7xl mx-auto px-10 w-full py-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: "#b31b1b" }} />
            <span style={{ fontSize: "11px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>IS THIS RIGHT FOR YOU</span>
            <div className="h-px w-8" style={{ background: "#b31b1b" }} />
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
            Who benefits most from{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e7751d, #b31b1b)" }}>
              Whole-Body MRI
            </span>
          </h2>
        </motion.div>

        {/* Profile cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1 mt-10">
          {profiles.map((p, i) => {
            const Icon = p.icon;
            const isHovered = hovered === i;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.1, type: "spring", stiffness: 100, damping: 18 }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                className="relative rounded-2xl p-6 flex flex-col cursor-default overflow-hidden"
                style={{
                  background: isHovered ? `${p.color}12` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isHovered ? p.color + "40" : "rgba(255,255,255,0.07)"}`,
                  transition: "background 0.3s, border-color 0.3s",
                }}
              >
                <motion.div animate={{ boxShadow: isHovered ? `0 0 40px ${p.color}20` : "none" }}
                  className="absolute inset-0 rounded-2xl pointer-events-none" transition={{ duration: 0.3 }} />

                <motion.div
                  animate={{ scale: isHovered ? 1.1 : 1, color: isHovered ? p.color : "#64748b" }}
                  transition={{ duration: 0.25 }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: isHovered ? `${p.color}18` : "rgba(255,255,255,0.05)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: isHovered ? p.color : "#64748b" }} />
                </motion.div>

                <div style={{ fontSize: "16px", fontWeight: 700, color: "#f1f5f9", marginBottom: "4px" }}>{p.label}</div>
                <div style={{ fontSize: "12px", color: p.color, marginBottom: "12px", fontWeight: 500 }}>{p.sublabel}</div>

                <motion.p
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10, height: isHovered ? "auto" : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.7, overflow: "hidden" }}
                >
                  {p.description}
                </motion.p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
          className="flex items-center gap-4 mt-8"
        >
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
          <span style={{ fontSize: "12px", color: "#3d4960", letterSpacing: "0.06em", textAlign: "center" }}>
            WHOLE-BODY MRI COMPLEMENTS — BUT DOES NOT REPLACE — YOUR STANDARD PREVENTIVE SCREENINGS
          </span>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
