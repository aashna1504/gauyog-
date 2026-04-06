import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775466588/Untitled_design_dhde6s.png",
  "https://images.unsplash.com/photo-1551434678-e076c223a692",
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
];

export default function BannerSlider() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Increased to 5s for better readability
    return () => clearInterval(interval);
  }, [index]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className="relative w-full h-[50vh] md:h-[85vh] lg:h-[90vh] overflow-hidden bg-slate-900"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* SLIDES */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={slides[index]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: "easeOut" }}
          /* h-full w-full + object-cover ensures the image fills the 
             container without distortion on any device.
          */
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </AnimatePresence>

      {/* OVERLAY GRADIENT - Makes text/dots pop on bright images */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

      {/* NAVIGATION ARROWS - Hidden on mobile for better UX, shown on hover/desktop */}
      <div className="hidden md:block">
        <AnimatePresence>
          {hovered && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20
                  bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 text-white
                  hover:bg-[#7bbd25] hover:border-[#7bbd25] transition-all duration-300"
              >
                <ChevronLeft size={28} />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20
                  bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 text-white
                  hover:bg-[#7bbd25] hover:border-[#7bbd25] transition-all duration-300"
              >
                <ChevronRight size={28} />
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* DOTS / INDICATORS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`transition-all duration-500 rounded-full ${i === index
                ? "w-8 h-2 bg-[#7bbd25]"
                : "w-2 h-2 bg-white/50 hover:bg-white"
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}