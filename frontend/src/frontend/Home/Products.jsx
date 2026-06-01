import { AnimatePresence } from "framer-motion";
import { clUrl, clSrcSet } from "../../utils/cloudinary";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircleIcon,
  Clock,
  ArrowRightCircle,
} from "lucide-react";
import ProductCard from "../../Components/ProductCard";
import api from "../../api/axios";
import useCartStore from "../../store/cartStore";
import useWishlistStore from "../../store/wishlistStore";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Sprout,
  Users2,
  Globe,
  Sparkles,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, CheckCircle2, ArrowUpRight } from "lucide-react";
export default function ProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const {
    addItem: addToCart,
    removeByProductId,
    isInCart,
    fetchCart,
  } = useCartStore();
  const { toggleWishlist, isInWishlist, fetchWishlist } = useWishlistStore();

  useEffect(() => {
    api
      .get("/products?limit=4")
      .then((res) => {
        const data = res.data?.data;
        setProducts(data?.products ?? []);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));

    fetchCart();
    fetchWishlist();
  }, [fetchCart, fetchWishlist]);

  const handleAddToCart = async (product) => {
    const result = isInCart(product.id)
      ? await removeByProductId(product.id)
      : await addToCart(product);
    if (!result?.success && result?.message) {
      alert(result.message);
    }
  };

  const handleBuyNow = async (product) => {
    if (!isInCart(product.id)) {
      const result = await addToCart(product);
      if (!result?.success) {
        if (result?.message) alert(result.message);
        return;
      }
    }
    navigate("/payment");
  };

  const handleToggleWishlist = async (product) => {
    await toggleWishlist(product);
  };
  const stats = [
    { label: "100%", sub: "NATURAL & CHEMICAL-FREE" },
    { label: "8+", sub: "PRODUCT LINES TRUSTED BY GROWERS" },
    { label: "Female", sub: "WOMEN-LED FROM SOIL TO SHELF" },
    { label: "Growth", sub: "COUNTRIES GROWING WITH US" },
  ];
  const tiers = [
    {
      category: "Fertilisers",
      name: "Organic Fertiliser Range",
      tagline: "From Gir Cow Dung to Your Soil — Pure & Proven",
      description:
        "Our complete line of cow-based organic fertilisers, crafted from authentic Gir cow dung and natural botanicals. Designed for farmers, gardeners, and co-operatives who want real, chemical-free results.",
      color: "#e9aa43",
      icon: <ShieldCheck size={24} />,
      products: [
        "Cow Dung Powder",
        "Cow Dung Slurry",
        "Ganjiv Amrut",
        "Active Soil",
        "Amrut Mati",
      ],
      points: [
        "Improves soil structure, texture, and long-term fertility",
        "Enriches the earth with essential macro and micro nutrients",
        "Boosts beneficial microbial activity deep in the root zone",
        "Enhances root strength, plant immunity, and disease resistance",
        "Accelerates germination and increases overall crop yield",
        "Safe for all soil types — sandy loam to black cotton soil",
        "Zero synthetic chemicals — 100% natural and compostable",
        "Sourced exclusively from Gir cows of Gujarat, India",
      ],
      claim: "Feed Your Soil — Not Just Your Crop",
      badge: "Category 01",
    },
    {
      category: "Coco Products",
      name: "Premium Coco Range",
      tagline: "Harvested from Natural Coconut Husks — Pure & pH Balanced",
      description:
        "Our range of certified coco peat and coco fibre products are sustainably processed from natural coconut husks. Perfect for hydroponics, nurseries, container gardening, and greenhouse cultivation worldwide.",
      color: "#e9aa43",
      icon: <Zap size={24} />,
      products: ["Coco Peat", "Coco Fibre", "Coco Cell"],
      points: [
        "Exceptional water retention — holds up to 9× its own weight",
        "Improves soil drainage and aeration for healthy root systems",
        "pH neutral (5.8–6.8) — compatible with all plant varieties",
        "100% biodegradable, renewable, and eco-certified",
        "Reduces irrigation frequency by up to 50%",
        "Ideal growing medium for hydroponics and soilless cultivation",
        "Naturally disease-resistant and free from pathogens",
        "Long-lasting substrate with a 3–5 year effective lifespan",
      ],
      claim: "Grow More — Waste Less",
      badge: "Category 02",
    },
  ];
  return (
    <div>
      <section className="py-12 md:py-20 px-4 md:px-6 overflow-hidden mt-8 md:mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-stretch">
          {/* Left Content */}
          <div className="flex flex-col justify-between space-y-6 md:space-y-12 lg:order-1">
            {/* Main Text Block */}
            <div className="space-y-5 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                {/* Logo Area */}
                <div className="flex flex-col">
                  <p className="text-3xl font-black text-[#4a703f] tracking-wider">
                    Gauyog Kendr
                  </p>
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
                    Sustainables
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.1]">
                  Our Gift from{" "}
                  <span className="text-[#4a703f] italic underline decoration-[#e9aa43]/30 underline-offset-8">
                    Gujarat, India
                  </span>{" "}
                  to the World
                </h1>

                <p className="text-[#4a703f] italic font-semibold text-base md:text-lg flex items-center gap-3">
                  <span className="w-6 h-[2px] bg-[#4a703f]" />
                  Pure by Nature. Proven by Earth.
                </p>
              </div>

              <p className="text-slate-600 leading-relaxed text-sm md:text-lg max-w-xl">
                Cow-based fertilisers and coconut substrates from our sanctuary
                in Gir Somnath - built on Vedic practice, certified for export,
                trusted by farms, nurseries and growers across India and abroad.
              </p>
            </div>

            {/* Heritage & Distribution Footer */}
            <div className="space-y-4 bg-[#744926] p-4 md:p-5 rounded-2xl">
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {[
                  { label: "Origin", value: "Veraval, Gir Somnath" },
                  { label: "Operations", value: "Mfg & Export" },
                  { label: "Network", value: "5,000+ Farmers" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <p className="text-[10px] md:text-[11px] font-black text-slate-100 uppercase tracking-[0.2em] md:tracking-[0.3em]">
                      {item.label}
                    </p>
                    <p className="text-sm md:text-base font-bold text-slate-200 leading-snug">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="h-[1px] bg-white/10" />

              {/* Badge Strip */}
              <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                {["ISO 9001:2015", "Organic Certified", "Startup India"].map((badge) => (
                  <div
                    key={badge}
                    className="px-2.5 md:px-3 py-1 md:py-1.5 border border-slate-100/40 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-wider text-slate-200"
                  >
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6 lg:order-2">
            {/* Main Image Card */}
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl group transition-transform duration-500 hover:scale-[1.02]">
              <img
                src={clUrl("https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/v1778739708/DSC00642_2_1_vch4fe.jpg", 1200)}
                srcSet={clSrcSet("https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/v1778739708/DSC00642_2_1_vch4fe.jpg", [480, 800, 1200])}
                sizes="(max-width: 1024px) 100vw, 600px"
                alt="Gauyog Team at Gujarat Expo"
                className="w-full lg:h-[350px] h-[250px] object-cover"
                loading="lazy"
                decoding="async"
                width={1200}
                height={450}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <p className="text-white/90 font-medium text-sm flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-white/50" />
                  Gauyog Kendr team
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 p-3 md:p-6 rounded-2xl flex flex-col justify-center items-center text-center space-y-2 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-[#e9aa43] font-bold text-2xl lg:text-xl xl:text-2xl">
                    {stat.label}
                  </span>
                  <span className="text-[11px] text-slate-700 ">
                    {stat.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="bg-[#fcfdfd] relative overflow-hidden px-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e9aa43]/10 rounded-full blur-[120px] -z-10 opacity-60" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#744926]/10 rounded-full blur-[100px] -z-10 opacity-40" />

        <div className="max-w-7xl mx-auto px-4 flex flex-col">
          {/* Trusted Natural Partner */}
          <div className="grid md:grid-cols-2 items-center gap-6 md:gap-12 mb-8 md:mb-24 mt-6 md:mt-0">
            <div className="relative group flex justify-center order-2 md:order-1">
              <div className="absolute w-[220px] h-[220px] md:w-[450px] md:h-[450px] bg-gradient-to-tr from-green-100/40 to-emerald-50/20 rounded-full animate-pulse shadow-inner" />
              <img
                src={clUrl("https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/v1775037259/cow_v6ymwb.png", 500)}
                srcSet={clSrcSet("https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/v1775037259/cow_v6ymwb.png", [280, 420, 500])}
                sizes="(max-width: 768px) 280px, 420px"
                className="relative w-full max-w-[420px] z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
                alt="Mascot"
                loading="lazy"
                decoding="async"
                width={500}
                height={500}
              />
              <div className="absolute bottom-4 right-10 z-20 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-xl border border-white flex items-center gap-3 animate-bounce">
                <div className="bg-[#4a703f] p-2 rounded-full text-white shadow-lg shadow-green-200">
                  <CheckCircleIcon size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">
                    Certified
                  </p>
                  <p className="text-sm font-bold text-gray-900">100% Pure</p>
                </div>
              </div>
            </div>

            <div className="lg:pl-10 space-y-4 md:space-y-6 text-center md:text-left order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e9aa43]/10 text-[#744926] text-xs font-bold uppercase tracking-widerst border border-[#e9aa43]/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e9aa43] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e9aa43]" />
                </span>
                New Arrival 2026
              </div>
              <h2 className="text-2xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1]">
                Your{" "}
                <span className="text-[#4a703f] italic underline decoration-[#e9aa43]/30 underline-offset-8">
                  Trusted Natural Partner
                </span>
              </h2>
              <p className="text-gray-500 text-sm md:text-lg max-w-md leading-relaxed mx-auto md:mx-0">
                International standards, Indian roots, and a genuine commitment
                to communities, farmers, and the earth.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-4">
                <button
                  onClick={() => (window.location.href = "/shop")}
                  className="bg-[#744926] text-white px-10 py-5 rounded-full font-bold shadow-2xl hover:bg-[#4a703f] hover:scale-105 transition-all duration-300"
                >
                  View All Products
                </button>
              </div>
            </div>
          </div>

          {/* Products section — first on mobile, second on desktop */}
          <div className="order-1 md:order-2">
            <div className="flex justify-between items-end mb-6 md:mb-10">
              <div className="space-y-2 ">
                <div className="w-full h-[1px] bg-[#e9aa43]/40 lg:hidden my-5" />

                <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1]">
                  Everything from{" "}
                  <span className="text-[#4a703f] italic underline decoration-[#e9aa43]/30 underline-offset-8">
                    Mother Earth
                  </span>
                </h2>
              </div>
              {/* Arrows — desktop only */}
              <div className="hidden md:flex gap-3">
                <button aria-label="Previous products" className="group border-2 border-gray-100 p-4 rounded-full hover:bg-black hover:border-black transition-all">
                  <ArrowLeft size={20} aria-hidden="true" className="group-hover:text-white transition-colors" />
                </button>
                <button aria-label="Next products" className="group border-2 border-gray-100 p-4 rounded-full hover:bg-black hover:border-black transition-all">
                  <ArrowRight size={20} aria-hidden="true" className="group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-96 rounded-[40px] bg-gray-100 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-9">
                <AnimatePresence mode="popLayout">
                  {products.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={{ ...p, inCart: isInCart(p.id) }}
                      onAddToCart={handleAddToCart}
                      onBuyNow={handleBuyNow}
                      onToggleWishlist={handleToggleWishlist}
                      isInWishlist={isInWishlist(p.id)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Arrows — mobile only, below the product grid */}
            <div className="flex md:hidden justify-center gap-4 mb-9">
              <button aria-label="Previous products" className="group border-2 border-gray-100 p-4 rounded-full hover:bg-black hover:border-black transition-all">
                <ArrowLeft size={20} aria-hidden="true" className="group-hover:text-white transition-colors" />
              </button>
              <button aria-label="Next products" className="group border-2 border-gray-100 p-4 rounded-full hover:bg-black hover:border-black transition-all">
                <ArrowRight size={20} aria-hidden="true" className="group-hover:text-white transition-colors"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-[#744926]">
          <div className="max-w-7xl mx-auto py-12 md:py-24 px-4 md:px-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-16 gap-4 md:gap-6">
              <div className="space-y-2 md:space-y-3">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#e9aa43]">
                  Product Selection
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-100">
                  Choose Your
                  <span className="text-[#e9aa43] ml-2 italic underline decoration-[#e9aa43] underline-offset-8">
                    Growth Solution
                  </span>
                </h2>
              </div>
              <p className="max-w-xs text-slate-100 text-sm font-medium leading-relaxed border-l-2 border-slate-100 pl-4 md:pl-6">
                Two premium product categories — organic fertilisers and coco
                substrates — crafted to transform your soil and grow naturally.
              </p>
            </div>

            {/* Two-Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {tiers.map((tier, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="relative group bg-white rounded-[40px] border border-slate-100 p-2 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="bg-slate-50/50 rounded-[34px] p-5 md:p-8 flex flex-col gap-5 md:gap-6">
                    {/* Header row */}
                    <div className="flex justify-between items-center">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
                        style={{ backgroundColor: tier.color }}
                      >
                        {tier.icon}
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widerst">
                        {tier.badge}
                      </span>
                    </div>

                    {/* Title block */}
                    <div>
                      <p
                        className="text-[10px] font-black uppercase tracking-[0.3em] mb-1"
                        style={{ color: tier.color }}
                      >
                        {tier.category}
                      </p>
                      <h3 className="text-2xl font-black text-slate-900  mb-3">
                        {tier.name}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        {tier.description}
                      </p>
                    </div>

                    {/* Product badges */}
                    <div className="flex flex-wrap gap-2">
                      {tier.products.map((product, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border"
                          style={{
                            borderColor: tier.color + "50",
                            color: tier.color,
                            backgroundColor: tier.color + "12",
                          }}
                        >
                          {product}
                        </span>
                      ))}
                    </div>

                    {/* Benefits */}
                    <ul className="space-y-2">
                      {tier.points.slice(0, 4).map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm font-semibold text-slate-700"
                        >
                          <CheckCircle2
                            size={15}
                            className="mt-0.5 shrink-0"
                            style={{ color: tier.color }}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      onClick={() => (window.location.href = "/shop")}
                      className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widerst transition-all text-white shadow-md hover:brightness-110 active:scale-95"
                      style={{ backgroundColor: tier.color }}
                    >
                      Browse Products <ArrowUpRight size={14} />
                    </button>
                  </div>

                  <div
                    className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full blur-[80px] opacity-20 -z-10"
                    style={{ backgroundColor: tier.color }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <section className="relative bg-[#fdfcfb] py-14 md:py-32 px-4 md:px-6 overflow-hidden">
          {/* Soft Background Accents */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#4a703f]/5 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#4a703f]/5 rounded-full blur-[100px] -z-10" />

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-20">
              {/* --- LEFT SIDE: CONTENT & SEGMENTS --- */}
              <div className="lg:col-span-7 space-y-12">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4a703f]/10 border border-[#4a703f]/20">
                    <Globe size={14} className="text-[#4a703f]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4a703f]">
                      Global Reach & Impact
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-5xl lg:text-7xl font-bold text-slate-950 leading-[1.1] tracking-wider">
                    Bridging{" "}
                    <span className="text-[#4a703f] italic underline decoration-[#e9aa43]/30 underline-offset-8">
                      Heritage
                    </span>{" "}
                    <br />
                    to Modern Markets
                  </h2>

                  <p className="text-slate-500 text-sm md:text-xl leading-relaxed max-w-xl font-medium">
                    We empower diverse market segments across continents,
                    scaling from industrial distributors to high-end boutique
                    retailers.
                  </p>
                </div>

                {/* Modern Segment List */}
                <div className="grid gap-4">
                  {[
                    {
                      title: "Agricultural Distributors",
                      icon: <Building2 />,
                      desc: "Bulk organic fertilisers for wholesale across markets.",
                      color: "bg-[#744926]/10 text-[#744926]",
                    },
                    {
                      title: "Horticulture & Hydroponics",
                      icon: <Sprout />,
                      desc: "Specialised coco peat substrates for commercial greenhouses.",
                      color: "bg-[#4a703f]/10 text-[#4a703f]",
                    },
                    {
                      title: "Farming Co-operatives",
                      icon: <Users2 />,
                      desc: "High-quality organic inputs for large-scale natural farming.",
                      color: "bg-[#e9aa43]/10 text-[#e9aa43]",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group relative flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-[2rem] bg-white border border-slate-100 hover:border-[#4a703f]/20 hover:shadow-2xl hover:shadow-[#4a703f]/5 transition-all duration-500 cursor-default"
                    >
                      <div
                        className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${item.color}`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 tracking-wider">
                          {item.title}
                        </h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- RIGHT SIDE: STATS & QUOTE --- */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* High-Impact Testimonial */}
                <div className="flex-1 relative overflow-hidden bg-[#4a703f] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 text-white shadow-2xl shadow-[#4a703f]/30 min-h-[auto] md:min-h-[600px] flex flex-col justify-center">
                  {/* Decorative Background Element */}
                  <div className="absolute -top-10 -right-10 text-white/5 font-black text-[15rem] pointer-events-none select-none">
                    G
                  </div>

                  <div className="relative z-10 h-full flex flex-col justify-between space-y-8">
                    {/* Header Section */}
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#e9aa43]" />
                        Our Philosophy
                      </div>
                      <h2 className="text-2xl md:text-5xl font-black tracking-wider">
                        Returning to <br />
                        <span className="text-[#e9aa43]">Mother Earth</span>
                      </h2>
                      <p className="text-white/80 text-sm font-medium leading-relaxed max-w-md italic">
                        "The answer to healthier food and a better planet lies
                        in going back to nature — not away from it."
                      </p>
                    </div>
                    {/* Glass Stat Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { val: "5+", lab: "Years", icon: <Clock size={20} /> },
                        {
                          val: "100%",
                          lab: "Organic",
                          icon: <Award size={20} />,
                        },
                      ].map((stat, i) => (
                        <div
                          key={i}
                          className="bg-white/20 backdrop-blur-md p-5 rounded-[2.5rem] flex flex-col items-center text-center space-y-2 shadow-sm"
                        >
                          <span className="text-4xl  font-black text-slate-50">
                            {stat.val}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-widerst text-slate-200">
                            {stat.lab}
                          </span>
                        </div>
                      ))}
                    </div>
                    {/* Content List - Modern Grid Layout */}
                    <div className="grid gap-4">
                      {[
                        {
                          label: "Indigenous Origin",
                          desc: "Cow dung from Gir cows & husk from our own palm plantations.",
                          icon: "01",
                        },
                        {
                          label: "Community First",
                          desc: "Fresh botanicals hand-sorted by local women artisans.",
                          icon: "02",
                        },
                        {
                          label: "The Clean Promise",
                          desc: "No chemicals, no synthetics, and absolutely no shortcuts.",
                          icon: "03",
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="group flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                        >
                          <span className="text-[#e9aa43] font-black text-xs mt-1 opacity-50 group-hover:opacity-100 transition-opacity">
                            {item.icon}
                          </span>
                          <div>
                            <p className="font-black text-[10px] uppercase tracking-[0.2em] text-white">
                              {item.label}
                            </p>
                            <p className="text-white/60 text-[11px] font-medium  mt-1">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={() => navigate("/contact")}
            className="flex justify-center items-center p-5 md:p-8"
          >
            <button className="w-[300px] py-4 bg-[#744926] text-white rounded-full font-black uppercase tracking-widerst text-xs flex items-center justify-center gap-2">
              Contact Us
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
