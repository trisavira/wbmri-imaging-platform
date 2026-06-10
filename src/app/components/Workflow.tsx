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
  const y = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section id="workflow" ref={ref} className="relative overflow-hidden"
      style={{ background: "#0c0e15", height: "100vh", scrollSnapAlign: "start" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(207,69,32,0.4) 30%, rgba(231,117,29,0.6) 50%, rgba(207,69,32,0.4) 70%, transparent)" }}
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div style={{ y }} className="relative h-full flex flex-col justify-between max-w-7xl mx-auto px-10 w-full py-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: "#b31b1b" }} />
            <span style={{ fontSize: "11px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>CLINICAL WORKFLOW</span>
            <div className="h-px w-8" style={{ background: "#b31b1b" }} />
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
            Referral to report in{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e7751d, #b31b1b)" }}>under 60 minutes</span>
          </h2>
        </motion.div>

        {/* Steps — fills middle space */}
        <div className="relative flex-1 flex items-center" style={{ margin: "40px 0" }}>
          {/* Connector */}
          <div className="hidden lg:block absolute left-[calc(8.33%+36px)] right-[calc(8.33%+36px)] h-px"
            style={{ top: "36px", background: "rgba(255,255,255,0.06)" }} />
          <motion.div className="hidden lg:block absolute left-[calc(8.33%+36px)] h-px"
            style={{ top: "36px", background: "linear-gradient(to right, #e7751d, #b31b1b)", right: "calc(8.33% + 36px)" }}
            initial={{ scaleX: 0, originX: "left" }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          />
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-6 w-full">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <motion.div
                    className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-5 relative z-10"
                    style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${step.color}35` }}
                    whileHover={{ borderColor: step.color, background: `${step.color}12`, boxShadow: `0 0 28px ${step.color}35` }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="w-6 h-6" style={{ color: step.color }} />
                  </motion.div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#e2e8f0", marginBottom: "8px" }}>{step.title}</p>
                  <span style={{ fontSize: "13px", color: step.color, fontFamily: "monospace", fontWeight: 500 }}>{step.time}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer rule */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.9 }}
          className="flex items-center gap-4"
        >
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
          <span style={{ fontSize: "11px", color: "#3d4960", letterSpacing: "0.1em" }}>TOTAL TURNAROUND · UNDER 60 MINUTES</span>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
