import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Package,
  Truck,
  ChevronRight,
  Search,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");

  return (
    <div className="min-h-screen bg-[#fcfdfd] selection:bg-[#4a703f] selection:text-white ">
      {/* --- CENTERED HERO BANNER --- */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative w-full py-20 md:py-28 overflow-hidden border-b border-gray-50 mt-16"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fbf6] to-white" />

        {/* SIGNATURE RIGHT GLOW */}
        <div
          className="absolute top-1/2 -right-1/4 -translate-y-1/2 w-[60%] h-[150%] opacity-20 blur-[120px] rounded-full pointer-events-none animate-pulse"
          style={{
            background:
              "radial-gradient(circle at right, #7bbd25 0%, transparent 70%)",
            zIndex: -20,
          }}
        />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-10 h-[1px] bg-slate-200" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#4a703f]">
              Logistics Portal
            </span>
            <div className="w-10 h-[1px] bg-slate-200" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter"
            style={{
              fontFamily: "'Baskerville Old Face', 'Libre Baskerville', serif",
            }}
          >
            Track <br />
            <span className="text-[#7bbd25] italic font-medium">
              Your Order.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-8 text-gray-400 max-w-sm mx-auto text-[11px] font-bold uppercase tracking-widest leading-loose"
          >
            Real-time updates from us to your doorstep.
          </motion.p>
        </div>
      </motion.div>

      {/* --- TRACKING INPUT SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100"
        >
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">
                Enter Order ID
              </label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7bbd25] transition-colors">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  placeholder="GUK-XXXXX"
                  className="w-full bg-slate-50 border-none rounded-full py-6 pl-16 pr-6 text-lg font-bold text-slate-900 focus:ring-2 focus:ring-[#7bbd25] transition-all placeholder:text-slate-200"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </div>
            </div>

            <button className="w-full bg-[#4a703f] hover:bg-slate-900 text-white py-6 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all duration-500 group shadow-xl shadow-[#4a703f]/20">
              Locate Package
              <ArrowRight
                size={18}
                className="group-hover:translate-x-2 transition-transform"
              />
            </button>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#7bbd25]" />
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">
                  Verified Delivery
                </span>
              </div>
              <Link
                to="/contact"
                className="text-[9px] font-black uppercase text-slate-400 tracking-tighter hover:text-[#7bbd25] transition-colors"
              >
                Need Help?
              </Link>
            </div>
          </div>
        </motion.div>

        {/* --- SHIPMENT FEATURES --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 mb-32">
          <FeatureBlock
            icon={Package}
            title="Sourced"
            desc="Items carefully packed at our Gujarat sanctuary."
          />
          <FeatureBlock
            icon={Truck}
            title="Transit"
            desc="Express logistics for fresh organic delivery."
          />
          <FeatureBlock
            icon={MapPin}
            title="Arrival"
            desc="Traceable journey until it reaches your hands."
          />
        </div>
      </div>
    </div>
  );
}

function FeatureBlock({ icon: Icon, title, desc }) {
  return (
    <div className="text-center space-y-4 px-6 group">
      <div className="w-16 h-16 bg-white border border-slate-100 rounded-3xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-[#7bbd25] transition-all duration-500 group-hover:-translate-y-2">
        <Icon
          size={24}
          className="text-[#7bbd25] group-hover:text-white transition-colors"
        />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 italic">
          {title}
        </h4>
        <p className="text-xs text-slate-400 font-medium leading-relaxed uppercase tracking-tighter">
          {desc}
        </p>
      </div>
    </div>
  );
}
