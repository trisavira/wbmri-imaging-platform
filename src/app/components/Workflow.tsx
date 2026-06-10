import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { UserCheck, ScanLine, Cpu, FileText, Send, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: UserCheck,    step: "01", title: "Patient Intake",       description: "Automated eligibility check, contraindication screening, and scheduling via integrated EHR pull.",               time: "5 min",     color: "#e7751d" },
  { icon: ScanLine,     step: "02", title: "Acquisition",          description: "Standardized whole-body protocol: DWI, T1 Dixon, T2 STIR. Adaptive sequence optimization for patient size.",    time: "35–45 min", color: "#cf4520" },
  { icon: Cpu,          step: "03", title: "AI Processing",        description: "Automated reconstruction, registration, and lesion detection. Quantitative biomarker extraction in background.", time: "~8 min",    color: "#b31b1b" },
  { icon: FileText,     step: "04", title: "Structured Report",    description: "Pre-populated findings, lesion maps, volume measurements, and comparison deltas — ready for review.",            time: "10 min",    color: "#cf4520" },
  { icon: Send,         step: "05", title: "Distribution",         description: "One-click delivery to referring clinicians, oncology MDT, and patient portal via HL7 FHIR.",                    time: "< 1 min",   color: "#e7751d" },
  { icon: CheckCircle2, step: "06", title: "Follow-up Scheduling", description: "Longitudinal monitoring reminders, automated comparison loading, and outcome tracking close the care loop.",     time: "Automated", color: "#b31b1b" },
];

export function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="workflow" ref={ref} className="relative py-14 overflow-hidden" style={{ background: "#0c0e15" }}>
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      {/* Drifting aurora orbs */}
      <motion.div className="absolute pointer-events-none" style={{ top: "-20%", left: "-10%", width: "60%", height: "80%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(179,27,27,0.09) 0%, transparent 70%)", filter: "blur(80px)", y: orbY }}
        animate={{ x: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute pointer-events-none" style={{ bottom: "-10%", right: "-5%", width: "50%", height: "70%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(207,69,32,0.08) 0%, transparent 70%)", filter: "blur(100px)" }}
        animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Top accent */}
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(207,69,32,0.4) 30%, rgba(231,117,29,0.7) 50%, rgba(207,69,32,0.4) 70%, transparent)" }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{ y }} className="relative max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <motion.div className="h-px w-8" style={{ background: "#b31b1b" }}
              animate={{ width: [32, 48, 32] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
            <span style={{ fontSize: "12px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>CLINICAL WORKFLOW</span>
            <motion.div className="h-px w-8" style={{ background: "#b31b1b" }}
              animate={{ width: [32, 48, 32] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          </div>
          <h2 className="mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#ffffff" }}>
            From referral to report in{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e7751d, #b31b1b)" }}>under 60 minutes</span>
          </h2>
          <p style={{ fontSize: "16px", color: "#94a3b8", maxWidth: "520px", margin: "0 auto" }}>
            A streamlined end-to-end pathway designed to minimize patient burden and maximize clinical throughput.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector track */}
          <div className="hidden lg:block absolute top-10 left-[calc(8.33%+28px)] right-[calc(8.33%+28px)] h-px"
            style={{ background: "linear-gradient(to right, rgba(231,117,29,0.15), rgba(179,27,27,0.3), rgba(231,117,29,0.15))" }} />
          {/* Animated fill */}
          <motion.div className="hidden lg:block absolute top-10 left-[calc(8.33%+28px)] h-px"
            style={{ background: "linear-gradient(to right, #e7751d, #cf4520, #b31b1b)", right: "calc(8.33% + 28px)", filter: "blur(0.5px)", boxShadow: "0 0 8px rgba(207,69,32,0.4)" }}
            initial={{ scaleX: 0, originX: "left" }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative mb-4">
                    <motion.div
                      className="w-14 h-14 rounded-full flex items-center justify-center relative z-10"
                      style={{ background: "rgba(10,22,40,0.9)", border: `1px solid rgba(255,255,255,0.08)` }}
                      whileHover={{ borderColor: step.color, boxShadow: `0 0 28px ${step.color}50`, background: `${step.color}15` }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-5 h-5" style={{ color: step.color }} />
                    </motion.div>
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center z-20"
                      style={{ background: step.color, boxShadow: `0 0 10px ${step.color}70` }}>
                      <span style={{ fontSize: "9px", fontWeight: 700, color: "#fff", fontFamily: "monospace" }}>{step.step}</span>
                    </div>
                    {/* Pulse ring on hover */}
                    <motion.div className="absolute inset-0 rounded-full"
                      style={{ border: `1px solid ${step.color}` }}
                      initial={{ scale: 1, opacity: 0 }}
                      whileHover={{ scale: 1.5, opacity: [0, 0.4, 0] }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <h3 className="mb-1.5" style={{ fontSize: "13px", fontWeight: 600, color: "#d1d8e4" }}>{step.title}</h3>
                  <p style={{ fontSize: "11px", color: "#8b96a8", lineHeight: 1.65, marginBottom: "12px" }}>{step.description}</p>
                  <span className="px-2.5 py-0.5 rounded-full"
                    style={{ fontSize: "10px", fontFamily: "monospace", background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30` }}>
                    {step.time}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 p-6 rounded-2xl text-center overflow-hidden relative"
          style={{ background: "rgba(10,22,40,0.8)", border: "1px solid rgba(207,69,32,0.15)" }}
        >
          {/* Shimmer */}
          <motion.div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(207,69,32,0.04) 50%, transparent 100%)" }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
          />
          <p style={{ fontSize: "13px", color: "#8b96a8", letterSpacing: "0.04em", textTransform: "uppercase" }}>Total Turnaround · Patient Arrival to Structured Report</p>
          <p className="text-transparent bg-clip-text mt-2" style={{ fontSize: "2rem", fontWeight: 700, backgroundImage: "linear-gradient(135deg, #e7751d, #cf4520, #b31b1b)" }}>
            Less than 60 minutes
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
