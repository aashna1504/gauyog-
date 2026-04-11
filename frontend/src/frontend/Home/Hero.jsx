import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sprout, Globe, Users, ShieldCheck } from "lucide-react";

export default function GlobalModernHero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 selection:bg-[#4a703f] selection:text-white">
      {/* --- BACKGROUND IMAGE LAYER --- */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302434/0fc480c8-6acf-4ff0-a587-cea5c58e069b_lii8qp.jpg"
          alt="Nature Background"
          className="w-full h-full object-cover"
        />
        {/* Deepened Overlay: Darker & more blur makes the white text and glass boxes pop */}
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[5px]" />
      </div>

      {/* --- AMBIENT GLOWS --- */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#4a703f]/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-[#4a703f]/30 rounded-full blur-[100px]"
        />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full py-3">
        {/* --- HERO TITLES --- */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-white tracking-[-0.05em] leading-[0.85]"
          >
            PURE BY NATURE
            <br />
            <span className="text-[#e9aa43]"> PROVEN BY EARTH</span>
          </motion.h1>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: MISSION & ACTIONS */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="border-l-4 border-[#e9aa43] pl-8">
              <h3 className="text-xl font-black text-[#e9aa43] uppercase tracking-tighter mb-4">
                Our Sacred Mission
              </h3>
              <p className="text-lg text-slate-200 font-medium leading-relaxed">
                We transform sacred Gausattva into premium lifestyle essentials.
                From our sanctuary in Gir Somnath to your home, we provide
                biologically enriched solutions for modern wellbeing.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => (window.location.href = "/shop")}
                className="group px-10 py-5 bg-[#4a703f] text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#744926] transition-all shadow-xl shadow-black/20 flex items-center gap-3"
              >
                Shop Products
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <button
                onClick={() => (window.location.href = "/about")}
                className="px-10 py-5 bg-[#744926] text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all"
              >
                About us
              </button>
            </div>
          </motion.div>

          {/* RIGHT: FEATURE GRID (Restructured for space) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Box 1: Circular Economy */}
            <div className="p-6 bg-white/10 backdrop-blur-xl rounded-[32px] border border-white/20 hover:bg-white/15 transition-colors">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-[#4a703f]/20 rounded-lg text-[#4a703f]">
                  <Sprout size={24} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-widest text-white">
                  Circular Economy
                </h4>
              </div>
              <p className="text-[13px] text-slate-300 font-medium leading-snug">
                Transforming agricultural by-products into high-value organic
                inputs.
              </p>
            </div>

            {/* Box 2: Zero Chemicals */}
            <div className="p-6 bg-white/10 backdrop-blur-xl rounded-[32px] border border-white/20 hover:bg-white/15 transition-colors">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-[#0d5c63]/20 rounded-lg text-cyan-400">
                  <ShieldCheck size={24} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-widest text-white">
                  Zero Chemicals
                </h4>
              </div>
              <p className="text-[13px] text-slate-300 font-medium leading-snug">
                100% natural composting and biological enrichment. No
                synthetics.
              </p>
            </div>

            {/* Box 3: Community First */}
            <div className="p-6 bg-white/10 backdrop-blur-xl rounded-[32px] border border-white/20 hover:bg-white/15 transition-colors">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-[#a05a2c]/20 rounded-lg text-orange-400">
                  <Users size={24} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-widest text-white">
                  Community First
                </h4>
              </div>
              <p className="text-[13px] text-slate-300 font-medium leading-snug">
                Empowering local women and supporting Gujarat's rural economy.
              </p>
            </div>

            {/* Box 4: Export Quality */}
            <div className="p-6 bg-white/10 backdrop-blur-xl rounded-[32px] border border-white/20 hover:bg-white/15 transition-colors">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-[#4a703f]/20 rounded-lg text-yellow-400">
                  <Globe size={24} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-widest text-white">
                  Export Quality
                </h4>
              </div>
              <p className="text-[13px] text-slate-300 font-medium leading-snug">
                Premium products meeting international organic standards.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
