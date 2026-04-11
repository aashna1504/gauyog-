import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import {
  Package,
  Truck,
  MapPin,
  Search,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import api from "../../api/axios";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const STATUS_STEPS = ["CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"];

const STATUS_COLORS = {
  PENDING:    "text-yellow-500",
  CONFIRMED:  "text-blue-500",
  PROCESSING: "text-purple-500",
  SHIPPED:    "text-[#4a703f]",
  DELIVERED:  "text-[#4a703f]",
  CANCELLED:  "text-red-500",
};

const STATUS_LABEL = {
  PENDING:    "Pending",
  CONFIRMED:  "Confirmed",
  PROCESSING: "Processing",
  SHIPPED:    "Shipped",
  DELIVERED:  "Delivered",
  CANCELLED:  "Cancelled",
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export default function TrackOrderPage() {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get("id") || "");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-fetch if ID comes from URL
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setOrderId(id);
      fetchOrder(id);
    }
  }, []);

  const fetchOrder = async (id) => {
    if (!id.trim()) return;
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const res = await api.get(`/orders/my/${id.trim()}`);
      setOrder(res.data?.data);
    } catch (err) {
      setError(err.response?.data?.message || "Order not found. Please check the ID.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => fetchOrder(orderId);

  const currentStepIndex = order ? STATUS_STEPS.indexOf(order.status) : -1;

  return (
    <div className="min-h-screen bg-[#fcfdfd] selection:bg-[#4a703f] selection:text-white">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative w-full py-20 md:py-28 overflow-hidden border-b border-gray-50 mt-16"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fbf6] to-white" />
        <div
          className="absolute top-1/2 -right-1/4 -translate-y-1/2 w-[60%] h-[150%] opacity-20 blur-[120px] rounded-full pointer-events-none animate-pulse"
          style={{ background: "radial-gradient(circle at right, #4a703f 0%, transparent 70%)", zIndex: -20 }}
        />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-[1px] bg-slate-200" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#4a703f]">Logistics Portal</span>
            <div className="w-10 h-[1px] bg-slate-200" />
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter"
            style={{ fontFamily: "'Baskerville Old Face', 'Libre Baskerville', serif" }}
          >
            Track <br />
            <span className="text-[#4a703f] italic font-medium">Your Order.</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-8 text-gray-400 max-w-sm mx-auto text-[11px] font-bold uppercase tracking-widest leading-loose"
          >
            Real-time updates from us to your doorstep.
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100"
        >
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">
                Enter Order ID
              </label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#4a703f] transition-colors">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Paste your order ID..."
                  className="w-full bg-slate-50 border-none rounded-full py-6 pl-16 pr-6 text-lg font-bold text-slate-900 focus:ring-2 focus:ring-[#4a703f] transition-all placeholder:text-slate-200"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            </div>

            <button
              onClick={handleSearch}
              disabled={loading || !orderId.trim()}
              className="w-full bg-[#4a703f] hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed text-white py-6 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all duration-500 group shadow-xl shadow-[#4a703f]/20"
            >
              {loading ? "Searching..." : "Locate Package"}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />}
            </button>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#4a703f]" />
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">Verified Delivery</span>
              </div>
              <Link to="/contact" className="text-[9px] font-black uppercase text-slate-400 tracking-tighter hover:text-[#4a703f] transition-colors">
                Need Help?
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto mt-6 flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-6 py-4"
            >
              <XCircle size={18} className="text-red-400 shrink-0" />
              <p className="text-xs font-bold text-red-500 uppercase tracking-wider">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Order Result */}
        <AnimatePresence>
          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto mt-8 bg-white rounded-[40px] p-8 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Order</p>
                  <h3 className="text-xl font-black text-slate-900">#{order.id.slice(0, 8).toUpperCase()}</h3>
                  <p className="text-xs text-slate-400 mt-1">{formatDate(order.createdAt)}</p>
                </div>
                <span className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full bg-slate-50 ${STATUS_COLORS[order.status]}`}>
                  {STATUS_LABEL[order.status]}
                </span>
              </div>

              {/* Progress Tracker */}
              {order.status !== "CANCELLED" && (
                <div className="mb-8">
                  <div className="flex items-center justify-between relative">
                    <div className="absolute top-5 left-0 w-full h-[2px] bg-slate-100 -z-10" />
                    {STATUS_STEPS.map((step, i) => {
                      const done = currentStepIndex >= i;
                      return (
                        <div key={step} className="flex flex-col items-center gap-2 bg-white px-2">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${done ? "bg-[#4a703f] text-white" : "bg-slate-100 text-slate-300"}`}>
                            {done ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                          </div>
                          <span className={`text-[8px] font-black uppercase tracking-widest ${done ? "text-[#4a703f]" : "text-slate-300"}`}>
                            {STATUS_LABEL[step]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {order.status === "CANCELLED" && (
                <div className="flex items-center gap-3 bg-red-50 rounded-2xl px-5 py-4 mb-8">
                  <XCircle size={18} className="text-red-400" />
                  <p className="text-xs font-black text-red-500 uppercase tracking-wider">This order has been cancelled.</p>
                </div>
              )}

              {/* Delivery Address */}
              {(order.firstName || order.address) && (
                <div className="bg-slate-50 rounded-[20px] p-5 mb-6">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Delivery Address</p>
                  <p className="text-sm font-black text-slate-900">{order.firstName} {order.lastName}</p>
                  <p className="text-xs text-slate-500 mt-1">{[order.building, order.address].filter(Boolean).join(", ")}</p>
                  {order.phone && <p className="text-xs text-slate-400 mt-1">{order.phone}</p>}
                </div>
              )}

              {/* Items */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4">Items Ordered</p>
                <div className="space-y-3">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-slate-50 rounded-[16px] p-3">
                      {item.product?.imageUrl && (
                        <img
                          src={item.product.imageUrl}
                          alt={item.name}
                          className="w-12 h-12 object-contain rounded-xl bg-[#f3f8ee] p-1"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-xs font-black text-slate-900">{item.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-black text-slate-800">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Total Paid</span>
                <span className="text-xl font-black text-slate-900">₹{order.total.toLocaleString("en-IN")}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 mb-32">
          <FeatureBlock icon={Package} title="Sourced" desc="Items carefully packed at our Gujarat sanctuary." />
          <FeatureBlock icon={Truck} title="Transit" desc="Express logistics for fresh organic delivery." />
          <FeatureBlock icon={MapPin} title="Arrival" desc="Traceable journey until it reaches your hands." />
        </div>
      </div>
    </div>
  );
}

function FeatureBlock({ icon: Icon, title, desc }) {
  return (
    <div className="text-center space-y-4 px-6 group">
      <div className="w-16 h-16 bg-white border border-slate-100 rounded-3xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-[#4a703f] transition-all duration-500 group-hover:-translate-y-2">
        <Icon size={24} className="text-[#4a703f] group-hover:text-white transition-colors" />
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 italic">{title}</h4>
        <p className="text-xs text-slate-400 font-medium leading-relaxed uppercase tracking-tighter">{desc}</p>
      </div>
    </div>
  );
}
