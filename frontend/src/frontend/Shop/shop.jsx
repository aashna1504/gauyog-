import React from "react";
import { CheckCircle, ChevronRight, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductListing from "./productlisting";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const statsBoxVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 1, ease: "easeOut", delay: 0.6 },
  },
};

export default function ModernShopBanner() {
  return (
    <div className="lg:mt-32 mt-20">
      {/* <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative w-full py-20 md:py-24 bg-[#fcfdfd ] overflow-hidden border-b border-gray-100"
      >
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 right-0 w-[30%] h-full bg-[#4a703f]/5 -skew-x-12 translate-x-10"
        />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#744926]/5 rounded-full blur-[80px]" />

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="relative z-10 text-center md:text-left flex-1">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100"
            >
              <CheckCircle size={14} className="text-[#4a703f]" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
                Direct from our farm
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-black text-gray-900 leading-none tracking-wider"
              style={{
                fontFamily:
                  "'Baskerville Old Face', 'Libre Baskerville', serif",
              }}
            >
              Our{" "}
              <span className="text-[#4a703f] italic font-medium">
                Products.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-gray-500 text-lg max-w-md mx-auto md:mx-0 leading-relaxed font-medium"
            >
              Handpicked essentials for a healthier lifestyle.{" "}
              <br className="hidden md:block" />
              Pure. Organic. Delivered to your doorstep.
            </motion.p>
          </div>

          <motion.div
            variants={statsBoxVariants}
            className="relative flex-shrink-0"
          >
            <div className="bg-white p-8 rounded-[40px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.08)] border border-gray-50 relative z-10 max-w-[280px]">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-12 h-12 bg-[#744926] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#744926]/20"
                  >
                    <ShoppingBag size={22} />
                  </motion.div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-400">
                      Available Items
                    </p>
                    <p className="text-xl font-bold text-gray-900 tracking-wider">
                      48+ Products
                    </p>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-gray-100" />

                <div className="flex items-center justify-between bg-white p-4 rounded-full border border-gray-50 shadow-sm max-w-[240px]">
                  <div>
                    <p className="text-[10px] font-black uppercase text-[#4a703f] tracking-widerst">
                      Purity Level
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      100% Certified
                    </p>
                  </div>

                  <div className="relative w-12 h-12 flex items-center justify-center ml-2">
                    <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 border-4 border-t-[#4a703f] border-r-transparent border-b-transparent border-l-transparent rounded-full"
                    />

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-6 h-6 text-[#4a703f]"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                          duration: 0.8,
                          delay: 1.5, 
                          ease: "easeInOut",
                        }}
                        d="M20 6L9 17L4 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

           
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -inset-4 bg-[#4a703f]/50 blur-3xl -z-10 rounded-full"
            />
          </motion.div>
        </div>
      </motion.div> */}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <ProductListing />
      </motion.div>
    </div>
  );
}
