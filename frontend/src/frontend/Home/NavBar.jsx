import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRightCircle,
  User,
  ShoppingCart,
  Trash2,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "../../store/authStore";
import useCartStore from "../../store/cartStore";
import toast from "react-hot-toast";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { isAuthenticated, logout, user } = useAuthStore();
  const { cartCount, cartItems, fetchCart } = useCartStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  // Auto-close menus on navigation
  useEffect(() => {
    setMenuOpen(false);
    setCartOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Refund Policy", path: "/refund" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500 ${
          scrolled ? "pt-4 px-4 md:pt-6 md:px-8" : "pt-6 px-6 md:pt-8 md:px-8"
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <nav
            className={`flex items-center justify-between rounded-full bg-white/90 backdrop-blur-xl px-4 md:px-8 py-3 border border-white/20 transition-all duration-500 ${
              scrolled ? "shadow-xl ring-1 ring-black/5" : "shadow-lg"
            }`}
          >
            {/* LOGO */}
            <Link
              to="/"
              className="flex-shrink-0 transition-transform active:scale-95"
            >
              <img
                src="https://res.cloudinary.com/dbpzzvcik/image/upload/v1775301193/logo_copy.jpg_buosrm-removebg-preview_ot372q.png"
                className="lg:h-20 h-12 w-auto object-contain"
                alt="Logo"
              />
            </Link>

            {/* DESKTOP NAV */}
            <ul className="hidden lg:flex items-center gap-8 text-gray-600 font-semibold text-sm uppercase tracking-wider">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`hover:text-[#7bbd25] transition-colors ${
                      location.pathname === link.path ? "text-[#7bbd25]" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* DESKTOP ACTIONS */}
            <div className="hidden lg:flex items-center gap-5 text-gray-700">
              <div className="flex items-center gap-4 pr-4 border-r border-gray-100">
                <div
                  onClick={() => navigate("/dashboard")}
                  className="cursor-pointer"
                >
                  <User
                    size={25}
                    className="text-yellow-500 fill-yellow-500 hover:text-yellow-600 transition-colors"
                  />
                </div>
                <div
                  className="relative cursor-pointer group"
                  onClick={() => setCartOpen(true)}
                >
                  <ShoppingCart
                    size={25}
                    className="text-blue-500 fill-blue-500 group-hover:text-blue-600 transition-colors"
                  />
                  <span className="absolute -top-2 -right-2 bg-[#7bbd25] text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                </div>
              </div>
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-700">Hey, {user?.email?.split('@')[0]}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/signin")}
                  className="bg-[#744926] hover:bg-[#4a703f] text-white px-6 py-2.5 rounded-full flex items-center gap-2 text-sm font-bold transition-all"
                >
                  GET STARTED
                </button>
              )}
            </div>

            {/* MOBILE TOGGLE */}
            <div className="flex lg:hidden items-center gap-3">
              <div onClick={() => navigate("/dashboard")} className="p-1">
                <User size={22} className="text-yellow-500 fill-yellow-500" />
              </div>
              <div
                className="relative p-1 mr-1"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart
                  size={22}
                  className="text-blue-500 fill-blue-500"
                />
                <span className="absolute -top-1 -right-1 bg-[#7bbd25] text-white text-[8px] font-black w-3.5 h-3.5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              </div>
              <button
                className="p-2 bg-gray-50 rounded-full text-slate-900 ml-1"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* --- MOBILE DROPDOWN MENU --- */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[110] lg:hidden"
            />
            {/* Dropdown Content */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="fixed top-24 left-6 right-6 bg-white z-[120] rounded-[32px] shadow-2xl border border-slate-100 lg:hidden overflow-hidden"
            >
              <div className="p-8 flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center justify-between text-lg font-[1000] uppercase tracking-tighter ${
                        location.pathname === link.path
                          ? "text-[#7bbd25]"
                          : "text-slate-900"
                      }`}
                    >
                      {link.name}
                      <ChevronRight size={18} className="text-slate-200" />
                    </Link>
                  </motion.div>
                ))}
                <div className="h-[1px] bg-slate-50 w-full" />
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full py-4 bg-red-500 text-white rounded-full font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2"
                  >
                    Logout <ArrowRightCircle size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/signin")}
                    className="w-full py-4 bg-[#744926] text-white rounded-full font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2"
                  >
                    Get Started <ArrowRightCircle size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- YOUR ORIGINAL CART DRAWER (DO NOT CHANGE DESIGN) --- */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[120] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-slate-200 flex items-center justify-between">
                <div className="relative flex items-center gap-5 p-2 group">
                  <div className="w-1.5 h-12 bg-[#744926] rounded-full transition-all duration-500 group-hover:h-14" />
                  <div className="flex flex-col">
                    <h2 className="text-3xl font-[1000] tracking-[-0.05em] text-[#1a2e26] leading-none mb-1.5">
                      My Cart
                    </h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                      Items in Bag{" "}
                      <span className="text-[#4a703f] ml-1">({cartCount})</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-3 hover:bg-red-50 rounded-full transition-colors text-slate-400 hover:text-red-500"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-5 group p-2 hover:bg-[#e9aa43]/10 rounded-2xl transition-all border border-transparent "
                  >
                    <div className="w-24 h-24 bg-[#e9aa43]/20 rounded-full overflow-hidden flex-shrink-0 border border-slate-100">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="text-sm font-black text-slate-900 leading-tight uppercase tracking-tight">
                          {item.name}
                        </h4>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-md font-bold text-[#e9aa43]">
                            {item.price}
                          </p>
                          <p className="text-[10px] font-black text-slate-400 uppercase">
                            Qty: {item.qty}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-2">
                        <button className="flex-1 bg-[#4a703f] hover:bg-[#744926] text-white py-2 rounded-full text-[12px] font-black uppercase tracking-widest">
                          Buy Now
                        </button>
                        <button className="p-2 text-slate-300 hover:text-red-500 transition-colors border border-slate-100 rounded-full">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 border-t border-slate-200 bg-slate-50/30">
                <div className="flex items-center justify-between mb-6 px-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Estimated Total
                  </span>
                  <span className="text-xl font-[1000] text-[#1a2e26]">
                    ₹{cartItems.reduce((acc, item) => acc + ((item.rawPrice || 0) * item.qty), 0).toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    navigate("/cart");
                  }}
                  className="w-full py-5 bg-[#744926] hover:bg-[#4a703f] text-white rounded-full font-black uppercase tracking-widest text-[11px] shadow-xl transition-all flex items-center justify-center gap-3"
                >
                  Checkout Now <ArrowRightCircle size={18} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
