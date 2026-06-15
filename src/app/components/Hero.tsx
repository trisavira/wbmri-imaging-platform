import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const SCANNER_URL =
  "https://images.unsplash.com/photo-1666214280165-20e3d73d70bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxyYWRpb2xvZ2lzdCUyMGRvY3RvciUyME1SSSUyMHNjYW4lMjByZXZpZXclMjBtZWRpY2FsJTIwaW1hZ2luZ3xlbnwxfHx8fDE3ODA5MzI1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080";

const badges = ["No Radiation", "No Referral Needed", "Results in 2 Days", "No Special Prep"];

function WordReveal({ text, delay = 0, style }: { text: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <span style={{ display: "block", ...style }}>
      {text.split(" ").map((word, i) => (
        <motion.span key={i}
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const smoothImgY = useSpring(imgY, { stiffness: 60, damping: 20 });

  return (
    <section ref={containerRef} className="relative flex flex-col overflow-hidden"
      style={{ background: "#0c0e15", height: "100vh", scrollSnapAlign: "start" }}
    >
      <div className="absolute pointer-events-none" style={{ top: "10%", left: "-5%", width: "45%", height: "60%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(179,27,27,0.07) 0%, transparent 70%)", filter: "blur(120px)" }} />

      {/* Left panel */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }}
        className="absolute inset-y-0 left-0 w-full lg:w-[48%] z-10 flex flex-col justify-center px-10 lg:px-16 xl:px-24 pt-20 pb-10"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-8"
        >
          <motion.div className="h-px w-8" style={{ background: "#b31b1b" }}
            animate={{ width: [32, 52, 32] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          <span style={{ fontSize: "12px", color: "#b31b1b", letterSpacing: "0.12em", fontWeight: 600 }}>
            PREVENTIVE CARE · WEILL CORNELL MEDICINE
          </span>
        </motion.div>

        {/* Headline — word by word */}
        <h1 style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.025em" }}>
          <WordReveal text="Early Detection." delay={0.1} style={{ color: "#FDF8F5" }} />
          <span style={{ display: "block" }}>
            {["Greater", "Peace"].map((word, i) => (
              <motion.span key={word}
                initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.55, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-transparent bg-clip-text"
                style={{ display: "inline-block", marginRight: "0.28em", backgroundImage: "linear-gradient(135deg, #e7751d 0%, #cf4520 40%, #b31b1b 100%)" }}
              >{word}</motion.span>
            ))}
          </span>
          <WordReveal text="of Mind." delay={0.55} style={{ color: "#FDF8F5" }} />
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-[420px]"
          style={{ fontSize: "16px", lineHeight: 1.85, color: "#8b96a8" }}
        >
          A comprehensive, radiation-free whole-body MRI scan — interpreted by world-class subspecialty radiologists at Weill Cornell Medicine. No referral required.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-3 mt-9"
        >
          <motion.a href="#contact"
            className="flex items-center gap-2 px-7 py-3.5 rounded-sm"
            style={{ background: "linear-gradient(135deg, #cf4520, #b31b1b)", color: "#fff", fontSize: "14px", fontWeight: 600, textDecoration: "none", boxShadow: "0 0 32px rgba(179,27,27,0.35)" }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 52px rgba(179,27,27,0.6)" }}
            whileTap={{ scale: 0.96 }}
          >
            Schedule Your Scan <ArrowRight className="w-4 h-4" />
          </motion.a>
          <motion.a href="#workflow"
            className="flex items-center gap-2 px-7 py-3.5 rounded-sm"
            style={{ background: "transparent", color: "#94a3b8", fontSize: "14px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)" }}
            whileHover={{ borderColor: "rgba(255,255,255,0.3)", color: "#FDF8F5", background: "rgba(255,255,255,0.04)" }}
            whileTap={{ scale: 0.96 }}
          >
            What to Expect <ChevronRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-8">
          {badges.map((b, i) => (
            <motion.span key={b}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.1 + i * 0.07, type: "spring", stiffness: 200, damping: 18 }}
              className="px-3 py-1 rounded-full"
              style={{ fontSize: "11px", color: "#64748b", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}
            >
              {b}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Right panel */}
      <motion.div style={{ y: smoothImgY }}
        className="hidden lg:block absolute inset-y-0 right-0 w-[55%]"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <ImageWithFallback src={SCANNER_URL} alt="Whole-body MRI scanner at Weill Cornell Medicine"
          className="w-full h-full object-cover"
          style={{ opacity: 0.75, filter: "saturate(0.45) contrast(1.1)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0c0e15 0%, rgba(12,14,21,0.55) 28%, transparent 55%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0c0e15 0%, transparent 35%)" }} />
        <motion.div className="absolute left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent 10%, rgba(179,27,27,0.5) 40%, rgba(179,27,27,0.8) 60%, transparent 90%)", filter: "blur(0.5px)" }}
          animate={{ top: ["10%", "90%", "10%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-16 right-10 rounded-lg p-4"
          style={{ background: "rgba(12,14,21,0.92)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", minWidth: "200px" }}
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
          transition={{ opacity: { duration: 0.7, delay: 1.0 }, x: { duration: 0.7, delay: 1.0, ease: [0.22, 1, 0.36, 1] }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 } }}
        >
          <div style={{ fontSize: "11px", color: "#8b96a8", marginBottom: "6px", letterSpacing: "0.06em" }}>YOUR SCAN</div>
          <div style={{ fontSize: "16px", fontWeight: 600, color: "#FDF8F5", marginBottom: "2px" }}>Head to Mid-Thigh</div>
          <div style={{ fontSize: "12px", color: "#8b96a8" }}>~45 min · No contrast · No prep</div>
          <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
            <motion.div className="h-full rounded-full"
              style={{ background: "linear-gradient(to right, #b31b1b, #e7751d)" }}
              initial={{ width: 0 }} animate={{ width: "72%" }}
              transition={{ duration: 2.5, delay: 1.3, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span style={{ fontSize: "10px", color: "#64748b" }}>Scanning</span>
            <span style={{ fontSize: "10px", color: "#cf4520", fontWeight: 600 }}>72%</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, #0c0e15, transparent)" }} />
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        style={{ opacity: contentOpacity }}
      >
        
        <motion.div className="w-px h-8" style={{ background: "linear-gradient(to bottom, rgba(179,27,27,0.6), transparent)" }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
