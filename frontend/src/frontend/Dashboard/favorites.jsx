import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Home,
  ChevronRight,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NexusFavourites() {
  const navigate = useNavigate();

  const favoriteItems = [
    {
      id: 1,
      img: "https://pngimg.com/d/rice_PNG17.png",
    },
    {
      id: 2,
      img: "https://pngimg.com/d/milk_PNG12756.png",
    },
    {
      id: 3,
      img: "https://pngimg.com/d/rice_PNG17.png",
    },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-12 mt-24 text-slate-900">
      <nav className="flex items-center gap-2 mb-8 px-2">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1.5 text-[10px] font-[1000] uppercase tracking-[0.25em] text-slate-400 hover:text-[#4a703f] transition-all group"
        >
          <Home
            size={12}
            className="group-hover:-translate-y-0.5 transition-transform"
          />
          Dashboard
        </button>
        <ChevronRight size={12} className="text-slate-200" />
        <span className="text-[10px] font-[1000] uppercase tracking-[0.25em] text-[#4a703f]">
          My Favourites
        </span>
      </nav>

      <header className="mb-12 border-l-4 border-[#4a703f] pl-6">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl md:text-4xl font-[900] tracking-tighter text-[#4a703f] mb-2"
        >
          Wishlist
        </motion.h1>
        <p className="text-sm md:text-base font-medium text-slate-500 max-w-[600px] leading-relaxed">
          Quickly access and manage your saved items.
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favoriteItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative bg-white border border-slate-100 rounded-[32px] p-6 shadow-xl shadow-slate-100/50 hover:shadow-[#4a703f]/10 transition-all overflow-hidden flex flex-col items-center"
          >
            <button className="absolute top-4 right-4 z-10 text-red-500 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100">
              <Heart size={18} fill="currentColor" />
            </button>

            <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-[#7bbd25]/5 rounded-full blur-3xl group-hover:bg-[#7bbd25]/10 transition-colors z-0" />

           
            <div className="w-full aspect-square bg-slate-50 rounded-full overflow-hidden border border-slate-100 flex items-center justify-center p-4 relative z-0 mb-5">
              <img
                src={item.img}
                alt="Favourite Product"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

          
            <div className="flex gap-2 w-full relative z-10">
              <button className="flex-1 bg-[#4a703f] text-white py-3 rounded-full text-[9px] font-[1000] uppercase tracking-[0.2em] shadow-lg shadow-[#4a703f]/10 hover:bg-[#744926] transition-all flex items-center justify-center gap-1.5 active:scale-95">
                <ShoppingBag size={12} /> Cart
              </button>
              <button className="p-3 bg-slate-50 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all active:scale-95 border border-slate-100">
                <Trash2 size={12} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
