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
    const start = Date.now();
    const duration = 1800;
    const raf = requestAnimationFrame(function tick() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setVal(eased * to);
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
    <section ref={ref} className="relative overflow-hidden" style={{ background: "#0c0e15", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      {/* Animated gradient sweep */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: bgX }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(179,27,27,0.06) 25%, rgba(207,69,32,0.08) 50%, rgba(179,27,27,0.06) 75%, transparent 100%)" }} />
      </motion.div>

      {/* Top accent line that draws in */}
      <motion.div className="absolute top-0 left-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #cf4520, #e7751d, #cf4520, transparent)" }}
        initial={{ width: 0, left: "50%" }}
        animate={inView ? { width: "100%", left: "0%" } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative py-12 px-6 text-center"
              style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
            >
              {/* Hover glow */}
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center, rgba(207,69,32,0.06) 0%, transparent 70%)" }}
                transition={{ duration: 0.3 }}
              />

              <div className="text-transparent bg-clip-text"
                style={{ fontSize: "clamp(2.4rem, 4vw, 3.4rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em", backgroundImage: "linear-gradient(135deg, #ffffff 40%, #94a3b8 100%)" }}>
                <CountUp to={stat.value} suffix={stat.suffix} prefix={stat.prefix} decimals={stat.value % 1 !== 0 ? 1 : 0} />
              </div>
              <div className="mt-3" style={{ fontSize: "13px", fontWeight: 600, color: "#8b96a8" }}>{stat.label}</div>
              <div className="mt-1" style={{ fontSize: "11px", color: "#64748b", lineHeight: 1.5 }}>{stat.desc}</div>

              <motion.div className="mx-auto mt-5 h-px rounded-full"
                style={{ background: "linear-gradient(to right, #b31b1b, #e7751d)" }}
                initial={{ width: 0 }}
                animate={inView ? { width: 40 } : {}}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease: "easeOut" }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom accent */}
      <motion.div className="absolute bottom-0 left-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(207,69,32,0.3), transparent)" }}
        initial={{ width: 0, left: "50%" }}
        animate={inView ? { width: "100%", left: "0%" } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
      />
    </section>
  );
}
