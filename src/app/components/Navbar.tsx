import { useState, useEffect } from "react";
import { motion, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "What Is It",     href: "#what-is-wb-mri" },
  { label: "What It Detects",href: "#body-explorer" },
  { label: "What to Expect", href: "#workflow" },
  { label: "Why WCM",        href: "#platform" },
  { label: "FAQ",            href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (y) => setScrolled(y > 40));
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(12,14,21,0.98)" : "rgba(12,14,21,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(179,27,27,0.2)" : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex flex-col leading-none">
          <span style={{ fontSize: "14px", fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.01em" }}>Weill Cornell Medicine</span>
          <span style={{ fontSize: "10px", letterSpacing: "0.14em", color: "#e7751d" }}>WHOLE BODY MRI</span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}
              className="px-3 py-2 rounded-md transition-colors"
              style={{ fontSize: "13px", color: "#cbd5e1", textDecoration: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#cbd5e1"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="tel:2127466000" style={{ fontSize: "13px", color: "#94a3b8", textDecoration: "none" }}>212-746-6000</a>
          <motion.a href="#contact"
            className="px-5 py-2 rounded-sm text-white"
            style={{ background: "linear-gradient(135deg, #cf4520, #b31b1b)", fontSize: "13px", fontWeight: 600, textDecoration: "none", boxShadow: "0 0 20px rgba(179,27,27,0.3)" }}
            whileHover={{ boxShadow: "0 0 32px rgba(179,27,27,0.5)" }}
          >
            Schedule a Scan
          </motion.a>
        </div>

        <button className="md:hidden p-2" style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}
          onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
          className="md:hidden px-6 py-4 flex flex-col gap-2"
          style={{ background: "rgba(12,14,21,0.98)", borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
              className="py-2.5" style={{ fontSize: "15px", color: "#94a3b8", borderBottom: "1px solid rgba(255,255,255,0.05)", textDecoration: "none" }}>
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileOpen(false)} className="mt-3 py-3 text-center rounded-sm text-white"
            style={{ background: "linear-gradient(135deg, #cf4520, #b31b1b)", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Schedule a Scan
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
