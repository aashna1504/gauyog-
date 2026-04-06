import React, { useState } from "react";
import {
  Star,
  ShieldCheck,
  ShoppingBag,
  Heart,
  CheckCircle2,
  Flame,
  Wind,
  Box,
  Share2,
  Sparkle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const productImages = [
  "https://pngimg.com/d/rice_PNG17.png",
  "https://pngimg.com/d/milk_PNG12756.png",
  "https://pngimg.com/d/rice_PNG17.png",
];

export default function VedicDhoopMosaicPage() {
  const [activeImg, setActiveImg] = useState(0);

  const reveal = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="mt-20 md:mt-40">
      <div className="min-h-screen text-slate-900 selection:bg-[#7bbd25]/30 p-4 md:p-8">
        <div className="fixed top-0 right-0 w-[40%] h-[40%] bg-[#7bbd25]/5 rounded-full blur-[120px] -z-10" />

        <main className="max-w-[1500px] mx-auto mt-9 lg:mt-0">
          {/* Mobile: Flex column | Desktop: Grid 12 cols */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-stretch">
            {/* --- TOP SECTION (Badge & Heading) - Mobile Order: 1 --- */}
            <div className="order-1 lg:hidden mb-4">
              <motion.div initial="hidden" animate="visible" variants={reveal}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-2 bg-[#4a703f] text-white rounded-full text-[9px] font-black uppercase tracking-[0.3em] shadow-xl shadow-green-900/20">
                    Authentic Vedic
                  </span>
                  <span className="text-[#7bbd25] font-black text-[9px] uppercase tracking-widest bg-green-50 px-3 py-1 rounded-lg border border-green-100">
                    In Stock
                  </span>
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-[-0.06em] leading-[0.9] mb-4">
                  Vedic <br />
                  <span className="text-[#7bbd25]">Dhoop.</span>
                </h1>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black text-slate-900 tracking-tighter">
                    ₹155
                  </span>
                  <span className="text-lg text-slate-300 line-through font-bold">
                    ₹210
                  </span>
                </div>
              </motion.div>
            </div>

            {/* --- LEFT: IMAGE GALLERY - Mobile Order: 2 | Desktop: 5 Cols --- */}
            <div className="order-2 lg:col-span-5 lg:sticky lg:top-8 h-fit">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={reveal}
                className="relative aspect-[4/5] bg-white rounded-[40px] shadow-2xl shadow-[#4a703f]/10 border border-[#4a703f]/20 flex items-center justify-center overflow-hidden"
              >
                {/* Vertical Thumbnails */}
                <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImg(idx)}
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 transition-all p-1 ${
                        activeImg === idx
                          ? "border-[#7bbd25] bg-white scale-110 shadow-lg"
                          : "border-transparent bg-slate-50 opacity-50"
                      }`}
                    >
                      <img
                        src={img}
                        className="w-full h-full object-contain rounded-full"
                        alt="thumbnail"
                      />
                    </button>
                  ))}
                </div>

                {/* Actions */}
                <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20 flex flex-col gap-3">
                  <button className="p-3 md:p-4 bg-white/80 backdrop-blur-md rounded-full shadow-xl text-slate-400 hover:text-red-500 border border-white transition-colors">
                    <Heart
                      size={20}
                      fill={activeImg === 0 ? "currentColor" : "none"}
                    />
                  </button>
                  <button className="p-3 md:p-4 bg-white/80 backdrop-blur-md rounded-full shadow-xl text-slate-400 hover:text-blue-500 border border-white transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    initial={{ opacity: 0, x: 50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 1.1 }}
                    transition={{ type: "spring", damping: 20 }}
                    src={productImages[activeImg]}
                    className="w-full h-auto max-w-[280px] md:max-w-[380px] object-contain p-8 md:p-12 drop-shadow-[0_30px_30px_rgba(0,0,0,0.12)]"
                  />
                </AnimatePresence>

                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 overflow-hidden">
                  <h2 className="text-[60px] md:text-[100px] font-black text-slate-900/5 leading-none tracking-tighter uppercase select-none">
                    Gauyog
                  </h2>
                </div>
              </motion.div>
            </div>

            {/* --- RIGHT: BENTO FLOW - Mobile Order: 3 | Desktop: 7 Cols --- */}
            <div className="order-3 lg:col-span-7 space-y-10 md:space-y-16 lg:pl-6 xl:pl-10 mt-6 lg:mt-0">
              {/* Desktop Header (Hidden on Mobile) */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={reveal}
                className="hidden lg:block relative"
              >
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-5 py-2 bg-[#4a703f] text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-xl shadow-green-900/20">
                    Authentic Vedic
                  </span>
                  <div className="h-[1px] flex-grow bg-slate-200" />
                  <span className="text-[#7bbd25] font-black text-[10px] uppercase tracking-widest bg-green-50 px-3 py-1 rounded-lg border border-green-100">
                    In Stock
                  </span>
                </div>

                <h1 className="text-7xl font-black text-slate-900 tracking-[-0.06em] leading-[0.8] mb-8">
                  Vedic <br />
                  <span className="text-[#7bbd25] drop-shadow-sm">Dhoop.</span>
                </h1>

                <div className="flex items-end justify-between gap-12">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <span className="text-sm font-black ml-2 text-slate-900">
                        4.9/5.0
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                      Trusted by 5,000+ Practitioners
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-3">
                      <span className="text-6xl font-black text-slate-900 tracking-tighter">
                        ₹155
                      </span>
                      <span className="text-xl text-slate-300 line-through font-bold">
                        ₹210
                      </span>
                    </div>
                    <p className="text-[#7bbd25] font-black text-[10px] uppercase tracking-widest mt-1">
                      Inclusive of all taxes
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons (Always visible here) */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button className="w-full sm:w-auto flex-1 bg-[#744926] hover:bg-[#4a703f] text-white px-8 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95">
                  <ShoppingBag size={18} /> Add to Cart
                </button>
                <button className="w-full sm:w-auto flex-1 bg-white text-[#744926] border-2 border-[#744926] px-8 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-100 transition-all flex items-center justify-center gap-3 active:scale-95">
                  Buy Now
                </button>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border-y border-slate-200">
                {[
                  {
                    label: "Burn Time",
                    val: "45-50 Mins",
                    icon: <Flame size={18} />,
                  },
                  {
                    label: "Stick Count",
                    val: "40 Units",
                    icon: <Box size={18} />,
                  },
                  {
                    label: "Purity",
                    val: "100% Organic",
                    icon: <ShieldCheck size={18} />,
                  },
                  {
                    label: "Standard",
                    val: "Vedic Grade",
                    icon: <CheckCircle2 size={18} />,
                  },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="py-8 px-4 bg-[#fcfdfd] group hover:bg-white transition-colors duration-500"
                  >
                    <div className="text-[#7bbd25] mb-3 group-hover:scale-110 transition-transform">
                      {spec.icon}
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
                      {spec.label}
                    </p>
                    <p className="text-base font-black text-slate-800 tracking-tight">
                      {spec.val}
                    </p>
                  </div>
                ))}
              </div>

              {/* Composition */}
              <div className="space-y-12">
                <section>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#4a703f] mb-6 flex items-center gap-4">
                    <div className="w-8 h-[2px] bg-[#4a703f]" /> Product
                    Composition
                  </h3>
                  <p className="text-xl md:text-2xl text-slate-600 leading-[1.4] font-medium tracking-tight">
                    A sacred synergy of{" "}
                    <span className="text-slate-900 underline decoration-[#7bbd25] decoration-4 underline-offset-4">
                      Guggul, Jatamansi, and Loban
                    </span>
                    .
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 w-fit pb-1">
                      Botanical Blend
                    </h4>
                    <ul className="space-y-4">
                      {[
                        { n: "Natural Resins", d: "High-altitude forests" },
                        { n: "Desi Ghee", d: "Pure A2 cow ghee" },
                      ].map((ing, i) => (
                        <li key={i}>
                          <span className="block text-sm font-black text-slate-800">
                            {ing.n}
                          </span>
                          <span className="text-xs text-slate-400 font-medium italic">
                            {ing.d}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#e9aa43] p-8 rounded-[40px] text-white relative overflow-hidden">
                    <Sparkle className="absolute -right-4 -top-4 size-32 text-white/10 rotate-12" />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4a703f] mb-6">
                      Usage Rituals
                    </h4>
                    <div className="space-y-4">
                      {[
                        "Morning Spiritual Sadhana",
                        "Deep Meditation & Yoga",
                      ].map((u, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#4a703f]" />
                          <p className="text-sm font-bold text-slate-900 leading-tight">
                            {u}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Eco Info */}
              <div className="bg-[#e9aa43]/10 p-6 md:p-8 rounded-[40px] border border-[#e9aa43]/20 flex flex-col md:flex-row items-center justify-between gap-8 group">
                <div className="flex items-center gap-6">
                  <div className="size-16 bg-white rounded-full flex items-center justify-center text-[#e9aa43] shadow-lg group-hover:rotate-12 transition-transform">
                    <Wind size={32} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 tracking-tight">
                      Eco Packaging
                    </h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Plastic-Free | Biodegradable
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-[#4a703f]" /> Secure
                  Checkout
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
