import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Heart, Users, Search, Star, ChevronRight } from "lucide-react";

const profiles = [
  {
    icon: Heart,
    num: "01",
    label: "Family History",
    sublabel: "Cancer or chronic disease in your family",
    description: "If a parent, sibling, or close relative has been diagnosed with cancer or a chronic illness, Whole-Body MRI can provide an early baseline and help you monitor your health proactively over time.",
    color: "#cf4520",
  },
  {
    icon: Star,
    num: "02",
    label: "Proactive Health",
    sublabel: "Ages 30–60, health-conscious adults",
    description: "If you take an active role in your wellbeing, Whole-Body MRI adds a comprehensive layer of visibility to your preventive care routine — going beyond what a standard check-up captures.",
    color: "#e7751d",
  },
  {
    icon: Search,
    num: "03",
    label: "Peace of Mind",
    sublabel: "A complete baseline snapshot",
    description: "For those who simply want to know more about what's happening inside their body, Whole-Body MRI provides a medically reviewed, comprehensive baseline — giving you clarity and confidence.",
    color: "#b31b1b",
  },
  {
    icon: Users,
    num: "04",
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
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#b31b1b" }} />
              <span style={{ fontSize: "11px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>IS THIS RIGHT FOR YOU</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
              Who benefits most from{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e7751d, #b31b1b)" }}>
                Whole-Body MRI
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Profile strips */}
        <div className="flex flex-col flex-1 justify-center gap-0 mt-8">
          {profiles.map((p, i) => {
            const Icon = p.icon;
            const isHovered = hovered === i;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1, type: "spring", stiffness: 100, damping: 18 }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                className="relative flex items-center gap-8 cursor-default group"
                style={{
                  padding: "18px 24px",
                  borderBottom: i < profiles.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                  borderTop: i === 0 ? "1px solid rgba(0,0,0,0.06)" : "none",
                  background: isHovered ? "#f0f4f8" : "#ffffff",
                  transition: "background 0.25s",
                  borderRadius: "8px",
                  marginBottom: "6px",
                }}
              >
                {/* Accent line */}
                <motion.div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                  animate={{ opacity: isHovered ? 1 : 0, scaleY: isHovered ? 1 : 0 }}
                  style={{ background: p.color, transformOrigin: "top" }}
                  transition={{ duration: 0.25 }}
                />

                {/* Number */}
                <span className="shrink-0 w-8" style={{ fontSize: "12px", color: "#9ca3af", fontFamily: "monospace", fontWeight: 700 }}>{p.num}</span>

                {/* Icon */}
                <motion.div
                  animate={{ color: isHovered ? p.color : "#64748b", scale: isHovered ? 1.15 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: isHovered ? `${p.color}12` : "rgba(0,0,0,0.03)", border: `1px solid ${isHovered ? p.color + "30" : "rgba(0,0,0,0.08)"}`, transition: "background 0.25s, border-color 0.25s" }}
                >
                  <Icon className="w-5 h-5" style={{ color: isHovered ? p.color : "#6b7280" }} />
                </motion.div>

                {/* Label block */}
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: "17px", fontWeight: 700, color: isHovered ? "#111827" : "#1e293b", transition: "color 0.25s" }}>{p.label}</div>
                  <div style={{ fontSize: "12px", color: isHovered ? p.color : "#6b7280", transition: "color 0.25s", marginTop: "2px" }}>{p.sublabel}</div>
                </div>

                {/* Description — revealed on hover */}
                <motion.p
                  animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 16 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="hidden lg:block"
                  style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.65, maxWidth: "380px", pointerEvents: "none" }}
                >
                  {p.description}
                </motion.p>

                <motion.div animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8 }} transition={{ duration: 0.2 }} className="shrink-0">
                  <ChevronRight className="w-4 h-4" style={{ color: p.color }} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
          className="flex items-center gap-4"
        >
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
          <span style={{ fontSize: "11px", color: "#64748b", letterSpacing: "0.08em" }}>
            COMPLEMENTS — DOES NOT REPLACE — YOUR STANDARD PREVENTIVE SCREENINGS
          </span>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
