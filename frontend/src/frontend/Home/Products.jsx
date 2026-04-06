import React from "react";
import {
  Heart,
  Eye,
  ShoppingCart,
  ArrowLeft,
  ArrowRight,
  Star,
  CreditCard,
  CheckCircleIcon,
} from "lucide-react";

const products = [
  {
    name: "Organic Buttermilk",
    price: 45,
    image: "https://pngimg.com/d/milk_PNG12756.png",
    tag: "Fresh",
    color: "from-blue-50 to-cyan-100",
    accent: "#0ea5e9",
  },
  {
    name: "Premium A2 Ghee",
    price: 540,
    image: "https://pngimg.com/d/milk_PNG12756.png",
    tag: "Best Seller",
    color: "from-orange-50 to-yellow-100",
    accent: "#f59e0b",
  },
  {
    name: "Organic Fertilizer",
    price: 120,
    image: "https://pngimg.com/d/rice_PNG17.png",
    tag: "Eco Friendly",
    color: "from-green-50 to-emerald-100",
    accent: "#10b981",
  },
];

export default function ProductSection() {
  return (
    <div className="bg-[#fcfdfd ] py-20 px-6 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-50 rounded-full blur-[120px] -z-10 opacity-60" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] -z-10 opacity-40" />

      <div className="max-w-7xl mx-auto">
        {/* --- TOP HERO SECTION --- */}
        <div className="grid md:grid-cols-2 items-center gap-12 mb-24">
          {/* IMAGE CONTAINER: Now order-2 on mobile, md:order-1 on desktop */}
          <div className="relative group flex justify-center order-2 md:order-1">
            <div className="absolute w-[320px] h-[320px] md:w-[450px] md:h-[450px] bg-gradient-to-tr from-green-100/40 to-emerald-50/20 rounded-full animate-pulse shadow-inner" />
            <img
              src="https://res.cloudinary.com/dbpzzvcik/image/upload/v1775037259/cow_v6ymwb.png"
              className="relative w-full max-w-[420px] z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
              alt="Mascot"
            />
            <div className="absolute bottom-4 right-10 z-20 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-xl border border-white flex items-center gap-3 animate-bounce">
              <div className="bg-[#7bbd25] p-2 rounded-full text-white shadow-lg shadow-green-200">
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

          {/* TEXT CONTENT: Now order-1 on mobile, md:order-2 on desktop */}
          <div className="lg:pl-10 space-y-6 order-1 md:order-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-[#7bbd25] text-xs font-bold uppercase tracking-widest border border-green-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7bbd25]"></span>
              </span>
              New Arrival 2026
            </div>
            <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1]">
              Taste the{" "}
              <span className="text-[#7bbd25] italic">Difference</span> <br />
              of Nature.
            </h2>
            <p className="text-gray-500 text-lg max-w-md leading-relaxed mx-auto md:mx-0">
              Experience the farm-to-table revolution with our premium
              collection of dairy and organic essentials. Freshness you can
              trust.
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

        {/* --- PRODUCT GRID SECTION (Remains Same) --- */}
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-gray-900">
              Featured Essentials
            </h3>
            <div className="h-1.5 w-16 bg-[#7bbd25] rounded-full"></div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-[40px] p-4 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.15)] border border-gray-50"
            >
              <div
                className={`relative h-72 w-full bg-gradient-to-br ${p.color} rounded-[32px] overflow-hidden flex items-center justify-center transition-all duration-500`}
              >
                <div className="absolute top-4 left-4 z-20">
                  <span className="backdrop-blur-md bg-white/60 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-800 border border-white/40 shadow-sm">
                    {p.tag}
                  </span>
                </div>
                <img
                  src={p.image}
                  className="h-44 object-contain transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6 drop-shadow-2xl"
                  alt={p.name}
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#7bbd25] hover:text-white transition-all transform translate-y-6 group-hover:translate-y-0 duration-300">
                    <Eye size={20} />
                  </button>
                  <button className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all transform translate-y-6 group-hover:translate-y-0 delay-75 duration-300">
                    <Heart size={20} />
                  </button>
                </div>
              </div>

              <div className="px-2 py-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <h3 className="font-bold text-2xl text-gray-800 tracking-tight group-hover:text-[#7bbd25] transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-gray-400 text-xs font-bold uppercase mt-1">
                      Farm Choice
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-[#7bbd25] tracking-tighter">
                      ₹{p.price}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">
                      Incl. Taxes
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full bg-[#4a703f] text-white py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-green-100 hover:bg-[#744926] hover:shadow-none">
                    <CreditCard size={18} /> Buy Now
                  </button>
                  <button className="w-full bg-gray-50 text-gray-500 py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#e9aa43] hover:text-white transition-all active:scale-95">
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
