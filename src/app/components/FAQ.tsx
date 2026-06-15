import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Is Whole-Body MRI legitimate, or is it overhyped?", a: "Whole-Body MRI is a well-established imaging modality used in leading academic medical centers worldwide. At Weill Cornell Medicine, every scan is reviewed by subspecialty radiologists with deep clinical expertise. It is not a substitute for evidence-based screening, but it is a scientifically sound tool for comprehensive health visualization and early detection." },
  { q: "Who is Whole-Body MRI for?", a: "WB-MRI is best suited for health-conscious adults — typically ages 30–60 — who want a comprehensive baseline view of their body. It is particularly valuable for individuals with a family history of cancer or chronic disease, those who take a proactive approach to health, or those seeking peace of mind through a complete whole-body assessment." },
  { q: "Does it replace my annual physical or other screenings?", a: "No. Whole-Body MRI is designed to complement — not replace — your existing preventive care. It does not substitute for mammography, colonoscopy, PSA testing, cervical screening, skin exams, or your annual physical. We strongly encourage patients to continue all recommended evidence-based screenings alongside this service." },
  { q: "What happens if something is found?", a: "If your scan identifies a finding that requires follow-up, our team will contact you promptly. One of the key advantages of receiving this care at Weill Cornell Medicine is seamless access to our subspecialists — whether that's oncology, cardiology, gastroenterology, or another specialty. You will not be left to navigate findings on your own." },
  { q: "Will this create unnecessary anxiety?", a: "This is a valid concern and one we take seriously. Incidental findings are possible with any comprehensive imaging exam. Our subspecialty radiologists are trained to distinguish clinically significant findings from benign incidentalomas. Our team is also available to help you understand your results and determine appropriate next steps." },
  { q: "Is it worth the cost?", a: "Whole-Body MRI is an out-of-pocket service that is not typically covered by insurance. For individuals who value early detection, peace of mind, and the integrated care offered at Weill Cornell Medicine, many find it a worthwhile investment in their long-term health." },
  { q: "What does the scan actually involve?", a: "You will lie in a wide-bore 3T MRI scanner for approximately 45 minutes. No contrast injection, no fasting, no special preparation is required. The scan covers your head to mid-thigh, generating thousands of high-resolution images. You can return to normal activities immediately after." },
  { q: "How quickly will I get my results?", a: "Your report will typically be available within 2 business days. Results are delivered to your patient portal and reviewed with you by our clinical team. Reports are written in patient-friendly language, with annotated images organized by body region." },
  { q: "Do I need a referral from my doctor?", a: "No physician referral is required. You can self-schedule by calling 212-746-6000 or by submitting a request on this website. That said, we always recommend keeping your primary care physician informed about any health assessments you undergo." },
];

function FAQCard({ faq, index, inView }: { faq: typeof faqs[0]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06, type: "spring", stiffness: 100, damping: 18 }}
      className="shrink-0 rounded-2xl overflow-hidden cursor-pointer"
      style={{
        width: "320px",
        background: "#FDF8F5",
        border: `1px solid ${open ? "rgba(179,27,27,0.25)" : "rgba(0,0,0,0.08)"}`,
        boxShadow: open ? "0 8px 28px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.05)",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-3 p-5">
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#111111", lineHeight: 1.45 }}>{faq.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 mt-0.5">
          <ChevronDown className="w-4 h-4" style={{ color: open ? "#b31b1b" : "#9ca3af" }} />
        </motion.div>
      </div>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: "hidden" }}
      >
        <p style={{ padding: "0 20px 20px", fontSize: "13px", color: "#444444", lineHeight: 1.75 }}>
          {faq.a}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section id="faq" ref={ref} className="relative overflow-hidden"
      style={{ background: "#F8F2EE", height: "100vh", scrollSnapAlign: "start" }}
    >
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(179,27,27,0.5) 30%, rgba(207,69,32,0.8) 50%, rgba(179,27,27,0.5) 70%, transparent)" }}
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div style={{ y }} className="relative h-full flex flex-col max-w-none mx-auto w-full py-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 px-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: "#b31b1b" }} />
            <span style={{ fontSize: "11px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#111111", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
            Your questions, answered
          </h2>
        </motion.div>

        {/* Horizontal scroll */}
        <div
          className="flex gap-4 overflow-x-auto flex-1 px-10 pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            alignItems: "flex-start",
            paddingBottom: "24px",
          }}
        >
          {faqs.map((faq, i) => (
            <FAQCard key={i} faq={faq} index={i} inView={inView} />
          ))}
          {/* End padding */}
          <div className="shrink-0 w-6" />
        </div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1 }}
          className="flex items-center gap-2 px-10"
        >
          <div className="h-px w-8" style={{ background: "rgba(0,0,0,0.1)" }} />
          <span style={{ fontSize: "11px", color: "#9ca3af", letterSpacing: "0.06em" }}>SCROLL TO SEE MORE</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
