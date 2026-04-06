import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Eye,
  ShoppingCart,
  Star,
  CreditCard,
  ChevronDown,
  Filter,
  Check,
  ShieldCheck,
  ShoppingBag,
  X,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const allProducts = [
  {
    id: 1,
    name: "Fresh Cow Milk",
    price: 60,
    tag: "Daily",
    color: "from-blue-50 to-indigo-100",
    category: "Dairy",
    size: "1kg",
    image: "https://pngimg.com/d/milk_PNG12756.png",
    rating: 4.8,
    desc: "Sourced from high-quality grass-fed cows, our fresh milk is processed with zero additives to maintain its natural creamy texture and nutritional value.",
  },
  {
    id: 2,
    name: "A2 Desi Ghee",
    price: 850,
    tag: "Premium",
    color: "from-orange-50 to-yellow-100",
    category: "Ghee",
    size: "500g",
    image: "https://pngimg.com/d/milk_PNG12756.png",
    rating: 5.0,
    desc: "Traditional Bilona-method ghee made from A2 cow milk. Rich in vitamins, healthy fats, and a distinct aroma that elevates every meal.",
  },
  {
    id: 3,
    name: "Organic Butter",
    price: 210,
    tag: "Fresh",
    color: "from-yellow-50 to-amber-100",
    category: "Dairy",
    size: "250g",
    image: "https://pngimg.com/d/milk_PNG12756.png",
    rating: 4.9,
    desc: "Pure, unsalted organic butter churned the traditional way. Perfect for baking or spreading on warm, fresh bread.",
  },
  {
    id: 4,
    name: "Probiotic Curd",
    price: 45,
    tag: "Healthy",
    color: "from-green-50 to-emerald-100",
    category: "Dairy",
    size: "500g",
    image: "https://pngimg.com/d/milk_PNG12756.png",
    rating: 4.7,
    desc: "Thick, creamy curd set with natural cultures. A perfect probiotic boost for your gut health and immunity.",
  },
  {
    id: 5,
    name: "Natural Paneer",
    price: 150,
    tag: "Handmade",
    color: "from-slate-50 to-gray-200",
    category: "Dairy",
    size: "250g",
    image: "https://pngimg.com/d/milk_PNG12756.png",
    rating: 4.6,
    desc: "Soft, handmade cottage cheese with no preservatives. Highly versatile and packed with high-quality dairy protein.",
  },
  {
    id: 6,
    name: "Bio-Fertilizer",
    price: 320,
    tag: "Eco",
    color: "from-emerald-50 to-teal-100",
    category: "Garden",
    size: "1kg",
    image: "https://pngimg.com/d/rice_PNG17.png",
    rating: 4.5,
    desc: "Nutrient-rich organic fertilizer to help your home garden thrive naturally without harmful synthetic chemicals.",
  },
  {
    id: 7,
    name: "Organic Honey",
    price: 450,
    tag: "Pure",
    color: "from-amber-50 to-orange-100",
    category: "Pantry",
    size: "250g",
    image: "https://pngimg.com/d/rice_PNG17.png",
    rating: 4.9,
    desc: "Raw, unprocessed forest honey collected by local tribes. Retains all natural enzymes and healing properties.",
  },
  {
    id: 8,
    name: "Flavored Milk",
    price: 35,
    tag: "New",
    color: "from-pink-50 to-rose-100",
    category: "Dairy",
    size: "250ml",
    image: "https://pngimg.com/d/milk_PNG12756.png",
    rating: 4.4,
    desc: "Naturally flavored and lightly sweetened milk. A refreshing, healthy alternative to soda for kids and adults alike.",
  },
  {
    id: 9,
    name: "Fresh Curd",
    price: 40,
    tag: "Organic",
    color: "from-cyan-50 to-blue-100",
    category: "Dairy",
    size: "500g",
    image: "https://pngimg.com/d/milk_PNG12756.png",
    rating: 4.7,
    desc: "Classic organic curd with a smooth consistency. Essential for your daily Indian meal.",
  },
  {
    id: 10,
    name: "Gir Ghee",
    price: 1200,
    tag: "Ancient",
    color: "from-yellow-100 to-orange-200",
    category: "Ghee",
    size: "1kg",
    image: "https://pngimg.com/d/milk_PNG12756.png",
    rating: 5.0,
    desc: "Extracted from the milk of Gir cows, this ghee is considered liquid gold for its medicinal and nutritional properties.",
  },
];

export default function ProductListingPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSize, setActiveSize] = useState("All Sizes");
  const [sortBy, setSortBy] = useState("Relevant");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ["All", "Dairy", "Ghee", "Garden", "Pantry"];
  const sizes = ["All Sizes", "250ml", "250g", "500g", "1kg"];

  const filteredProducts = useMemo(() => {
    return allProducts.filter(
      (p) =>
        (activeCategory === "All" || p.category === activeCategory) &&
        (activeSize === "All Sizes" || p.size === activeSize),
    );
  }, [activeCategory, activeSize]);

  return (
    <div className="bg-[#fcfdfd] min-h-screen pb-24 relative">
      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 ">
            Harvest <span className="">Market</span>
          </h1>
        </div>
      </div>

      {/* --- ADVANCED FILTER BAR --- */}
      <div className="sticky top-4 z-40 max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-white/90 backdrop-blur-xl p-3 rounded-[32px] shadow-2xl shadow-green-900/5 border border-white flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[140px] group">
            <Filter
              size={16}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7bbd25]"
            />
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full appearance-none bg-gray-50 border-none pl-12 pr-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-700 focus:ring-2 focus:ring-[#7bbd25]/20 cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c} Category
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300"
            />
          </div>

          <div className="relative flex-[1.5] min-w-[200px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-[#744926] text-white border-none px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[#744926]/20 cursor-pointer transition-all hover:bg-[#5a381d]"
            >
              <option value="Relevant">Sort: Relevant</option>
              <option value="PriceH">Price: High to Low</option>
              <option value="PriceL">Price: Low to High</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50"
            />
          </div>
        </div>
      </div>

      {/* --- GRID --- */}
      <main className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group"
              >
                <div className="bg-white rounded-[40px] p-4 border border-gray-100 flex flex-col h-full transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)]">
                  <div
                    className={`relative h-64 w-full bg-gradient-to-br ${p.color} rounded-[32px] overflow-hidden flex items-center justify-center`}
                  >
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

                    {/* OVERLAY EYE BUTTON TRIGGERS MODAL */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 bg-black/5 backdrop-blur-[2px]">
                      <button
                        onClick={() => setSelectedProduct(p)}
                        className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-700 hover:bg-[#7bbd25] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
                      >
                        <Eye size={20} />
                      </button>
                      <button className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 delay-75">
                        <Heart size={20} />
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
                        </div>
                        <h3 className="font-bold text-xl text-gray-800 line-clamp-1 group-hover:text-[#4a703f] transition-colors uppercase tracking-tight">
                          {p.name}
                        </h3>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">
                          {p.category} • {p.size}
                        </p>
                      </div>
                      <p className="text-2xl font-black text-[#7bbd25] tracking-tighter">
                        ₹{p.price}
                      </p>
                    </div>

                    <div className="space-y-2 mt-auto">
                      <button className="w-full bg-[#4a703f] text-white py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#744926] transition-all">
                        <CreditCard size={18} /> Buy Now
                      </button>
                      <button className="w-full bg-gray-50 text-gray-500 py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#e9aa43] hover:text-white transition-all">
                        <ShoppingCart size={18} /> Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* --- PREVIEW MODAL (EYE CLICK) --- */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Dark Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            <motion.div
              layoutId={`card-${selectedProduct.id}`}
              className="relative bg-white w-full max-w-5xl rounded-[40px] md:rounded-[56px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* --- ACTION BAR WITH COLORED BG ICONS --- */}
              <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
                <div className="flex bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-xl border border-white/50">
                  {/* Wishlist Icon with subtle pink bg */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="p-3 bg-red-50 text-[#ef4444] rounded-full transition-all"
                  >
                    <Heart size={20} strokeWidth={2.5} />
                  </motion.button>
                  {/* Cart Icon with subtle blue bg */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="p-3 bg-blue-50 text-[#0369a1] rounded-full transition-all ml-1"
                  >
                    <ShoppingCart size={20} strokeWidth={2.5} />
                  </motion.button>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-4 bg-gray-900 text-white rounded-full hover:bg-black transition-all shadow-lg"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Left: Big Image */}
              <div
                className={`w-full md:w-5/12 bg-gradient-to-br ${selectedProduct.color} flex items-center justify-center p-12 relative min-h-[300px]`}
              >
                <motion.img
                  initial={{ scale: 0.6, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  src={selectedProduct.image}
                  className="w-full max-w-[320px] drop-shadow-3xl z-10"
                />
                <span className="absolute bottom-10 left-1/2 -translate-x-1/2 text-black/5 font-black text-8xl uppercase pointer-events-none select-none">
                  {selectedProduct.category}
                </span>
              </div>

              {/* Modal Right: Details */}
              <div className="w-full md:w-7/12 p-8 md:p-14 bg-white overflow-y-auto self-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-[#4a703f] rounded-full text-[10px] font-black uppercase mb-6 tracking-widest border border-green-100">
                  <ShieldCheck size={14} /> Certified Organic
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 tracking-tighter leading-none">
                  {selectedProduct.name}
                </h2>

                <div className="flex items-center gap-4 mb-8">
                  <p className="text-4xl font-black text-[#7bbd25] tracking-tighter">
                    ₹{selectedProduct.price}
                  </p>
                  <div className="h-8 w-[2px] bg-gray-100" />
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
                    {selectedProduct.size}
                  </p>
                </div>

                <p className="text-gray-500 leading-relaxed mb-10 text-lg font-medium">
                  {selectedProduct.desc}
                </p>

                {/* DUAL ACTION BUTTONS (Refined Size) */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button className="flex-[2] bg-[#4a703f] text-white py-4 px-8 rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-green-900/20 hover:bg-[#744926] transition-all flex items-center justify-center gap-3 active:scale-95">
                    <ShoppingCart size={20} />
                    Add To Cart
                  </button>

                  {/* New Preview Full Info Button */}
                  <button
                    onClick={() => navigate("/previewcard")}
                    className="flex-1 bg-[#e9aa43] text-gray-100 py-4 px-8 rounded-full font-bold text-xs uppercase tracking-widest border border-gray-100 hover:text-gray-600 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Eye size={18} />
                    Full Info
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-8 border-t border-gray-100 pt-8">
                  {[
                    "Natural Pure",
                    "Eco-Friendly",
                    "No Chemicals",
                    "Probiotic",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 group">
                      <div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center text-[#4a703f]">
                        <Check size={14} strokeWidth={4} />
                      </div>
                      <span className="text-sm font-bold text-gray-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
