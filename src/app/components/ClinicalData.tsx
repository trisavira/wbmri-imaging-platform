import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const radarData = [
  { subject: "Sensitivity", value: 98 }, { subject: "Specificity", value: 95 },
  { subject: "Speed", value: 90 }, { subject: "Coverage", value: 100 },
  { subject: "Reproducibility", value: 96 }, { subject: "Safety", value: 100 },
];

const timelineData = [
  { month: "Jan", detected: 24, confirmed: 22 }, { month: "Feb", detected: 31, confirmed: 29 },
  { month: "Mar", detected: 28, confirmed: 26 }, { month: "Apr", detected: 40, confirmed: 38 },
  { month: "May", detected: 35, confirmed: 34 }, { month: "Jun", detected: 48, confirmed: 46 },
  { month: "Jul", detected: 52, confirmed: 51 }, { month: "Aug", detected: 58, confirmed: 56 },
];

const findings = [
  { label: "Bone Metastases",        accuracy: 97.4, color: "#cf4520" },
  { label: "Lymph Node Involvement", accuracy: 95.1, color: "#b31b1b" },
  { label: "Soft Tissue Lesions",    accuracy: 93.8, color: "#e7751d" },
  { label: "Organ Infiltration",     accuracy: 96.2, color: "#cf4520" },
];

export function ClinicalData() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section id="clinical" ref={ref} className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#f8f9fb" }}>
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      {/* Animated top accent */}
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(207,69,32,0.5) 30%, rgba(231,117,29,0.8) 50%, rgba(207,69,32,0.5) 70%, transparent)" }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div style={{ y }} className="relative max-w-7xl mx-auto px-6 w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <motion.div className="h-px w-8" style={{ background: "#b31b1b" }}
              animate={{ width: [32, 48, 32] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
            <span style={{ fontSize: "12px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>CLINICAL EVIDENCE</span>
            <motion.div className="h-px w-8" style={{ background: "#b31b1b" }}
              animate={{ width: [32, 48, 32] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          </div>
          <h2 className="mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#0f1117" }}>
            Validated across{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e7751d, #b31b1b)" }}>10,000+ cases</span>
          </h2>
          <p style={{ fontSize: "16px", color: "#4b5563" }}>Published in peer-reviewed journals. Proven performance in multicenter trials.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Radar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}
            className="rounded-2xl p-6"
            style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
          >
            <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#111827", marginBottom: "4px" }}>Performance Profile</h3>
            <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "16px" }}>Multi-dimensional accuracy metrics</p>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(0,0,0,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#4b5563", fontSize: 10 }} stroke="transparent" />
                <Radar name="Performance" dataKey="value" stroke="#cf4520" fill="#cf4520" fillOpacity={0.12} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Area chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}
            className="rounded-2xl p-6"
            style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", gridColumn: "span 2" }}
          >
            <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#111827", marginBottom: "4px" }}>Detection Volume Trend</h3>
            <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "16px" }}>AI flagged vs. confirmed findings per month</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={timelineData} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="gradDetected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e7751d" stopOpacity={0.25} /><stop offset="95%" stopColor="#e7751d" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradConfirmed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b31b1b" stopOpacity={0.25} /><stop offset="95%" stopColor="#b31b1b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.07)" />
                <XAxis dataKey="month" tick={{ fill: "#4b5563", fontSize: 11 }} stroke="transparent" />
                <YAxis tick={{ fill: "#4b5563", fontSize: 11 }} stroke="transparent" />
                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid rgba(207,69,32,0.2)", borderRadius: "8px", fontSize: "12px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} labelStyle={{ color: "#374151" }} itemStyle={{ color: "#374151" }} />
                <Area type="monotone" dataKey="detected" name="AI Detected" stroke="#e7751d" strokeWidth={2} fill="url(#gradDetected)" />
                <Area type="monotone" dataKey="confirmed" name="Confirmed" stroke="#b31b1b" strokeWidth={2} fill="url(#gradConfirmed)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              {[{ color: "#e7751d", label: "AI Detected" }, { color: "#b31b1b", label: "Confirmed" }].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span style={{ fontSize: "11px", color: "#6b7280" }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Accuracy bars */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -2, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}
            className="rounded-2xl p-6"
            style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", gridColumn: "span 3" }}
          >
            <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#111827", marginBottom: "4px" }}>Diagnostic Accuracy by Finding Type</h3>
            <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "20px" }}>Detection accuracy across primary clinical use cases</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {findings.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.5 + i * 0.1 }}>
                  <div className="flex justify-between mb-2">
                    <span style={{ fontSize: "12px", color: "#374151" }}>{f.label}</span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: f.color, fontFamily: "monospace" }}>{f.accuracy}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.07)" }}>
                    <motion.div className="h-full rounded-full"
                      style={{ background: `linear-gradient(to right, ${f.color}80, ${f.color})` }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${f.accuracy}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.6 + i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
