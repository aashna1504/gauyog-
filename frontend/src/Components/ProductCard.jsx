import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductImage from "./ProductImage";
import {
  Heart,
  Eye,
  ShoppingCart,
  ShoppingBag,
  CreditCard,
  X,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

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

  const p = {
    ...product,
    image: product.imageUrl || product.image || null,
    size: product.weight || product.size || "",
    weightOptions: product.weightOptions || [],
    desc: product.description || product.desc || "",
    tag: product.tag || product.category || "",
  };

  const detail = modalProduct
    ? {
        ...p,
        ...modalProduct,
        image: modalProduct.imageUrl || p.image || null,
        image5kg: modalProduct.image5kg || null,
        desc: modalProduct.description || p.desc,
        tag: modalProduct.category || p.tag,
        weightOptions: modalProduct.weightOptions || p.weightOptions,
      }
    : p;

  const getVariantImage = (weight) => {
    if (weight === "1kg" && detail.image1kg) return detail.image1kg;
    if (weight === "3kg" && detail.image3kg) return detail.image3kg;
    if (weight === "5kg" && detail.image5kg) return detail.image5kg;
    return (
      detail.image ||
      detail.image1kg ||
      detail.image3kg ||
      detail.image5kg ||
      null
    );
  };

  const getVariantPrice = (weight) => {
    if (weight === "1kg" && detail.price1kg) return detail.price1kg;
    if (weight === "3kg" && detail.price3kg) return detail.price3kg;
    if (weight === "5kg" && detail.price5kg) return detail.price5kg;
    return detail.price;
  };

  const activeModalImage = getVariantImage(selectedWeight);
  const activeCardImage = getVariantImage(selectedWeight);
  const activePrice = getVariantPrice(selectedWeight);

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
        <div className="bg-gray-50 rounded-[40px] p-4 flex flex-col h-full transition-all duration-500 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)]">
          <div
            className="relative w-full bg-white border border-gray-100 rounded-[32px] overflow-hidden"
            style={{ height: "16rem" }}
          >
            <div className="absolute top-4 left-4 z-10">
              <span className="backdrop-blur-md bg-[#744926] px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widerst text-white border border-[#744926]/20">
                {p.tag}
              </span>
            </div>

            {p.inStock === false && (
              <div className="absolute inset-0 bg-black/30 z-20 flex items-center justify-center rounded-[32px]">
                <span className="bg-white text-gray-800 font-black text-xs uppercase tracking-widerst px-4 py-2 rounded-full">
                  Out of Stock
                </span>
              </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center pb-8">
              <div className="w-full h-full flex items-center justify-center px-6 pt-6">
                <ProductImage
                  src={activeCardImage}
                  alt={p.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 bg-black/5 backdrop-blur-[2px]">
              <button
                onClick={handleOpenModal}
                aria-label={`Quick view ${p.name}`}
                className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-700 hover:bg-[#744926] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
              >
                <Eye size={20} aria-hidden="true" />
              </button>
              <button
                onClick={handleWishlist}
                aria-label={isInWishlist ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
                className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 delay-75 ${
                  isInWishlist
                    ? "bg-[#e9aa43] ring-2 ring-[#e9aa43]/50 ring-offset-2 hover:text-white shadow-[0_0_16px_rgba(233,170,67,0.45)]"
                    : "bg-white text-[#e9aa43] hover:bg-[#744926] hover:text-black"
                }`}
              >
                <Heart
                  size={20}
                  aria-hidden="true"
                  fill={isInWishlist ? "currentColor" : "none"}
                  className={`transition-all duration-300 ${
                    isInWishlist ? "text-white" : "text-[#e9aa43]"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col flex-grow px-2">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-800 line-clamp-1 group-hover:text-[#4a703f] transition-colors uppercase tracking-wider">
                  {p.name}
                </h3>
                <p className="text-[10px] text-gray-600 font-black uppercase tracking-widerst mt-1">
                  {[p.category, selectedWeight || p.size]
                    .filter(Boolean)
                    .join(" • ")}
                </p>
              </div>
              <div className="pl-2 text-right">
                <p className="text-2xl font-black text-[#4a703f] tracking-wider">
                  ₹{getVariantPrice(selectedWeight)}
                </p>
              </div>
            </div>

            {p.weightOptions?.filter((w) => ["1kg", "3kg", "5kg"].includes(w))
              .length > 1 && (
              <div className="flex gap-1.5 mb-3 flex-wrap">
                {p.weightOptions
                  .filter((w) => ["1kg", "3kg", "5kg"].includes(w))
                  .map((w) => (
                    <button
                      key={w}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedWeight(w);
                      }}
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all ${
                        selectedWeight === w
                          ? "bg-[#744926] text-white border-[#744926]"
                          : "bg-white text-slate-500 hover:border-[#744926]"
                      }`}
                    >
                      {w}
                    </button>
                  ))}
              </div>
            )}

            <div className="space-y-2 mt-auto">
              <button
                onClick={() => onBuyNow?.(p)}
                disabled={p.inStock === false}
                className="w-full bg-[#4a703f] text-white py-4 rounded-full font-bold text-xs uppercase tracking-widerst flex items-center justify-center gap-2 hover:bg-[#744926] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CreditCard size={18} /> Buy Now
              </button>
              <button
                onClick={() => onAddToCart?.({ ...p, selectedWeight })}
                disabled={p.inStock === false}
                className={`w-full py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                  inCart
                    ? "bg-[#744926]/10 text-[#744926] hover:bg-[#744926]/20"
                    : "bg-gray-50 text-gray-500 hover:bg-[#e9aa43] hover:text-white"
                }`}
              >
                {inCart ? <ShoppingBag size={18} /> : <ShoppingCart size={18} />}
                {inCart ? "Remove From Cart" : "Add To Cart"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
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
              <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
                <div className="flex bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-xl border border-white/50">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={handleWishlist}
                    aria-label={isInWishlist ? `Remove ${detail.name} from wishlist` : `Add ${detail.name} to wishlist`}
                    className={`p-3 rounded-full transition-all ${
                      isInWishlist
                        ? "bg-[#e9aa43] text-white"
                        : "bg-[#e9aa43]/10 text-[#e9aa43] hover:bg-[#e9aa43] hover:text-white"
                    }`}
                  >
                    <Heart size={20} strokeWidth={2.5} fill={isInWishlist ? "currentColor" : "none"} aria-hidden="true" />
                  </motion.button>
                </div>
                <button
                  onClick={handleCloseModal}
                  aria-label="Close product preview"
                  className="p-4 bg-gray-900 text-white rounded-full hover:bg-black transition-all shadow-lg"
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>

              <div className="w-full md:w-5/12 bg-white border-r border-gray-100 flex items-center justify-center p-4 md:p-12 relative min-h-[160px] md:min-h-[300px] flex-shrink-0">
                <ProductImage
                  src={activeModalImage}
                  alt={detail.name}
                  className="w-full max-w-[140px] md:max-w-[320px] z-10 object-contain"
                />
                <span className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 text-black/5 font-black text-8xl uppercase pointer-events-none select-none">
                  {detail.category || detail.tag}
                </span>
              </div>

              <div className="w-full md:w-7/12 p-4 md:p-10 bg-white overflow-y-auto">
                <div className="flex items-center gap-2 mb-3 md:mb-5 flex-wrap">
                  <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 bg-green-50 text-[#4a703f] rounded-full text-[10px] font-black uppercase tracking-widerst border border-green-100">
                    <ShieldCheck size={12} /> Certified Organic
                  </div>
                  <span className="px-3 py-1 md:px-4 md:py-1.5 bg-[#4a703f]/10 text-[#4a703f] rounded-full text-[10px] font-black uppercase tracking-widerst">
                    {detail.category || detail.tag}
                  </span>
                </div>

                <h2 className="text-xl md:text-4xl font-black text-gray-900 mb-1 tracking-wider ">
                  {detail.name}
                </h2>
                {detail.scientificName && (
                  <p className="text-xs md:text-sm text-gray-600 italic mb-2 md:mb-4">
                    {detail.scientificName}
                  </p>
                )}

                <div className="flex items-center gap-3 mb-3 md:mb-6 pb-3 md:pb-5 border-b border-gray-100">
                  <p className="text-2xl md:text-4xl font-black text-[#4a703f] tracking-wider">
                    ₹{activePrice}
                  </p>
                  {(selectedWeight || detail.size) && (
                    <p className="text-gray-600 font-bold uppercase tracking-widerst text-xs md:text-sm">
                      {selectedWeight || detail.size}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="w-full md:hidden mb-3 bg-[#e9aa43] py-3.5 rounded-full font-black text-xs uppercase tracking-widerst text-white flex items-center justify-center gap-2 active:scale-95"
                >
                  <Eye size={16} />
                  View Full Product Details
                </button>

                {detail.weightOptions?.filter((w) => ["1kg", "3kg", "5kg"].includes(w)).length > 0 && (
                  <div className="mb-3 md:mb-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-2">
                      Select Weight
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {detail.weightOptions
                        .filter((w) => ["1kg", "3kg", "5kg"].includes(w))
                        .map((option) => (
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
                )}

                {detail.desc && (
                  <p className="text-gray-500 leading-relaxed mb-3 md:mb-5 text-sm font-medium">
                    {detail.desc}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mb-4 md:mb-6">
                  <button
                    onClick={() => {
                      onAddToCart?.({ ...detail, selectedWeight });
                      handleCloseModal();
                    }}
                    disabled={detail.inStock === false}
                    className={`flex-[2] py-3.5 md:py-4 px-6 md:px-8 rounded-full font-black text-xs md:text-sm uppercase tracking-widerst shadow-xl transition-all flex items-center justify-center gap-2 md:gap-3 active:scale-95 disabled:opacity-50 ${
                      inCart
                        ? "bg-[#744926]/10 text-[#744926] hover:bg-[#744926]/20"
                        : "bg-[#4a703f] text-white hover:bg-[#744926] shadow-green-900/20"
                    }`}
                  >
                    {inCart ? <ShoppingBag size={16} /> : <ShoppingCart size={16} />}
                    {inCart ? "Remove From Cart" : "Add To Cart"}
                  </button>
                  <button
                    onClick={() => navigate(`/product/${p.id}`)}
                    className="hidden md:flex flex-1 bg-[#e9aa43] py-4 px-8 rounded-full font-bold text-xs uppercase tracking-widerst hover:text-gray-600 text-white transition-all items-center justify-center gap-2 active:scale-95"
                  >
                    <Eye size={18} />
                    Full Info
                  </button>
                </div>

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

                {modalLoading && (
                  <div className="flex items-center gap-2 mt-4 text-[#4a703f]/60">
                    <Loader2 size={14} className="animate-spin" />
                    <span className="text-xs font-semibold">
                      Loading product details...
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
