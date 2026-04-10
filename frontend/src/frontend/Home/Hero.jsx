import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775824327/a259ee99-be2f-4185-a897-50d150495adc_m3r3pw.jpg",
  "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775824336/e5c3ceac-ebd9-4006-8bcb-e973defcf427_fxwehu.jpg",
  "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775824333/cf6418f9-7420-488a-a669-f6a41b5c2625_awr8bc.jpg",
];

export default function BannerSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = left-to-right, -1 = right-to-left
  const [hovered, setHovered] = useState(false);
  const indexRef = useRef(index);
  indexRef.current = index;

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%" }),
    center: { x: 0 },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%" }),
  };

  return (
    <div
      className="relative w-full h-[70vh] md:h-[85vh] lg:h-[110vh] overflow-hidden bg-slate-900 object-contain object-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence mode="sync" custom={direction}>
        <motion.img
          key={index}
          src={slides[index]}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`transition-all duration-500 rounded-full ${
              i === index
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
