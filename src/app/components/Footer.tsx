import { motion } from "motion/react";

const links = {
  "Our Services": ["Whole Body MRI", "Preventive Screening", "Oncology Imaging", "Inflammatory Disease", "Follow-up Care"],
  "Patient Info":  ["What to Expect", "What We Detect", "Before Your Scan", "Your Report", "FAQ"],
  "Weill Cornell": ["About WCM Imaging", "Our Radiologists", "Research", "For Referring Physicians", "Contact Us"],
  "Legal":         ["Privacy Policy", "Terms of Use", "HIPAA Notice", "Accessibility", "Site Map"],
};

const certifications = ["ACR Accredited", "3T MRI", "AI-Enhanced", "Subspecialty Review"];

export function Footer() {
  return (
    <footer style={{ background: "#080a10", borderTop: "1px solid rgba(255,255,255,0.06)", scrollSnapAlign: "start", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }} className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      <motion.div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(179,27,27,0.3), transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-4">
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#e2e8f0" }}>Weill Cornell Medicine</div>
              <div style={{ fontSize: "10px", letterSpacing: "0.14em", color: "#e7751d" }}>WHOLE BODY MRI</div>
            </div>
            <p style={{ fontSize: "13px", lineHeight: 1.75, color: "#8b96a8", marginBottom: "16px" }}>
              Radiation-free whole-body MRI screening, interpreted by world-class subspecialty radiologists.
            </p>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span key={cert} className="px-2.5 py-1 rounded-full"
                  style={{ border: "1px solid rgba(255,255,255,0.08)", fontSize: "10px", color: "#8b96a8", letterSpacing: "0.04em" }}>
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="mb-4" style={{ fontSize: "11px", fontWeight: 600, color: "#8b96a8", letterSpacing: "0.1em" }}>{category.toUpperCase()}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" style={{ fontSize: "13px", color: "#8b96a8", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#e7751d"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8b96a8"; }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row justify-between gap-3">
          <p style={{ fontSize: "11px", color: "#8b96a8" }}>© 2026 Weill Cornell Medicine. All rights reserved.</p>
          <p style={{ fontSize: "11px", color: "#8b96a8" }}>In most cases, not covered by insurance. Payment required at time of appointment.</p>
        </div>
      </div>
    </footer>
  );
}
