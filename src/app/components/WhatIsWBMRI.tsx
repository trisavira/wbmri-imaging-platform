import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Zap, Eye, Clock, Shield } from "lucide-react";

const facts = [
  { icon: Clock,   label: "~45 Minutes",       detail: "Head to mid-thigh in one uninterrupted session" },
  { icon: Shield,  label: "Zero Radiation",     detail: "Safe for repeat monitoring — no ionizing radiation" },
  { icon: Eye,     label: "Thousands of Images",detail: "High-resolution slices across every major body region" },
  { icon: Zap,     label: "AI-Enhanced",        detail: "Deep-learning protocols flag areas for radiologist review" },
];

export function WhatIsWBMRI() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section id="what-is-wb-mri" ref={ref} className="relative overflow-hidden"
      style={{ background: "#f8f9fb", height: "100vh", scrollSnapAlign: "start" }}
    >
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(179,27,27,0.5) 30%, rgba(207,69,32,0.8) 50%, rgba(179,27,27,0.5) 70%, transparent)" }}
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div style={{ y }} className="relative h-full flex items-center max-w-7xl mx-auto px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-20 items-center w-full">

          {/* Left: text */}
          <motion.div initial={{ opacity: 0, x: -40, filter: "blur(8px)" }} animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "#b31b1b" }} />
              <span style={{ fontSize: "11px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>WHAT IS WHOLE-BODY MRI</span>
            </div>
            <h2 className="mb-6" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 700, color: "#111111", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
              A comprehensive scan<br />of your entire body —<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e7751d, #b31b1b)" }}>in a single session</span>
            </h2>
            <p className="mb-6" style={{ fontSize: "16px", lineHeight: 1.85, color: "#333333", maxWidth: "480px" }}>
              Whole-Body MRI is a radiation-free imaging examination that produces thousands of high-resolution images from your head to mid-thigh. Unlike standard MRI scans that focus on a single area, Whole-Body MRI gives your care team a complete picture of your tissues and organs in one visit.
            </p>
            <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#666666", maxWidth: "460px" }}>
              At Weill Cornell Medicine, every scan is reviewed by subspecialty radiologists — physicians who specialize in specific body regions — ensuring that findings are interpreted with the highest level of clinical expertise.
            </p>
          </motion.div>

          {/* Right: fact cards */}
          <div className="grid grid-cols-2 gap-4">
            {facts.map((fact, i) => {
              const Icon = fact.icon;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 32, scale: 0.94 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1, type: "spring", stiffness: 100, damping: 18 }}
                  className="rounded-2xl p-6"
                  style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
                  whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.09)" }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(179,27,27,0.07)" }}>
                    <Icon className="w-5 h-5" style={{ color: "#b31b1b" }} />
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#111111", marginBottom: "6px" }}>{fact.label}</div>
                  <div style={{ fontSize: "13px", color: "#666666", lineHeight: 1.6 }}>{fact.detail}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
