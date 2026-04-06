import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  ArrowRight,
  ShoppingBasket,
  Truck,
  CreditCard,
  CheckCircle2,
  Globe,
  PackageCheck,
  Clock,
  X,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- 1. HELPER / SUB-COMPONENTS ---
// Defining these first ensures they are ready for the main page to use.

const LogisticsLabel = ({ icon, color, title, desc }) => {
  const colorMap = {
    blue: "text-blue-500 bg-blue-500",
    amber: "text-[#e9aa43] bg-[#e9aa43]",
  };

  return (
    <div className="group flex items-center bg-[#f8fafc] border border-slate-100 rounded-[20px] p-2 pr-4 md:pr-6 hover:bg-white hover:shadow-xl transition-all duration-500">
      <div
        className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-white rounded-[18px] border border-slate-100 flex items-center justify-center ${colorMap[color].split(" ")[0]} group-hover:scale-90 transition-transform shadow-sm`}
      >
        {icon}
      </div>
      <div className="ml-4 md:ml-5 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`w-1.5 h-1.5 rounded-full animate-pulse ${colorMap[color].split(" ")[1]}`}
          />
          <h5 className="text-[9px] font-black uppercase tracking-widest text-slate-400">
            Details
          </h5>
        </div>
        <h4 className="text-[11px] md:text-xs font-black text-slate-900 uppercase tracking-tight">
          {title}
        </h4>
        <p className="text-[9px] leading-tight text-slate-400 font-bold uppercase mt-1 opacity-70">
          {desc}
        </p>
      </div>
    </div>
  );
};

const SummaryRow = ({ label, value, color = "text-white" }) => (
  <div className="flex justify-between items-center text-[11px] md:text-[12px] font-bold uppercase tracking-widest text-white/70">
    <span>{label}</span>
    <span className={`${color}`}>{value}</span>
  </div>
);

const InputLabel = ({ label, placeholder }) => (
  <div className="space-y-1.5">
    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 md:py-3.5 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#4a703f]/20 focus:border-[#4a703f] transition-all"
    />
  </div>
);

// --- 2. MAIN PAGE COMPONENT ---

export default function ModernShippingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      label: "Basket",
      icon: <ShoppingBasket size={18} />,
      status: "active",
    },
    { id: 2, label: "Shipping", icon: <Truck size={18} />, status: "active" },
    {
      id: 3,
      label: "Payment",
      icon: <CreditCard size={18} />,
      status: "upcoming",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfd] lg:pt-40 pt-32 pb-10 md:pb-20 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* STEP PROGRESS BAR */}
        <div className="flex justify-between items-center mb-10 md:mb-12 max-w-3xl mx-auto relative px-2">
          <div className="absolute top-[22px] md:top-6 left-0 w-full h-[1px] md:h-[2px] bg-slate-100 -z-10" />
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center gap-2 md:gap-3 bg-[#fcfdfd] px-2 md:px-4"
            >
              <div
                className={`w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all shadow-sm ${
                  step.status === "active"
                    ? "bg-[#4a703f] text-white ring-4 ring-[#4a703f]/10"
                    : "bg-white text-slate-300 border border-slate-100"
                }`}
              >
                {step.icon}
              </div>
              <span
                className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${
                  step.status === "active" ? "text-[#4a703f]" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* CONTENT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* SHIPPING DETAILS */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
              <h2 className="text-xl md:text-2xl font-[900] text-slate-950 tracking-tighter uppercase ">
                Shipping <span className="text-[#4a703f]">Information</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-[#4a703f] px-4 py-3 md:py-2.5 rounded-2xl transition-all shadow-sm group w-full sm:w-auto"
              >
                <Plus
                  size={16}
                  className="text-[#4a703f] group-hover:rotate-90 transition-transform"
                />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                  Add New Address
                </span>
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-100 rounded-[30px] md:rounded-[35px] p-5 md:p-8 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="border-2 border-[#4a703f] rounded-[20px] md:rounded-[25px] p-4 md:p-5 bg-[#4a703f]/5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-[#4a703f] text-white p-2 rounded-xl">
                      <Truck size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        Shipping Option
                      </p>
                      <h4 className="text-sm font-black text-slate-900">
                        Standard Free
                      </h4>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-[#4a703f]/10 text-slate-900">
                    <span className="text-[9px] font-bold text-slate-500 uppercase">
                      Est. Delivery
                    </span>
                    <span className="text-[11px] font-black italic">
                      28 Jul, Monday
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-[20px] md:rounded-[25px] p-5 md:p-6 flex flex-col justify-center gap-3 border border-slate-100">
                  <div className="flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Shipping Cost</span>
                    <span className="text-[#4a703f] text-sm">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Handling Fees</span>
                    <span className="text-slate-900 text-sm">$0.00</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tactile Labels Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <LogisticsLabel
                icon={<Globe size={24} strokeWidth={1.5} />}
                color="blue"
                title="Global Reach"
                desc="Worldwide delivery via Sanctuary partners."
              />
              <LogisticsLabel
                icon={<PackageCheck size={24} strokeWidth={1.5} />}
                color="amber"
                title="Ritual Handling"
                desc="Bio-sealed for maximum freshness."
              />
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#4a703f] rounded-[30px] md:rounded-[40px] p-6 md:p-8 text-white shadow-2xl lg:sticky lg:top-32"
            >
              <h3 className="text-lg md:text-xl font-black uppercase italic mb-6 md:mb-8">
                Order Summary
              </h3>
              <div className="space-y-4 mb-8 md:mb-10">
                <SummaryRow label="Items Subtotal" value="$40.00" />
                <SummaryRow
                  label="Shipping"
                  value="FREE"
                  color="text-[#e9aa43]"
                />
                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-white/40 italic text-[8px] md:text-[9px] uppercase">
                  <ShieldCheck size={14} /> Secure Your Shipping
                </div>
              </div>
              <div className="mb-8 md:mb-10">
                <p className="text-[10px] md:text-[11px] font-black text-[#e9aa43] uppercase tracking-widest mb-1">
                  Total Payable
                </p>
                <h4 className="text-3xl md:text-4xl font-black">$40.00</h4>
              </div>
              <button
                onClick={() => navigate("/payment")}
                className="group w-full bg-white hover:bg-[#e9aa43] hover:text-white text-black py-4 md:py-5 rounded-full flex items-center justify-center gap-3 transition-all font-black uppercase text-[10px] md:text-xs"
              >
                Confirm & Pay{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ADDRESS MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-t-[30px] sm:rounded-[40px] shadow-2xl relative overflow-hidden p-6 md:p-10 z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400"
              >
                <X size={20} />
              </button>
              <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-[1000] text-slate-900 uppercase italic tracking-tighter">
                  Add New <span className="text-[#4a703f]">Address</span>
                </h3>
                <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                  Enter your delivery details
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputLabel label="Full Name" placeholder="John Doe" />
                  <InputLabel
                    label="Phone Number"
                    placeholder="+91 00000 00000"
                  />
                </div>
                <InputLabel
                  label="Street Address"
                  placeholder="123 Sanctuary Lane..."
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputLabel label="City" placeholder="Gujarat" />
                  <InputLabel label="Postal Code" placeholder="380001" />
                </div>
                <button className="w-full bg-[#4a703f] text-white py-4 md:py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#3d5c34] transition-all shadow-lg shadow-[#4a703f]/20 mt-4">
                  Save Address & Continue
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
