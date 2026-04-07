import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ProductCard from "../../Components/ProductCard";
import api from "../../api/axios";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Dairy", "Ghee", "Herbs", "Grains", "Wellness", "Garden", "Pantry"];

  useEffect(() => {
    api
      .get("/products?limit=8")
      .then((res) => {
        const data = res.data?.data;
        setProducts(data?.products ?? []);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#7bbd25] font-bold text-xs uppercase tracking-widest">
              Our Full Collection
            </div>
            <h2 className="text-5xl font-bold text-gray-900">
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

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-[40px] h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </AnimatePresence>
          </div>
        )}

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
