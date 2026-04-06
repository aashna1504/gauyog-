import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShoppingBasket,
  Truck,
  CreditCard,
  ShieldCheck,
  Smartphone,
  Banknote,
  Lock,
  ChevronRight,
  Clock,
  Wallet,
  CheckCircle2,
  X,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- 1. HELPER / SUB-COMPONENTS ---

const PaymentMethodCard = ({ icon, title, desc, active, onClick }) => (
  <button
    onClick={onClick}
    className={`group flex items-center w-full bg-[#f8fafc] border rounded-[20px] p-3 pr-6 transition-all duration-500 text-left ${
      active
        ? "border-[#4a703f] bg-white shadow-xl shadow-[#4a703f]/5 ring-1 ring-[#4a703f]/10"
        : "border-slate-100 hover:bg-white hover:shadow-lg"
    }`}
  >
    <div
      className={`flex-shrink-0 w-14 h-14 rounded-[18px] border flex items-center justify-center transition-all shadow-sm ${
        active
          ? "bg-[#4a703f] text-white border-[#4a703f]"
          : "bg-white text-slate-400 border-slate-100 group-hover:scale-90"
      }`}
    >
      {icon}
    </div>
    <div className="ml-4 flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span
          className={`w-1.5 h-1.5 rounded-full ${active ? "bg-[#4a703f] animate-pulse" : "bg-slate-200"}`}
        />
        <h5 className="text-[9px] font-black uppercase tracking-widest text-slate-400">
          Option
        </h5>
      </div>
      <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">
        {title}
      </h4>
      <p className="text-[9px] leading-tight text-slate-400 font-bold uppercase mt-1 opacity-70">
        {desc}
      </p>
    </div>
    {active && (
      <div className="bg-[#4a703f] rounded-full p-1">
        <ChevronRight size={12} className="text-white" />
      </div>
    )}
  </button>
);

const SummaryRow = ({ label, value, color = "text-white" }) => (
  <div className="flex justify-between items-center text-[11px] md:text-[12px] font-bold uppercase tracking-widest text-white/70">
    <span>{label}</span>
    <span className={`${color}`}>{value}</span>
  </div>
);

const InputLabel = ({ label, placeholder, icon: Icon }) => (
  <div className="space-y-1.5">
    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group">
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#4a703f] transition-colors">
          <Icon size={14} />
        </div>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className={`w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#4a703f]/20 focus:border-[#4a703f] transition-all ${Icon ? "pl-10" : "px-4"}`}
      />
    </div>
  </div>
);

// --- 2. MAIN PAGE COMPONENT ---

export default function ModernPaymentPage() {
  const [method, setMethod] = useState("card");
  const [showSuccess, setShowSuccess] = useState(false); // SUCCESS MODAL STATE
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
      status: "active",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfd] lg:pt-40 pt-32 pb-20 px-4 md:px-8 selection:bg-[#4a703f] selection:text-white">
      <div className="max-w-[1200px] mx-auto">
        {/* STEP PROGRESS BAR */}
        <div className="flex justify-between items-center mb-12 max-w-3xl mx-auto relative px-2">
          <div className="absolute top-6 left-0 w-full h-[2px] bg-slate-100 -z-10" />
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center gap-3 bg-[#fcfdfd] px-4"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-sm ${
                  step.id === 3
                    ? "bg-[#4a703f] text-white ring-4 ring-[#4a703f]/10"
                    : "bg-white text-[#4a703f] border border-[#4a703f]/20"
                }`}
              >
                {step.icon}
              </div>
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${step.id === 3 ? "text-[#4a703f]" : "text-slate-400"}`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* CONTENT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* PAYMENT DETAILS */}
          <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
            <div className="px-2">
              <h2 className="text-2xl font-[900] text-slate-950 tracking-tighter uppercase ">
                Payment <span className="text-[#4a703f]">Gateway</span>
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Select your preferred ritual of exchange
              </p>
            </div>

            {/* SELECTION GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
              <PaymentMethodCard
                icon={<CreditCard size={22} />}
                title="Card"
                desc="Credit/Debit"
                active={method === "card"}
                onClick={() => setMethod("card")}
              />
              <PaymentMethodCard
                icon={<Smartphone size={22} />}
                title="UPI"
                desc="GPay/PhonePe"
                active={method === "upi"}
                onClick={() => setMethod("upi")}
              />
              <PaymentMethodCard
                icon={<Banknote size={22} />}
                title="COD"
                desc="Pay on delivery"
                active={method === "cod"}
                onClick={() => setMethod("cod")}
              />
            </div>

            {/* PAYMENT FORM CARD */}
            <motion.div
              key={method}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-100 rounded-[35px] p-8 shadow-sm"
            >
              {method === "card" && (
                <div className="space-y-6">
                  <InputLabel
                    label="Cardholder Name"
                    placeholder="Arjun Patel"
                  />
                  <InputLabel
                    label="Card Number"
                    placeholder="0000 0000 0000 0000"
                    icon={CreditCard}
                  />
                  <div className="grid grid-cols-2 gap-6">
                    <InputLabel
                      label="Expiry Date"
                      placeholder="MM / YY"
                      icon={Clock}
                    />
                    <InputLabel label="CVV" placeholder="***" icon={Lock} />
                  </div>
                </div>
              )}

              {method === "upi" && (
                <div className="flex flex-col items-center justify-center py-10 space-y-6 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center border border-slate-100 shadow-inner">
                    <Smartphone className="text-[#4a703f]" size={32} />
                  </div>
                  <div className="max-w-xs">
                    <InputLabel
                      label="Enter UPI ID"
                      placeholder="example@oksbi"
                    />
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-4 leading-relaxed">
                      Enter your VPA and a request will be sent to your UPI app.
                    </p>
                  </div>
                </div>
              )}

              {method === "cod" && (
                <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                  <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center border border-amber-100 shadow-inner">
                    <Wallet className="text-amber-500" size={32} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-900 tracking-widest">
                      Cash on Delivery
                    </h4>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-2 max-w-xs leading-relaxed">
                      Extra handling fee of{" "}
                      <span className="text-[#4a703f]">$1.00</span> may apply
                      for sanctuary logistics.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* TRUST INDICATORS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
              <div className="flex items-center gap-4 bg-white p-5 rounded-[25px] border border-slate-100 group hover:shadow-lg transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h5 className="text-[10px] font-black uppercase text-slate-900">
                    Encrypted Protocol
                  </h5>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                    256-Bit SSL Protection
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white p-5 rounded-[25px] border border-slate-100 group hover:shadow-lg transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-[#4a703f]/10 text-[#4a703f] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h5 className="text-[10px] font-black uppercase text-slate-900">
                    PCI Compliant
                  </h5>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                    Global Safety Standard
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#4a703f] rounded-[30px] md:rounded-[40px] p-8 text-white shadow-2xl lg:sticky lg:top-32"
            >
              <h3 className="text-lg md:text-xl font-black uppercase italic mb-8">
                Order Summary
              </h3>
              <div className="space-y-4 mb-10">
                <SummaryRow label="Items Subtotal" value="$40.00" />
                <SummaryRow
                  label="Shipping"
                  value="FREE"
                  color="text-[#e9aa43]"
                />
                <SummaryRow label="VAT / Tax" value="$0.00" />
                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-white/40 italic text-[9px] uppercase">
                  <Lock size={14} /> Encrypted Transaction
                </div>
              </div>
              <div className="mb-10">
                <p className="text-[11px] font-black text-[#e9aa43] uppercase tracking-widest mb-1">
                  Final Payment
                </p>
                <h4 className="text-4xl font-black">$40.00</h4>
              </div>

              {/* UPDATED BUTTON TO TRIGGER POPUP */}
              <button
                onClick={() => setShowSuccess(true)}
                className="group w-full bg-white hover:bg-[#e9aa43] hover:text-white text-black py-5 rounded-full flex items-center justify-center gap-3 transition-all font-black uppercase text-[10px] md:text-xs"
              >
                Complete Payment{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- SUCCESS POPUP MODAL --- */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccess(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-sm rounded-[40px] p-10 text-center shadow-2xl overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 w-full h-2 bg-[#7bbd25]" />

              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-[#7bbd25]/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={44} className="text-[#7bbd25]" />
                </div>

                <h3 className="text-2xl font-[1000] text-slate-900 tracking-tighter uppercase italic">
                  Order <span className="text-[#7bbd25]">Confirmed</span>
                </h3>

                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3 leading-relaxed">
                  Your ritual request has been received. <br />
                  Sourcing from the sanctuary now.
                </p>

                <div className="w-full h-[1px] bg-slate-50 my-8" />

                <div className="space-y-3 w-full">
                  <button
                    onClick={() => navigate("/")}
                    className="w-full bg-[#4a703f] text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-[#744926] transition-colors shadow-lg"
                  >
                    <Home size={14} /> Back to Home
                  </button>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="text-[9px] font-black uppercase text-slate-600 hover:text-slate-400 tracking-[0.2em] transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>

              {/* Close Icon */}
              <button
                onClick={() => setShowSuccess(false)}
                className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
