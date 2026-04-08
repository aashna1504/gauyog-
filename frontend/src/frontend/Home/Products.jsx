import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircleIcon } from "lucide-react";
import ProductCard from "../../Components/ProductCard";
import api from "../../api/axios";
import useCartStore from "../../store/cartStore";
import useWishlistStore from "../../store/wishlistStore";
import { useNavigate } from "react-router-dom";

export default function ProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { addItem: addToCart, removeByProductId, isInCart, fetchCart } = useCartStore();
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

  return (
    <div className="bg-[#fcfdfd] py-20 px-6 relative overflow-hidden">
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

          <div className="lg:pl-10 space-y-6 order-1 md:order-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-[#7bbd25] text-xs font-bold uppercase tracking-widest border border-green-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7bbd25]" />
              </span>
              New Arrival 2026
            </div>
            <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1]">
              Taste the <span className="text-[#7bbd25] italic">Difference</span> <br />
              of Nature.
            </h2>
            <p className="text-gray-500 text-lg max-w-md leading-relaxed mx-auto md:mx-0">
              Experience the farm-to-table revolution with our premium
              collection of dairy and organic essentials. Freshness you can trust.
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
            <h3 className="text-4xl font-bold text-gray-900">Featured Essentials</h3>
            <div className="h-1.5 w-16 bg-[#7bbd25] rounded-full" />
          </div>
          <div className="flex gap-3">
            <button className="group border-2 border-gray-100 p-4 rounded-full hover:bg-black hover:border-black transition-all">
              <ArrowLeft size={20} className="group-hover:text-white transition-colors" />
            </button>
            <button className="group border-2 border-gray-100 p-4 rounded-full hover:bg-black hover:border-black transition-all">
              <ArrowRight size={20} className="group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-96 rounded-[40px] bg-gray-100 animate-pulse" />
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
    </div>
  );
}
