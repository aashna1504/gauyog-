import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Eye,
  ShoppingCart,
  Star,
  CreditCard,
  X,
  Check,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * ProductCard — shared card used across home page sections and the shop listing.
 *
 * Props:
 *   product: { id, name, price, tag, color, image, category?, size?, rating?, desc? }
 *   onAddToCart: (product) => void   — optional callback
 *   onBuyNow:   (product) => void   — optional callback
 */
export default function ProductCard({ product, onAddToCart, onBuyNow }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const p = product;

  return (
    <>
      {/* ── CARD ─────────────────────────────────────────────── */}
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35 }}
        className="group"
      >
        <div className="bg-white rounded-[40px] p-4 border border-gray-100 flex flex-col h-full transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)]">
          {/* — Image area — */}
          <div
            className={`relative h-64 w-full bg-gradient-to-br ${p.color} rounded-[32px] overflow-hidden flex items-center justify-center`}
          >
            {/* Tag badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="backdrop-blur-md bg-white/70 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-800 border border-white/40">
                {p.tag}
              </span>
            </div>

            <img
              src={p.image}
              className="h-44 object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
              alt={p.name}
            />

            {/* Hover overlay actions */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 bg-black/5 backdrop-blur-[2px]">
              <button
                onClick={() => setShowModal(true)}
                className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-700 hover:bg-[#7bbd25] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
              >
                <Eye size={20} />
              </button>
              <button className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 delay-75">
                <Heart size={20} />
              </button>
            </div>
          </div>

          {/* — Info — */}
          <div className="mt-6 flex flex-col flex-grow px-2">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                {/* Stars */}
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  {p.rating && (
                    <span className="text-[10px] text-gray-400 font-bold ml-1">
                      {p.rating}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-xl text-gray-800 line-clamp-1 group-hover:text-[#4a703f] transition-colors uppercase tracking-tight">
                  {p.name}
                </h3>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">
                  {[p.category, p.size].filter(Boolean).join(" • ")}
                </p>
              </div>
              <p className="text-2xl font-black text-[#7bbd25] tracking-tighter pl-2">
                ₹{p.price}
              </p>
            </div>

            {/* CTA buttons */}
            <div className="space-y-2 mt-auto">
              <button
                onClick={() => onBuyNow?.(p)}
                className="w-full bg-[#4a703f] text-white py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#744926] transition-all"
              >
                <CreditCard size={18} /> Buy Now
              </button>
              <button
                onClick={() => onAddToCart?.(p)}
                className="w-full bg-gray-50 text-gray-500 py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#e9aa43] hover:text-white transition-all active:scale-95"
              >
                <ShoppingCart size={18} /> Add To Cart
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── PREVIEW MODAL ────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative bg-white w-full max-w-5xl rounded-[40px] md:rounded-[56px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Action bar */}
              <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
                <div className="flex bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-xl border border-white/50">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="p-3 bg-red-50 text-[#ef4444] rounded-full transition-all"
                  >
                    <Heart size={20} strokeWidth={2.5} />
                  </motion.button>
                  <motion.button
                    onClick={() => onAddToCart?.(p)}
                    whileHover={{ scale: 1.1 }}
                    className="p-3 bg-blue-50 text-[#0369a1] rounded-full transition-all ml-1"
                  >
                    <ShoppingCart size={20} strokeWidth={2.5} />
                  </motion.button>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-4 bg-gray-900 text-white rounded-full hover:bg-black transition-all shadow-lg"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Left — product image */}
              <div
                className={`w-full md:w-5/12 bg-gradient-to-br ${p.color} flex items-center justify-center p-12 relative min-h-[300px]`}
              >
                <motion.img
                  initial={{ scale: 0.6, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  src={p.image}
                  className="w-full max-w-[320px] drop-shadow-2xl z-10"
                  alt={p.name}
                />
                <span className="absolute bottom-10 left-1/2 -translate-x-1/2 text-black/5 font-black text-8xl uppercase pointer-events-none select-none">
                  {p.category || p.tag}
                </span>
              </div>

              {/* Right — details */}
              <div className="w-full md:w-7/12 p-8 md:p-14 bg-white overflow-y-auto self-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-[#4a703f] rounded-full text-[10px] font-black uppercase mb-6 tracking-widest border border-green-100">
                  <ShieldCheck size={14} /> Certified Organic
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 tracking-tighter leading-none">
                  {p.name}
                </h2>

                <div className="flex items-center gap-4 mb-8">
                  <p className="text-4xl font-black text-[#7bbd25] tracking-tighter">
                    ₹{p.price}
                  </p>
                  {p.size && (
                    <>
                      <div className="h-8 w-[2px] bg-gray-100" />
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
                        {p.size}
                      </p>
                    </>
                  )}
                </div>

                {p.desc && (
                  <p className="text-gray-500 leading-relaxed mb-10 text-lg font-medium">
                    {p.desc}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button
                    onClick={() => {
                      onAddToCart?.(p);
                      setShowModal(false);
                    }}
                    className="flex-[2] bg-[#4a703f] text-white py-4 px-8 rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-green-900/20 hover:bg-[#744926] transition-all flex items-center justify-center gap-3 active:scale-95"
                  >
                    <ShoppingCart size={20} />
                    Add To Cart
                  </button>
                  <button
                    onClick={() => navigate("/previewcard")}
                    className="flex-1 bg-[#e9aa43] py-4 px-8 rounded-full font-bold text-xs uppercase tracking-widest hover:text-gray-600 text-white transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Eye size={18} />
                    Full Info
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-8 border-t border-gray-100 pt-8">
                  {["Natural Pure", "Eco-Friendly", "No Chemicals", "Probiotic"].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center text-[#4a703f]">
                          <Check size={14} strokeWidth={4} />
                        </div>
                        <span className="text-sm font-bold text-gray-700">
                          {item}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
