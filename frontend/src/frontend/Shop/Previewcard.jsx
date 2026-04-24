import { useEffect, useMemo, useState } from "react";
import { Heart, Package, Layers, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import useCartStore from "../../store/cartStore";
import useWishlistStore from "../../store/wishlistStore";


export default function VedicDhoopMosaicPage() {
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState("");

  const handleWeightSelect = (option) => {
    setSelectedWeight(option);
    setActiveImg(0); // reset thumbnail when weight changes
  };
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

  // Resolve variant image and price for the currently selected weight
  const getVariantImage = (weight) => {
    if (weight === "1kg" && product?.image1kg) return product.image1kg;
    if (weight === "3kg" && product?.image3kg) return product.image3kg;
    if (weight === "5kg" && product?.image5kg) return product.image5kg;
    return product?.imageUrl ?? null;
  };

  const getVariantPrice = (weight) => {
    if (weight === "1kg" && product?.price1kg) return product.price1kg;
    if (weight === "3kg" && product?.price3kg) return product.price3kg;
    if (weight === "5kg" && product?.price5kg) return product.price5kg;
    return product?.price ?? 0;
  };

  const productImages = useMemo(() => {
    if (!product) return [];
    const variantImg = getVariantImage(selectedWeight);
    return [variantImg, ...(product.galleryImages || [])].filter(Boolean);
  }, [product, selectedWeight]);

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

  return (
    <div className="lg:pt-40 pt-32 pb-16 px-4 md:px-8 bg-[#f8f9f5] min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        {/*
          LAYOUT STRATEGY
          ─────────────────────────────────────────────────────
          Mobile  (< lg)  : flex-col, CSS order controls stack:
                              1. Info card  (order-1)
                              2. Image      (order-2)
                              3. Rest       (order-3)
          Desktop (>= lg) : CSS grid 2-col, explicit placement:
                              col-1 row-1 row-span-2 → Image (sticky)
                              col-2 row-1            → Info card
                              col-2 row-2            → Rest of details
        */}
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:items-start">
          {/* ── INFO CARD: mobile top (order-1), desktop col-2 row-1 ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="order-1 lg:order-none lg:col-start-2 lg:row-start-1"
          >
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
                  ₹{getVariantPrice(currentWeight)}
                </span>
                {currentWeight && (
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    {currentWeight}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* ── IMAGE PANEL: mobile middle (order-2), desktop col-1 row-1 sticky ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-28"
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-[#4a703f]/10 border border-[#4a703f]/10">
              {/* Top bar */}
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

              {/* Thumbnails + Main image */}
              <div className="flex gap-3 p-4">
                {productImages.length > 1 && (
                  <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px] md:max-h-[580px] pr-1 scrollbar-thin">
                    {productImages.map((img, idx) => (
                      <button
                        key={`${img}-${idx}`}
                        onClick={() => setActiveImg(idx)}
                        className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 p-1 transition-all duration-200 ${
                          activeImg === idx
                            ? "border-[#4a703f] shadow-md shadow-green-100 scale-105 bg-[#f3f8ee]"
                            : "border-transparent bg-[#f3f8ee] opacity-50 hover:opacity-90 hover:border-slate-200"
                        }`}
                      >
                        <img
                          src={img}
                          className="w-full h-full object-contain"
                          alt={`view ${idx + 1}`}
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      </button>
                    ))}
                  </div>
                )}
                <div className="relative flex-1 flex items-center justify-center min-h-[440px] md:min-h-[540px] bg-[#f3f8ee] rounded-2xl px-4 py-8">
                  <AnimatePresence mode="wait">
                    {productImages[activeImg] ? (
                      <motion.img
                        key={activeImg}
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.04 }}
                        transition={{ type: "spring", damping: 22, stiffness: 200 }}
                        src={productImages[activeImg]}
                        alt={product.name}
                        className="w-full max-w-[380px] md:max-w-[460px] object-contain rounded-full"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    ) : (
                      <div className="w-64 h-64 rounded-full bg-[#d8e8d4] flex items-center justify-center">
                        <span className="text-7xl font-black text-[#4a703f]/25 uppercase">{product.name?.[0] ?? "?"}</span>
                      </div>
                    )}
                  </AnimatePresence>
                  <span className="absolute bottom-4 right-4 text-[40px] md:text-[70px] font-black text-[#4a703f]/5 leading-none tracking-tighter uppercase select-none pointer-events-none">
                    Gauyog
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── REST OF DETAILS: mobile bottom (order-3), desktop col-2 row-2 ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-3 lg:order-none lg:col-start-2 lg:row-start-2 flex flex-col gap-5"
          >
            {/* Weight pills */}
            {!!product.weightOptions?.filter((w) => ["1kg", "3kg", "5kg"].includes(w)).length && (
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-3">
                  Select Weight
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.weightOptions.filter((w) => ["1kg", "3kg", "5kg"].includes(w)).map((option) => {
                    const hasVariant = getVariantImage(option) !== product.imageUrl || getVariantPrice(option) !== product.price;
                    return (
                      <button
                        key={option}
                        onClick={() => handleWeightSelect(option)}
                        className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 border-2 flex items-center gap-1.5 ${
                          currentWeight === option
                            ? "bg-[#4a703f] text-white border-[#4a703f] shadow-lg shadow-green-900/20"
                            : "bg-white text-slate-500 border-slate-200 hover:border-[#4a703f] hover:text-[#4a703f]"
                        }`}
                      >
                        {option}
                        {hasVariant && (
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${currentWeight === option ? "bg-white/60" : "bg-[#4a703f]/40"}`} />
                        )}
                      </button>
                    );
                  })}
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

            {/* Pack + Stock */}
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
                <div className="w-10 h-10 rounded-xl bg-[#4a703f]/10 flex items-center justify-center flex-shrink-0">
                  <Layers size={18} className="text-[#4a703f]" />
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

            {/* Benefits + Ingredients side by side */}
            {(product.benefits?.length > 0 || product.ingredients) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Key Benefits */}
                {product.benefits?.length > 0 && (
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-1 h-5 bg-[#4a703f] rounded-full" />
                      <p className="text-xs font-black uppercase tracking-[0.3em] text-[#4a703f]">
                        Key Benefits
                      </p>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {product.benefits.map((benefit, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 bg-[#f3f8ee] rounded-2xl px-4 py-3 border border-[#4a703f]/10"
                        >
                          <Check size={13} className="text-[#4a703f] flex-shrink-0" />
                          <span className="text-sm font-bold text-slate-800">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ingredients */}
                {product.ingredients && (
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-1 h-5 bg-[#e9aa43] rounded-full" />
                      <p className="text-xs font-black uppercase tracking-[0.3em] text-[#b45309]">
                        Ingredients
                      </p>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {product.ingredients
                        .split(/[\n,;|]+/)
                        .map((s) => s.trim())
                        .filter(Boolean)
                        .map((ing, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 bg-[#fdf6ee] rounded-2xl px-4 py-3 border border-[#e9aa43]/20"
                          >
                            <Check size={13} className="text-[#e9aa43] flex-shrink-0" />
                            <span className="text-sm font-bold text-slate-800">
                              {ing}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4a703f] mb-3">
                Description
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product detail grid */}
            <div className="grid gap-4 lg:grid-cols-2">
              {(product.sku ||
                product.batchNo ||
                product.mfgDate ||
                product.bestBefore ||
                product.weightOptions?.length) && (
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-1.5 h-8 rounded-full bg-[#4a703f]" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4a703f]">
                      Product Details
                    </p>
                  </div>
                  <div className="space-y-3 text-sm text-slate-700">
                    {product.sku && (
                      <div className="flex justify-between gap-4">
                        <span className="font-semibold text-slate-500">
                          SKU
                        </span>
                        <span className="text-right">{product.sku}</span>
                      </div>
                    )}
                    {product.batchNo && (
                      <div className="flex justify-between gap-4">
                        <span className="font-semibold text-slate-500">
                          Batch No.
                        </span>
                        <span className="text-right">{product.batchNo}</span>
                      </div>
                    )}
                    {product.mfgDate && (
                      <div className="flex justify-between gap-4">
                        <span className="font-semibold text-slate-500">
                          Mfg Date
                        </span>
                        <span className="text-right">{product.mfgDate}</span>
                      </div>
                    )}
                    {product.bestBefore && (
                      <div className="flex justify-between gap-4">
                        <span className="font-semibold text-slate-500">
                          Best Before
                        </span>
                        <span className="text-right">{product.bestBefore}</span>
                      </div>
                    )}
                    {product.weightOptions?.filter((w) => ["1kg", "3kg", "5kg"].includes(w)).length > 0 && (
                      <div className="flex justify-between gap-4">
                        <span className="font-semibold text-slate-500">
                          Also Available
                        </span>
                        <span className="text-right">
                          {product.weightOptions.filter((w) => ["1kg", "3kg", "5kg"].includes(w)).join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {(product.usageInstructions ||
                product.storageInstructions ||
                product.safetyInstructions) && (
                <div className="grid gap-4">
                  {product.usageInstructions && (
                    <div className="bg-[#eef8ef] rounded-3xl p-6 border border-[#4a703f]/15 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4a703f] mb-3">
                        How To Use
                      </p>
                      <p className="text-sm leading-relaxed text-slate-700">
                        {product.usageInstructions}
                      </p>
                    </div>
                  )}
                  {product.storageInstructions && (
                    <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-3">
                        Storage
                      </p>
                      <p className="text-sm leading-relaxed text-slate-700">
                        {product.storageInstructions}
                      </p>
                    </div>
                  )}
                  {product.safetyInstructions && (
                    <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-700 mb-3">
                        Safety & Cautions
                      </p>
                      <p className="text-sm leading-relaxed text-slate-700">
                        {product.safetyInstructions}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
