import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircleIcon, Clock } from "lucide-react";
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
    { label: "World", sub: "COUNTRIES GROWING WITH US" },
  ];
  return (
    <div>
      <section className=" py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              {/* Logo Area */}
              <div className="flex flex-col">
                <h2 className="text-3xl  font-black text-[#4a703f] tracking-tight">
                  Gauyog Kendr
                </h2>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
                  Sustainables
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl  font-bold text-black leading-[1.1]">
                Our Gift from{" "}
                <span className="text-[#4a703f] italic">Gujarat, India</span> to
                the World
              </h1>

              <p className="text-[#d4a044]  italic font-semibold text-lg">
                Pure by Nature. Proven by Earth.
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed text-lg max-w-xl">
              From the heart of Gujarat to fields around the world — Gauyog
              Kendr creates premium organic soil, fertiliser, and coconut
              products that honour the earth, empower local women, and help
              farmers grow naturally.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => (window.location.href = "/shop")}
                className="bg-[#744926] text-white px-10 py-5 rounded-full font-bold shadow-2xl hover:bg-[#4a703f] hover:scale-105 transition-all duration-300"
              >
                Explore Our Products
              </button>
              <button
                onClick={() => (window.location.href = "/contact")}
                className="border-2 border-slate-200 hover:border-[#4a703f] hover:text-[#4a703f] text-slate-600 px-8 py-4 rounded-full font-bold transition-all active:scale-95"
              >
                Connect With Us
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            {/* Main Image Card */}
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl group transition-transform duration-500 hover:scale-[1.02]">
              <img
                src="https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302434/0fc480c8-6acf-4ff0-a587-cea5c58e069b_lii8qp.jpg" // Replace with actual image path
                alt="Gauyog Team at Gujarat Expo"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <p className="text-white/90 font-medium text-sm flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-white/50" />
                  Gauyog Kendr team — Gujarat Expo 2025
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col justify-center items-center text-center space-y-2 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-[#d4a044]  font-bold text-2xl lg:text-xl xl:text-2xl">
                    {stat.label}
                  </span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-tight">
                    {stat.sub}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-300 tracking-widest">
              CIN : U28160GJ2024PTC154513
            </p>
          </div>
        </div>
      </section>
      <div className="bg-[#fcfdfd] pt-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-50 rounded-full blur-[120px] -z-10 opacity-60" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] -z-10 opacity-40" />

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 items-center gap-12 mb-24">
            <div className="relative group flex justify-center order-2 md:order-1">
              <div className="absolute w-[320px] h-[320px] md:w-[450px] md:h-[450px] bg-gradient-to-tr from-green-100/40 to-emerald-50/20 rounded-full animate-pulse shadow-inner" />
              <img
                src="https://res.cloudinary.com/dbpzzvcik/image/upload/v1775037259/cow_v6ymwb.png"
                className="relative w-full max-w-[420px] z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
                alt="Mascot"
              />
              <div className="absolute bottom-4 right-10 z-20 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-xl border border-white flex items-center gap-3 animate-bounce">
                <div className="bg-[#4a703f] p-2 rounded-full text-white shadow-lg shadow-green-200">
                  <CheckCircleIcon size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-gray-400 tracking-tighter">
                    Certified
                  </p>
                  <p className="text-sm font-bold text-gray-900">100% Pure</p>
                </div>
              </div>
            </div>

            <div className="lg:pl-10 space-y-6 order-1 md:order-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-[#4a703f] text-xs font-bold uppercase tracking-widest border border-green-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4a703f]" />
                </span>
                New Arrival 2026
              </div>
              <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1]">
                Your
                <span className="text-[#4a703f] italic">
                  Trusted Natural Partner
                </span>
              </h2>
              <p className="text-gray-500 text-lg max-w-md leading-relaxed mx-auto md:mx-0">
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

          <div className="flex justify-between items-end mb-10">
            <div className="space-y-2">
              <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1]">
                Everything from Mother Earth
              </h2>
              <div className="h-1.5 w-16 bg-[#4a703f] rounded-full" />
            </div>
            <div className="flex gap-3">
              <button className="group border-2 border-gray-100 p-4 rounded-full hover:bg-black hover:border-black transition-all">
                <ArrowLeft
                  size={20}
                  className="group-hover:text-white transition-colors"
                />
              </button>
              <button className="group border-2 border-gray-100 p-4 rounded-full hover:bg-black hover:border-black transition-all">
                <ArrowRight
                  size={20}
                  className="group-hover:text-white transition-colors"
                />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        </div>
        <section className="relative bg-[#fdfcfb] py-32 px-6 overflow-hidden">
          {/* Soft Background Accents */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#4a703f]/5 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#4a703f]/5 rounded-full blur-[100px] -z-10" />

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              {/* --- LEFT SIDE: CONTENT & SEGMENTS --- */}
              <div className="lg:col-span-7 space-y-12">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4a044]/10 border border-[#d4a044]/20">
                    <Globe size={14} className="text-[#d4a044]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4a044]">
                      Global Reach & Impact
                    </span>
                  </div>

                  <h2 className="text-5xl md:text-7xl  font-bold text-slate-950 leading-[1.05] tracking-tight">
                    Bridging{" "}
                    <span className="text-[#4a703f] italic font-medium">
                      Heritage
                    </span>{" "}
                    <br />
                    to Modern Markets
                  </h2>

                  <p className="text-slate-500 text-xl leading-relaxed max-w-xl font-medium">
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
                      desc: "Bulk organic fertilisers for wholesale across EMEA markets.",
                      color: "bg-blue-500/10 text-blue-600",
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
                      color: "bg-[#d4a044]/10 text-[#d4a044]",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group relative flex items-center gap-6 p-6 rounded-[2rem] bg-white border border-slate-100 hover:border-[#4a703f]/20 hover:shadow-2xl hover:shadow-[#4a703f]/5 transition-all duration-500 cursor-default"
                    >
                      <div
                        className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${item.color}`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">
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
                      className="bg-white/60 backdrop-blur-md border border-white p-10 rounded-[2.5rem] flex flex-col items-center text-center space-y-2 shadow-sm"
                    >
                      <div className="text-[#4a703f]/40 mb-2">{stat.icon}</div>
                      <span className="text-4xl  font-black text-slate-950">
                        {stat.val}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        {stat.lab}
                      </span>
                    </div>
                  ))}
                </div>

                {/* High-Impact Testimonial */}
                <div className="flex-1 relative overflow-hidden bg-[#4a703f] rounded-[3rem] p-12 text-white shadow-2xl shadow-[#4a703f]/30">
                  {/* Decorative Quote Mark */}
                  <div className="absolute -top-6 -right-6 text-white/10 italic  text-[12rem] pointer-events-none">
                    "
                  </div>

                  <div className="relative z-10 h-full flex flex-col justify-between space-y-12">
                    <p className="text-2xl md:text-3xl  italic leading-snug">
                      "Gauyog Kendr blends genuine organic quality with
                      world-class service. You feel the community in every
                      shipment."
                    </p>

                    <div className="space-y-4">
                      <div className="w-12 h-1 bg-[#d4a044]" />
                      <div>
                        <p className="font-black text-[10px] uppercase tracking-[0.3em] text-[#4a703f]">
                          International Distribution Partner
                        </p>
                        <p className="text-white/60 text-[10px] font-medium mt-1">
                          Strategic Supply Chain Division
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
