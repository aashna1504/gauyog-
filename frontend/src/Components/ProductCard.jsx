import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Eye,
  ShoppingCart,
  ShoppingBag,
  Star,
  CreditCard,
  X,
  Check,
  ShieldCheck,
  Loader2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const PLACEHOLDER_IMG = "https://pngimg.com/d/milk_PNG12756.png";

export default function ProductCard({
  product,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isInWishlist,
}) {
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(
    product.weight || product.weightOptions?.[0] || "",
  );
  const navigate = useNavigate();

  // Base product shape from listing props
  const p = {
    ...product,
    image: product.imageUrl || product.image || PLACEHOLDER_IMG,
    size: product.weight || product.size || "",
    weightOptions: product.weightOptions || [],
    desc: product.description || product.desc || "",
    tag: product.tag || product.category || "",
  };

  // Merged data: fresh backend data takes priority over listing props
  const detail = modalProduct
    ? {
        ...p,
        ...modalProduct,
        image: modalProduct.imageUrl || p.image,
        desc: modalProduct.description || p.desc,
        tag: modalProduct.category || p.tag,
        weightOptions: modalProduct.weightOptions || p.weightOptions,
      }
    : p;

  const handleOpenModal = async () => {
    setShowModal(true);
    setModalLoading(true);
    try {
      const res = await api.get(`/products/${product.id}`);
      const fetched = res.data?.data;
      if (fetched) setModalProduct(fetched);
    } catch {
      // fall back to listing data silently
    } finally {
      setModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalProduct(null);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    onToggleWishlist?.(p);
  };

  const inCart = Boolean(p.inCart);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35 }}
        className="group"
      >
        <div className="bg-white rounded-[40px] p-4 border border-gray-100 flex flex-col h-full transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)]">
          <div className="relative h-64 w-full bg-[#f3f8ee] rounded-[32px] overflow-hidden flex items-center justify-center">
            <div className="absolute top-4 left-4 z-10">
              <span className="backdrop-blur-md bg-white/70 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-800 border border-white/40">
                {p.tag}
              </span>
            </div>

            {p.inStock === false && (
              <div className="absolute inset-0 bg-black/30 z-20 flex items-center justify-center rounded-[32px]">
                <span className="bg-white text-gray-800 font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full">
                  Out of Stock
                </span>
              </div>
            )}

            <img
              src={p.image}
              className="h-44 object-contain transition-transform duration-700 group-hover:scale-110 rounded-full"
              alt={p.name}
              onError={(e) => {
                e.target.src = PLACEHOLDER_IMG;
              }}
            />

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 bg-black/5 backdrop-blur-[2px]">
              <button
                onClick={handleOpenModal}
                className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-700 hover:bg-[#4a703f] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
              >
                <Eye size={20} />
              </button>
              <button
                onClick={handleWishlist}
                className={`w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center transition-all transform translate-y-4 group-hover:translate-y-0 delay-75 ${
                  isInWishlist
                    ? "bg-red-500 text-red-800"
                    : "text-gray-700 hover:bg-red-500 hover:text-white"
                }`}
              >
                <Heart
                  size={20}
                  fill={isInWishlist ? "currentColor" : "none"}
                />
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col flex-grow px-2">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
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
                  {[p.category, selectedWeight || p.size]
                    .filter(Boolean)
                    .join(" • ")}
                </p>
              </div>
              <div className="pl-2 text-right">
                <p className="text-2xl font-black text-[#4a703f] tracking-tighter">
                  ₹{p.price}
                </p>
                {p.discountPrice && (
                  <p className="text-xs text-gray-400 line-through">
                    ₹{p.discountPrice}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 mt-auto">
              <button
                onClick={() => onBuyNow?.(p)}
                disabled={p.inStock === false}
                className="w-full bg-[#4a703f] text-white py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#744926] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CreditCard size={18} /> Buy Now
              </button>
              <button
                onClick={() => onAddToCart?.({ ...p, selectedWeight })}
                disabled={p.inStock === false}
                className={`w-full py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                  inCart
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "bg-gray-50 text-gray-500 hover:bg-[#e9aa43] hover:text-white"
                }`}
              >
                {inCart ? (
                  <ShoppingBag size={18} />
                ) : (
                  <ShoppingCart size={18} />
                )}
                {inCart ? "Remove From Cart" : "Add To Cart"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Quick View Modal ── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative bg-white w-full max-w-5xl rounded-[40px] md:rounded-[56px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Top-right buttons */}
              <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
                <div className="flex bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-xl border border-white/50">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={handleWishlist}
                    className={`p-3 rounded-full transition-all ${
                      isInWishlist
                        ? "bg-red-500 text-white"
                        : "bg-red-50 text-[#ef4444] hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <Heart
                      size={20}
                      strokeWidth={2.5}
                      fill={isInWishlist ? "currentColor" : "none"}
                    />
                  </motion.button>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-4 bg-gray-900 text-white rounded-full hover:bg-black transition-all shadow-lg"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Left: Image */}
              <div className="w-full md:w-5/12 bg-[#f3f8ee] flex items-center justify-center p-12 relative min-h-[300px] flex-shrink-0">
                <motion.img
                  initial={{ scale: 0.6, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  src={detail.image}
                  className="w-full max-w-[320px] z-10 rounded-full"
                  alt={detail.name}
                  onError={(e) => {
                    e.target.src = PLACEHOLDER_IMG;
                  }}
                />
                <span className="absolute bottom-10 left-1/2 -translate-x-1/2 text-black/5 font-black text-8xl uppercase pointer-events-none select-none">
                  {detail.category || detail.tag}
                </span>
              </div>

              {/* Right: Details */}
              <div className="w-full md:w-7/12 p-8 md:p-12 bg-white overflow-y-auto">
                {/* Header badges */}
                <div className="flex items-center gap-2 mb-5 flex-wrap">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-[#4a703f] rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                    <ShieldCheck size={13} /> Certified Organic
                  </div>
                  <span className="px-4 py-1.5 bg-[#4a703f]/10 text-[#4a703f] rounded-full text-[10px] font-black uppercase tracking-widest">
                    {detail.category || detail.tag}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-1 tracking-tighter leading-tight line-clamp-1">
                  {detail.name}
                </h2>
                {detail.scientificName && (
                  <p className="text-sm text-gray-400 italic mb-4">
                    {detail.scientificName}
                  </p>
                )}

                {/* Price row */}
                <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100">
                  <p className="text-4xl font-black text-[#4a703f] tracking-tighter">
                    ₹{detail.price}
                  </p>
                  {detail.discountPrice && (
                    <p className="text-xl text-gray-300 line-through font-semibold">
                      ₹{detail.discountPrice}
                    </p>
                  )}
                  {(selectedWeight || detail.size) && (
                    <>
                      <div className="h-8 w-[2px] bg-gray-100" />
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
                        {selectedWeight || detail.size}
                      </p>
                    </>
                  )}
                </div>

                {/* Weight selector
                {detail.weightOptions?.length > 0 && (
                  <div className="mb-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-2">
                      Select Weight
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {detail.weightOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => setSelectedWeight(option)}
                          className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 border-2 ${
                            selectedWeight === option
                              ? "bg-[#4a703f] text-white border-[#4a703f] shadow-sm"
                              : "bg-white text-slate-500 border-slate-200 hover:border-[#4a703f] hover:text-[#4a703f]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )} */}

                {/* Description */}
                {detail.desc && (
                  <p className="text-gray-500 leading-relaxed mb-5 text-sm font-medium line-clamp-1">
                    {detail.desc}
                  </p>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <button
                    onClick={() => {
                      onAddToCart?.({ ...detail, selectedWeight });
                      handleCloseModal();
                    }}
                    disabled={detail.inStock === false}
                    className={`flex-[2] py-4 px-8 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 ${
                      inCart
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-[#4a703f] text-white hover:bg-[#744926] shadow-green-900/20"
                    }`}
                  >
                    {inCart ? (
                      <ShoppingBag size={20} />
                    ) : (
                      <ShoppingCart size={20} />
                    )}
                    {inCart ? "Remove From Cart" : "Add To Cart"}
                  </button>
                  <button
                    onClick={() => navigate(`/product/${p.id}`)}
                    className="flex-1 bg-[#e9aa43] py-4 px-8 rounded-full font-bold text-xs uppercase tracking-widest hover:text-gray-600 text-white transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Eye size={18} />
                    Full Info
                  </button>
                </div>

                {/* ── BENEFITS — real data fetched from backend ── */}
                {modalLoading ? (
                  <div className="rounded-2xl p-5 bg-[#f0f7ee] border border-[#4a703f]/15 mb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-4 bg-[#4a703f]/30 rounded-full animate-pulse" />
                      <div className="h-3 w-24 bg-[#4a703f]/20 rounded-full animate-pulse" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 bg-white/80 rounded-xl px-3 py-2.5"
                        >
                          <div className="w-6 h-6 rounded-full bg-slate-200 animate-pulse flex-shrink-0" />
                          <div className="h-3 flex-1 bg-slate-100 rounded-full animate-pulse" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : detail.benefits?.length > 0 ? (
                  <div className="rounded-2xl p-5 bg-[#f0f7ee] border border-[#4a703f]/15 mb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-4 bg-[#4a703f] rounded-full" />
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4a703f]">
                        Key Benefits
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">
                      {detail.benefits.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 bg-white/80 rounded-xl px-3 py-2.5 border border-[#4a703f]/10"
                        >
                        
                          <span className="text-sm font-bold text-slate-800">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Loading spinner overlay for initial fetch */}
                {modalLoading && (
                  <div className="flex items-center gap-2 mt-4 text-[#4a703f]/60">
                    <Loader2 size={14} className="animate-spin" />
                    <span className="text-xs font-semibold">
                      Loading product details…
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
