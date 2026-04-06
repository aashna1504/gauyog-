import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  ChevronRight,
  Navigation,
  Phone,
  Mail,
  MapPin,
  Save,
} from "lucide-react";

export default function NexusAddressPage() {
  const [tag, setTag] = useState("Home");

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-12 mt-24 text-slate-900">
      {/* --- SAME BREADCRUMB --- */}
      <nav className="flex items-center gap-2 mb-8 px-2">
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#4a703f] transition-all group"
        >
          <Home
            size={12}
            className="group-hover:-translate-y-0.5 transition-transform"
          />
          Dashboard
        </button>
        <ChevronRight size={12} className="text-slate-200" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4a703f]">
          Address Settings
        </span>
      </nav>

      {/* --- SAME HEADER --- */}
      <header className="mb-12 border-l-4 border-[#4a703f] pl-6">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl md:text-4xl font-[900] tracking-tighter text-[#4a703f] mb-2"
        >
          Manage Address
        </motion.h1>
        <p className="text-sm md:text-base font-medium text-slate-500 max-w-[600px] leading-relaxed">
          Add or update your delivery details for a smooth checkout experience.
        </p>
      </header>

      {/* --- SAME CARD CONTAINER (REPLACED TABLE WITH FORM) --- */}
      <div className="bg-white border border-slate-100 rounded-[40px] shadow-2xl shadow-slate-200/40 overflow-hidden">
        {/* OPTIONAL TOP BAR (MATCHING TABLE HEADER STYLE) */}
        <div className="bg-[#4a703f] px-10 py-6">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">
            Delivery Details
          </span>
        </div>

        {/* FORM */}
        <div className="p-8 md:p-10 space-y-8">
          {/* NAME */}
          <div className="grid md:grid-cols-2 gap-6">
            <Input label="First Name" placeholder="Aashna" />
            <Input label="Last Name" placeholder="Sagar" />
          </div>

          {/* CONTACT */}
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Phone Number"
              placeholder="+91 00000 00000"
              icon={<Phone size={16} />}
            />
            <Input
              label="Email Address"
              placeholder="example@gmail.com"
              icon={<Mail size={16} />}
            />
          </div>

          {/* ADDRESS SECTION */}
          <div className="border-t border-slate-100 pt-8 space-y-6">
            <div className="flex items-center gap-2">
              <Navigation size={14} className="text-[#7bbd25]" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#4a703f]">
                Address Information
              </h3>
            </div>

            <Input
              label="Building / House / Flat no / Floor"
              placeholder="Flat 202, Tower B"
            />

            <Input
              label="Address"
              placeholder="Street, Area, Landmark"
              icon={<MapPin size={16} />}
            />
          </div>

          {/* BUTTON */}
          <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#4a703f] text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:scale-[1.02] transition shadow-lg shadow-[#1a2e26]/20">
            <Save size={16} />
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function Label({ children }) {
  return (
    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 block mb-2">
      {children}
    </label>
  );
}

function Input({ label, placeholder, icon }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative group">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-white border border-slate-100 pl-4 pr-10 py-4 rounded-full text-xs font-bold outline-none focus:border-[#4a703f] focus:shadow-lg focus:shadow-[#4a703f]/5 transition-all"
        />
        {icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#4a703f]">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
