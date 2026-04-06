import React, { useState } from "react";
import { Heart, Eye, ShoppingCart, Star, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const allProducts = [
  {
    id: 1,
    name: "Fresh Cow Milk",
    price: 60,
    tag: "Daily",
    color: "from-blue-50 to-indigo-100",
    category: "Dairy",
    image: "https://pngimg.com/d/milk_PNG12756.png",
  },
  {
    id: 2,
    name: "A2 Desi Ghee",
    price: 850,
    tag: "Premium",
    color: "from-orange-50 to-yellow-100",
    category: "Ghee",
    image: "https://pngimg.com/d/milk_PNG12756.png",
  },
  {
    id: 3,
    name: "Organic Butter",
    price: 210,
    tag: "Fresh",
    color: "from-yellow-50 to-amber-100",
    category: "Dairy",
    image: "https://pngimg.com/d/milk_PNG12756.png",
  },
  {
    id: 4,
    name: "Probiotic Curd",
    price: 45,
    tag: "Healthy",
    color: "from-green-50 to-emerald-100",
    category: "Dairy",
    image: "https://pngimg.com/d/milk_PNG12756.png",
  },
  {
    id: 5,
    name: "Natural Paneer",
    price: 150,
    tag: "Handmade",
    color: "from-slate-50 to-gray-200",
    category: "Dairy",
    image: "https://pngimg.com/d/milk_PNG12756.png",
  },
  {
    id: 6,
    name: "Bio-Fertilizer",
    price: 320,
    tag: "Eco",
    color: "from-emerald-50 to-teal-100",
    category: "Garden",
    image: "https://pngimg.com/d/rice_PNG17.png",
  },
  {
    id: 7,
    name: "Organic Honey",
    price: 450,
    tag: "Pure",
    color: "from-amber-50 to-orange-100",
    category: "Pantry",
    image: "https://pngimg.com/d/rice_PNG17.png",
  },
  {
    id: 8,
    name: "Flavored Milk",
    price: 35,
    tag: "New",
    color: "from-pink-50 to-rose-100",
    category: "Dairy",
    image: "https://pngimg.com/d/milk_PNG12756.png",
  },
];

export default function AllProducts() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Dairy", "Ghee", "Garden", "Pantry"];
  const filtered =
    filter === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === filter);

  return (
    <div className="bg-white py-24 px-6 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#7bbd25] font-bold text-xs uppercase tracking-widest">
              Our Full Collection
            </div>
            <h2 className="text-5xl font-bold  text-gray-900">
              Browse <span className="text-[#7bbd25]">All Products</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 bg-gray-50 p-2 rounded-full border border-gray-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  filter === cat
                    ? "bg-[#744926] text-white"
                    : "text-gray-500 hover:bg-white hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={p.id}
                className="group relative"
              >
                <div className="bg-white rounded-[35px] p-4 border border-gray-100 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
                  <div
                    className={`relative h-64 w-full bg-gradient-to-br ${p.color} rounded-[28px] overflow-hidden flex items-center justify-center transition-transform duration-500`}
                  >
                    <div className="absolute top-4 left-4 z-10">
                      <span className="backdrop-blur-md bg-white/70 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider text-gray-800 border border-white/50 shadow-sm">
                        {p.tag}
                      </span>
                    </div>

                    <img
                      src={p.image}
                      className="h-40 object-contain drop-shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:-rotate-6"
                      alt={p.name}
                    />

                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <button className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#7bbd25] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                        <Eye size={18} />
                      </button>
                      <button className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 delay-75 duration-300">
                        <Heart size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 px-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-xl text-gray-800 tracking-tight group-hover:text-[#7bbd25] transition-colors line-clamp-1">
                          {p.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={10}
                              className="fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <span className="text-[10px] text-gray-400 font-bold ml-1">
                            4.9
                          </span>
                        </div>
                      </div>
                      <p className="text-2xl font-black text-[#7bbd25]">
                        ₹{p.price}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button className="w-full bg-[#4a703f] text-white py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-green-100 hover:bg-[#744926] hover:shadow-none">
                        <CreditCard size={18} /> Buy Now
                      </button>

                      <button className="w-full bg-gray-50 text-gray-500 py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#e9aa43] hover:text-white transition-all active:scale-95">
                        <ShoppingCart size={18} /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div
          onClick={() => (window.location.href = "/shop")}
          className="mt-5 text-center"
        >
          <button className="px-10 py-4 rounded-full border-2 border-[#744926]/10 font-bold text-white bg-[#744926] hover:bg-[#4a703f] transition-all shadow-xl shadow-brown-100">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  );
}
