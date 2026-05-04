import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home,
  ChevronRight,
  Navigation,
  Phone,
  Mail,
  MapPin,
  Save,
  CheckCircle,
  Loader,
} from "lucide-react";
import api from "../../api/axios";

export default function NexusAddressPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    building: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/delivery")
      .then((res) => {
        const d = res.data?.data;
        if (d) {
          setForm({
            firstName: d.firstName ?? "",
            lastName: d.lastName ?? "",
            phone: d.phone ?? "",
            email: d.email ?? "",
            building: d.building ?? "",
            address: d.address ?? "",
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setSaved(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.put("/delivery", form);
      setSaved(true);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to save. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-12 mt-24 text-slate-900">
      
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

    
      <header className="mb-12 border-l-4 border-[#4a703f] pl-6">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl md:text-4xl font-[900] tracking-wider text-[#4a703f] mb-2"
        >
          Manage Address
        </motion.h1>
        <p className="text-sm md:text-base font-medium text-slate-500 max-w-[600px] leading-relaxed">
          Add or update your delivery details for a smooth checkout experience.
        </p>
      </header>

      <div className="bg-white border border-slate-100 rounded-[40px] shadow-2xl shadow-slate-200/40 overflow-hidden">
       
        <div className="bg-[#4a703f] px-10 py-6">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">
            Delivery Details
          </span>
        </div>

        {loading ? (
          <div className="p-16 flex justify-center items-center">
            <Loader size={24} className="animate-spin text-[#4a703f]" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
            
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                placeholder="Aashna"
                value={form.firstName}
                onChange={handleChange("firstName")}
              />
              <Input
                label="Last Name"
                placeholder="Sagar"
                value={form.lastName}
                onChange={handleChange("lastName")}
              />
            </div>

            
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Phone Number"
                placeholder="+91 00000 00000"
                icon={<Phone size={16} />}
                value={form.phone}
                onChange={handleChange("phone")}
              />
              <Input
                label="Email Address"
                placeholder="example@gmail.com"
                icon={<Mail size={16} />}
                value={form.email}
                onChange={handleChange("email")}
              />
            </div>

          
            <div className="border-t border-slate-100 pt-8 space-y-6">
              <div className="flex items-center gap-2">
                <Navigation size={14} className="text-[#4a703f]" />
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#4a703f]">
                  Address Information
                </h3>
              </div>

              <Input
                label="Building / House / Flat no / Floor"
                placeholder="Flat 202, Tower B"
                value={form.building}
                onChange={handleChange("building")}
              />

              <Input
                label="Address"
                placeholder="Street, Area, Landmark"
                icon={<MapPin size={16} />}
                value={form.address}
                onChange={handleChange("address")}
              />
            </div>

            
            {error && (
              <p className="text-xs font-semibold text-red-500 text-center">
                {error}
              </p>
            )}

            
            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#4a703f] text-white rounded-full text-[11px] font-black uppercase tracking-widerst hover:scale-[1.02] transition shadow-lg shadow-[#1a2e26]/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
            >
              {saving ? (
                <Loader size={16} className="animate-spin" />
              ) : saved ? (
                <CheckCircle size={16} />
              ) : (
                <Save size={16} />
              )}
              {saving ? "Saving…" : saved ? "Saved!" : "Save Address"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}



function Label({ children }) {
  return (
    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 block mb-2">
      {children}
    </label>
  );
}

function Input({ label, placeholder, icon, value, onChange }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative group">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
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
