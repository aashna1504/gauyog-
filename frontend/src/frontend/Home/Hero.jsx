import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

const sliderImages = [
  "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302434/0fc480c8-6acf-4ff0-a587-cea5c58e069b_lii8qp.jpg",
  "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302534/57f06c99-83a3-467b-ab68-c0f1a57ea899_v2ovpk.jpg",
  "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302623/2f2687a2-eb32-4584-84d0-afffeab3406c_fan0jr.jpg",
  "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302434/0fc480c8-6acf-4ff0-a587-cea5c58e069b_lii8qp.jpg",
];

export default function GlobalModernHero() {
  const categories = [
    "Soil Fertilisers",
    "Coco Peat & Fibre",
    "Bulk & Export",
    "Horticulture Trade",
    "Farming Co-ops",
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const sliderItems = useMemo(() => {
    return sliderImages.filter(Boolean).map((image, index) => ({
      id: `manual-${index}`,
      image,
    }));
  }, []);

  useEffect(() => {
    if (sliderItems.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderItems.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [sliderItems.length]);

  useEffect(() => {
    if (activeSlide >= sliderItems.length) setActiveSlide(0);
  }, [activeSlide, sliderItems.length]);

  const goPrev = () => {
    if (!sliderItems.length) return;
    setActiveSlide(
      (prev) => (prev - 1 + sliderItems.length) % sliderItems.length,
    );
  };

  const goNext = () => {
    if (!sliderItems.length) return;
    setActiveSlide((prev) => (prev + 1) % sliderItems.length);
  };

  const currentSlide = sliderItems[activeSlide];

  return (
    <section className="relative overflow-hidden  selection:bg-[#4a703f] selection:text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(31,94,63,0.12),transparent_36%),radial-gradient(circle_at_92%_20%,rgba(211,154,58,0.18),transparent_34%),radial-gradient(circle_at_70%_86%,rgba(31,94,63,0.1),transparent_30%)]" />
      <div className="absolute top-20 -left-24 h-56 w-56 rounded-full border border-[#4a703f]/10" />
      <div className="absolute bottom-10 right-6 h-40 w-40 rounded-full border border-[#4a703f]/10" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-28 md:pt-36 pb-8 lg:pb-8">
        <div className="grid items-center gap-8 lg:gap-14 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-5 md:space-y-7">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/90 rounded-full border border-stone-200 shadow-sm backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4a703f] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4a703f]" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.28em] text-stone-500">
                100% Swadeshi - Gir Somnath, Gujarat
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4a703f] leading-[1.04] tracking-tight"
            >
              Pure By Nature.
              <br />
           
              <span className=" font-semibold text-[#744926]">
                Proven By Earth.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#4b5f58] text-sm md:text-base lg:text-lg leading-relaxed max-w-[560px] font-medium"
            >
              To regenerate the living soil of millions of farms — replacing
              harmful chemicals with the wisdom of nature — so that land grows
              richer with every harvest, and natural farming becomes the way the
              world grows once again.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 pt-1"
            >
              <button
                onClick={() => (window.location.href = "/shop")}
                className="inline-flex items-center gap-2 px-6 py-3.5 md:px-7 md:py-4 bg-[#4a703f] text-white rounded-full font-bold text-sm hover:bg-[#744926] transition-all duration-300 shadow-lg shadow-[#4a703f]/25"
              >
                Shop Products
              </button>
              <button
                onClick={() => (window.location.href = "/contact")}
                className="px-6 py-3.5 md:px-7 md:py-4 border-2 border-[#744926] text-[#744926] rounded-full font-bold text-sm hover:border-[#4a703f] hover:bg-[#4a703f] hover:text-white transition-all duration-300"
              >
                Bulk &amp; export enquiries
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-3 gap-3 pt-4"
            >
              {[
                { val: "5+", label: "Years on the Land" },
                { val: "100%", label: "Chemical-Free" },
                { val: "Products", label: "Export-Ready" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-2 bg-[#744926]"
                >
                  <p className="text-xl font-black text-[#e9aa43]">{s.val}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-200 mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-[34px] border border-[#d7d0c1] bg-white/45 backdrop-blur-sm p-3 shadow-[0_30px_70px_-32px_rgba(23,53,45,0.45)]">
              <div className="relative h-[340px] md:h-[405px] rounded-[26px] overflow-hidden bg-gradient-to-br from-[#f6f0e1] to-[#e8f1dc]">
                {currentSlide ? (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSlide.id || activeSlide}
                      src={currentSlide.image}
                      alt={`Slide ${activeSlide + 1}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="w-full h-full object-cover drop-shadow-[0_24px_30px_rgba(22,52,42,0.2)]"
                    />
                  </AnimatePresence>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-500 font-semibold">
                    No images found
                  </div>
                )}

                {sliderItems.length > 1 && (
                  <>
                    <button
                      onClick={goPrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 text-[#4a703f] border border-[#d4ddcf] flex items-center justify-center hover:bg-[#edf5ea] transition-colors"
                      aria-label="Previous slide"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      onClick={goNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 text-[#4a703f] border border-[#d4ddcf] flex items-center justify-center hover:bg-[#edf5ea] transition-colors"
                      aria-label="Next slide"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </>
                )}
              </div>

              {sliderItems.length > 1 && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  {sliderItems.map((item, index) => (
                    <button
                      key={item.id || index}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2.5 rounded-full transition-all ${index === activeSlide ? "w-8 bg-[#4a703f]" : "w-2.5 bg-stone-300 hover:bg-stone-400"}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-[#4a703f]"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
            {categories.map((cat, i) => (
              <React.Fragment key={i}>
                <button
                  onClick={() => (window.location.href = "/shop")}
                  className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                >
                  {cat}
                </button>
                {i < categories.length - 1 && (
                  <span className="text-white/20 text-xs select-none">/</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
