import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { clUrl, clSrcSet } from "../../utils/cloudinary";

// Store just the versioned public paths — widths are computed on render
const HERO_PATHS = [
  "v1775302434/0fc480c8-6acf-4ff0-a587-cea5c58e069b_lii8qp.jpg",
  "v1778736294/DSC00175_iqozlc.jpg",
  "v1778744023/DSC00215_kqdbva.jpg",
];

// Pre-build full URL objects for each slide
// Container displays at ~540–600px wide on desktop; cap at 600 to avoid over-serving
const sliderImages = HERO_PATHS.map(p => ({
  src:    clUrl(`https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/${p}`, 600),
  srcSet: clSrcSet(`https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/${p}`, [480, 600]),
}));

export default function GlobalModernHero() {
  const categories = [
    "Soil Fertilisers",
    "Coco Peat & Fibre",
    "Bulk & Export",
    "Horticulture Trade",
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const sliderItems = useMemo(() => {
    return sliderImages.map((img, index) => ({ id: `manual-${index}`, ...img }));
  }, []);

  useEffect(() => {
    if (sliderItems.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderItems.length);
    }, 5500);
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

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-28 md:pt-36 pb-12 md:pb-8 lg:pb-8">
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
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4a703f] leading-[1.04] tracking-wider"
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
                <div key={i} className="rounded-2xl p-2 bg-[#744926] text-center">
                  <p className="text-xl font-black text-gray-200">{s.val}</p>
                  <p className="text-[13px] text-gray-200 mt-0.5">
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
            {/* Outer glow */}
            <div className="absolute -inset-3 rounded-[44px] bg-gradient-to-br from-[#4a703f]/10 via-transparent to-[#744926]/10 blur-2xl" />

            <div className="relative rounded-[32px] overflow-hidden shadow-[0_32px_80px_-24px_rgba(23,53,45,0.5)]">
              {/* Image area */}
              <div className="relative h-[360px] md:h-[430px] bg-gradient-to-br from-[#f6f0e1] to-[#e8f1dc]">
                {currentSlide ? (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSlide.id || activeSlide}
                      src={currentSlide.src}
                      srcSet={currentSlide.srcSet}
                      sizes="(max-width: 1024px) 100vw, 600px"
                      alt={`Slide ${activeSlide + 1}`}
                      initial={activeSlide === 0 ? false : { opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="w-full h-full object-cover"
                      fetchpriority={activeSlide === 0 ? "high" : "low"}
                      decoding="async"
                      width={600}
                      height={450}
                    />
                  </AnimatePresence>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-500 font-semibold">
                    No images
                  </div>
                )}

                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

                {/* Slide counter — bottom left */}
                <div className="absolute bottom-4 left-5 flex items-end gap-1 select-none">
                  <span className="text-white font-black text-2xl leading-none tabular-nums">
                    {String(activeSlide + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/50 font-bold text-sm leading-none mb-0.5">
                    /{String(sliderItems.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Progress bars — bottom right area */}
                {sliderItems.length > 1 && (
                  <div className="absolute bottom-5 right-5 flex items-center gap-1.5">
                    {sliderItems.map((item, index) => (
                      <button
                        key={item.id || index}
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className="h-[3px] rounded-full overflow-hidden bg-white/30 transition-all duration-300 focus:outline-none"
                        style={{ width: index === activeSlide ? 32 : 12 }}
                      >
                        {index === activeSlide && (
                          <motion.span
                            key={activeSlide}
                            className="block h-full bg-white rounded-full origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 5.5, ease: "linear" }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Prev / Next — floating pill */}
                {sliderItems.length > 1 && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/30 backdrop-blur-md rounded-full p-1 border border-white/10">
                    <button
                      onClick={goPrev}
                      aria-label="Previous slide"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                      <ArrowLeft size={15} strokeWidth={2.5} />
                    </button>
                    <div className="w-px h-4 bg-white/20" />
                    <button
                      onClick={goNext}
                      aria-label="Next slide"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                      <ArrowRight size={15} strokeWidth={2.5} />
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom strip */}
              <div className="bg-white/90 backdrop-blur-sm px-5 py-3.5 flex items-center justify-between border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4a703f] animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.22em] text-stone-500">
                    Gauyog Kendr — Gir Somnath
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#4a703f]">
                  100% Natural
                </span>
              </div>
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            {categories.map((cat, i) => (
              <React.Fragment key={i}>
                <button
                  onClick={() => (window.location.href = "/shop")}
                  className="text-[14px] uppercase tracking-wider text-white/80 hover:text-white transition-colors"
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
