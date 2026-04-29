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

  const categories = ["All", "Fertilizer", "Coco"];
  const ALLOWED_WEIGHTS = ["1kg", "3kg", "5kg"];

  const sizes = useMemo(() => {
    const allWeights = products.flatMap((p) => [
      ...(p.weightOptions || []),
      ...(p.weight ? [p.weight] : []),
    ]);
    const filtered = Array.from(new Set(allWeights)).filter((w) =>
      ALLOWED_WEIGHTS.includes(w)
    );
    return ["All Sizes", ...filtered];
  }, [products]);

  const {
    addItem: addToCart,
    removeByProductId,
    isInCart,
    fetchCart,
  } = useCartStore();
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
          (p.weightOptions || []).includes(activeSize)),
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

  const certs = [
    { name: "ISO Standards", img: "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775715667/pngtree-iso-9001-certified---quality-standard-seal-certificate-verified-standard-vector-png-image_22204284_z6qquk.png", color: "hover:border-blue-400" },
    { name: "Best Quality", img: "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775716925/R_g3ngmr.png", color: "hover:border-yellow-500" },
    { name: "Natural", img: "https://res.cloudinary.com/dbpzzvcik/image/upload/v1776424916/100-percent-natural-and-organic-product-badge-label-rubber-stamp-emblem-template-organic-ingredient-badge-logo-suitable-for-product-packaging-design-elements-with-leaf-png_cricy6_1_fbrhsd.png", color: "hover:border-green-700" },
    { name: "Recyclable", img: "https://res.cloudinary.com/dbpzzvcik/image/upload/v1776424787/pngwing.com_47_e4y7od.png", color: "hover:border-green-800" },
    { name: "GPCB", img: "https://res.cloudinary.com/dbpzzvcik/image/upload/v1776424987/gpcb-image_jqfxee.png", color: "hover:border-blue-500" },
    { name: "Lab Tested", img: "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775716286/lab-tested-label-sign-round-stamp-band-ribbon-vector-33848228-removebg-preview_t8vpa3.png", color: "hover:border-black" },
  ];

  return (
    <div className="bg-[#fcfdfd] min-h-screen pb-24 relative">
      <section className="w-full bg-[#fdfcfb] py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* --- COMBINED HEADING SECTION --- */}
          <div className="w-full max-w-4xl mx-auto text-center mb-2 space-y-5">
            {/* Gold Subheading with centered line accents */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-[1px] bg-[#e9aa43]/40" />
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[#e9aa43]">
                Trust & Quality
              </span>
              <div className="w-8 h-[1px] bg-[#e9aa43]/40" />
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-6xl  font-bold text-[#2d3a29] tracking-tight">
              Everything from <br />
              <span className="text-[#4a703f] italic">Mother Earth</span>
            </h2>

            {/* Centered Description */}
            <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
              Our commitment to excellence is backed by international standards
              and natural processes, ensuring every product is pure by nature
              and proven by earth.
            </p>
          </div>

          {/* Certifications grid — desktop only; mobile sees it at page bottom */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {certs.map((cert, idx) => (
              <div key={idx} className="group flex flex-col items-center space-y-4">
                <div className={`w-32 h-32 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-xl ${cert.color} border-t-2 group-hover:border-opacity-100`}>
                  <div className="w-20 h-20 flex items-center justify-center overflow-hidden">
                    <img src={cert.img} alt={cert.name} className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-[#2d3a29] transition-colors text-center leading-tight">
                  {cert.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sticky top-4 z-40 max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-white/90 backdrop-blur-xl p-3 rounded-[32px] shadow-2xl shadow-green-900/5 border border-white flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[140px] group">
            <Filter
              size={16}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-[#4a703f]"
            />
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full appearance-none bg-gray-50 border-none pl-12 pr-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-700 focus:ring-2 focus:ring-[#4a703f]/20 cursor-pointer"
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
              className="w-full appearance-none bg-gray-50 border-none px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-700 focus:ring-2 focus:ring-[#4a703f]/20 cursor-pointer"
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
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-[40px] h-96 animate-pulse"
              />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-400 py-24 text-lg font-medium">
            No products found.
          </p>
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

      {/* Certifications — mobile only, shown after products */}
      <section className="md:hidden w-full bg-[#fdfcfb] py-16 mt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-8 h-[1px] bg-[#e9aa43]/40" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#e9aa43]">
              Trust & Quality
            </span>
            <div className="w-8 h-[1px] bg-[#e9aa43]/40" />
          </div>
          <div className="grid grid-cols-3 gap-6 items-center">
            {certs.map((cert, idx) => (
              <div key={idx} className="group flex flex-col items-center space-y-3">
                <div className={`w-20 h-20 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center ${cert.color} border-t-2`}>
                  <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                    <img src={cert.img} alt={cert.name} className="max-w-full max-h-full object-contain" />
                  </div>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 text-center leading-tight">
                  {cert.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
