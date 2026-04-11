import React from "react";
import { motion } from "framer-motion";

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

const PrivacySection = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="py-12 border-b border-slate-50 last:border-0"
  >
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
      <div className="md:col-span-4">
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

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fcfdfd] selection:bg-[#4a703f] selection:text-white">

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative w-full py-20 md:py-24 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbf6] via-white to-[#f4f9ef]" />

        <div className="absolute top-[-80px] left-[-60px] w-[300px] h-[300px] bg-[#4a703f]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-100px] right-[-80px] w-[350px] h-[350px] bg-[#4a703f]/20 rounded-full blur-[140px]" />

        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center mt-20">
            <div>
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight"
              >
                Privacy 
                <span className="text-[#4a703f] italic font-semibold">
                  Policy
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-6 text-gray-500 max-w-md text-base"
              >
                Gauyog Kendr (Gauyog Kendr Manufacturing Pvt Ltd) is committed
                to protecting your privacy and handling your personal
                information with care and transparency.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="divide-y divide-slate-100"
        >
          <PrivacySection title="Information We Collect">
            When you contact us, request a quote, or place an order, we may
            collect your name, email address, phone number, shipping address,
            and business details. We collect only what is necessary to fulfil
            your request and provide our services.
          </PrivacySection>

          <PrivacySection title="How We Use Your Information">
            Your information is used to process orders and enquiries, provide
            customer support, send relevant product updates (with your
            consent), and improve our services. We do not sell, rent, or share
            your personal data with third parties for marketing purposes.
          </PrivacySection>

          <PrivacySection title="Data Security">
            We implement appropriate technical and organisational measures to
            protect your personal information against unauthorised access,
            alteration, or loss.
          </PrivacySection>

          <PrivacySection title="Cookies">
            Our website may use essential cookies to ensure proper
            functionality. We do not use tracking or advertising cookies
            without your consent.
          </PrivacySection>

          <PrivacySection title="Your Rights">
            You have the right to access, correct, or request deletion of your
            personal data at any time. To exercise these rights or for any
            privacy-related enquiries, please contact us at{" "}
            <a
              href="mailto:john@gauyogkendr.com"
              className="text-[#4a703f] hover:underline"
            >
              john@gauyogkendr.com
            </a>
            .
          </PrivacySection>

          <PrivacySection title="Registered Details">
            <p>CIN: U28160GJ2024PTC154513</p>
            <p>
              Registered Office: Village Badalpara, Taluka Veraval, Gir
              Somnath, Gujarat, India – 362268
            </p>
          </PrivacySection>
        </motion.div>
      </div>
    </div>
  );
}
