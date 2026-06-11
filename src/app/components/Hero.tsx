import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const SCANNER_URL =
  "https://images.unsplash.com/photo-1666214280165-20e3d73d70bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxyYWRpb2xvZ2lzdCUyMGRvY3RvciUyME1SSSUyMHNjYW4lMjByZXZpZXclMjBtZWRpY2FsJTIwaW1hZ2luZ3xlbnwxfHx8fDE3ODA5MzI1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080";

const badges = ["No Radiation", "No Referral Needed", "Results in 2 Days", "No Special Prep"];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const smoothImgY = useSpring(imgY, { stiffness: 60, damping: 20 });

  return (
    <section ref={containerRef} className="relative flex flex-col overflow-hidden"
      style={{ background: "#0c0e15", height: "100vh", scrollSnapAlign: "start" }}
    >
      {/* Ambient glow */}
      <div className="absolute pointer-events-none" style={{ top: "10%", left: "-5%", width: "45%", height: "60%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(179,27,27,0.07) 0%, transparent 70%)", filter: "blur(120px)" }} />

      {/* Left panel */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }}
        className="absolute inset-y-0 left-0 w-full lg:w-[48%] z-10 flex flex-col justify-center px-10 lg:px-16 xl:px-24 pt-20 pb-10"
      >
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <motion.div className="h-px w-8" style={{ background: "#b31b1b" }}
            animate={{ width: [32, 48, 32] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          <span style={{ fontSize: "12px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>
            PREVENTIVE CARE · WEILL CORNELL MEDICINE
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-0.025em" }}
        >
          Early Detection.<br />
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e7751d 0%, #cf4520 40%, #b31b1b 100%)" }}>
            Greater Peace
          </span><br />
          of Mind.
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-6 max-w-[420px]"
          style={{ fontSize: "16px", lineHeight: 1.85, color: "#8b96a8" }}
        >
          A comprehensive, radiation-free whole-body MRI scan — interpreted by world-class subspecialty radiologists at Weill Cornell Medicine. No referral required.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.36 }}
          className="flex flex-wrap gap-3 mt-9"
        >
          <motion.a href="#contact"
            className="flex items-center gap-2 px-7 py-3.5 rounded-sm"
            style={{ background: "linear-gradient(135deg, #cf4520, #b31b1b)", color: "#fff", fontSize: "14px", fontWeight: 600, textDecoration: "none", boxShadow: "0 0 32px rgba(179,27,27,0.35)" }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 48px rgba(179,27,27,0.55)" }}
            whileTap={{ scale: 0.97 }}
          >
            Schedule Your Scan <ArrowRight className="w-4 h-4" />
          </motion.a>
          <motion.a href="#workflow"
            className="flex items-center gap-2 px-7 py-3.5 rounded-sm"
            style={{ background: "transparent", color: "#94a3b8", fontSize: "14px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)" }}
            whileHover={{ borderColor: "rgba(255,255,255,0.25)", color: "#ffffff" }}
            whileTap={{ scale: 0.97 }}
          >
            What to Expect <ChevronRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* Badges */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap gap-2 mt-8"
        >
          {badges.map((b, i) => (
            <motion.span key={b} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.06 }}
              className="px-3 py-1 rounded-full"
              style={{ fontSize: "11px", color: "#64748b", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}>
              {b}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Right panel: parallax image */}
      <motion.div style={{ y: smoothImgY }} className="hidden lg:block absolute inset-y-0 right-0 w-[55%]">
        <ImageWithFallback src={SCANNER_URL} alt="Whole-body MRI scanner at Weill Cornell Medicine"
          className="w-full h-full object-cover"
          style={{ opacity: 0.75, filter: "saturate(0.45) contrast(1.1)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0c0e15 0%, rgba(12,14,21,0.55) 28%, transparent 55%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0c0e15 0%, transparent 35%)" }} />

        {/* Scan line */}
        <motion.div className="absolute left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent 10%, rgba(179,27,27,0.5) 40%, rgba(179,27,27,0.8) 60%, transparent 90%)", filter: "blur(0.5px)" }}
          animate={{ top: ["10%", "90%", "10%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating info badge */}
        <motion.div
          className="absolute bottom-16 right-10 rounded-lg p-4"
          style={{ background: "rgba(12,14,21,0.92)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", minWidth: "200px" }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
          transition={{ opacity: { duration: 0.6, delay: 0.8 }, x: { duration: 0.6, delay: 0.8 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
        >
          <div style={{ fontSize: "11px", color: "#4a576b", marginBottom: "6px", letterSpacing: "0.06em" }}>YOUR SCAN</div>
          <div style={{ fontSize: "16px", fontWeight: 600, color: "#ffffff", marginBottom: "2px" }}>Head to Mid-Thigh</div>
          <div style={{ fontSize: "12px", color: "#5a6680" }}>~45 min · No contrast · No prep</div>
          <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
            <motion.div className="h-full rounded-full"
              style={{ background: "linear-gradient(to right, #b31b1b, #e7751d)" }}
              initial={{ width: 0 }} animate={{ width: "72%" }}
              transition={{ duration: 2.5, delay: 1, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span style={{ fontSize: "10px", color: "#3d4960" }}>Scanning</span>
            <span style={{ fontSize: "10px", color: "#cf4520", fontWeight: 600 }}>72%</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, #0c0e15, transparent)" }} />

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        style={{ opacity: contentOpacity }}
      >
        <span style={{ fontSize: "10px", color: "#3d4960", letterSpacing: "0.12em" }}>SCROLL</span>
        <motion.div className="w-px h-8" style={{ background: "linear-gradient(to bottom, rgba(179,27,27,0.6), transparent)" }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
