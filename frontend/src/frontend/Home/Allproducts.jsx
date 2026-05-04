import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ProductCard from "../../Components/ProductCard";
import api from "../../api/axios";
import useCartStore from "../../store/cartStore";
import useWishlistStore from "../../store/wishlistStore";
import { useNavigate } from "react-router-dom";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const categories = ["All", "Fertilizer", "Coco"];

  const { addItem: addToCart, removeByProductId, isInCart, fetchCart } = useCartStore();
  const { toggleWishlist, isInWishlist, fetchWishlist } = useWishlistStore();

  useEffect(() => {
    api
      .get("/products?limit=8")
      .then((res) => {
        const data = res.data?.data;
        setProducts(data?.products ?? []);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
    fetchCart();
    fetchWishlist();
  }, []);

  const filtered =
    filter === "All" ? products : products.filter((p) => p.category === filter);

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
    <div className="bg-white py-10 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-16 gap-4 md:gap-8">
          <div className="space-y-2 md:space-y-4">
            <div className="flex items-center gap-2 text-[#4a703f] font-bold text-xs uppercase tracking-widerst">
              Our Full Collection
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              Browse <span className="text-[#4a703f]">All Products</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-[40px] h-64 md:h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
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

        <div
          onClick={() => (window.location.href = "/shop")}
          className="mt-6 md:mt-10 text-center"
        >
          <button className="px-10 py-4 rounded-full border-2 border-[#744926]/10 font-bold text-white bg-[#744926] hover:bg-[#4a703f] transition-all shadow-xl">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  );
}
