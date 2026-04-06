import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775035712/banner-img-02_pi5av3.jpg",
  "https://images.unsplash.com/photo-1551434678-e076c223a692",
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
];

export default function BannerSlider() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
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
      className="relative w-full h-[750px] overflow-hidden "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* SLIDES */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={slides[index]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* LEFT ARROW */}
      <AnimatePresence>
        {hovered && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 
              bg-[#744926] backdrop-blur-md p-3 rounded-full shadow-lg text-white
              hover:bg-[#7bbd25] transition"
          >
            <ChevronLeft size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* RIGHT ARROW */}
      <AnimatePresence>
        {hovered && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 
              bg-[#744926] backdrop-blur-md p-3 rounded-full shadow-lg text-white
              hover:bg-[#7bbd25] transition"
          >
            <ChevronRight size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              i === index ? "bg-[#744926]" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}