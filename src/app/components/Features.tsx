import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Star, Users, FileText, Heart } from "lucide-react";

const features = [
  { icon: Star,      title: "Unmatched Imaging Expertise",    description: "Advanced 3T MRI scanners with AI-powered sequences refined to the highest clinical standards by our expert team.", color: "#e7751d" },
  { icon: Users,     title: "Dedicated Provider Support",     description: "A personalized provider guides you through the entire process — from scheduling to results — at every step.", color: "#cf4520" },
  { icon: FileText,  title: "Patient-Friendly Reports",       description: "Receive annotated images and clear findings by body region — written in plain language you can understand and share.", color: "#b31b1b" },
  { icon: Heart,     title: "Seamless Follow-up Care",        description: "If anything needs attention, our team coordinates direct access to Weill Cornell subspecialists for next steps.", color: "#cf4520" },
];

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="platform" ref={ref} className="relative overflow-hidden"
      style={{ background: "#f8f9fb", height: "100vh", scrollSnapAlign: "start" }}
    >
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(179,27,27,0.5) 30%, rgba(207,69,32,0.8) 50%, rgba(179,27,27,0.5) 70%, transparent)" }}
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.08) 70%, transparent)" }} />

      <motion.div style={{ y }} className="relative h-full flex flex-col max-w-7xl mx-auto px-10 w-full py-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -40, filter: "blur(6px)" }} animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#b31b1b" }} />
              <span style={{ fontSize: "11px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>WHY CHOOSE WEILL CORNELL</span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#0f1117", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
              World-class care,<br />from scan to follow-up
            </h2>
          </div>
          <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#9ca3af", maxWidth: "320px" }}>
            Hover each card to learn more
          </p>
        </motion.div>

        {/* Cards — description reveals on hover */}
        <div className="grid grid-cols-2 lg:grid-cols-4 flex-1 gap-0"
          style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", overflow: "hidden" }}
        >
          {features.map((feat, i) => {
            const Icon = feat.icon;
            const isHovered = hovered === i;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40, scale: 0.92, filter: "blur(4px)" }}
                animate={inView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, type: "spring", stiffness: 100, damping: 18 }}
                className="group relative flex flex-col cursor-default overflow-hidden"
                style={{
                  borderRight: (i % 4 !== 3) ? "1px solid rgba(0,0,0,0.08)" : "none",
                  background: isHovered ? "#ffffff" : "#fafafa",
                  padding: "10% 8%",
                  transition: "background 0.3s",
                }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
              >
                {/* Hover glow */}
                <motion.div className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ background: `radial-gradient(ellipse at top left, ${feat.color}10 0%, transparent 60%)` }}
                />

                {/* Icon — moves up on hover */}
                <motion.div
                  animate={{ marginBottom: isHovered ? "16px" : "32px" }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    animate={{ scale: isHovered ? 0.9 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-8 h-8" style={{ color: feat.color }} />
                  </motion.div>
                </motion.div>

                {/* Title */}
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#111827", lineHeight: 1.2, marginBottom: "12px" }}>
                  {feat.title}
                </h3>

                {/* Description — hidden until hover */}
                <motion.p
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 12, height: isHovered ? "auto" : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7, overflow: "hidden" }}
                >
                  {feat.description}
                </motion.p>

                {/* Bottom accent */}
                <motion.div className="absolute bottom-0 left-0 h-0.5"
                  animate={{ width: isHovered ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
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
