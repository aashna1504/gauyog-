import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Package,
  ExternalLink,
  Filter,
  ArrowUpRight,
  Clock,
  Home,
  ChevronRight as BreadcrumbSeparator,
} from "lucide-react";
// import { useNavigate } from "react-router-dom"; // Uncomment this if using React Router

export default function NexusOrderLedger() {
  // const navigate = useNavigate(); // Uncomment this
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState(10);

  const orders = [
    {
      id: "#NX-8821",
      total: "₹2,499.00",
      tax: "₹120.00",
      discount: "₹500.00",
      status: "In Transit",
      date: "Oct 24, 2025",
    },
    {
      id: "#NX-8815",
      total: "₹1,200.00",
      tax: "₹40.00",
      discount: "₹0.00",
      status: "Delivered",
      date: "Sep 12, 2025",
    },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-12 mt-24 text-slate-900">
      {/* --- BREADCRUMB NAVIGATION --- */}
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
        <BreadcrumbSeparator size={12} className="text-slate-200" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4a703f]">
          Order History
        </span>
      </nav>

      {/* 1. PAGE HEADER & DESCRIPTION */}
      <header className="mb-12 border-l-4 border-[#4a703f] pl-6">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl md:text-4xl font-[900] tracking-tighter text-[#4a703f] mb-2"
        >
          Order History
        </motion.h1>
        <p className="text-sm md:text-base font-medium text-slate-500 max-w-[600px] leading-relaxed">
          Manage and track your recent purchases. Review transaction details,
          tax breakdowns, and current shipping status.
        </p>
      </header>

      {/* 2. SMART TOOLBAR */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
        <div className="flex items-center gap-3 bg-white border border-slate-100 p-2 rounded-full shadow-sm w-full lg:w-auto">
          <div className="flex items-center px-4 py-2.5 bg-slate-50 rounded-full">
            <span className="text-[10px] font-black uppercase text-slate-400 mr-3">
              Show
            </span>
            <select
              value={entries}
              onChange={(e) => setEntries(e.target.value)}
              className="bg-transparent text-xs font-black outline-none cursor-pointer text-[#4a703f]"
            >
              {[10, 25, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#4a703f] transition-colors"
          />
        </div>
      </div>

      {/* 3. THE LIST CONTAINER */}
      <div className="bg-white border border-slate-100 rounded-[40px] shadow-2xl shadow-slate-200/40 overflow-hidden">
        {/* TABLE HEAD (Desktop Only) */}
        <div className="hidden md:grid grid-cols-6 bg-[#4a703f] px-10 py-6">
          {["Order ID", "Total", "Tax", "Discount", "Status", "Action"].map(
            (label) => (
              <span
                key={label}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40"
              >
                {label}
              </span>
            ),
          )}
        </div>

        {/* ORDER ROWS / CARDS */}
        <div className="divide-y divide-slate-50">
          {orders.map((order, index) => (
            <motion.div
              key={index}
              whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.5)" }}
              className="grid grid-cols-1 md:grid-cols-6 px-8 md:px-10 py-8 md:py-7 items-center transition-all group"
            >
              <div className="mb-4 md:mb-0">
                <p className="text-[9px] font-black text-[#7bbd25] uppercase tracking-widest mb-1 md:hidden">
                  Order ID
                </p>
                <h4 className="text-sm font-black text-slate-900">
                  {order.id}
                </h4>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">
                  {order.date}
                </p>
              </div>

              <div className="flex justify-between md:block mb-3 md:mb-0">
                <span className="md:hidden text-[10px] font-bold text-slate-300 uppercase">
                  Total
                </span>
                <span className="text-sm font-black text-slate-800">
                  {order.total}
                </span>
              </div>

              <div className="flex justify-between md:block mb-3 md:mb-0">
                <span className="md:hidden text-[10px] font-bold text-slate-300 uppercase">
                  Tax Fees
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {order.tax}
                </span>
              </div>

              <div className="flex justify-between md:block mb-3 md:mb-0">
                <span className="md:hidden text-[10px] font-bold text-slate-300 uppercase">
                  Discount
                </span>
                <span className="text-xs font-black text-[#7bbd25]">
                  {order.discount}
                </span>
              </div>

              <div className="flex justify-between md:block mb-6 md:mb-0">
                <span className="md:hidden text-[10px] font-bold text-slate-300 uppercase">
                  Status
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    order.status === "Delivered"
                      ? "bg-slate-100 text-slate-500"
                      : "bg-[#7bbd25]/10 text-[#7bbd25]"
                  }`}
                >
                  {order.status !== "Delivered" && (
                    <Clock size={10} className="animate-pulse" />
                  )}
                  {order.status}
                </span>
              </div>

              <div className="flex md:block justify-center pt-6 md:pt-0 border-t md:border-none border-slate-50">
                <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#1a2e26] md:bg-transparent text-white md:text-[#1a2e26] rounded-full md:rounded-none text-[10px] font-black uppercase tracking-widest hover:text-[#4a703f] transition-all group">
                  View Details
                  <ArrowUpRight
                    size={14}
                    className="group-hover:-rotate-12 transition-transform"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. FOOTER PAGINATION */}
      <footer className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-6 px-4">
        <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em]">
          Showing 1 to {orders.length} of {orders.length} records
        </p>

        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-full text-slate-300 hover:text-[#1a2e26] hover:border-[#4a703f] transition-all">
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-1.5">
            <button className="w-10 h-10 bg-[#1a2e26] text-white text-[11px] font-black rounded-full shadow-lg shadow-[#1a2e26]/20">
              1
            </button>
            <button className="w-10 h-10 bg-white text-slate-600 text-[11px] font-black rounded-full border border-slate-100 hover:bg-slate-50">
              2
            </button>
          </div>
          <button className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-full text-slate-300 hover:text-[#1a2e26] hover:border-[#4a703f] transition-all">
            <ChevronRight size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
}
