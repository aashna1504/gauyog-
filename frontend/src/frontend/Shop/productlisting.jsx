import { useState, useMemo, useEffect } from "react";
import { ChevronDown, Filter } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import ProductCard from "../../Components/ProductCard";
import api from "../../api/axios";
import useCartStore from "../../store/cartStore";
import useWishlistStore from "../../store/wishlistStore";
import { useNavigate } from "react-router-dom";

export default function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSize, setActiveSize] = useState("All Sizes");
  const [sortBy, setSortBy] = useState("Relevant");
  const navigate = useNavigate();

  const categories = ["All", "Dairy", "Ghee", "Herbs", "Grains", "Wellness", "Garden", "Pantry"];
  const sizes = useMemo(() => {
    const allWeights = products.flatMap((p) => [
      ...(p.weightOptions || []),
      ...(p.weight ? [p.weight] : []),
    ]);
    return ["All Sizes", ...Array.from(new Set(allWeights))];
  }, [products]);

  const { addItem: addToCart, removeByProductId, isInCart, fetchCart } = useCartStore();
  const { toggleWishlist, isInWishlist, fetchWishlist } = useWishlistStore();

  useEffect(() => {
    api
      .get("/products?limit=100")
      .then((res) => {
        const data = res.data?.data;
        setProducts(data?.products ?? []);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
    fetchCart();
    fetchWishlist();
  }, []);

  const filteredProducts = useMemo(() => {
    let list = products.filter(
      (p) =>
        (activeCategory === "All" || p.category === activeCategory) &&
        (activeSize === "All Sizes" ||
          p.weight === activeSize ||
          (p.weightOptions || []).includes(activeSize))
    );
    if (sortBy === "PriceH") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "PriceL") list = [...list].sort((a, b) => a.price - b.price);
    return list;
  }, [products, activeCategory, activeSize, sortBy]);

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
            <Filter size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7bbd25]" />
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full appearance-none bg-gray-50 border-none pl-12 pr-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-700 focus:ring-2 focus:ring-[#7bbd25]/20 cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c} Category</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
          </div>

          <div className="relative flex-1 min-w-[140px]">
            <select
              value={activeSize}
              onChange={(e) => setActiveSize(e.target.value)}
              className="w-full appearance-none bg-gray-50 border-none px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-700 focus:ring-2 focus:ring-[#7bbd25]/20 cursor-pointer"
            >
              {sizes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
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
            <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-[40px] h-96 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-400 py-24 text-lg font-medium">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p) => (
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
      </main>
    </div>
  );
}
