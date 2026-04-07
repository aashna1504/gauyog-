import { useState, useMemo } from "react";
import { ChevronDown, Filter } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import ProductCard from "../../Components/ProductCard";

const allProducts = [
  {
    id: 1,
    name: "Fresh Cow Milk",
    price: 60,
    tag: "Daily",
    color: "from-blue-50 to-indigo-100",
    category: "Dairy",
    size: "1L",
    rating: 4.8,
    image: "https://pngimg.com/d/milk_PNG12756.png",
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
    rating: 5.0,
    image: "https://pngimg.com/d/milk_PNG12756.png",
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
    rating: 4.9,
    image: "https://pngimg.com/d/milk_PNG12756.png",
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
    rating: 4.7,
    image: "https://pngimg.com/d/milk_PNG12756.png",
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
    rating: 4.6,
    image: "https://pngimg.com/d/milk_PNG12756.png",
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
    rating: 4.5,
    image: "https://pngimg.com/d/rice_PNG17.png",
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
    rating: 4.9,
    image: "https://pngimg.com/d/rice_PNG17.png",
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
    rating: 4.4,
    image: "https://pngimg.com/d/milk_PNG12756.png",
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
    rating: 4.7,
    image: "https://pngimg.com/d/milk_PNG12756.png",
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
    rating: 5.0,
    image: "https://pngimg.com/d/milk_PNG12756.png",
    desc: "Extracted from the milk of Gir cows, this ghee is considered liquid gold for its medicinal and nutritional properties.",
  },
];

export default function ProductListingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSize, setActiveSize] = useState("All Sizes");
  const [sortBy, setSortBy] = useState("Relevant");

  const categories = ["All", "Dairy", "Ghee", "Garden", "Pantry"];
  const sizes = ["All Sizes", "250ml", "250g", "500g", "1kg", "1L"];

  const filteredProducts = useMemo(() => {
    let list = allProducts.filter(
      (p) =>
        (activeCategory === "All" || p.category === activeCategory) &&
        (activeSize === "All Sizes" || p.size === activeSize)
    );
    if (sortBy === "PriceH") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "PriceL") list = [...list].sort((a, b) => a.price - b.price);
    return list;
  }, [activeCategory, activeSize, sortBy]);

  return (
    <div className="bg-[#fcfdfd] min-h-screen pb-24 relative">
     
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-black text-gray-900">
          Harvest <span>Market</span>
        </h1>
      </div>

     
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
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"
            />
          </div>

        
          <div className="relative flex-1 min-w-[140px]">
            <select
              value={activeSize}
              onChange={(e) => setActiveSize(e.target.value)}
              className="w-full appearance-none bg-gray-50 border-none px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-700 focus:ring-2 focus:ring-[#7bbd25]/20 cursor-pointer"
            >
              {sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"
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
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
            />
          </div>
        </div>
      </div>

      
      <main className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
