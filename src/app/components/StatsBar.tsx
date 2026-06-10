import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const stats = [
  { value: 45, suffix: " min", label: "Whole-Body Scan Time", prefix: "<", desc: "Vertex to toes in a single session" },
  { value: 98.3, suffix: "%", label: "Detection Sensitivity", prefix: "", desc: "Validated across 10,000+ clinical cases" },
  { value: 12, suffix: "+", label: "Body Regions Covered", prefix: "", desc: "Single uninterrupted exam" },
  { value: 0, suffix: "", label: "Radiation Dose", prefix: "Zero", desc: "Safe for serial monitoring & pediatrics" },
];

function CountUp({ to, suffix, prefix, decimals = 0 }: { to: number; suffix: string; prefix: string; decimals?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || prefix === "Zero") return;
    const start = Date.now(); const duration = 1800;
    const raf = requestAnimationFrame(function tick() {
      const elapsed = Date.now() - start; const progress = Math.min(elapsed / duration, 1);
      setVal((1 - Math.pow(1 - progress, 4)) * to);
      if (progress < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [inView, to, prefix]);
  if (prefix === "Zero") return <span ref={ref}>Zero</span>;
  return <span ref={ref}>{prefix}{decimals > 0 ? val.toFixed(decimals) : Math.round(val)}{suffix}</span>;
}

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
      <motion.div className="absolute top-0 left-0 h-px" style={{ background: "linear-gradient(to right, transparent, #cf4520, #e7751d, #cf4520, transparent)" }}
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
              style={{ background: "radial-gradient(ellipse at center, rgba(207,69,32,0.05) 0%, transparent 70%)" }}
            />
            <div className="text-transparent bg-clip-text mb-5"
              style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em", backgroundImage: "linear-gradient(135deg, #ffffff 40%, #94a3b8 100%)" }}>
              <CountUp to={stat.value} suffix={stat.suffix} prefix={stat.prefix} decimals={stat.value % 1 !== 0 ? 1 : 0} />
            </div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "#8b96a8", marginBottom: "10px" }}>{stat.label}</div>
            <div style={{ fontSize: "13px", color: "#4a576b", maxWidth: "200px", lineHeight: 1.6 }}>{stat.desc}</div>
            <motion.div className="mt-8 h-px rounded-full" style={{ background: "linear-gradient(to right, #b31b1b, #e7751d)" }}
              initial={{ width: 0 }} animate={inView ? { width: 48 } : {}} transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div className="absolute bottom-0 left-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(207,69,32,0.3), transparent)" }}
        initial={{ width: 0, left: "50%" }} animate={inView ? { width: "100%", left: "0%" } : {}} transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
      />
    </section>
  );
}
