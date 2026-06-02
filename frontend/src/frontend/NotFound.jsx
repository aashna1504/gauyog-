import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ShoppingBag, BookOpen, Mail, ArrowRight } from "lucide-react";
import { setPageMeta } from "../utils/seo";

const quickLinks = [
  { label: "Go Home", href: "/", icon: Home, color: "bg-[#4a703f] text-white hover:bg-[#4a703f]/90" },
  { label: "Shop Products", href: "/shop", icon: ShoppingBag, color: "bg-[#744926] text-white hover:bg-[#744926]/90" },
  { label: "Read Blog", href: "/blog", icon: BookOpen, color: "bg-[#e9aa43] text-white hover:bg-[#e9aa43]/90" },
  { label: "Contact Us", href: "/contact", icon: Mail, color: "bg-slate-800 text-white hover:bg-slate-700" },
];

export default function NotFound() {
  useEffect(() => {
    setPageMeta({
      title: "404 — Page Not Found",
      description: "The page you are looking for could not be found. Explore our organic products or read our blog.",
      url: "https://www.gauyogkendr.com/404",
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfcfb] flex flex-col items-center justify-center px-4 py-20 md:py-32 text-center">
      {/* 404 Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <div className="text-[100px] md:text-[150px] font-black text-[#4a703f]/8 leading-none select-none tracking-tighter">
          404
        </div>
       
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-lg"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-[#e9aa43]/60" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#e9aa43]">
            Page Not Found
          </span>
          <div className="w-8 h-[1px] bg-[#e9aa43]/60" />
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-wider mb-4">
          Oops! Lost in the Fields?
        </h1>
        <p className="text-slate-500 text-base leading-relaxed mb-10 font-medium">
          The page you are looking for doesn't exist, has been moved, or the URL
          may be incorrect. Don't worry — our organic products are just a click away.
        </p>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {quickLinks.map(({ label, href, icon: Icon, color }) => (
            <Link
              key={href}
              to={href}
              className={`flex flex-col items-center gap-2 px-4 py-5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all active:scale-95 ${color}`}
            >
              <Icon size={20} />
              {label}
            </Link>
          ))}
        </div>

       
      </motion.div>
    </div>
  );
}
