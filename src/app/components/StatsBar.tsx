import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const stats = [
  { value: "~45", label: "Minute Scan", desc: "Head to mid-thigh in a single session" },
  { value: "2",   label: "Business Days", desc: "Report delivered to your patient portal" },
  { value: "Zero", label: "Radiation", desc: "Completely radiation-free MRI technology" },
  { value: "No",  label: "Referral Needed", desc: "Self-schedule — no physician required" },
];

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={ref} className="relative overflow-hidden"
      style={{ background: "#0c0e15", height: "100vh", scrollSnapAlign: "start", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: bgX }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(179,27,27,0.05) 25%, rgba(207,69,32,0.07) 50%, rgba(179,27,27,0.05) 75%, transparent 100%)" }} />
      </motion.div>
      <motion.div className="absolute top-0 left-0 h-px" style={{ background: "linear-gradient(to right, transparent, #b31b1b, #cf4520, #b31b1b, transparent)" }}
        initial={{ width: 0, left: "50%" }} animate={inView ? { width: "100%", left: "0%" } : {}} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      />

      <div className="relative h-full grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.12 }}
            className="group relative flex flex-col items-center justify-center text-center h-full px-8"
            style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
          >
            <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
              style={{ background: "radial-gradient(ellipse at center, rgba(179,27,27,0.05) 0%, transparent 70%)" }}
            />
            <div className="text-transparent bg-clip-text mb-4"
              style={{ fontSize: "clamp(2.8rem, 4.5vw, 4.5rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em", backgroundImage: "linear-gradient(135deg, #ffffff 40%, #94a3b8 100%)" }}>
              {stat.value}
            </div>
            <div style={{ fontSize: "16px", fontWeight: 600, color: "#8b96a8", marginBottom: "10px" }}>{stat.label}</div>
            <div style={{ fontSize: "13px", color: "#4a576b", maxWidth: "200px", lineHeight: 1.6 }}>{stat.desc}</div>
            <motion.div className="mt-8 h-px rounded-full" style={{ background: "linear-gradient(to right, #b31b1b, #e7751d)" }}
              initial={{ width: 0 }} animate={inView ? { width: 48 } : {}} transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div className="absolute bottom-0 left-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(179,27,27,0.3), transparent)" }}
        initial={{ width: 0, left: "50%" }} animate={inView ? { width: "100%", left: "0%" } : {}} transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
      />
    </section>
  );
}
