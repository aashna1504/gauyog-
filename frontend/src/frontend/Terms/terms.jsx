import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Gavel,
  ChevronRight,
  MousePointer2,
  Scale,
  ShieldCheck,
  FileText,
  UserCheck,
  Globe,
  Lock,
  ArrowRight,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// --- MINIMALIST TYPOGRAPHIC SECTION ---
const TermsSection = ({ title, children, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="py-12 border-b border-slate-50 last:border-0"
  >
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
      <div className="md:col-span-4">
        <span className="text-[10px] font-black text-[#7bbd25] uppercase tracking-[0.3em] block mb-2">
          Article {index + 1}
        </span>
        <h3 className="text-2xl font-black text-slate-900 tracking-tighter italic uppercase">
          {title}
        </h3>
      </div>
      <div className="md:col-span-8 text-slate-500 text-base leading-relaxed space-y-4 font-medium">
        {children}
      </div>
    </div>
  </motion.div>
);

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-[#fcfdfd] selection:bg-[#4a703f] selection:text-white">
      {/* --- MODERN PREMIUM HERO BANNER --- */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative w-full py-20 md:py-24 overflow-hidden"
      >
        {/* BACKGROUND GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbf6] via-white to-[#f4f9ef]" />

        {/* FLOATING BLUR ELEMENTS */}
        <div className="absolute top-[-80px] left-[-60px] w-[300px] h-[300px] bg-[#7bbd25]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-100px] right-[-80px] w-[350px] h-[350px] bg-[#4a703f]/20 rounded-full blur-[140px]" />

        {/* GRID OVERLAY (modern subtle touch) */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center mt-20">
            {/* LEFT CONTENT */}
            <div>
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight"
              >
                Terms & <br />
                <span className="text-[#7bbd25] italic font-semibold">
                  Conditions
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-6 text-gray-500 max-w-md text-base"
              >
                Please review our terms carefully to understand your rights,
                responsibilities, and how we operate within our sanctuary
                ecosystem.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- SIMPLE TYPOGRAPHIC BODY --- */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="divide-y divide-slate-100"
        >
          <TermsSection index={0} title="User Agreement">
            By accessing Gauyog Kendra Sanctuary, you agree to follow our Vedic
            principles of interaction. We provide access to high-quality organic
            products under the condition that users provide accurate information
            and use our digital tools responsibly for their intended sanctuary
            purposes.
          </TermsSection>

          <TermsSection index={1} title="Intellectual Property">
            All visual assets, including photography of our sanctuary grounds
            and livestock, as well as our specific organic formulations, are
            protected. No part of this digital presence may be reproduced for
            commercial gain without explicit written consent from the sanctuary
            administration.
          </TermsSection>

          <TermsSection index={2} title="Product Limitations">
            Our organic offerings and ritual items are subject to availability.
            As we prioritize the natural cycles of the sanctuary, we reserve the
            right to limit quantities or discontinue products without notice. We
            are not liable for the results of ritual practices performed with
            our products.
          </TermsSection>

          <TermsSection index={3} title="Data Governance">
            We value your privacy as much as our sanctuary's peace. Your data is
            encrypted and used strictly for logistical fulfillment. We do not
            engage in data harvesting or third-party sharing, ensuring your
            digital footprint remains secure within our ecosystem.
          </TermsSection>

          <TermsSection index={4} title="Governance">
            These terms are governed by the laws applicable to our sanctuary's
            location. Any disputes arising from the use of our services will be
            handled through peaceful mediation in accordance with local legal
            frameworks.
          </TermsSection>
        </motion.div>
      </div>
    </div>
  );
}
