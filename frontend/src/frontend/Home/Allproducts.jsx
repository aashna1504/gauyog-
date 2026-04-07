import { useState } from "react";
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
    desc: "Sourced from high-quality grass-fed cows, processed with zero additives to maintain its natural creamy texture and nutritional value.",
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
    desc: "Traditional Bilona-method ghee from A2 cow milk. Rich in vitamins, healthy fats, and a distinct aroma that elevates every meal.",
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
];

export default function AllProducts() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Dairy", "Ghee", "Garden", "Pantry"];
  const filtered =
    filter === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === filter);

  return (
    <div className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#7bbd25] font-bold text-xs uppercase tracking-widest">
              Our Full Collection
            </div>
            <h2 className="text-5xl font-bold text-gray-900">
              Browse <span className="text-[#7bbd25]">All Products</span>
            </h2>
          </div>

          {/* Category filter pills */}
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </AnimatePresence>
        </div>

        {/* Load more */}
        <div
          onClick={() => (window.location.href = "/shop")}
          className="mt-10 text-center"
        >
          <button className="px-10 py-4 rounded-full border-2 border-[#744926]/10 font-bold text-white bg-[#744926] hover:bg-[#4a703f] transition-all shadow-xl">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  );
}
