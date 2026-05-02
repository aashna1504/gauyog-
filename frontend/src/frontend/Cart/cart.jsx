import { useEffect } from "react";
import { motion } from "framer-motion";
import ProductImage from "../../Components/ProductImage";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBasket,
  Truck,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/cartStore";

export default function ModernCartPage() {
  const navigate = useNavigate();
  const { cartItems, cartCount, fetchCart, updateItem, removeItem } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);

  const steps = [
    { id: 1, label: "Basket", icon: <ShoppingBasket size={18} />, status: "active" },
    { id: 2, label: "Shipping", icon: <Truck size={18} />, status: "upcoming" },
    { id: 3, label: "Payment", icon: <CreditCard size={18} />, status: "upcoming" },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.rawPrice * item.qty, 0);

  return (
    <div className="min-h-screen bg-[#fcfdfd] lg:pt-40 pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Steps */}
        <div className="flex justify-between items-center mb-8 md:mb-12 max-w-3xl mx-auto relative px-2 md:px-0">
          <div className="absolute top-[20px] md:top-6 left-0 w-full h-[2px] bg-slate-100 -z-10" />
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center gap-2 md:gap-3 bg-[#fcfdfd] px-2 md:px-4">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all shadow-sm ${
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

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 items-start">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="order-1 lg:order-2 w-full bg-[#744926] rounded-[30px] md:rounded-[40px] p-6 md:p-8 text-white shadow-2xl shadow-[#744926]/20 lg:sticky lg:top-32"
          >
            <h3 className="text-lg md:text-xl font-black uppercase italic tracking-tight mb-6 md:mb-8 text-white">
              Order Summary
            </h3>
            <div className="space-y-4 mb-8">
              <SummaryRow label="Subtotal" value={`₹${subtotal.toLocaleString("en-IN")}`} />
              <SummaryRow label="Shipping" value="FREE" valueClass="text-[#e9aa43]" />
              <div className="pt-4 border-t border-white/10 text-[8px] md:text-[9px] text-white/30 uppercase italic font-medium">
                * Tax calculated at checkout
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[10px] md:text-[11px] font-black text-[#e9aa43] uppercase tracking-[0.2em] mb-1">
                Total Payable
              </p>
              <h4 className="text-3xl md:text-4xl font-black tracking-tighter">
                ₹{subtotal.toLocaleString("en-IN")}
              </h4>
            </div>

            <button
              onClick={() => navigate("/shipping")}
              disabled={cartItems.length === 0}
              className="group w-full bg-white hover:bg-[#e9aa43] text-black hover:text-white py-4 md:py-5 rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-[10px] md:text-xs font-[900] uppercase tracking-widest">
                Proceed to Shipping
              </span>
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>

          {/* Cart Items */}
          <div className="order-2 lg:order-1 lg:col-span-2 w-full space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl md:text-2xl font-[900] text-slate-950 tracking-tighter uppercase">
                Your <span className="text-[#4a703f]">Cart</span>
              </h2>
              <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase">
                {cartCount} {cartCount === 1 ? "Item" : "Items"}
              </span>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-24">
                <ShoppingBasket size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                  Your cart is empty
                </p>
                <button
                  onClick={() => navigate("/shop")}
                  className="mt-6 px-8 py-3 bg-[#4a703f] text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#744926] transition-all"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white border border-slate-100 rounded-[25px] md:rounded-[35px] p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8">
                    <div className="w-full sm:w-32 h-40 sm:h-32 bg-white border border-gray-100 rounded-[20px] md:rounded-[24px] flex items-center justify-center overflow-hidden group">
                      <ProductImage
                        src={item.img}
                        alt={item.name}
                        className="w-3/4 sm:w-full h-auto sm:h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left w-full">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between sm:justify-start gap-6 mt-4">
                        <div className="flex items-center bg-slate-50 rounded-full p-1 border border-slate-100">
                          <button
                            onClick={() => {
                              if (item.qty <= 1) removeItem(item.id);
                              else updateItem(item.id, item.qty - 1);
                            }}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-all text-slate-500"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-black text-slate-900">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateItem(item.id, item.qty + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-all text-slate-500"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <div className="text-[11px] md:text-xs font-black text-[#e9aa43] tracking-tighter">
                          {item.price} / unit
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-50">
                      <div className="text-left sm:text-right">
                        <p className="text-[9px] font-black text-slate-400 uppercase mb-0.5">Total</p>
                        <p className="text-lg font-black text-slate-900 tracking-tighter">
                          ₹{(item.rawPrice * item.qty).toLocaleString("en-IN")}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2.5 text-slate-300 hover:text-[#744926] hover:bg-[#744926]/10 rounded-full transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, valueClass = "text-white" }) {
  return (
    <div className="flex justify-between items-center text-[11px] md:text-[12px] font-bold uppercase tracking-widest text-white/70">
      <span>{label}</span>
      <span className={`text-xs md:text-sm font-black ${valueClass}`}>{value}</span>
    </div>
  );
}
