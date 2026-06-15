import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, Clock, ChevronRight } from "lucide-react";

type Status = "normal" | "review" | "pending";

const regions: { label: string; status: Status; finding: string; detail: string }[] = [
  { label: "Brain & Head",   status: "normal",  finding: "No significant intracranial abnormality",             detail: "Brain parenchyma, ventricles, and major vessels are within normal limits. No acute findings." },
  { label: "Chest & Lungs",  status: "review",  finding: "Small pulmonary nodule — 6mm right lower lobe",       detail: "A 6mm non-calcified nodule in the right lower lobe. Recommend follow-up CT in 12 months per Fleischner guidelines. No other significant pulmonary abnormality." },
  { label: "Abdomen",        status: "normal",  finding: "Liver, kidneys, and adrenals within normal limits",   detail: "No focal hepatic lesions. Both kidneys are normal in size and signal. No adrenal mass or lymphadenopathy." },
  { label: "Spine",          status: "normal",  finding: "Mild degenerative changes, no compression",           detail: "Mild multi-level cervical and lumbar disc desiccation consistent with age-appropriate change. No cord compression or significant foraminal stenosis." },
  { label: "Pelvis",         status: "normal",  finding: "Pelvic organs and lymph nodes unremarkable",          detail: "No pelvic lymphadenopathy. Bladder and visible pelvic structures appear normal. No discrete pelvic mass identified." },
  { label: "Arms & Legs",    status: "normal",  finding: "Bone marrow signal appropriate for age",              detail: "No marrow infiltration or focal osseous lesion identified. Visible soft tissue structures are unremarkable." },
];

const statusConfig = {
  normal:  { label: "Normal",              color: "#10b981", bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.2)",  icon: CheckCircle2 },
  review:  { label: "Follow-up Suggested", color: "#e7751d", bg: "rgba(231,117,29,0.08)", border: "rgba(231,117,29,0.25)", icon: AlertCircle },
  pending: { label: "Pending",             color: "#666666", bg: "rgba(107,114,128,0.08)", border: "rgba(107,114,128,0.2)",icon: Clock },
};

export function ReportPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["1.5%", "-1.5%"]);

  return (
    <section id="report-preview" ref={ref} className="relative overflow-hidden"
      style={{ background: "#F8F2EE", height: "100vh", scrollSnapAlign: "start" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(179,27,27,0.4) 30%, rgba(207,69,32,0.7) 50%, rgba(179,27,27,0.4) 70%, transparent)" }}
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div style={{ y }} className="relative h-full flex items-center max-w-7xl mx-auto px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center w-full">

          {/* Left: intro */}
          <motion.div initial={{ opacity: 0, x: -40, filter: "blur(8px)" }} animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "#b31b1b" }} />
              <span style={{ fontSize: "11px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>YOUR REPORT EXPERIENCE</span>
            </div>
            <h2 className="mb-5" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 700, color: "#111111", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
              Clear findings,<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e7751d, #b31b1b)" }}>
                plain language
              </span>
            </h2>
            <p className="mb-6" style={{ fontSize: "15px", lineHeight: 1.85, color: "#333333" }}>
              Your report is organized by body region — written in plain language, with annotated images. Subspecialty radiologists review every finding so you get clinical context, not just data.
            </p>
            <ul className="space-y-3">
              {[
                "Available in your patient portal within 2 business days",
                "Organized by body region with clear status indicators",
                "Written in patient-friendly language — no medical jargon",
                "Includes annotated images for visual reference",
              ].map((item, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-3"
                  style={{ fontSize: "14px", color: "#444444" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#b31b1b" }} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: interactive report mockup */}
          <motion.div initial={{ opacity: 0, x: 40, scale: 0.96 }} animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 80, damping: 18 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: "#FDF8F5", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 4px 32px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06)" }}
          >
            {/* Report header */}
            <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", background: "rgba(179,27,27,0.04)" }}>
              <div style={{ fontSize: "11px", color: "#9ca3af", letterSpacing: "0.08em", marginBottom: "2px" }}>WEILL CORNELL MEDICINE · WHOLE BODY MRI</div>
              <div style={{ fontSize: "15px", fontWeight: 600, color: "#111111" }}>Sample Report — Illustrative Only</div>
              <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>Click any region to expand</div>
            </div>

            {/* Region rows */}
            <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
              {regions.map((r, i) => {
                const sc = statusConfig[r.status];
                const Icon = sc.icon;
                const isOpen = active === i;
                return (
                  <div key={i}>
                    <motion.button
                      onClick={() => setActive(isOpen ? null : i)}
                      className="w-full flex items-center gap-3 px-5 py-3 text-left"
                      style={{ background: isOpen ? "rgba(179,27,27,0.04)" : "transparent", border: "none", cursor: "pointer", transition: "background 0.2s" }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.06 }}
                    >
                      <Icon className="w-4 h-4 shrink-0" style={{ color: sc.color }} />
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#111111", flex: 1 }}>{r.label}</span>
                      <span className="px-2 py-0.5 rounded-full" style={{ fontSize: "10px", color: sc.color, background: sc.bg, border: `1px solid ${sc.border}`, fontWeight: 600 }}>
                        {sc.label}
                      </span>
                      <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronRight className="w-3.5 h-3.5" style={{ color: "#9ca3af" }} />
                      </motion.div>
                    </motion.button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div key="detail"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="px-5 pb-4 pl-12">
                            <div style={{ fontSize: "12px", fontWeight: 600, color: sc.color, marginBottom: "4px" }}>{r.finding}</div>
                            <div style={{ fontSize: "12px", color: "#666666", lineHeight: 1.7 }}>{r.detail}</div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
