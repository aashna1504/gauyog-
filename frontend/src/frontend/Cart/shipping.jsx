import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  ArrowRight,
  ShoppingBasket,
  Truck,
  CreditCard,
  Globe,
  PackageCheck,
  X,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import useCartStore from "../../store/cartStore";
import toast from "react-hot-toast";

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

export default function ModernShippingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    building: "",
  });
  const navigate = useNavigate();
  const { cartItems, fetchCart } = useCartStore();

  const subtotal = cartItems.reduce((acc, item) => acc + item.rawPrice * item.qty, 0);

  useEffect(() => {
    fetchCart();
    // Load saved delivery details
    api.get("/delivery").then((res) => {
      const d = res.data?.data;
      if (d) {
        setSavedAddress(d);
        setForm({
          firstName: d.firstName || "",
          lastName: d.lastName || "",
          phone: d.phone || "",
          email: d.email || "",
          address: d.address || "",
          building: d.building || "",
        });
      }
    }).catch(() => {});
  }, [fetchCart]);

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put("/delivery", form);
      setSavedAddress(res.data?.data);
      setIsModalOpen(false);
      toast.success("Address saved!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save address");
    } finally {
      setSaving(false);
    }
  };

  const steps = [
    { id: 1, label: "Basket", icon: <ShoppingBasket size={18} />, status: "active" },
    { id: 2, label: "Shipping", icon: <Truck size={18} />, status: "active" },
    { id: 3, label: "Payment", icon: <CreditCard size={18} />, status: "upcoming" },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfd] lg:pt-40 pt-32 pb-10 md:pb-20 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-10 md:mb-12 max-w-3xl mx-auto relative px-2">
          <div className="absolute top-[22px] md:top-6 left-0 w-full h-[1px] md:h-[2px] bg-slate-100 -z-10" />
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center gap-2 md:gap-3 bg-[#fcfdfd] px-2 md:px-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2 space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
              <h2 className="text-xl md:text-2xl font-[900] text-slate-950 tracking-tighter uppercase">
                Shipping <span className="text-[#4a703f]">Information</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-[#4a703f] px-4 py-3 md:py-2.5 rounded-2xl transition-all shadow-sm group w-full sm:w-auto"
              >
                <Plus size={16} className="text-[#4a703f] group-hover:rotate-90 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                  {savedAddress ? "Edit Address" : "Add New Address"}
                </span>
              </button>
            </div>

            {/* Saved address display */}
            {savedAddress && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-2 border-[#4a703f] rounded-[25px] p-5 md:p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#4a703f] text-white p-2 rounded-xl">
                    <Truck size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Deliver To</p>
                    <h4 className="text-sm font-black text-slate-900">
                      {savedAddress.firstName} {savedAddress.lastName}
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-medium ml-1">
                  {[savedAddress.building, savedAddress.address].filter(Boolean).join(", ")}
                </p>
                {savedAddress.phone && (
                  <p className="text-xs text-slate-400 mt-1 ml-1">{savedAddress.phone}</p>
                )}
              </motion.div>
            )}

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
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Shipping Option</p>
                      <h4 className="text-sm font-black text-slate-900">Standard Free</h4>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-[#4a703f]/10 text-slate-900">
                    <span className="text-[9px] font-bold text-slate-500 uppercase">Est. Delivery</span>
                    <span className="text-[11px] font-black italic">5–7 Business Days</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-[20px] md:rounded-[25px] p-5 md:p-6 flex flex-col justify-center gap-3 border border-slate-100">
                  <div className="flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Shipping Cost</span>
                    <span className="text-[#4a703f] text-sm">₹0.00</span>
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Handling Fees</span>
                    <span className="text-slate-900 text-sm">₹0.00</span>
                  </div>
                </div>
              </div>
            </motion.div>

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

          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#4a703f] rounded-[30px] md:rounded-[40px] p-6 md:p-8 text-white shadow-2xl lg:sticky lg:top-32"
            >
              <h3 className="text-lg md:text-xl font-black uppercase italic mb-6 md:mb-8">Order Summary</h3>
              <div className="space-y-4 mb-8 md:mb-10">
                <SummaryRow label="Items Subtotal" value={`₹${subtotal.toLocaleString("en-IN")}`} />
                <SummaryRow label="Shipping" value="FREE" color="text-[#e9aa43]" />
                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-white/40 italic text-[8px] md:text-[9px] uppercase">
                  <ShieldCheck size={14} /> Secure Your Shipping
                </div>
              </div>
              <div className="mb-8 md:mb-10">
                <p className="text-[10px] md:text-[11px] font-black text-[#e9aa43] uppercase tracking-widest mb-1">Total Payable</p>
                <h4 className="text-3xl md:text-4xl font-black">₹{subtotal.toLocaleString("en-IN")}</h4>
              </div>
              <button
                onClick={() => {
                  if (!savedAddress) {
                    toast.error("Please add a delivery address first");
                    setIsModalOpen(true);
                    return;
                  }
                  navigate("/payment");
                }}
                disabled={cartItems.length === 0}
                className="group w-full bg-white hover:bg-[#e9aa43] hover:text-white text-black py-4 md:py-5 rounded-full flex items-center justify-center gap-3 transition-all font-black uppercase text-[10px] md:text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm & Pay{" "}
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
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
                  {savedAddress ? "Edit" : "Add New"} <span className="text-[#4a703f]">Address</span>
                </h3>
                <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                  Enter your delivery details
                </p>
              </div>
              <form className="space-y-4" onSubmit={handleSaveAddress}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                    <input
                      type="text"
                      placeholder="Arjun"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 md:py-3.5 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#4a703f]/20 focus:border-[#4a703f] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                    <input
                      type="text"
                      placeholder="Patel"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 md:py-3.5 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#4a703f]/20 focus:border-[#4a703f] transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 00000 00000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 md:py-3.5 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#4a703f]/20 focus:border-[#4a703f] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 md:py-3.5 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#4a703f]/20 focus:border-[#4a703f] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Building / Flat</label>
                  <input
                    type="text"
                    placeholder="Flat 4B, Shanti Apartments"
                    value={form.building}
                    onChange={(e) => setForm({ ...form, building: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 md:py-3.5 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#4a703f]/20 focus:border-[#4a703f] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Street Address</label>
                  <input
                    type="text"
                    placeholder="123 Sanctuary Lane, Gujarat 380001"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 md:py-3.5 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#4a703f]/20 focus:border-[#4a703f] transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[#4a703f] text-white py-4 md:py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#3d5c34] disabled:opacity-60 transition-all shadow-lg shadow-[#4a703f]/20 mt-4"
                >
                  {saving ? "Saving..." : "Save Address & Continue"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
