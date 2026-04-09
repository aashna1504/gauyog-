import React, { useEffect, useMemo, useState } from "react";
import { ShoppingBag, Heart, Package, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import useCartStore from "../../store/cartStore";
import useWishlistStore from "../../store/wishlistStore";

const PLACEHOLDER_IMG = "https://pngimg.com/d/milk_PNG12756.png";

export default function VedicDhoopMosaicPage() {
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    addItem: addToCart,
    removeByProductId,
    isInCart,
    fetchCart,
  } = useCartStore();
  const { toggleWishlist, isInWishlist, fetchWishlist } = useWishlistStore();

  useEffect(() => {
    if (!id) return;
    api
      .get(`/products/${id}`)
      .then((res) => {
        const p = res.data?.data;
        setProduct(p ?? null);
        if (p?.weight) setSelectedWeight(p.weight);
        else if (p?.weightOptions?.length)
          setSelectedWeight(p.weightOptions[0]);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
    fetchWishlist();
    fetchCart();
  }, [id, fetchWishlist, fetchCart]);

  const productImages = useMemo(() => {
    if (!product) return [PLACEHOLDER_IMG];
    const all = [product.imageUrl, ...(product.galleryImages || [])].filter(
      Boolean,
    );
    return all.length ? all : [PLACEHOLDER_IMG];
  }, [product]);

  const handleAddToCart = async () => {
    if (!product) return;
    if (isInCart(product.id)) {
      await removeByProductId(product.id);
      return;
    }
    await addToCart({ ...product, selectedWeight });
  };

  const handleToggleWishlist = async () => {
    if (!product) return;
    await toggleWishlist(product);
  };

  if (loading) {
    return (
      <div className="pt-24 md:pt-32 px-4 md:px-8 bg-[#f8f9f5] min-h-screen">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-6">
          <div className="h-[600px] rounded-3xl bg-slate-100 animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 rounded-full bg-slate-100 animate-pulse w-1/3" />
            <div className="h-14 rounded-2xl bg-slate-100 animate-pulse" />
            <div className="h-10 rounded-2xl bg-slate-100 animate-pulse w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-3">
          Product not found
        </h1>
        <button
          onClick={() => navigate("/shop")}
          className="px-8 py-4 rounded-full bg-[#4a703f] text-white font-black text-xs uppercase tracking-widest"
        >
          Back To Shop
        </button>
      </div>
    );
  }

  const currentWeight = selectedWeight || product.weight || "";
  const inCart = isInCart(product.id);
  const wishlisted = isInWishlist(product.id);
  const discountPct =
    product.discountPrice && product.discountPrice > product.price
      ? Math.round(
          ((product.discountPrice - product.price) / product.discountPrice) *
            100,
        )
      : null;

  return (
    <div className="pt-40 pb-16 px-4 md:px-8 bg-[#f8f9f5] min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* ── LEFT: Image Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28"
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-[#4a703f]/10 border border-[#4a703f]/10">
              {/* Top bar inside image card */}
              <div className="flex items-center justify-between px-5 pt-5">
                <span
                  className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                    product.inStock
                      ? "bg-[#4a703f] text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>

                {/* Heart / Wishlist button */}
                <button
                  onClick={handleToggleWishlist}
                  className={`p-3 rounded-full shadow-md transition-all duration-300 group ${
                    wishlisted
                      ? "bg-red-500 shadow-red-200 hover:bg-red-600"
                      : "bg-slate-50 hover:bg-red-50 shadow-slate-200"
                  }`}
                  title={
                    wishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  <Heart
                    size={22}
                    fill={wishlisted ? "white" : "none"}
                    className={`transition-all duration-300 group-hover:scale-110 ${
                      wishlisted
                        ? "text-white"
                        : "text-slate-400 group-hover:text-red-400"
                    }`}
                  />
                </button>
              </div>

              {/* Main image */}
              <div className="relative flex items-center justify-center min-h-[460px] md:min-h-[560px] bg-gradient-to-br from-[#eef5e8] via-white to-[#f3f8ee] px-6 py-8">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ type: "spring", damping: 22, stiffness: 200 }}
                    src={productImages[activeImg]}
                    alt={product.name}
                    className="w-full max-w-[440px] md:max-w-[520px] object-contain drop-shadow-[0_30px_50px_rgba(74,112,63,0.18)]"
                    onError={(e) => {
                      e.currentTarget.src = PLACEHOLDER_IMG;
                    }}
                  />
                </AnimatePresence>
                <span className="absolute bottom-4 right-6 text-[50px] md:text-[80px] font-black text-[#4a703f]/5 leading-none tracking-tighter uppercase select-none pointer-events-none">
                  Gauyog
                </span>
              </div>

              {/* Thumbnail strip */}
              {productImages.length > 1 && (
                <div className="flex gap-3 px-5 py-4 border-t border-slate-100 overflow-x-auto">
                  {productImages.map((img, idx) => (
                    <button
                      key={`${img}-${idx}`}
                      onClick={() => setActiveImg(idx)}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 p-1 transition-all duration-200 ${
                        activeImg === idx
                          ? "border-[#7bbd25] shadow-md shadow-green-100 scale-105 bg-white"
                          : "border-transparent bg-slate-50 opacity-50 hover:opacity-90 hover:border-slate-200"
                      }`}
                    >
                      <img
                        src={img}
                        className="w-full h-full object-contain"
                        alt={`view ${idx + 1}`}
                        onError={(e) => {
                          e.currentTarget.src = PLACEHOLDER_IMG;
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* ── RIGHT: Product Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Category + Name + Scientific name + Price */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <span className="inline-block px-4 py-1.5 bg-[#4a703f]/10 text-[#4a703f] rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-1">
                {product.name}
              </h1>
              {product.scientificName && (
                <p className="text-slate-400 text-sm italic font-medium mb-3">
                  {product.scientificName}
                </p>
              )}
              <div className="flex items-baseline gap-3 mt-4 pt-4 border-t border-slate-100">
                <span className="text-4xl font-black text-slate-900 tracking-tight">
                  ₹{product.price}
                </span>
                {product.discountPrice && (
                  <span className="text-lg text-slate-300 line-through font-semibold">
                    ₹{product.discountPrice}
                  </span>
                )}
                {discountPct && (
                  <span className="text-xs font-black text-[#4a703f] bg-[#7bbd25]/15 px-2.5 py-1 rounded-full">
                    {discountPct}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Weight pills */}
            {!!product.weightOptions?.length && (
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-3">
                  Select Weight
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.weightOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedWeight(option)}
                      className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 border-2 ${
                        currentWeight === option
                          ? "bg-[#4a703f] text-white border-[#4a703f] shadow-lg shadow-green-900/20"
                          : "bg-white text-slate-500 border-slate-200 hover:border-[#4a703f] hover:text-[#4a703f]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
                  inCart
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-red-200"
                    : "bg-[#744926] hover:bg-[#4a703f] text-white shadow-green-900/20"
                }`}
              >
                <ShoppingBag size={16} />
                {inCart ? "Remove from Cart" : "Add to Cart"}
              </button>
              <button
                onClick={async () => {
                  if (!inCart) await addToCart({ ...product, selectedWeight });
                  navigate("/payment");
                }}
                className="flex-1 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.2em] border-2 border-[#4a703f] text-[#4a703f] hover:bg-[#4a703f] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                Buy Now
              </button>
            </div>

            {/* Pack + Stock cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#4a703f]/10 flex items-center justify-center flex-shrink-0">
                  <Package size={18} className="text-[#4a703f]" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                    Pack Size
                  </p>
                  <p className="text-base font-black text-slate-800">
                    {currentWeight || "—"}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#7bbd25]/10 flex items-center justify-center flex-shrink-0">
                  <Layers size={18} className="text-[#7bbd25]" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                    Stock
                  </p>
                  <p className="text-base font-black text-slate-800">
                    {product.stock} units
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4a703f] mb-3">
                Description
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Ingredients */}
            {product.ingredients && (
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4a703f] mb-3">
                  Ingredients
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.split(",").map((ing, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-green-50 text-[#4a703f] rounded-full text-xs font-bold border border-green-100"
                    >
                      {ing.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
