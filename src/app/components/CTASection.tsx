import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";

const benefits = [
  "No physician referral required — self-schedule",
  "Radiation-free, contrast-free, no special preparation",
  "Results in your patient portal within 2 business days",
  "Direct access to WCM subspecialists for follow-up",
];

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["1.5%", "-1.5%"]);

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden"
      style={{ background: "#111420", height: "100vh", scrollSnapAlign: "start" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(179,27,27,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(179,27,27,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <motion.div className="absolute pointer-events-none" style={{ top: "-20%", left: "-10%", width: "55%", height: "80%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(179,27,27,0.08) 0%, transparent 70%)", filter: "blur(80px)", y: orbY1 }}
        animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute pointer-events-none" style={{ bottom: "-15%", right: "-10%", width: "50%", height: "75%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(207,69,32,0.06) 0%, transparent 70%)", filter: "blur(100px)", y: orbY2 }}
        animate={{ scale: [1, 0.9, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(179,27,27,0.4) 30%, rgba(207,69,32,0.7) 50%, rgba(179,27,27,0.4) 70%, transparent)" }}
        animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div style={{ y: contentY }} className="relative h-full flex items-center max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-5">
              <motion.div className="h-px w-8" style={{ background: "#b31b1b" }}
                animate={{ width: [32, 48, 32] }} transition={{ duration: 3, repeat: Infinity }} />
              <span style={{ fontSize: "12px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>SCHEDULE YOUR SCAN</span>
            </div>
            <h2 className="mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.12, color: "#FDF8F5" }}>
              Take charge of your health today
            </h2>
            <p className="mb-8" style={{ fontSize: "16px", lineHeight: 1.75, color: "#94a3b8" }}>
              A whole-body MRI at Weill Cornell Medicine gives you a comprehensive view of your health — with no radiation, no referral, and results within 2 business days.
            </p>

            <div className="space-y-3 mb-10">
              {benefits.map((b, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -40, filter: "blur(4px)" }} animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}} transition={{ duration: 0.55, delay: 0.2 + i * 0.1, type: "spring", stiffness: 120, damping: 18 }}
                  className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#e7751d" }} />
                  <span style={{ fontSize: "14px", color: "#94a3b8" }}>{b}</span>
                </motion.div>
              ))}
            </div>

            <motion.a href="tel:2127466000"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-sm"
              style={{ background: "rgba(179,27,27,0.12)", border: "1px solid rgba(179,27,27,0.3)", color: "#FDF8F5", textDecoration: "none" }}
              whileHover={{ background: "rgba(179,27,27,0.2)", borderColor: "rgba(179,27,27,0.5)" }}
            >
              <Phone className="w-5 h-5" style={{ color: "#e7751d" }} />
              <div>
                <div style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.01em" }}>212-746-6000</div>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>Weill Cornell Imaging — call to schedule</div>
              </div>
            </motion.a>

            <p className="mt-5" style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.6 }}>
              In most cases not covered by insurance. Payment required at time of appointment.
            </p>
          </motion.div>

          {/* Right form */}
          <motion.div initial={{ opacity: 0, x: 60, scale: 0.95, filter: "blur(6px)" }} animate={inView ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" } : {}} transition={{ duration: 0.8, delay: 0.25, type: "spring", stiffness: 80, damping: 18 }}>
            <div className="rounded-2xl p-8 relative overflow-hidden"
              style={{ background: "#FDF8F5", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 32px rgba(0,0,0,0.1)" }}>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 relative">
                  <motion.div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(179,27,27,0.12)", border: "1px solid rgba(179,27,27,0.3)" }}
                    animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <CheckCircle className="w-7 h-7" style={{ color: "#e7751d" }} />
                  </motion.div>
                  <h3 className="mb-2" style={{ fontSize: "20px", fontWeight: 600, color: "#111111" }}>Request Received</h3>
                  <p style={{ fontSize: "14px", color: "#666666" }}>Our team will contact you within one business day to confirm your appointment.</p>
                </motion.div>
              ) : (
                <div className="relative">
                  <h3 className="mb-1" style={{ fontSize: "20px", fontWeight: 600, color: "#111111" }}>Request an Appointment</h3>
                  <p className="mb-6" style={{ fontSize: "14px", color: "#666666" }}>We'll contact you within one business day to schedule.</p>
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                    {[
                      { label: "Full Name",    placeholder: "Dr. Sarah Johnson",          key: "name"  as const, type: "text" },
                      { label: "Email",        placeholder: "sarah@email.com",             key: "email" as const, type: "email" },
                      { label: "Phone Number", placeholder: "212-555-0100",               key: "phone" as const, type: "tel" },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block mb-1.5" style={{ fontSize: "12px", color: "#333333", letterSpacing: "0.03em" }}>{field.label}</label>
                        <input type={field.type} placeholder={field.placeholder} required
                          value={form[field.key]}
                          onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg outline-none transition-all"
                          style={{ background: "#F8F2EE", border: "1px solid rgba(0,0,0,0.1)", color: "#111111", fontSize: "14px" }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(179,27,27,0.45)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(179,27,27,0.08)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block mb-1.5" style={{ fontSize: "12px", color: "#333333" }}>Preferred Appointment Time</label>
                      <select className="w-full px-3 py-2 rounded-lg outline-none"
                        style={{ background: "#F8F2EE", border: "1px solid rgba(0,0,0,0.1)", color: "#333333", fontSize: "14px" }}>
                        <option value="">Any availability</option>
                        <option>Mornings (8am–12pm)</option>
                        <option>Afternoons (12pm–5pm)</option>
                        <option>Weekdays only</option>
                        <option>Weekends preferred</option>
                      </select>
                    </div>
                    <motion.button type="submit" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl relative overflow-hidden"
                      style={{ background: "linear-gradient(135deg, #cf4520, #b31b1b)", color: "#fff", fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer" }}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 48px rgba(179,27,27,0.5)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div className="absolute inset-0 pointer-events-none"
                        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)" }}
                        animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                      />
                      Request Appointment <ArrowRight className="w-4 h-4" />
                    </motion.button>
                    <p className="text-center" style={{ fontSize: "11px", color: "#94a3b8" }}>
                      Or call directly: <a href="tel:2127466000" style={{ color: "#e7751d", textDecoration: "none" }}>212-746-6000</a>
                    </p>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
