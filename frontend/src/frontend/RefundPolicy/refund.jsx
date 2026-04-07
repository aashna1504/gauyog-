import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  RefreshCcw,
  Clock,
  Truck,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  FileText,
  MousePointer2,
  PackageCheck,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};


const PolicyRow = ({ icon: Icon, title, children, index }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-10% 0px" }}
    className="relative pl-12 md:pl-20 pb-16 last:pb-0 group"
  >
    <div className="absolute left-0 top-0 h-full w-[1px] bg-slate-100 group-hover:bg-[#4a703f]/30 transition-colors duration-500" />
    <div className="absolute -left-[13px] top-0 w-7 h-7 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:border-[#4a703f] group-hover:text-[#4a703f] group-hover:scale-110 transition-all duration-300 shadow-sm">
      {index + 1}
    </div>
    <div className="space-y-5">
      <div className="flex items-center gap-4 text-slate-400 group-hover:text-[#4a703f] transition-colors duration-300">
        <Icon size={20} strokeWidth={2} />
        <h3 className="text-sm md:text-lg font-black text-slate-900 uppercase tracking-wider italic">
          {title}
        </h3>
      </div>
      <div className="text-slate-500 group-hover:text-slate-700 text-sm md:text-base leading-relaxed space-y-4 max-w-4xl transition-colors duration-300">
        {children}
      </div>
    </div>
  </motion.div>
);

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fcfdfd] selection:bg-[#4a703f] selection:text-white">
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative w-full py-12 md:py-24 overflow-hidden border-b border-gray-100 z-0"
        style={{ background: "#fcfdfd" }}
      >
        <div
          className="absolute top-1/2 -right-1/4 -translate-y-1/2 w-[60%] h-[120%] opacity-20 blur-[120px] rounded-full pointer-events-none animate-pulse"
          style={{
            background:
              "radial-gradient(circle at right, #7bbd25 0%, transparent 100%)",
            zIndex: -20,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 items-center gap-8 relative z-10  mt-20 lg:mt-14">
         
          <div className="md:col-span-7 text-center md:text-left">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100"
            >
              <RefreshCcw
                size={14}
                className="text-[#7bbd25] animate-spin-slow"
              />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
                Returns Protocol
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-black text-gray-900 leading-none tracking-tighter"
              style={{
                fontFamily:
                  "'Baskerville Old Face', 'Libre Baskerville', serif",
              }}
            >
              Refund{" "}
              <span className="text-[#7bbd25] italic font-medium">Policy.</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-6 text-gray-500 text-lg max-w-md mx-auto md:mx-0 leading-relaxed font-medium"
            >
              Handpicked essentials for a healthier lifestyle.{" "}
            </motion.p>
          </div>

         
          <motion.div
            variants={itemVariants}
            className="md:col-span-5 relative h-48 md:h-64 flex items-center justify-center group z-10"
          >
           
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20 w-40 h-52 bg-white rounded-2xl border border-slate-200 shadow-xl flex flex-col p-5 space-y-3 overflow-hidden"
            >
              <div className="flex justify-between items-center relative z-10">
                <FileText size={20} className="text-[#7bbd25]" />
                <div className="w-8 h-1 bg-slate-100 rounded" />
              </div>

              <div className="space-y-2 pt-4 relative z-10">
                <div className="h-2 w-full bg-slate-50 rounded" />
                <div className="h-2 w-3/4 bg-slate-50 rounded" />
                <div className="h-2 w-1/2 bg-[#7bbd25]/10 rounded" />
              </div>

              <div className="mt-auto flex items-center gap-2 pt-4 border-t border-slate-50 relative z-10">
                <ShieldCheck size={14} className="text-[#4a703f]" />
                <span className="text-[8px] font-black uppercase tracking-tighter text-slate-400">
                  Verified
                </span>
              </div>
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white p-3 rounded-full shadow-lg border border-slate-100">
                <MousePointer2 size={16} className="text-[#7bbd25]" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

   
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24 selection:bg-[#4a703f] selection:text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
       
          <div className="lg:col-span-12 space-y-2">
            <PolicyRow index={0} icon={Clock} title="Return Window">
              <p>
                We offer a strict <strong>7-day return policy</strong> for most
                sanctuary items. Please ensure products are unused and in
                original packaging. This window begins on the exact date of
                delivery as verified by our logistics partners. If 7 days have
                passed since your delivery, we unfortunately cannot offer you a
                refund or exchange.
              </p>
            </PolicyRow>

            <PolicyRow index={1} icon={AlertCircle} title="Exemptions">
              <p>
                To maintain the highest bio-security standards within our
                sanctuary, organic fertilizers, fresh manure-based products, and
                ritual offerings are completely exempt from returns once the
                security seal is broken. These items cannot be safely restocked
                or resold due to contamination risks. Additionally, customized
                items created specifically for your ritual practices are also
                non-refundable.
              </p>
            </PolicyRow>

            <PolicyRow index={2} icon={Truck} title="Shipping Policy">
              <p>
                You will be responsible for paying your own shipping costs for
                returning your item. Return shipping costs are handled by the
                customer. Original shipping fees are non-refundable and will be
                deducted from your final credit amount. We recommend using a
                trackable shipping service or purchasing shipping insurance, as
                we do not guarantee receipt of returned items.
              </p>
            </PolicyRow>

            <PolicyRow
              index={3}
              icon={PackageCheck}
              title="Inspection and Restocking"
            >
              <p>
                Once your return is received and inspected by our sanctuary
                team, we will send you an email to notify you that we have
                received your returned item. We will also notify you of the
                approval or rejection of your refund. Approved refunds will be
                processed immediately back to your original payment method.
                Please note that banks may require an additional 5-7 business
                days to reflect the transaction.
              </p>
            </PolicyRow>
          </div>
        </div>
      </div>
    </div>
  );
}
