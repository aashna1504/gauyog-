import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "../../store/authStore";
import useCartStore from "../../store/cartStore";
import toast from "react-hot-toast";
import {
  User,
  Package,
  LogOut,
  LayoutDashboard,
  Phone,
  Mail,
  Clock,
  UserCircle2,
  Heart,
  AlertCircle,
  X,
  ShoppingCart,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function FloatingNexusDashboard() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuthStore();
  const { cartCount, cartItems, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const navItems = [
    {
      id: "home",
      icon: <LayoutDashboard size={18} />,
      label: "Home",
      path: "/dashboard",
    },
    {
      id: "orders",
      icon: <Package size={18} />,
      label: "Orders",
      path: "/orders",
    },
    {
      id: "favorites",
      icon: <Heart size={18} />,
      label: "Favorites",
      path: "/favorites",
    },
  ];

  const handleLogout = () => {
    logout();
    toast.success("Logged out securely!");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] flex items-center justify-center p-4 md:p-8 relative overflow-hidden mt-24">
     
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/10 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="bg-white border border-slate-100 shadow-2xl rounded-[24px] p-5 max-w-[280px] w-full text-center relative"
            >
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>

              <div className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertCircle size={20} />
              </div>

              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1">
                Confirm Logout?
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                Are you sure you want to exit?
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2 text-[9px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2 text-[9px] font-black uppercase tracking-widest text-white bg-red-500 rounded-xl shadow-lg shadow-red-200 hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="absolute min-h-screen w-full bg-[#fcfdfd] overflow-hidden rounded-t-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-[-5%] right-[-5%] w-[450px] md:w-[600px] h-[450px] md:h-[600px] bg-[#4a703f]/20 blur-[60px] rounded-full z-0"
        />
      </div>

      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-[1200px] h-[85vh] bg-white/40 backdrop-blur-xl border border-white rounded-[40px] shadow-2xl shadow-slate-200/50 flex flex-col md:flex-row overflow-hidden z-10"
      >
    
        <aside className="hidden md:flex w-24 lg:w-64 bg-[#4a703f] h-full p-8 flex-col items-center lg:items-stretch gap-10">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl self-center">
            <UserCircle2
              className="text-[#4a703f]"
              size={24}
              strokeWidth={2.5}
            />
          </div>

          <nav className="flex flex-col gap-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center gap-4 px-5 py-4 rounded-full transition-all duration-300 group ${
                    isActive
                      ? "bg-white text-[#4a703f] shadow-lg"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span
                    className={`${isActive ? "text-[#4a703f]" : "text-white/50 group-hover:text-white"}`}
                  >
                    {item.icon}
                  </span>
                  <span className="hidden lg:block text-[11px] font-[900] uppercase tracking-[0.15em]">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

      
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="mt-auto flex items-center gap-3 text-white/60 hover:text-red-400 transition-colors px-5 font-bold text-xs uppercase tracking-widest"
          >
            <LogOut size={20} /> <span className="hidden lg:block">Logout</span>
          </button>
        </aside>

        <main className="flex-1 p-6 md:p-12 overflow-y-auto bg-white/60 pb-32 md:pb-12">
          <header className="mb-5 flex justify-between items-end px-2">
            <h1 className="text-3xl font-[900] text-slate-950 tracking-tighter">
              User Dashboard
            </h1>
          </header>

          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mb-8">
            <div className="w-1/3 h-full bg-[#4a703f]" />
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       
            <div className="bg-white border border-slate-100 p-6 rounded-[32px] shadow-sm flex flex-col justify-between hover:border-[#4a703f] transition-colors group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 group-hover:text-[#4a703f]">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-tight">
                    {user?.email?.split("@")[0] || "Guest User"}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate max-w-[140px]">
                    {user?.email || "No email"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/settings")}
                className="w-full py-3 bg-slate-50 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-800 hover:bg-[#4a703f] hover:text-white transition-all"
              >
                Edit Profile
              </button>
            </div>

            
            <div
              className="bg-white border border-slate-100 p-6 rounded-[32px] shadow-sm flex flex-col justify-between hover:border-[#4a703f] transition-all cursor-pointer group"
              onClick={() => navigate("/orders")}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#4a703f]/10 rounded-full text-[#4a703f]">
                  <Package size={18} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                  Track Orders
                </h3>
              </div>
              <div className="flex items-center gap-2 mb-4 text-[#4a703f]">
                <Clock size={14} className="animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-tight">
                  Active Shipments
                </p>
              </div>
              <button className="w-full py-3 bg-slate-50 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-800 hover:bg-[#4a703f] hover:text-white transition-all">
                Order History
              </button>
            </div>

           
            <div
              className="bg-white border border-slate-100 p-6 rounded-[32px] shadow-sm flex flex-col justify-between hover:border-blue-200 transition-all cursor-pointer group"
              onClick={() => navigate("/cart")}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-full text-blue-500">
                    <ShoppingCart size={18} />
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                    My Cart
                  </h3>
                </div>
                <span className="text-[9px] font-black text-blue-500 bg-blue-50 px-2 py-1 rounded-lg">
                  {cartCount} Items
                </span>
              </div>

              <div className="flex flex-col gap-2 mb-4 overflow-y-auto max-h-[60px] pr-2 custom-scrollbar">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-slate-50 rounded-full px-3 py-1.5"
                    >
                      <span className="text-[9px] font-bold text-slate-600 truncate max-w-[80px]">
                        {item.name}
                      </span>
                      <span className="text-[9px] font-black text-[#e9aa43]">
                        x{item.qty}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] font-bold text-slate-400 italic">
                    Cart is currently empty
                  </p>
                )}
              </div>

              <button className="w-full py-3 bg-slate-50 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-800 hover:bg-blue-500 hover:text-white transition-all">
                Proceed to Checkout
              </button>
            </div>

          
            <div className="lg:col-span-3 bg-[#4a703f] p-6 md:p-10 rounded-[40px] shadow-2xl text-white relative overflow-hidden group mt-4 isolate border border-white/10">
              
              <div className="relative z-50 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                    <div className="w-8 h-[1px] bg-[#e9aa43]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#e9aa43]">
                      Assistance
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tighter leading-none uppercase">
                    Need <span className="text-[#e9aa43]">Support?</span>
                  </h3>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                 
                  {/* <a
                    href="tel:+917984997996"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      window.location.href = "tel:+917984997996";
                    }}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-3 bg-[#e9aa43] text-white px-10 py-5 rounded-full transition-all shadow-xl hover:bg-white hover:text-[#4a703f] active:scale-95 group/btn"
                  >
                    <Phone
                      size={20}
                      className="group-hover/btn:animate-pulse"
                    />
                    <span className="text-[11px] font-black uppercase tracking-widest">
                      Call Now
                    </span>
                  </a> */}

                  
                  <a
                    href="mailto:support@gauyog.com" 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = "mailto:support@gauyog.com";
                    }}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-3 bg-white/20 backdrop-blur-md border border-white/20 px-10 py-5 rounded-full hover:bg-white hover:text-[#4a703f] transition-all shadow-xl active:scale-95 group/email"
                  >
                    <Mail
                      size={20}
                      className="group-hover/email:-translate-y-1 transition-transform"
                    />
                    <span className="text-[11px] font-black uppercase tracking-widest">
                      Email Us
                    </span>
                  </a>
                </div>
              </div>

             
              <div className="absolute top-[-20%] right-[-5%] w-80 h-80 bg-[#4a703f]/20 blur-[100px] rounded-full group-hover:bg-[#e9aa43]/20 transition-all duration-1000 z-0" />
              <div className="absolute bottom-[-20%] left-[-5%] w-60 h-60 bg-black/20 blur-[80px] rounded-full z-0" />
            </div>
          </div>
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#4a703f] border-t border-white/10 px-4 pb-8 pt-3 z-[150] flex justify-around items-center rounded-t-[32px] shadow-2xl">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex flex-col items-center gap-1 p-2 transition-all ${isActive ? "scale-110" : "opacity-60"}`}
              >
                <div
                  className={`p-2 rounded-full transition-all ${isActive ? "bg-white text-[#4a703f] shadow-md" : "text-white"}`}
                >
                  {item.icon}
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-white">
                  {item.label}
                </span>
              </Link>
            );
          })}
         
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex flex-col items-center gap-1 p-2 transition-all opacity-60 hover:opacity-100 text-red-300"
          >
            <div className="p-2 rounded-full">
              <LogOut size={18} />
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest">
              Logout
            </span>
          </button>
        </nav>
      </motion.div>
    </div>
  );
}
