import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    type: "Fear Reduction",
    typeColor: "#e7751d",
    quote: "I was honestly nervous before the scan — I kept thinking, what if they find something? But the team walked me through every step. When my report came back, I finally felt like I understood my own health. Even with one small finding that needed follow-up, knowing about it early made all the difference.",
    name: "M. Hartley",
    detail: "Age 52 · Whole-Body MRI patient",
  },
  {
    type: "Why I Chose This",
    typeColor: "#cf4520",
    quote: "My father passed away from cancer that wasn't caught until late. I wanted to be proactive — not reactive. My doctor didn't flag anything concerning in my annual physical, but I wanted a more complete picture. The scan gave me exactly that: a comprehensive baseline I can compare against every year.",
    name: "D. Park",
    detail: "Age 44 · Health-conscious, family history",
  },
  {
    type: "Integrated Care",
    typeColor: "#b31b1b",
    quote: "A small lymph node finding was flagged in my report. I was worried — but the Weill Cornell team had already coordinated with a lymphoma specialist before I even called. Within a week I had a follow-up appointment. That kind of seamless care isn't something you get at a standalone imaging center.",
    name: "R. Okonkwo",
    detail: "Age 38 · Follow-up coordinated through WCM",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);

  return (
    <section id="testimonials" ref={ref} className="relative overflow-hidden"
      style={{ background: "#111420", height: "100vh", scrollSnapAlign: "start" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(179,27,27,0.4) 30%, rgba(207,69,32,0.7) 50%, rgba(179,27,27,0.4) 70%, transparent)" }}
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}
      />
      {/* Subtle ambient glow */}
      <div className="absolute pointer-events-none" style={{ top: "20%", left: "50%", transform: "translateX(-50%)", width: "60%", height: "60%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(179,27,27,0.05) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <motion.div style={{ y }} className="relative h-full flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 w-full py-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: "#b31b1b" }} />
            <span style={{ fontSize: "11px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>PATIENT EXPERIENCES</span>
            <div className="h-px w-8" style={{ background: "#b31b1b" }} />
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 700, color: "#FDF8F5", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
            In their own words
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6 flex-1 mt-10">
          {testimonials.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40, scale: 0.94, filter: "blur(4px)" }}
              animate={inView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.15, type: "spring", stiffness: 90, damping: 18 }}
              whileHover={{ y: -6, boxShadow: `0 20px 48px rgba(0,0,0,0.4), 0 0 0 1px ${t.typeColor}20` }}
              className="relative rounded-2xl flex flex-col"
              style={{ background: "#FDF8F5", border: `1px solid ${t.typeColor}20`, borderTop: `3px solid ${t.typeColor}`, padding: "28px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
            >
              <Quote className="w-8 h-8 mb-4 flex-shrink-0" style={{ color: t.typeColor, opacity: 0.6 }} />

              <p className="flex-1" style={{ fontSize: "14px", lineHeight: 1.8, color: "#333333", fontStyle: "italic" }}>
                "{t.quote}"
              </p>

              <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#111111" }}>{t.name}</div>
                <div style={{ fontSize: "12px", color: "#8b96a8", marginTop: "3px" }}>{t.detail}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1 }}
          className="text-center mt-6"
          style={{ fontSize: "11px", color: "#64748b", letterSpacing: "0.04em" }}
        >
          Illustrative patient experiences. Individual results may vary.
        </motion.p>
      </motion.div>
    </section>
  );
}
