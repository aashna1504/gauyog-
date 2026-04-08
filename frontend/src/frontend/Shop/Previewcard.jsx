import React, { useEffect, useMemo, useState } from "react";
import {
  Star,
  ShieldCheck,
  ShoppingBag,
  Heart,
  CheckCircle2,
  Box,
  Share2,
  Sparkle,
} from "lucide-react";
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

  const { addItem: addToCart, removeByProductId, isInCart, fetchCart } = useCartStore();
  const { toggleWishlist, isInWishlist, fetchWishlist } = useWishlistStore();

  useEffect(() => {
    if (!id) return;

    api
      .get(`/products/${id}`)
      .then((res) => {
        const p = res.data?.data;
        setProduct(p ?? null);
        if (p?.weight) {
          setSelectedWeight(p.weight);
        } else if (p?.weightOptions?.length) {
          setSelectedWeight(p.weightOptions[0]);
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));

    fetchWishlist();
    fetchCart();
  }, [id, fetchWishlist, fetchCart]);

  const productImages = useMemo(() => {
    if (!product) return [PLACEHOLDER_IMG];
    const all = [product.imageUrl, ...(product.galleryImages || [])].filter(Boolean);
    return all.length ? all : [PLACEHOLDER_IMG];
  }, [product]);

  const reveal = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

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
      <div className="mt-20 md:mt-40 p-8">
        <div className="max-w-[1500px] mx-auto">
          <div className="h-[70vh] rounded-[40px] bg-gray-100 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-3">Product not found</h1>
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

  return (
    <div className="mt-20 md:mt-40">
      <div className="min-h-screen text-slate-900 selection:bg-[#7bbd25]/30 p-4 md:p-8">
        <div className="fixed top-0 right-0 w-[40%] h-[40%] bg-[#7bbd25]/5 rounded-full blur-[120px] -z-10" />

        <main className="max-w-[1500px] mx-auto mt-9 lg:mt-0">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-stretch">
            <div className="order-1 lg:hidden mb-4">
              <motion.div initial="hidden" animate="visible" variants={reveal}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-2 bg-[#4a703f] text-white rounded-full text-[9px] font-black uppercase tracking-[0.3em] shadow-xl shadow-green-900/20">
                    {product.category}
                  </span>
                  <span className="text-[#7bbd25] font-black text-[9px] uppercase tracking-widest bg-green-50 px-3 py-1 rounded-lg border border-green-100">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-[-0.06em] leading-[0.9] mb-4">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black text-slate-900 tracking-tighter">
                    Rs {product.price}
                  </span>
                  {product.discountPrice && (
                    <span className="text-lg text-slate-300 line-through font-bold">
                      Rs {product.discountPrice}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>

            <div className="order-2 lg:col-span-5 lg:sticky lg:top-8 h-fit">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={reveal}
                className="relative aspect-[4/5] bg-white rounded-[40px] shadow-2xl shadow-[#4a703f]/10 border border-[#4a703f]/20 flex items-center justify-center overflow-hidden"
              >
                <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
                  {productImages.map((img, idx) => (
                    <button
                      key={`${img}-${idx}`}
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
                        onError={(e) => {
                          e.currentTarget.src = PLACEHOLDER_IMG;
                        }}
                      />
                    </button>
                  ))}
                </div>

                <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20 flex flex-col gap-3">
                  <button
                    onClick={handleToggleWishlist}
                    className="p-3 md:p-4 bg-white/80 backdrop-blur-md rounded-full shadow-xl text-slate-400 hover:text-red-500 border border-white transition-colors"
                  >
                    <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
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
                    onError={(e) => {
                      e.currentTarget.src = PLACEHOLDER_IMG;
                    }}
                  />
                </AnimatePresence>

                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 overflow-hidden">
                  <h2 className="text-[60px] md:text-[100px] font-black text-slate-900/5 leading-none tracking-tighter uppercase select-none">
                    Gauyog
                  </h2>
                </div>
              </motion.div>
            </div>

            <div className="order-3 lg:col-span-7 space-y-10 md:space-y-16 lg:pl-6 xl:pl-10 mt-6 lg:mt-0">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={reveal}
                className="hidden lg:block relative"
              >
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-5 py-2 bg-[#4a703f] text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-xl shadow-green-900/20">
                    {product.category}
                  </span>
                  <div className="h-[1px] flex-grow bg-slate-200" />
                  <span className="text-[#7bbd25] font-black text-[10px] uppercase tracking-widest bg-green-50 px-3 py-1 rounded-lg border border-green-100">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <h1 className="text-7xl font-black text-slate-900 tracking-[-0.06em] leading-[0.8] mb-8">
                  {product.name}
                </h1>

                <div className="flex items-end justify-between gap-12">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm font-black ml-2 text-slate-900">4.9/5.0</span>
                    </div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                      Trusted by our customers
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-3">
                      <span className="text-6xl font-black text-slate-900 tracking-tighter">
                        Rs {product.price}
                      </span>
                      {product.discountPrice && (
                        <span className="text-xl text-slate-300 line-through font-bold">
                          Rs {product.discountPrice}
                        </span>
                      )}
                    </div>
                    <p className="text-[#7bbd25] font-black text-[10px] uppercase tracking-widest mt-1">
                      Inclusive of all taxes
                    </p>
                  </div>
                </div>
              </motion.div>

              {!!product.weightOptions?.length && (
                <div className="max-w-xs">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3">
                    Select Weight
                  </p>
                  <select
                    value={currentWeight}
                    onChange={(e) => setSelectedWeight(e.target.value)}
                    className="w-full bg-white border border-slate-200 px-5 py-4 rounded-full text-sm font-bold text-slate-900 outline-none focus:border-slate-950"
                  >
                    {product.weightOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full sm:w-auto flex-1 px-8 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-50 ${
                    inCart
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-[#744926] hover:bg-[#4a703f] text-white"
                  }`}
                >
                  <ShoppingBag size={18} /> {inCart ? "Remove From Cart" : "Add To Cart"}
                </button>
                <button
                  onClick={async () => {
                    if (!inCart) {
                      await addToCart({ ...product, selectedWeight });
                    }
                    navigate("/payment");
                  }}
                  className="w-full sm:w-auto flex-1 bg-white text-[#744926] border-2 border-[#744926] px-8 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-100 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  Buy Now
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border-y border-slate-200">
                {[
                  { label: "Pack", val: currentWeight || "Standard", icon: <Box size={18} /> },
                  { label: "Stock", val: `${product.stock}`, icon: <Box size={18} /> },
                  { label: "Purity", val: "100% Organic", icon: <ShieldCheck size={18} /> },
                  { label: "Standard", val: "Vedic Grade", icon: <CheckCircle2 size={18} /> },
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
                    <p className="text-base font-black text-slate-800 tracking-tight">{spec.val}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-12">
                <section>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#4a703f] mb-6 flex items-center gap-4">
                    <div className="w-8 h-[2px] bg-[#4a703f]" /> Product Composition
                  </h3>
                  <p className="text-xl md:text-2xl text-slate-600 leading-[1.4] font-medium tracking-tight">
                    {product.description}
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 w-fit pb-1">
                      Botanical Blend
                    </h4>
                    <ul className="space-y-4">
                      {(product.ingredients || "Natural ingredient blend")
                        .split(",")
                        .map((ingredient, i) => (
                          <li key={`${ingredient}-${i}`}>
                            <span className="block text-sm font-black text-slate-800">
                              {ingredient.trim()}
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
                      {["Morning Wellness", "Daily Home Use"].map((u, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#4a703f]" />
                          <p className="text-sm font-bold text-slate-900 leading-tight">{u}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
