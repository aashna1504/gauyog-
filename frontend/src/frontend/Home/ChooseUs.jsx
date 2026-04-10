import React, { useState } from "react";
import {
  Sprout,
  ShieldCheck,
  RefreshCcw,
  Dna,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    title: "Farm-Fresh Quality",
    desc: "Sourced directly from our ethical, family-run farms every single morning for peak flavor.",
    icon: Sprout,
    id: "01",
  },
  {
    title: "100% Natural Purity",
    desc: "Strictly zero additives. We maintain a transparent 'Cow-to-Bottle' process you can trust.",
    icon: CheckCircle2,
    id: "02",
  },
  {
    title: "Eco-Conscious Loop",
    desc: "From biodegradable packaging to solar-powered cooling, we prioritize the planet first.",
    icon: RefreshCcw,
    id: "03",
  },
  {
    title: "Bio-Available Nutrients",
    desc: "Our low-heat pasteurization preserves the essential enzymes and vitamins your body needs.",
    icon: Dna,
    id: "04",
  },
];

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-[#fcfdfd ] py-24 px-6 relative overflow-hidden  text-gray-900">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4a703f]/5 rounded-full blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative hidden lg:flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative z-10 w-96 h-96 bg-white rounded-[50px] shadow-[0_40px_80px_-15px_rgba(116,73,38,0.1)] border border-gray-100 flex items-center justify-center"
              >
                <div className="w-48 h-48 bg-[#744926] rounded-[40px] flex items-center justify-center shadow-2xl shadow-[#744926]/30 rotate-3">
                  {React.createElement(features[activeIndex].icon, {
                    size: 80,
                    className: "text-white stroke-[1.5px] -rotate-3",
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute w-[500px] h-[500px] border border-dashed border-gray-200 rounded-full animate-[spin_40s_linear_infinite]" />
          </div>

          <div className="lg:pl-10 ">
            <header className="mb-14">
              <div className="text-[#4a703f] font-bold text-xs uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
                <span className="w-10 h-[1px] bg-[#4a703f]" /> Why Gauyog Kendr
              </div>
              <h2 className="text-5xl md:text-6xl font-black leading-tight text-gray-900 tracking-tighter">
                Pure By <span className="text-[#4a703f]">Nature,</span> <br />
                Proven By <span className="text-[#744926]">Earth.</span>
              </h2>
            </header>

            <div className="space-y-2">
              {features.map((item, i) => {
                const isActive = activeIndex === i;
                const Icon = item.icon;

                return (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`relative p-6 cursor-pointer rounded-full transition-all duration-500 group overflow-hidden ${isActive ? "bg-white shadow-xl shadow-gray-200/50" : "hover:bg-gray-50"}`}
                  >
                    <div className="flex items-center gap-6">
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? "bg-[#744926] text-white rotate-6 shadow-lg shadow-[#744926]/20" : "bg-gray-100 text-gray-400"}`}
                      >
                        <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3
                            className={`text-xl font-black transition-all duration-300 tracking-tight ${isActive ? "text-[#744926]" : "text-gray-400"}`}
                          >
                            {item.title}
                          </h3>
                          <ArrowRight
                            size={18}
                            className={`transition-all duration-500 ${isActive ? "opacity-100 translate-x-0 text-[#4a703f]" : "opacity-0 -translate-x-4"}`}
                          />
                        </div>

                        <motion.div
                          initial={false}
                          animate={{
                            height: isActive ? "auto" : 0,
                            opacity: isActive ? 1 : 0,
                            marginTop: isActive ? 8 : 0,
                          }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-medium">
                            {item.desc}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
