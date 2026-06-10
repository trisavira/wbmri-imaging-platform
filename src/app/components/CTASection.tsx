import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowRight, CheckCircle, Mail, Phone, MapPin } from "lucide-react";

const benefits = [
  "Live platform demonstration tailored to your use case",
  "Protocol design consultation with clinical experts",
  "Integration assessment for your existing infrastructure",
  "Pilot program with 30-day proof of concept",
];

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ institution: "", email: "" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section id="contact" ref={ref} className="relative flex items-center overflow-hidden" style={{ background: "#111420", height: "100vh", scrollSnapAlign: "start" }}>
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(207,69,32,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(207,69,32,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* Parallax aurora orbs */}
      <motion.div className="absolute pointer-events-none" style={{ top: "-20%", left: "-10%", width: "55%", height: "80%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(207,69,32,0.1) 0%, transparent 70%)", filter: "blur(80px)", y: orbY1 }}
        animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute pointer-events-none" style={{ bottom: "-15%", right: "-10%", width: "50%", height: "75%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(179,27,27,0.08) 0%, transparent 70%)", filter: "blur(100px)", y: orbY2 }}
        animate={{ scale: [1, 0.9, 1], x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Animated top line */}
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(207,69,32,0.4) 30%, rgba(231,117,29,0.7) 50%, rgba(207,69,32,0.4) 70%, transparent)" }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {/* Animated bottom glow */}
      <motion.div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(207,69,32,0.3), transparent)" }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      />

      <motion.div style={{ y: contentY }} className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left copy */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-5">
              <motion.div className="h-px w-8" style={{ background: "#b31b1b" }}
                animate={{ width: [32, 48, 32] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
              <span style={{ fontSize: "12px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>GET STARTED</span>
            </div>
            <h2 className="mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.12, color: "#ffffff" }}>
              Ready to implement whole-body MRI at your institution?
            </h2>
            <p className="mb-8" style={{ fontSize: "16px", lineHeight: 1.75, color: "#94a3b8" }}>
              Our clinical team will guide you through a personalized demonstration, configure a protocol suite for your indications, and map out a seamless deployment plan.
            </p>

            <div className="space-y-3 mb-10">
              {benefits.map((b, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#e7751d" }} />
                  <span style={{ fontSize: "14px", color: "#94a3b8" }}>{b}</span>
                </motion.div>
              ))}
            </div>

            <div className="space-y-3">
              {[
                { icon: Mail, text: "imaging@wbmri.com" },
                { icon: Phone, text: "+1 (800) 924-6774" },
                { icon: MapPin, text: "Global — 40+ countries" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Icon className="w-4 h-4" style={{ color: "#94a3b8" }} />
                  <span style={{ fontSize: "13px", color: "#94a3b8" }}>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -4 }}
          >
            <div className="rounded-2xl p-8 relative overflow-hidden"
              style={{ background: "rgba(10,22,40,0.9)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 0 60px rgba(207,69,32,0.08), 0 24px 60px rgba(0,0,0,0.4)" }}>
              {/* Card shimmer */}
              <motion.div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(207,69,32,0.03) 0%, transparent 50%, rgba(179,27,27,0.03) 100%)" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 relative">
                  <motion.div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(231,117,29,0.12)", border: "1px solid rgba(231,117,29,0.25)" }}
                    animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <CheckCircle className="w-7 h-7" style={{ color: "#e7751d" }} />
                  </motion.div>
                  <h3 className="mb-2" style={{ fontSize: "20px", fontWeight: 600, color: "#d1d8e4" }}>Request Received</h3>
                  <p style={{ fontSize: "14px", color: "#94a3b8" }}>Our clinical team will respond within one business day.</p>
                </motion.div>
              ) : (
                <div className="relative">
                  <h3 className="mb-1" style={{ fontSize: "20px", fontWeight: 600, color: "#d1d8e4" }}>Request a Demo</h3>
                  <p className="mb-6" style={{ fontSize: "14px", color: "#94a3b8" }}>Typically responded to within one business day.</p>
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {["First Name", "Last Name"].map((label, i) => (
                        <div key={i}>
                          <label className="block mb-1.5" style={{ fontSize: "12px", color: "#94a3b8", letterSpacing: "0.03em" }}>{label}</label>
                          <input placeholder={i === 0 ? "Dr. Sarah" : "Johnson"} required={i === 0}
                            className="w-full px-3 py-2 rounded-lg outline-none transition-all"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#d1d8e4", fontSize: "14px" }}
                            onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(207,69,32,0.45)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(207,69,32,0.08)"; }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                          />
                        </div>
                      ))}
                    </div>
                    {[
                      { label: "Institution", placeholder: "Memorial Medical Center", key: "institution" as const },
                      { label: "Work Email", placeholder: "sarah.johnson@memorialmc.org", key: "email" as const },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block mb-1.5" style={{ fontSize: "12px", color: "#94a3b8", letterSpacing: "0.03em" }}>{field.label}</label>
                        <input
                          type={field.key === "email" ? "email" : "text"}
                          placeholder={field.placeholder}
                          value={form[field.key]}
                          onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                          required
                          className="w-full px-3 py-2 rounded-lg outline-none transition-all"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#d1d8e4", fontSize: "14px" }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(207,69,32,0.45)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(207,69,32,0.08)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block mb-1.5" style={{ fontSize: "12px", color: "#94a3b8", letterSpacing: "0.03em" }}>Primary Use Case</label>
                      <select className="w-full px-3 py-2 rounded-lg outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8", fontSize: "14px" }}>
                        <option value="">Select a use case...</option>
                        <option>Oncology Staging & Monitoring</option>
                        <option>Inflammatory Disease</option>
                        <option>Preventive Screening</option>
                        <option>Pediatric Imaging</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <motion.button type="submit" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl relative overflow-hidden"
                      style={{ background: "linear-gradient(135deg, #cf4520, #b31b1b)", color: "#fff", fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer" }}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 48px rgba(207,69,32,0.55)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Button shimmer */}
                      <motion.div className="absolute inset-0 pointer-events-none"
                        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)" }}
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                      />
                      Submit Request
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                    <p className="text-center" style={{ fontSize: "11px", color: "#94a3b8" }}>
                      Privacy Policy applies. No spam, ever.
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
