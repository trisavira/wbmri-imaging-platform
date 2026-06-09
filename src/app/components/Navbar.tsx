import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "motion/react";
import { Activity, Menu, X, ChevronRight } from "lucide-react";

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Body Explorer", href: "#body-explorer" },
  { label: "Clinical Data", href: "#clinical" },
  { label: "Technology", href: "#technology" },
  { label: "Workflow", href: "#workflow" },
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
        background: scrolled ? "rgba(12,14,21,0.97)" : "rgba(12,14,21,0.6)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(207,69,32,0.2)" : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.5)" : "none",
      }}
    >
      {/* Top glow line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(207,69,32,0.6), rgba(231,117,29,0.4), transparent)" }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8">
            <motion.div
              className="absolute inset-0 rounded-lg"
              style={{ background: "rgba(207,69,32,0.15)", border: "1px solid rgba(207,69,32,0.4)" }}
              animate={{ boxShadow: ["0 0 0px rgba(207,69,32,0)", "0 0 12px rgba(207,69,32,0.4)", "0 0 0px rgba(207,69,32,0)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <Activity className="absolute inset-0 m-auto w-4 h-4" style={{ color: "#e7751d" }} />
          </div>
          <div className="flex flex-col leading-none">
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#f1f5f9" }}>WB-MRI</span>
            <span style={{ fontSize: "10px", letterSpacing: "0.14em", color: "#e7751d" }}>IMAGING PLATFORM</span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 rounded-md transition-all duration-200"
              style={{ fontSize: "13px", color: "#94a3b8", textDecoration: "none", letterSpacing: "0.01em" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#e7751d";
                (e.currentTarget as HTMLElement).style.background = "rgba(207,69,32,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="#contact"
            style={{ fontSize: "13px", color: "#64748b", textDecoration: "none" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#64748b"; }}
          >
            Sign In
          </a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg"
            style={{ background: "linear-gradient(135deg, #cf4520, #b31b1b)", color: "#fff", fontSize: "13px", fontWeight: 600, textDecoration: "none", boxShadow: "0 0 20px rgba(207,69,32,0.3)" }}
          >
            Request Demo
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.a>
        </div>

        <button
          className="md:hidden p-2 rounded-md"
          style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-6 py-4 flex flex-col gap-2"
            style={{ background: "rgba(12,14,21,0.98)", borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                className="py-2.5 transition-colors"
                style={{ fontSize: "15px", color: "#94a3b8", borderBottom: "1px solid rgba(255,255,255,0.05)", textDecoration: "none" }}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact"
              className="mt-3 text-center py-2.5 rounded-lg"
              style={{ background: "linear-gradient(135deg, #cf4520, #b31b1b)", color: "#fff", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
            >
              Request Demo
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
