import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Package,
  ArrowUpRight,
  Clock,
  Home,
  ChevronRight as BreadcrumbSeparator,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const STATUS_COLORS = {
  PENDING:    "bg-yellow-100 text-yellow-600",
  CONFIRMED:  "bg-blue-100 text-blue-600",
  PROCESSING: "bg-purple-100 text-purple-600",
  SHIPPED:    "bg-[#4a703f]/10 text-[#4a703f]",
  DELIVERED:  "bg-slate-100 text-slate-500",
  CANCELLED:  "bg-red-100 text-red-500",
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
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const ENTRIES_OPTIONS = [5, 10, 25];

export default function NexusOrderLedger() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/orders/my")
      .then((res) => setOrders(res.data?.data || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = orders.filter((o) =>
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (STATUS_LABEL[o.status] || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / entries));
  const paginated = filtered.slice((page - 1) * entries, page * entries);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-12 mt-24 text-slate-900">
      <nav className="flex items-center gap-2 mb-8 px-2">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#4a703f] transition-all group"
        >
          <Home size={12} className="group-hover:-translate-y-0.5 transition-transform" />
          Dashboard
        </button>
        <BreadcrumbSeparator size={12} className="text-slate-200" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4a703f]">
          Order History
        </span>
      </nav>

      <header className="mb-12 border-l-4 border-[#4a703f] pl-6">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl md:text-4xl font-[900] tracking-tighter text-[#4a703f] mb-2"
        >
          Order History
        </motion.h1>
        <p className="text-sm md:text-base font-medium text-slate-500 max-w-[600px] leading-relaxed">
          Manage and track your recent purchases. Review transaction details and current shipping status.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
        <div className="flex items-center gap-3 bg-white border border-slate-100 p-2 rounded-full shadow-sm w-full lg:w-auto">
          <div className="flex items-center px-4 py-2.5 bg-slate-50 rounded-full">
            <span className="text-[10px] font-black uppercase text-slate-400 mr-3">Show</span>
            <select
              value={entries}
              onChange={(e) => { setEntries(Number(e.target.value)); setPage(1); }}
              className="bg-transparent text-xs font-black outline-none cursor-pointer text-[#4a703f]"
            >
              {ENTRIES_OPTIONS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <span className="hidden md:block text-[9px] font-black uppercase text-slate-800 tracking-[0.2em] px-2">
            Entries Per Page
          </span>
        </div>

        <div className="relative w-full lg:w-[400px] group">
          <input
            type="text"
            placeholder="Search by Order ID or Status..."
            className="w-full bg-white border border-slate-100 pl-12 pr-4 py-4 rounded-full text-xs font-bold outline-none focus:border-[#4a703f] focus:shadow-lg focus:shadow-[#4a703f]/5 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          />
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#4a703f] transition-colors"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[40px] shadow-2xl shadow-slate-200/40 overflow-hidden">
        <div className="hidden md:grid grid-cols-6 bg-[#4a703f] px-10 py-6">
          {["Order ID", "Tracking ID", "Date", "Total", "Status", "Action"].map((label) => (
            <span key={label} className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
              {label}
            </span>
          ))}
        </div>

        <div className="divide-y divide-slate-50">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Package size={40} className="mb-4 text-slate-200 animate-pulse" />
              <p className="text-xs font-black uppercase tracking-widest">Loading orders…</p>
            </div>
          ) : paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Package size={40} className="mb-4 text-slate-200" />
              <p className="text-xs font-black uppercase tracking-widest mb-4">No orders found</p>
              <button
                onClick={() => navigate("/shop")}
                className="px-8 py-3 bg-[#4a703f] text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#744926] transition-all"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            paginated.map((order) => (
              <motion.div
                key={order.id}
                whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.5)" }}
                className="grid grid-cols-1 md:grid-cols-6 px-8 md:px-10 py-8 md:py-7 items-center transition-all group"
              >
                {/* Order ID */}
                <div className="mb-4 md:mb-0">
                  <p className="text-[9px] font-black text-[#4a703f] uppercase tracking-widest mb-1 md:hidden">Order ID</p>
                  <h4 className="text-sm font-black text-slate-900 uppercase">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </h4>
                </div>

                {/* Tracking ID */}
                <div className="flex justify-between md:block mb-3 md:mb-0">
                  <span className="md:hidden text-[10px] font-bold text-slate-300 uppercase">Tracking ID</span>
                  {order.trackingId ? (
                    <span className="text-xs font-mono font-bold text-[#4a703f] bg-[#4a703f]/5 px-2 py-1 rounded-lg border border-[#4a703f]/10">
                      {order.trackingId}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">—</span>
                  )}
                </div>

                {/* Date */}
                <div className="flex justify-between md:block mb-3 md:mb-0">
                  <span className="md:hidden text-[10px] font-bold text-slate-300 uppercase">Date</span>
                  <span className="text-xs font-bold text-slate-500">{formatDate(order.createdAt)}</span>
                </div>

                {/* Total */}
                <div className="flex justify-between md:block mb-3 md:mb-0">
                  <span className="md:hidden text-[10px] font-bold text-slate-300 uppercase">Total</span>
                  <span className="text-sm font-black text-slate-800">
                    ₹{order.total.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Status */}
                <div className="flex justify-between md:block mb-6 md:mb-0">
                  <span className="md:hidden text-[10px] font-bold text-slate-300 uppercase">Status</span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${STATUS_COLORS[order.status] || "bg-slate-100 text-slate-500"}`}
                  >
                    {order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
                      <Clock size={10} className="animate-pulse" />
                    )}
                    {STATUS_LABEL[order.status] || order.status}
                  </span>
                </div>

                {/* Action */}
                <div className="flex md:block justify-center pt-6 md:pt-0 border-t md:border-none border-slate-50">
                  <button
                    onClick={() => navigate(`/trackorder?id=${order.id}`)}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#1a2e26] md:bg-transparent text-white md:text-[#1a2e26] rounded-full md:rounded-none text-[10px] font-black uppercase tracking-widest hover:text-[#4a703f] transition-all group"
                  >
                    Track Order
                    <ArrowUpRight size={14} className="group-hover:-rotate-12 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <footer className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-6 px-4">
        <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em]">
          Showing {paginated.length} of {filtered.length} records
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-full text-slate-300 hover:text-[#1a2e26] hover:border-[#4a703f] transition-all disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 text-[11px] font-black rounded-full transition-all ${
                  p === page
                    ? "bg-[#1a2e26] text-white shadow-lg shadow-[#1a2e26]/20"
                    : "bg-white text-slate-600 border border-slate-100 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-full text-slate-300 hover:text-[#1a2e26] hover:border-[#4a703f] transition-all disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
}
