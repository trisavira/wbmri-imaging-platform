import { motion } from "motion/react";
import { Activity } from "lucide-react";

const links = {
  Platform: ["Whole-Body MRI", "AI Detection", "Biomarkers", "Reporting", "Integration"],
  Clinical: ["Oncology", "Inflammatory", "Screening", "Pediatric", "Evidence Library"],
  Company: ["About", "Careers", "Partners", "Press", "Contact"],
  Legal: ["Privacy Policy", "Terms of Use", "HIPAA", "Cookies"],
};

export function Footer() {
  return (
    <footer style={{ background: "#080a10", borderTop: "1px solid rgba(255,255,255,0.06)" }} className="py-16 relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(207,69,32,0.3), transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-8 h-8">
                <motion.div className="absolute inset-0 rounded-lg"
                  style={{ background: "rgba(207,69,32,0.12)", border: "1px solid rgba(207,69,32,0.35)" }}
                  animate={{ boxShadow: ["0 0 0px rgba(207,69,32,0)", "0 0 10px rgba(207,69,32,0.3)", "0 0 0px rgba(207,69,32,0)"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <Activity className="absolute inset-0 m-auto w-4 h-4" style={{ color: "#e7751d" }} />
              </div>
              <div className="flex flex-col leading-none">
                <span style={{ fontSize: "15px", fontWeight: 700, color: "#e2e8f0" }}>WB-MRI</span>
                <span style={{ fontSize: "10px", letterSpacing: "0.14em", color: "#e7751d" }}>IMAGING PLATFORM</span>
              </div>
            </div>
            <p style={{ fontSize: "13px", lineHeight: 1.75, color: "#475569", marginBottom: "16px" }}>
              Advancing whole-body MRI diagnostics with AI-powered precision. Trusted by leading radiologists and oncologists worldwide.
            </p>
            <div className="flex gap-2">
              {["CE", "FDA", "ISO"].map((cert) => (
                <div key={cert} className="px-2.5 py-1 rounded"
                  style={{ border: "1px solid rgba(255,255,255,0.08)", fontSize: "11px", color: "#475569", letterSpacing: "0.04em" }}>
                  {cert}
                </div>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="mb-4" style={{ fontSize: "11px", fontWeight: 600, color: "#475569", letterSpacing: "0.1em" }}>{category.toUpperCase()}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" style={{ fontSize: "13px", color: "#475569", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#e7751d"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#475569"; }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <p style={{ fontSize: "11px", color: "#475569" }}>© 2026 WB-MRI Imaging Platform. All rights reserved.</p>
          <p style={{ fontSize: "11px", color: "#475569" }}>For investigational use only in certain markets.</p>
        </div>
      </div>
    </footer>
  );
}
