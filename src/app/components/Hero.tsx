import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const SCANNER_URL =
  "https://images.unsplash.com/photo-1666214280165-20e3d73d70bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxyYWRpb2xvZ2lzdCUyMGRvY3RvciUyME1SSSUyMHNjYW4lMjByZXZpZXclMjBtZWRpY2FsJTIwaW1hZ2luZ3xlbnwxfHx8fDE3ODA5MzI1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const smoothImgY = useSpring(imgY, { stiffness: 60, damping: 20 });

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: "#0c0e15" }}>

      {/* Single subtle ambient glow */}
      <div className="absolute pointer-events-none" style={{ top: "10%", left: "-5%", width: "45%", height: "60%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(179,27,27,0.07) 0%, transparent 70%)", filter: "blur(120px)" }} />

      {/* ── Left panel ── */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }}
        className="absolute inset-y-0 left-0 w-full lg:w-[48%] z-10 flex flex-col justify-center px-10 lg:px-16 xl:px-24 pt-20 pb-10"
      >
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <motion.div className="h-px w-8" style={{ background: "#b31b1b" }}
            animate={{ width: [32, 48, 32] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          <span style={{ fontSize: "12px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>
            ENTERPRISE IMAGING PLATFORM
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-0.025em" }}
        >
          Whole-Body MRI.<br />
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e7751d 0%, #cf4520 40%, #b31b1b 100%)" }}>
            AI-powered.
          </span><br />
          Clinically proven.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-6 max-w-[400px]"
          style={{ fontSize: "16px", lineHeight: 1.85, color: "#8b96a8" }}
        >
          Head-to-toe coverage in under 45 minutes. Deep-learning detection, quantitative biomarkers, and PACS-native reporting — built for oncology, inflammatory disease, and screening programs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.36 }}
          className="flex flex-wrap gap-3 mt-9"
        >
          <motion.a href="#contact"
            className="flex items-center gap-2 px-7 py-3.5 rounded-sm"
            style={{ background: "linear-gradient(135deg, #cf4520, #b31b1b)", color: "#fff", fontSize: "14px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.01em", boxShadow: "0 0 32px rgba(207,69,32,0.35)" }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 48px rgba(207,69,32,0.55)" }}
            whileTap={{ scale: 0.97 }}
          >
            Request a Demo <ArrowRight className="w-4 h-4" />
          </motion.a>
          <motion.a href="#platform"
            className="flex items-center gap-2 px-7 py-3.5 rounded-sm"
            style={{ background: "transparent", color: "#94a3b8", fontSize: "14px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)", letterSpacing: "0.01em" }}
            whileHover={{ borderColor: "rgba(255,255,255,0.25)", color: "#ffffff", background: "rgba(255,255,255,0.04)" }}
            whileTap={{ scale: 0.97 }}
          >
            View Platform <ChevronRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center gap-6 mt-10"
        >
          <span style={{ fontSize: "11px", color: "#4a576b", letterSpacing: "0.06em" }}>REGULATORY CLEARANCES</span>
          {["FDA 510(k)", "CE Mark", "ISO 13485"].map((cert) => (
            <span key={cert} style={{ fontSize: "11px", color: "#64748b", letterSpacing: "0.04em", fontWeight: 500 }}>{cert}</span>
          ))}
        </motion.div>

      </motion.div>

      {/* ── Right panel: parallax image ── */}
      <motion.div style={{ y: smoothImgY }} className="hidden lg:block absolute inset-y-0 right-0 w-[55%]">
        <ImageWithFallback
          src={SCANNER_URL}
          alt="Patient in WB-MRI scanner"
          className="w-full h-full object-cover"
          style={{ opacity: 0.75, filter: "saturate(0.45) contrast(1.1)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0c0e15 0%, rgba(12,14,21,0.55) 28%, transparent 55%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0c0e15 0%, transparent 35%)" }} />

        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent 10%, rgba(207,69,32,0.5) 40%, rgba(207,69,32,0.85) 60%, transparent 90%)", filter: "blur(0.5px)", boxShadow: "0 0 12px rgba(207,69,32,0.3)" }}
          animate={{ top: ["10%", "90%", "10%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* HUD corners */}
        {[
          "top-12 right-6 border-t border-r",
          "top-12 right-[calc(55%-8px)] border-t border-l",
        ].map((cls, i) => (
          <motion.div key={i} className={`absolute w-6 h-6 ${cls}`}
            style={{ borderColor: "rgba(207,69,32,0.4)" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}

        {/* Floating clinical badge */}
        <motion.div
          className="absolute bottom-16 right-10 rounded-lg p-4"
          style={{ background: "rgba(12,14,21,0.92)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", minWidth: "200px", boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(207,69,32,0.08)" }}
          initial={{ opacity: 0, x: 20, y: 10 }}
          animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
          transition={{ opacity: { duration: 0.6, delay: 0.8 }, x: { duration: 0.6, delay: 0.8 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
        >
          <div style={{ fontSize: "11px", color: "#4a576b", marginBottom: "6px", letterSpacing: "0.06em" }}>ACTIVE PROTOCOL</div>
          <div style={{ fontSize: "16px", fontWeight: 600, color: "#ffffff", marginBottom: "2px" }}>Whole-Body DWI</div>
          <div style={{ fontSize: "12px", color: "#5a6680" }}>T1 Dixon · T2 STIR · ADC</div>
          <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
            <motion.div className="h-full rounded-full"
              style={{ background: "linear-gradient(to right, #b31b1b, #e7751d)", boxShadow: "0 0 8px rgba(231,117,29,0.4)" }}
              initial={{ width: 0 }}
              animate={{ width: "72%" }}
              transition={{ duration: 2.5, delay: 1, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span style={{ fontSize: "10px", color: "#3d4960" }}>Acquiring</span>
            <span style={{ fontSize: "10px", color: "#cf4520", fontWeight: 600 }}>72%</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, #0c0e15, transparent)" }} />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity: contentOpacity }}
      >
        <span style={{ fontSize: "10px", color: "#3d4960", letterSpacing: "0.12em" }}>SCROLL</span>
        <motion.div className="w-px h-8" style={{ background: "linear-gradient(to bottom, rgba(207,69,32,0.6), transparent)" }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
