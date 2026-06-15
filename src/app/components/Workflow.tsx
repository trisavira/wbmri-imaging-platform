import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Calendar, ClipboardList, Scan, FileCheck, PhoneCall } from "lucide-react";

const steps = [
  { icon: Calendar,     title: "Schedule",        detail: "Book online or call 212-746-6000. No physician referral required — self-schedule at your convenience.",  color: "#e7751d" },
  { icon: ClipboardList,title: "Prepare for Your Scan", detail: "Optional virtual provider visit. No fasting, no medication, no contrast injection, no special prep needed.", color: "#cf4520" },
  { icon: Scan,         title: "Your 45-Min Scan", detail: "Lie comfortably in our 3T scanner. We image head to mid-thigh — thousands of images in a single session.",   color: "#b31b1b" },
  { icon: FileCheck,    title: "Receive Your Report",      detail: "Results in your patient portal within 2 business days, reviewed by subspecialty radiologists.",              color: "#cf4520" },
  { icon: PhoneCall,    title: "Follow-up Care",   detail: "If anything needs attention, our care team coordinates next steps with WCM subspecialists seamlessly.",     color: "#e7751d" },
];

export function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section id="workflow" ref={ref} className="relative overflow-hidden"
      style={{ background: "#0c0e15", height: "100vh", scrollSnapAlign: "start" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(179,27,27,0.4) 30%, rgba(207,69,32,0.6) 50%, rgba(179,27,27,0.4) 70%, transparent)" }}
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div style={{ y }} className="relative h-full flex flex-col justify-between max-w-7xl mx-auto px-10 w-full py-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: "#b31b1b" }} />
            <span style={{ fontSize: "11px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>WHAT TO EXPECT</span>
            <div className="h-px w-8" style={{ background: "#b31b1b" }} />
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
            Simple, guided,{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e7751d, #b31b1b)" }}>
              every step of the way
            </span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative flex items-center" style={{ margin: "20px 0 16px" }}>
          {/* Connector */}
          <div className="hidden lg:block absolute left-[calc(10%+36px)] right-[calc(10%+36px)] h-px"
            style={{ top: "36px", background: "rgba(255,255,255,0.06)" }} />
          <motion.div className="hidden lg:block absolute left-[calc(10%+36px)] h-px"
            style={{ top: "36px", background: "linear-gradient(to right, #e7751d, #b31b1b)", right: "calc(10% + 36px)" }}
            initial={{ scaleX: 0, originX: "left" }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          />
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 w-full">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 50, scale: 0.88 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.1 + i * 0.12, type: "spring", stiffness: 120, damping: 16 }}
                  className="flex flex-col items-center text-center cursor-default"
                  onHoverStart={() => setHovered(i)}
                  onHoverEnd={() => setHovered(null)}
                >
                  <motion.div
                    className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-5 relative z-10"
                    animate={{ borderColor: hovered === i ? step.color : `${step.color}35`, background: hovered === i ? `${step.color}18` : "rgba(255,255,255,0.04)", boxShadow: hovered === i ? `0 0 32px ${step.color}45` : "none" }}
                    style={{ border: `1px solid ${step.color}35` }}
                    transition={{ duration: 0.25 }}
                  >
                    <motion.div animate={{ scale: hovered === i ? 1.15 : 1 }} transition={{ duration: 0.25 }}>
                      <Icon className="w-6 h-6" style={{ color: step.color }} />
                    </motion.div>
                  </motion.div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#e2e8f0", marginBottom: "8px" }}>{step.title}</p>
                  <motion.p
                    animate={{ opacity: hovered === i ? 1 : 0, y: hovered === i ? 0 : 8, height: hovered === i ? "auto" : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.65, overflow: "hidden" }}
                  >{step.detail}</motion.p>
                  <motion.span
                    animate={{ opacity: hovered === i ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ fontSize: "11px", color: step.color, fontFamily: "monospace", marginTop: "6px" }}
                  >{step.time}</motion.span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.9 }}
          className="flex items-center gap-4" style={{ marginTop: "8px" }}
        >
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
          <span style={{ fontSize: "11px", color: "#94a3b8", letterSpacing: "0.1em" }}>NO FASTING · NO CONTRAST · NO SPECIAL PREPARATION REQUIRED</span>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
