import React, { useState } from "react";
import {
  Quote,
  Star,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  SmileIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: "01",
    name: "Sarah Jenkins",
    role: "Nutritionist",
    text: "The purity of the A2 Ghee is unmatched. I've recommended it to all my clients looking for authentic dairy.",
    tag: "Health & Wellness",
  },
  {
    id: "02",
    name: "Arjun Mehta",
    role: "Professional Chef",
    text: "This reminds me of my childhood summers. Creamy, fresh, and delivered within hours of milking.",
    tag: "Culinary Expert",
  },
  {
    id: "03",
    name: "Elena Rodriguez",
    role: "Eco-Activist",
    text: "Knowing my milk comes from happy cows and eco-friendly packaging makes every single sip feel better.",
    tag: "Sustainability",
  },
  {
    id: "04",
    name: "David Chen",
    role: "Parent",
    text: "Finally, a brand I trust for my kids. No preservatives, no hormones—just pure, honest goodness.",
    tag: "Family Choice",
  },
  {
    id: "05",
    name: "Priya Sharma",
    role: "Yoga Instructor",
    text: "The organic buttermilk is my post-practice ritual. It's incredibly hydrating and feels light on the stomach.",
    tag: "Daily Routine",
  },
  {
    id: "06",
    name: "Marcus Thorne",
    role: "Fitness Athlete",
    text: "High protein, zero junk. This is the only dairy brand that fits into my strict training macro-nutrients.",
    tag: "Performance",
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="bg-[#e5ecec] py-10 md:py-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-[#7bbd25] rounded-full blur-[80px] md:blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-[#7bbd25] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-4 md:mb-6 w-fit">
            <SmileIcon size={12} /> 2,000+ Happy Voices
          </div>

          <h2 className="text-4xl md:text-7xl font-bold text-gray-900 leading-tight mb-4 md:mb-8">
            The{" "}
            <span className="text-[#7bbd25] italic underline decoration-[#7bbd25] underline-offset-4 md:underline-offset-8">
              Trust
            </span>{" "}
            <br />
            we've earned.
          </h2>

          <div className="flex items-center gap-4 mb-6 md:mb-12">
            <div className="h-[2px] w-24 md:w-32 bg-gray-100 relative overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{
                  width: `${((index + 1) / testimonials.length) * 100}%`,
                }}
                className="absolute inset-0 bg-[#7bbd25]"
              />
            </div>
            <span className="text-xs md:text-sm font-black text-gray-400">
              0{index + 1} / 0{testimonials.length}
            </span>
          </div>

          <div className="hidden lg:flex gap-4">
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-full border-2 border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-xl shadow-transparent hover:shadow-gray-200"
            >
              <ArrowUp size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-full border-2 border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-xl shadow-transparent hover:shadow-gray-200"
            >
              <ArrowDown size={24} />
            </button>
          </div>
        </div>

        <div className="relative flex flex-col gap-4 md:gap-10">
          <div className="relative h-[320px] md:h-[400px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="w-full"
              >
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#7bbd25] text-white rounded-full md:rounded-full flex items-center justify-center shadow-lg shadow-green-100">
                      <Quote size={20} md={24} />
                    </div>
                    <span className="text-[#7bbd25] font-black text-[10px] md:text-xs uppercase tracking-widest">
                      {testimonials[index].tag}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-4xl font-bold text-gray-800 leading-snug italic ">
                    "{testimonials[index].text}"
                  </h3>

                  <div className="pt-4 md:pt-8 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-lg md:text-xl font-black text-gray-900 flex items-center gap-2">
                        {testimonials[index].name}
                        <CheckCircle2
                          size={14}
                          md={16}
                          className="text-[#7bbd25]"
                        />
                      </p>
                      <p className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-tighter">
                        {testimonials[index].role}
                      </p>
                    </div>

                    <div className="flex gap-0.5 md:gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          md={14}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute -bottom-6 md:-bottom-10 right-0 text-[80px] md:text-[120px] font-black text-gray-100/50 -z-20 select-none">
              {testimonials[index].id}
            </div>
          </div>

          <div className="flex lg:hidden gap-3 justify-center">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-white hover:bg-black hover:text-white transition-all shadow-sm"
            >
              <ArrowUp size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-white hover:bg-black hover:text-white transition-all shadow-sm"
            >
              <ArrowDown size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
