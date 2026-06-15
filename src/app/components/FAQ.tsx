import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Is Whole-Body MRI legitimate, or is it overhyped?",
    a: "Whole-Body MRI is a well-established imaging modality used in leading academic medical centers worldwide. At Weill Cornell Medicine, every scan is reviewed by subspecialty radiologists with deep clinical expertise. It is not a substitute for evidence-based screening, but it is a scientifically sound tool for comprehensive health visualization and early detection.",
  },
  {
    q: "Who is Whole-Body MRI for?",
    a: "WB-MRI is best suited for health-conscious adults — typically ages 30–60 — who want a comprehensive baseline view of their body. It is particularly valuable for individuals with a family history of cancer or chronic disease, those who take a proactive approach to health, or those seeking peace of mind through a complete whole-body assessment.",
  },
  {
    q: "Does it replace my annual physical or other screenings?",
    a: "No. Whole-Body MRI is designed to complement — not replace — your existing preventive care. It does not substitute for mammography, colonoscopy, PSA testing, cervical screening, skin exams, or your annual physical. We strongly encourage patients to continue all recommended evidence-based screenings alongside this service.",
  },
  {
    q: "What happens if something is found?",
    a: "If your scan identifies a finding that requires follow-up, our team will contact you promptly. One of the key advantages of receiving this care at Weill Cornell Medicine is seamless access to our subspecialists — whether that's oncology, cardiology, gastroenterology, or another specialty. You will not be left to navigate findings on your own.",
  },
  {
    q: "Will this create unnecessary anxiety or lead to over-testing?",
    a: "This is a valid concern and one we take seriously. Incidental findings are possible with any comprehensive imaging exam. Our subspecialty radiologists are trained to distinguish clinically significant findings from benign incidentalomas, and your report will reflect that careful clinical judgment. Our team is also available to help you understand your results and determine appropriate next steps.",
  },
  {
    q: "Is it worth the cost?",
    a: "Whole-Body MRI is an out-of-pocket service that is not typically covered by insurance. For individuals who value early detection, peace of mind, and the integrated care offered at Weill Cornell Medicine, many find it a worthwhile investment in their long-term health. We encourage you to speak with our team if you have questions about cost or value.",
  },
  {
    q: "What does the scan actually involve?",
    a: "You will lie in a wide-bore 3T MRI scanner for approximately 45 minutes. No contrast injection, no fasting, no special preparation is required. The scan covers your head to mid-thigh, generating thousands of high-resolution images. You can return to normal activities immediately after.",
  },
  {
    q: "How quickly will I get my results?",
    a: "Your report will typically be available within 2 business days. Results are delivered to your patient portal and reviewed with you by our clinical team. Reports are written in patient-friendly language, with annotated images organized by body region.",
  },
  {
    q: "Do I need a referral from my doctor?",
    a: "No physician referral is required. You can self-schedule by calling 212-746-6000 or by submitting a request on this website. That said, we always recommend keeping your primary care physician informed about any health assessments you undergo.",
  },
];

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openLeft, setOpenLeft] = useState<number | null>(null);
  const [openRight, setOpenRight] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section id="faq" ref={ref} className="relative overflow-hidden"
      style={{ background: "#f8f9fb", height: "100vh", scrollSnapAlign: "start" }}
    >
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(179,27,27,0.5) 30%, rgba(207,69,32,0.8) 50%, rgba(179,27,27,0.5) 70%, transparent)" }}
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div style={{ y }} className="relative h-full flex items-center max-w-6xl mx-auto px-10 w-full">
        <div className="w-full">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "#b31b1b" }} />
              <span style={{ fontSize: "11px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#111111", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
              Your questions, answered
            </h2>
          </motion.div>

          {/* Accordion — two independent columns */}
          {(() => {
            const mid = Math.ceil(faqs.length / 2);
            const left = faqs.slice(0, mid);
            const right = faqs.slice(mid);

            const renderColumn = (
              items: typeof faqs,
              openIdx: number | null,
              setOpenIdx: (v: number | null) => void,
              offset: number
            ) => (
              <div className="flex flex-col gap-3 flex-1 max-h-[calc(100vh-280px)] overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
                {items.map((faq, i) => {
                  const idx = offset + i;
                  const isOpen = openIdx === i;
                  return (
                    <motion.div key={idx}
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.05 + idx * 0.04 }}
                      className="rounded-xl overflow-hidden"
                      style={{ background: "#ffffff", border: `1px solid ${isOpen ? "rgba(179,27,27,0.2)" : "rgba(0,0,0,0.07)"}`, transition: "border-color 0.2s" }}
                    >
                      <button
                        onClick={() => setOpenIdx(isOpen ? null : i)}
                        className="w-full flex items-center justify-between gap-4 text-left"
                        style={{ padding: "16px 20px", background: "none", border: "none", cursor: "pointer" }}
                      >
                        <span style={{ fontSize: "14px", fontWeight: 600, color: "#111111", lineHeight: 1.4 }}>{faq.q}</span>
                        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                          <Plus className="w-4 h-4" style={{ color: isOpen ? "#b31b1b" : "#9ca3af" }} />
                        </motion.div>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div key="answer"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            style={{ overflow: "hidden" }}
                          >
                            <div style={{ padding: "0 20px 18px", fontSize: "13px", color: "#444444", lineHeight: 1.75 }}>
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            );

            return (
              <div className="flex gap-4">
                {renderColumn(left, openLeft, setOpenLeft, 0)}
                {renderColumn(right, openRight, setOpenRight, mid)}
              </div>
            );
          })()}
        </div>
      </motion.div>
    </section>
  );
}
