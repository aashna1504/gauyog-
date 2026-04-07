import { AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircleIcon,
} from "lucide-react";
import ProductCard from "../../Components/ProductCard";

const products = [
  {
    id: 1,
    name: "Organic Buttermilk",
    price: 45,
    tag: "Fresh",
    color: "from-blue-50 to-cyan-100",
    category: "Dairy",
    size: "500ml",
    rating: 4.8,
    image: "https://pngimg.com/d/milk_PNG12756.png",
    desc: "Cool, refreshing buttermilk made from pure organic curd. Naturally probiotic and perfect for digestion.",
  },
  {
    id: 2,
    name: "Premium A2 Ghee",
    price: 540,
    tag: "Best Seller",
    color: "from-orange-50 to-yellow-100",
    category: "Ghee",
    size: "500g",
    rating: 5.0,
    image: "https://pngimg.com/d/milk_PNG12756.png",
    desc: "Traditional Bilona-method A2 ghee. Rich in vitamins and healthy fats with a divine aroma.",
  },
  {
    id: 3,
    name: "Organic Fertilizer",
    price: 120,
    tag: "Eco Friendly",
    color: "from-green-50 to-emerald-100",
    category: "Garden",
    size: "1kg",
    rating: 4.6,
    image: "https://pngimg.com/d/rice_PNG17.png",
    desc: "Nutrient-rich bio fertilizer to make your home garden thrive — completely chemical free.",
  },
];

export default function ProductSection() {
  return (
    <div className="bg-[#fcfdfd] py-20 px-6 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-50 rounded-full blur-[120px] -z-10 opacity-60" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] -z-10 opacity-40" />

      <div className="max-w-7xl mx-auto">
        {/* Hero split */}
        <div className="grid md:grid-cols-2 items-center gap-12 mb-24">
          {/* Image */}
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

          {/* Text */}
          <div className="lg:pl-10 space-y-6 order-1 md:order-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-[#7bbd25] text-xs font-bold uppercase tracking-widest border border-green-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7bbd25]" />
              </span>
              New Arrival 2026
            </div>
            <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1]">
              Taste the{" "}
              <span className="text-[#7bbd25] italic">Difference</span> <br />
              of Nature.
            </h2>
            <p className="text-gray-500 text-lg max-w-md leading-relaxed mx-auto md:mx-0">
              Experience the farm-to-table revolution with our premium
              collection of dairy and organic essentials. Freshness you can
              trust.
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

        {/* Featured section header */}
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-gray-900">
              Featured Essentials
            </h3>
            <div className="h-1.5 w-16 bg-[#7bbd25] rounded-full" />
          </div>
          <div className="flex gap-3">
            <button className="group border-2 border-gray-100 p-4 rounded-full hover:bg-black hover:border-black transition-all">
              <ArrowLeft
                size={20}
                className="group-hover:text-white transition-colors"
              />
            </button>
            <button className="group border-2 border-gray-100 p-4 rounded-full hover:bg-black hover:border-black transition-all">
              <ArrowRight
                size={20}
                className="group-hover:text-white transition-colors"
              />
            </button>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
