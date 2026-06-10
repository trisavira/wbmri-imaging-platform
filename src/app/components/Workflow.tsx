import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { UserCheck, ScanLine, Cpu, FileText, Send, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: UserCheck,    title: "Patient Intake",       time: "5 min",     color: "#e7751d" },
  { icon: ScanLine,     title: "Acquisition",          time: "35–45 min", color: "#cf4520" },
  { icon: Cpu,          title: "AI Processing",        time: "~8 min",    color: "#b31b1b" },
  { icon: FileText,     title: "Structured Report",    time: "10 min",    color: "#cf4520" },
  { icon: Send,         title: "Distribution",         time: "< 1 min",   color: "#e7751d" },
  { icon: CheckCircle2, title: "Follow-up Scheduling", time: "Automated", color: "#b31b1b" },
];

export function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section id="workflow" ref={ref} className="relative flex items-center overflow-hidden" style={{ background: "#0c0e15", height: "100vh", scrollSnapAlign: "start" }}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(207,69,32,0.4) 30%, rgba(231,117,29,0.6) 50%, rgba(207,69,32,0.4) 70%, transparent)" }}
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div style={{ y }} className="relative max-w-6xl mx-auto px-6 w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "#b31b1b" }} />
            <span style={{ fontSize: "11px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>CLINICAL WORKFLOW</span>
            <div className="h-px w-8" style={{ background: "#b31b1b" }} />
          </div>
          <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em" }}>
            Referral to report in <span style={{ color: "#cf4520" }}>under 60 minutes</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-7 left-[calc(8.33%+28px)] right-[calc(8.33%+28px)] h-px"
            style={{ background: "rgba(255,255,255,0.06)" }} />
          <motion.div className="hidden lg:block absolute top-7 left-[calc(8.33%+28px)] h-px"
            style={{ background: "linear-gradient(to right, #e7751d, #b31b1b)", right: "calc(8.33% + 28px)" }}
            initial={{ scaleX: 0, originX: "left" }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          />

          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                  className="flex flex-col items-center text-center"
                >
                  <motion.div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4 relative z-10"
                    style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${step.color}30` }}
                    whileHover={{ borderColor: step.color, background: `${step.color}12`, boxShadow: `0 0 20px ${step.color}30` }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="w-5 h-5" style={{ color: step.color }} />
                  </motion.div>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#d1d8e4", marginBottom: "6px" }}>{step.title}</p>
                  <span style={{ fontSize: "11px", color: step.color, fontFamily: "monospace" }}>{step.time}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
