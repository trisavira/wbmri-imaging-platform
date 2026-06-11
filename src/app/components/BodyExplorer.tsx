import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "motion/react";
import { ChevronRight, CheckCircle2, AlertCircle, X, Info } from "lucide-react";

type Region = {
  id: string;
  label: string;
  color: string;
  lightBg: string;
  what: string[];
  findings: string[];
  education: string;
};

const regions: Region[] = [
  {
    id: "brain", label: "Brain & Head", color: "#cf4520", lightBg: "rgba(207,69,32,0.07)",
    what: ["Brain metastases", "Primary brain tumors", "Pituitary lesions", "Vascular abnormalities", "Inflammatory lesions"],
    findings: ["Glioblastoma multiforme", "Meningioma", "Cerebral metastases from breast/lung cancer", "Cavernous malformation"],
    education: "WB-MRI captures FLAIR and T1-weighted sequences to screen for metastatic disease, primary neoplasms, and vascular lesions — all without ionizing radiation.",
  },
  {
    id: "chest", label: "Chest & Lungs", color: "#b31b1b", lightBg: "rgba(179,27,27,0.07)",
    what: ["Lung nodules (>8mm)", "Mediastinal lymphadenopathy", "Cardiac lesions", "Pleural disease", "Breast lesions"],
    findings: ["Non-small cell lung cancer", "Lymphoma staging", "Thymoma", "Pleural mesothelioma"],
    education: "The chest is assessed using diffusion-weighted and T1 Dixon sequences, evaluating pulmonary nodules, enlarged mediastinal nodes, and cardiovascular anomalies systematically.",
  },
  {
    id: "abdomen", label: "Abdomen", color: "#e7751d", lightBg: "rgba(231,117,29,0.07)",
    what: ["Liver lesions & HCC", "Renal tumors", "Pancreatic lesions", "Adrenal masses", "Abdominal lymph nodes"],
    findings: ["Hepatocellular carcinoma", "Renal cell carcinoma", "Pancreatic adenocarcinoma", "Adrenal metastases"],
    education: "Multi-parametric sequences — including hepatobiliary-phase T1 and DWI — characterize focal liver lesions and evaluate solid organ tumors with high diagnostic accuracy.",
  },
  {
    id: "spine", label: "Spine", color: "#cf4520", lightBg: "rgba(207,69,32,0.07)",
    what: ["Vertebral metastases", "Spinal cord compression", "Disc herniation", "Bone marrow lesions", "Spinal stenosis"],
    findings: ["Vertebral bone metastases", "Multiple myeloma", "Epidural cord compression", "Discitis / osteomyelitis"],
    education: "The entire spine is imaged sagittally using STIR and T1 sequences, covering all vertebral bodies, intervertebral discs, and the spinal cord from cervical to sacral levels.",
  },
  {
    id: "pelvis", label: "Pelvis", color: "#b31b1b", lightBg: "rgba(179,27,27,0.07)",
    what: ["Prostate cancer", "Ovarian / uterine lesions", "Bladder tumors", "Pelvic lymph nodes", "Sacral lesions"],
    findings: ["Prostate adenocarcinoma", "Ovarian carcinoma", "Endometrial cancer", "Rectal carcinoma"],
    education: "High-resolution T2 and DWI sequences are used to stage genitourinary and colorectal malignancies and detect pelvic lymph node involvement.",
  },
  {
    id: "extremities", label: "Arms & Legs", color: "#e7751d", lightBg: "rgba(231,117,29,0.07)",
    what: ["Bone lesions", "Soft tissue sarcomas", "Marrow infiltration", "Lymph node involvement", "Joint disease"],
    findings: ["Osteosarcoma", "Ewing sarcoma", "Soft tissue sarcoma", "Metastatic bone disease"],
    education: "Long-bone marrow signal is evaluated throughout both upper and lower extremities, detecting primary bone tumors, marrow infiltration from hematologic malignancies, and metastatic disease.",
  },
];

// ── SVG Body ──
type BodySVGProps = { activeId: string | null; hoveredId: string | null; onRegionClick: (id: string) => void; onRegionHover: (id: string | null) => void; };

function getColor(id: string, activeId: string | null, hoveredId: string | null): string {
  const r = regions.find((r) => r.id === id);
  if (!r) return "rgba(255,255,255,0.07)";
  if (activeId === id || hoveredId === id) return r.color;
  return "rgba(255,255,255,0.09)";
}
function getOp(id: string, activeId: string | null, hoveredId: string | null): number {
  return (activeId === id || hoveredId === id) ? 0.88 : 1;
}

function BodySVG({ activeId, hoveredId, onRegionClick, onRegionHover }: BodySVGProps) {
  const c = (id: string) => getColor(id, activeId, hoveredId);
  const o = (id: string) => getOp(id, activeId, hoveredId);

  return (
    <svg viewBox="0 0 160 460" width="148" height="426" style={{ overflow: "visible", display: "block" }}>
      {/* Body silhouette (anatomical reference lines) */}
      <g fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1">
        <ellipse cx="80" cy="30" rx="22" ry="26" />
        <path d="M 70,54 L 70,66 L 90,66 L 90,54" />
        <path d="M 70,66 C 56,68 38,78 30,92 L 26,100 L 26,188 C 26,194 30,198 36,200 L 36,202 L 44,202 L 44,100 C 50,88 62,80 72,78 L 88,78 C 98,80 110,88 116,100 L 116,202 L 124,202 L 124,200 C 130,198 134,194 134,188 L 134,100 L 130,92 C 122,78 104,68 90,66" fill="rgba(255,255,255,0.05)" />
        <path d="M 26,100 L 20,96 L 14,100 L 14,220 C 14,228 18,234 24,236 L 34,236 L 36,228 L 26,224 L 26,104" fill="rgba(255,255,255,0.03)" />
        <path d="M 134,100 L 140,96 L 146,100 L 146,220 C 146,228 142,234 136,236 L 126,236 L 124,228 L 134,224 L 134,104" fill="rgba(255,255,255,0.03)" />
        <ellipse cx="24" cy="244" rx="10" ry="13" />
        <ellipse cx="136" cy="244" rx="10" ry="13" />
        <path d="M 44,202 L 44,236 C 44,244 50,250 58,252 L 80,254 L 102,252 C 110,250 116,244 116,236 L 116,202" fill="rgba(255,255,255,0.03)" />
        <path d="M 44,236 L 44,330 C 44,338 50,344 58,346 L 76,346 L 78,336 L 60,332 L 58,238 C 52,242 48,238 44,236 Z" fill="rgba(255,255,255,0.03)" />
        <path d="M 116,236 L 116,330 C 116,338 110,344 102,346 L 84,346 L 82,336 L 100,332 L 102,238 C 108,242 112,238 116,236 Z" fill="rgba(255,255,255,0.03)" />
        <path d="M 56,346 L 54,430 C 54,436 58,440 63,440 L 77,440 L 78,432 L 64,428 L 62,348" fill="rgba(255,255,255,0.03)" />
        <path d="M 104,346 L 106,430 C 106,436 102,440 97,440 L 83,440 L 82,432 L 96,428 L 98,348" fill="rgba(255,255,255,0.03)" />
        <path d="M 54,434 L 48,446 L 78,446 L 78,440 L 63,440 Z" />
        <path d="M 106,434 L 112,446 L 82,446 L 82,440 L 97,440 Z" />
        <line x1="80" y1="68" x2="80" y2="240" strokeDasharray="3,2.5" stroke="rgba(255,255,255,0.2)" />
        <path d="M 72,74 C 62,74 50,80 40,88" stroke="rgba(255,255,255,0.12)" />
        <path d="M 88,74 C 98,74 110,80 120,88" stroke="rgba(255,255,255,0.12)" />
        <path d="M 46,98 C 52,112 64,120 80,122 C 96,120 108,112 114,98" strokeDasharray="2,3" stroke="rgba(255,255,255,0.1)" />
        <path d="M 44,116 C 50,130 63,138 80,140 C 97,138 110,130 116,116" strokeDasharray="2,3" stroke="rgba(255,255,255,0.08)" />
        <path d="M 44,212 C 50,224 62,230 80,232 C 98,230 110,224 116,212" strokeDasharray="2,3" stroke="rgba(255,255,255,0.1)" />
      </g>

      {/* BRAIN */}
      <g style={{ cursor: "pointer" }} onClick={() => onRegionClick("brain")} onMouseEnter={() => onRegionHover("brain")} onMouseLeave={() => onRegionHover(null)}>
        <ellipse cx="80" cy="30" rx="23" ry="27" fill={c("brain")} opacity={o("brain")} style={{ transition: "fill 0.2s, opacity 0.2s" }} />
        <path d="M 70,54 L 70,68 L 90,68 L 90,54 Z" fill={c("brain")} opacity={o("brain")} style={{ transition: "fill 0.2s, opacity 0.2s" }} />
        {(activeId === "brain" || hoveredId === "brain") && (
          <text x="80" y="34" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="white" style={{ pointerEvents: "none", fontFamily: "sans-serif" }}>Brain</text>
        )}
      </g>

      {/* CHEST */}
      <g style={{ cursor: "pointer" }} onClick={() => onRegionClick("chest")} onMouseEnter={() => onRegionHover("chest")} onMouseLeave={() => onRegionHover(null)}>
        <path d="M 70,70 C 56,72 40,82 32,96 L 32,170 L 128,170 L 128,96 C 120,82 104,72 90,70 Z" fill={c("chest")} opacity={o("chest")} style={{ transition: "fill 0.2s, opacity 0.2s" }} />
        {(activeId === "chest" || hoveredId === "chest") && (
          <text x="80" y="126" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="white" style={{ pointerEvents: "none", fontFamily: "sans-serif" }}>Chest</text>
        )}
      </g>

      {/* ABDOMEN */}
      <g style={{ cursor: "pointer" }} onClick={() => onRegionClick("abdomen")} onMouseEnter={() => onRegionHover("abdomen")} onMouseLeave={() => onRegionHover(null)}>
        <path d="M 32,170 L 32,216 C 34,222 40,228 48,230 L 112,230 C 120,228 126,222 128,216 L 128,170 Z" fill={c("abdomen")} opacity={o("abdomen")} style={{ transition: "fill 0.2s, opacity 0.2s" }} />
        {(activeId === "abdomen" || hoveredId === "abdomen") && (
          <text x="80" y="204" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="white" style={{ pointerEvents: "none", fontFamily: "sans-serif" }}>Abdomen</text>
        )}
      </g>

      {/* SPINE */}
      <g style={{ cursor: "pointer" }} onClick={() => onRegionClick("spine")} onMouseEnter={() => onRegionHover("spine")} onMouseLeave={() => onRegionHover(null)}>
        <rect x="74" y="68" width="12" height="168" rx="4" fill={c("spine")} opacity={activeId === "spine" || hoveredId === "spine" ? 0.82 : 0} style={{ transition: "opacity 0.2s" }} />
        <rect x="75.5" y="68" width="9" height="168" rx="3" fill="none"
          stroke={activeId === "spine" || hoveredId === "spine" ? "white" : "rgba(207,69,32,0.5)"}
          strokeWidth="1"
          strokeDasharray={activeId === "spine" || hoveredId === "spine" ? "0" : "3,3"}
          style={{ transition: "stroke 0.2s" }}
        />
        <text x="68" y="158" textAnchor="end" fontSize="7" fontWeight="700"
          fill={activeId === "spine" || hoveredId === "spine" ? "#cf4520" : "rgba(207,69,32,0.7)"}
          style={{ fontFamily: "sans-serif", transition: "fill 0.2s" }}
        >Spine</text>
      </g>

      {/* PELVIS */}
      <g style={{ cursor: "pointer" }} onClick={() => onRegionClick("pelvis")} onMouseEnter={() => onRegionHover("pelvis")} onMouseLeave={() => onRegionHover(null)}>
        <path d="M 48,230 L 46,258 C 46,266 54,274 64,278 L 80,280 L 96,278 C 106,274 114,266 114,258 L 112,230 Z" fill={c("pelvis")} opacity={o("pelvis")} style={{ transition: "fill 0.2s, opacity 0.2s" }} />
        {(activeId === "pelvis" || hoveredId === "pelvis") && (
          <text x="80" y="260" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="white" style={{ pointerEvents: "none", fontFamily: "sans-serif" }}>Pelvis</text>
        )}
      </g>

      {/* EXTREMITIES */}
      <g style={{ cursor: "pointer" }} onClick={() => onRegionClick("extremities")} onMouseEnter={() => onRegionHover("extremities")} onMouseLeave={() => onRegionHover(null)}>
        {[
          "M 32,94 L 20,94 L 14,100 L 14,222 C 14,230 18,236 26,238 L 36,238 L 36,228 L 28,224 L 28,102 Z",
          "M 14,222 C 14,230 18,236 26,238 L 36,238 L 36,258 C 36,258 32,256 30,254 L 14,254 Z",
          "M 128,94 L 140,94 L 146,100 L 146,222 C 146,230 142,236 134,238 L 124,238 L 124,228 L 132,224 L 132,102 Z",
          "M 146,222 C 146,230 142,236 134,238 L 124,238 L 124,258 C 124,258 128,256 130,254 L 146,254 Z",
          "M 46,278 L 46,356 C 46,362 50,368 56,370 L 76,370 L 78,360 L 60,354 L 58,280 Z",
          "M 56,370 L 54,438 C 54,444 58,448 64,448 L 78,448 L 78,440 L 66,436 L 62,372 Z",
          "M 52,440 L 46,452 L 80,452 L 80,446 L 64,446 Z",
          "M 114,278 L 114,356 C 114,362 110,368 104,370 L 84,370 L 82,360 L 100,354 L 102,280 Z",
          "M 104,370 L 106,438 C 106,444 102,448 96,448 L 82,448 L 82,440 L 94,436 L 98,372 Z",
          "M 108,440 L 114,452 L 80,452 L 80,446 L 96,446 Z",
        ].map((d, i) => (
          <path key={i} d={d} fill={c("extremities")} opacity={o("extremities")} style={{ transition: "fill 0.2s, opacity 0.2s" }} />
        ))}
        <ellipse cx="24" cy="262" rx="10" ry="12" fill={c("extremities")} opacity={o("extremities")} style={{ transition: "fill 0.2s, opacity 0.2s" }} />
        <ellipse cx="136" cy="262" rx="10" ry="12" fill={c("extremities")} opacity={o("extremities")} style={{ transition: "fill 0.2s, opacity 0.2s" }} />
      </g>

      {/* Active glow pulse */}
      {regions.map((r) => {
        if (activeId !== r.id) return null;
        const cx = 80, cy = r.id === "brain" ? 30 : r.id === "chest" ? 120 : r.id === "abdomen" ? 196 : r.id === "spine" ? 152 : r.id === "pelvis" ? 254 : 80;
        return (
          <motion.circle key={r.id} cx={cx} cy={cy} r="28" fill={r.color} opacity="0"
            animate={{ opacity: [0, 0.1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}

      {/* Labels */}
      {[
        { id: "brain", x: 108, y: 32 },
        { id: "chest", x: 138, y: 126 },
        { id: "abdomen", x: 138, y: 200 },
        { id: "pelvis", x: 124, y: 258 },
      ].map(({ id, x, y }) => {
        const r = regions.find((r) => r.id === id)!;
        return (
          <g key={id} style={{ pointerEvents: "none" }}>
            <line x1={id === "brain" ? 103 : 128} y1={y} x2={x - 4} y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
            <text x={x} y={y + 3} fontSize="7"
              fill={activeId === id ? r.color : "rgba(255,255,255,0.4)"}
              style={{ fontFamily: "sans-serif", transition: "fill 0.2s" }}
            >
              {r.label.split(" ")[0]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function BodyExplorer() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const activeRegion = regions.find((r) => r.id === activeId) ?? null;
  const handleClick = (id: string) => setActiveId((prev) => (prev === id ? null : id));

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const orbY1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section id="body-explorer" ref={ref} className="relative flex flex-col overflow-hidden" style={{ background: "#0c0e15", height: "100vh", scrollSnapAlign: "start", paddingTop: "72px", paddingBottom: "48px" }}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      {/* Parallax aurora orbs */}
      <motion.div className="absolute pointer-events-none" style={{ top: "10%", left: "-15%", width: "50%", height: "60%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(231,117,29,0.08) 0%, transparent 70%)", filter: "blur(80px)", y: orbY1 }}
        animate={{ x: [0, 25, 0], scale: [1, 1.1, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute pointer-events-none" style={{ bottom: "5%", right: "-10%", width: "45%", height: "55%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(179,27,27,0.07) 0%, transparent 70%)", filter: "blur(100px)", y: orbY2 }}
        animate={{ x: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      {/* Animated top accent */}
      <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(231,117,29,0.4) 30%, rgba(207,69,32,0.7) 50%, rgba(231,117,29,0.4) 70%, transparent)" }}
        animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{ y }} className="relative flex flex-col h-full max-w-7xl mx-auto px-10 w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5" style={{ border: "1px solid rgba(231,117,29,0.3)", background: "rgba(231,117,29,0.08)" }}>
            <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: "#e7751d" }}
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <span style={{ color: "#e7751d", fontSize: "12px", letterSpacing: "0.06em" }}>INTERACTIVE BODY EXPLORER</span>
          </div>
          <h2 className="mb-2" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 700, color: "#f1f5f9" }}>
            Explore What WB-MRI <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e7751d, #b31b1b)" }}>Can Detect</span>
          </h2>
          <p style={{ fontSize: "13px", color: "#64748b" }}>
            Click any body region to see what conditions WB-MRI can identify.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 flex-1" style={{ minHeight: 0 }}>
          {/* Diagram */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}
            className="shrink-0 flex flex-col items-center"
          >
            <div className="relative rounded-2xl flex items-center justify-center" style={{ background: "rgba(10,22,40,0.8)", border: "1px solid rgba(207,69,32,0.15)", boxShadow: "0 0 40px rgba(207,69,32,0.06), 0 8px 32px rgba(0,0,0,0.4)", padding: "12px 16px" }}>
              <BodySVG activeId={activeId} hoveredId={hoveredId} onRegionClick={handleClick} onRegionHover={setHoveredId} />
            </div>
          </motion.div>

          {/* Info panel */}
          <div className="flex-1 flex flex-col" style={{ minHeight: 0 }}>
            <AnimatePresence mode="wait">
              {activeRegion ? (
                <motion.div key={activeRegion.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                  className="relative rounded-2xl p-7 h-full"
                  style={{ background: "rgba(10,22,40,0.9)", border: `1px solid ${activeRegion.color}30`, borderTop: `2px solid ${activeRegion.color}`, boxShadow: `0 0 40px ${activeRegion.color}10, 0 16px 48px rgba(0,0,0,0.5)` }}
                >
                  <button onClick={() => setActiveId(null)} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#64748b"; }}
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: activeRegion.lightBg }}>
                      <div className="w-3 h-3 rounded-full" style={{ background: activeRegion.color }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#f1f5f9" }}>{activeRegion.label}</h3>
                      <div className="h-0.5 w-10 mt-1 rounded-full" style={{ background: activeRegion.color }} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="mb-3 uppercase" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: activeRegion.color }}>
                        What Can Be Detected
                      </h4>
                      <ul className="space-y-2">
                        {activeRegion.what.map((item) => (
                          <li key={item} className="flex items-start gap-2" style={{ fontSize: "13px", color: "#94a3b8" }}>
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: activeRegion.color }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-3 uppercase" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: activeRegion.color }}>
                        Example Findings
                      </h4>
                      <ul className="space-y-2">
                        {activeRegion.findings.map((f) => (
                          <li key={f} className="flex items-start gap-2" style={{ fontSize: "13px", color: "#94a3b8" }}>
                            <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "#cf4520" }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl p-4" style={{ background: "rgba(231,117,29,0.05)", border: "1px solid rgba(231,117,29,0.12)" }}>
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#e7751d" }} />
                    <p style={{ fontSize: "13px", lineHeight: 1.65, color: "#94a3b8", margin: 0 }}>
                      <span style={{ color: "#e2e8f0", fontWeight: 600 }}>Clinical note: </span>
                      {activeRegion.education}
                    </p>
                  </div>

                  <div className="mt-5">
                    <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white transition-all"
                      style={{ background: activeRegion.color, fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#b31b1b"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = activeRegion.color; }}
                    >
                      Discuss {activeRegion.label} Imaging
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center rounded-2xl"
                  style={{ background: "rgba(10,22,40,0.7)", border: "1px solid rgba(255,255,255,0.05)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px" }}
                >
                  <motion.div animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="mb-6">
                    <svg viewBox="0 0 60 100" width="60" height="100">
                      <ellipse cx="30" cy="12" rx="10" ry="11" fill="none" stroke="rgba(207,69,32,0.4)" strokeWidth="1.5" />
                      <path d="M 22,22 L 20,23 L 16,26 L 16,60 L 20,60 L 20,30 L 40,30 L 40,60 L 44,60 L 44,26 L 40,23 L 38,22" fill="none" stroke="rgba(207,69,32,0.4)" strokeWidth="1.5" />
                      <path d="M 16,30 L 10,28 L 8,32 L 8,58 L 12,58 L 12,34 L 16,34" fill="none" stroke="rgba(207,69,32,0.35)" strokeWidth="1.2" />
                      <path d="M 44,30 L 50,28 L 52,32 L 52,58 L 48,58 L 48,34 L 44,34" fill="none" stroke="rgba(207,69,32,0.35)" strokeWidth="1.2" />
                      <path d="M 20,60 L 18,95 L 28,95 L 28,68 L 32,68 L 32,95 L 42,95 L 40,60" fill="none" stroke="rgba(207,69,32,0.4)" strokeWidth="1.5" />
                    </svg>
                  </motion.div>
                  <p style={{ fontSize: "15px", color: "#94a3b8", marginBottom: "6px" }}>Select a body region to explore</p>
                  <p style={{ fontSize: "13px", color: "#64748b" }}>Click directly on the diagram or use the region buttons</p>
                  <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-xs">
                    {regions.map((r) => (
                      <motion.button key={r.id} onClick={() => handleClick(r.id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 rounded-lg transition-all"
                        style={{ fontSize: "12px", fontWeight: 600, background: "rgba(255,255,255,0.04)", color: "#8b96a8", border: "1px solid rgba(255,255,255,0.07)", cursor: "pointer" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = r.color; (e.currentTarget as HTMLElement).style.color = r.color; (e.currentTarget as HTMLElement).style.background = r.color + "15"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "#8b96a8"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
                      >
                        {r.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
