import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { CheckCircle2, XCircle } from "lucide-react";

const complements = [
  "Provides a comprehensive baseline view of your body",
  "Detects incidental findings not targeted by standard screening",
  "Evaluates soft tissue, organs, bone marrow, and lymph nodes simultaneously",
  "Enables longitudinal comparison over time",
  "Adds whole-body visibility between annual check-ups",
];

const doesNotReplace = [
  { screen: "Mammography", reason: "Dedicated breast cancer screening with established guidelines" },
  { screen: "Colonoscopy", reason: "Gold standard for colorectal cancer detection and polyp removal" },
  { screen: "PSA Testing", reason: "Blood-based prostate cancer surveillance" },
  { screen: "Pap Smear / Cervical Screening", reason: "Cervical cancer detection protocol" },
  { screen: "Annual Physical Exam", reason: "Clinical examination and bloodwork by your physician" },
  { screen: "Skin Cancer Checks", reason: "Dermatological examination of the skin surface" },
];

export function Limitations() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section id="limitations" ref={ref} className="relative overflow-hidden"
      style={{ background: "#f8f9fb", height: "100vh", scrollSnapAlign: "start" }}
    >
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(179,27,27,0.5) 30%, rgba(207,69,32,0.8) 50%, rgba(179,27,27,0.5) 70%, transparent)" }}
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div style={{ y }} className="relative h-full flex items-center max-w-7xl mx-auto px-10 w-full">
        <div className="w-full">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "#b31b1b" }} />
              <span style={{ fontSize: "11px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>RESPONSIBLE CLINICAL POSITIONING</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 700, color: "#111111", lineHeight: 1.1, letterSpacing: "-0.025em", maxWidth: "680px" }}>
              A complement to your care —{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e7751d, #b31b1b)" }}>not a replacement</span>
            </h2>
            <p className="mt-4" style={{ fontSize: "16px", color: "#666666", maxWidth: "580px", lineHeight: 1.75 }}>
              Whole-Body MRI is a powerful tool for early detection and peace of mind. We believe it's equally important to be clear about what it is — and what it is not.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* What it adds */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl p-7"
              style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
            >
              <h3 className="mb-5" style={{ fontSize: "16px", fontWeight: 700, color: "#111111" }}>What Whole-Body MRI adds to your care</h3>
              <ul className="space-y-3">
                {complements.map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.07 }}
                    className="flex items-start gap-3"
                    style={{ fontSize: "14px", color: "#333333", lineHeight: 1.6 }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#b31b1b" }} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* What it doesn't replace */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl p-7"
              style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
            >
              <h3 className="mb-5" style={{ fontSize: "16px", fontWeight: 700, color: "#111111" }}>What it does not replace</h3>
              <ul className="space-y-3">
                {doesNotReplace.map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <XCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#9ca3af" }} />
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#333333" }}>{item.screen}</div>
                      <div style={{ fontSize: "12px", color: "#9ca3af", lineHeight: 1.5 }}>{item.reason}</div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
