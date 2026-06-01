import React from "react";
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Send,
  ArrowRight,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = {
  quickMenu: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Shop", href: "/shop" },
    { name: "Track Order", href: "/trackorder" },
    { name: "Contact Us", href: "/contact" },
  ],
  legal: [
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Refund Policy", href: "/refund" },
  ],
  socials: [
    { icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { icon: Youtube, href: "#", color: "hover:text-red-500" },
  ],
};

export default function ModernFooter() {
  return (
    <footer className="relative bg-white pt-8 md:pt-16 pb-8 md:pb-10 px-4 md:px-6 border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-6 md:gap-10 lg:gap-16 mb-8 md:mb-12">
          <div className="col-span-2 lg:col-span-5 space-y-4 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <div className="cursor-pointer">
                <img
                  src="https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto,w_200/v1775049866/final_logo_copy.jpg_puj109.jpg"
                  className="h-[100px] md:h-[140px] w-auto object-contain transition-all"
                  alt="Logo"
                  decoding="async"
                  width={200}
                  height={140}
                />
                <p className="text-gray-500 max-w-sm leading-relaxed text-xs md:text-sm">
                  Sign up to receive updates on new products and exclusive
                  deals. Don’t miss out on the latest offers and promotions!
                </p>
              </div>
            </div>

            {/* <div className="relative max-w-md group">
              <div className="absolute inset-0 bg-[#4a703f]/5 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative flex items-center bg-white border border-gray-200 rounded-full p-1 focus-within:border-[#4a703f] transition-all shadow-sm">
                <div className="pl-3 md:pl-4 text-gray-400">
                  <Send size={16} />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent border-none focus:ring-0 text-[13px] font-medium px-3 text-gray-900 placeholder:text-gray-400"
                />
                <button className="bg-[#4a703f] text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-widerst hover:bg-[#744926] transition-colors flex items-center gap-2">
                  Join <ArrowRight size={14} className="hidden sm:block" />
                </button>
              </div>
            </div> */}
          </div>

          <div className="lg:col-span-2 space-y-3 md:space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
              Quick Menu
            </h3>
            <ul className="grid grid-cols-1 gap-y-2 md:gap-y-3">
              {footerLinks.quickMenu.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 text-[14px] font-bold hover:text-[#e9aa43] transition-colors flex items-center gap-2 group"
                  >
                    <span className="hidden md:block w-0 h-[2px] bg-[#e9aa43] transition-all group-hover:w-4" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3 md:space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
              Legal
            </h3>
            <ul className="grid grid-cols-1 gap-y-2 md:gap-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 text-[14px] font-bold hover:text-[#e9aa43] transition-colors flex items-center gap-2 group"
                  >
                    <span className="hidden md:block w-0 h-[2px] bg-[#e9aa43] transition-all group-hover:w-4" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-3 space-y-4 md:space-y-8">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
                Social Connect
              </h3>
              <div className="flex gap-3">
                {footerLinks.socials.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    whileHover={{ y: -5 }}
                    className={`w-10 h-10 md:w-11 md:h-11 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 border border-transparent hover:border-gray-100 hover:bg-white transition-all ${social.color}`}
                  >
                    <social.icon size={18} strokeWidth={2.5} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="p-3 md:p-4 bg-[#4a703f]/5 rounded-2xl border border-[#4a703f]/10 flex items-center gap-3 md:gap-4">
              <div className="bg-white p-2 rounded-xl shadow-sm text-[#4a703f]">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widerst text-gray-400 leading-none mb-1">
                  Security
                </p>
                <p className="text-xs font-bold text-gray-900 leading-none">
                  Secure Checkout
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="flex flex-col items-center md:items-start gap-1.5 md:gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-wider text-center">
            <div className="flex items-center gap-2">
              <Globe size={14} />
              <span>English (India)</span>
            </div>
            <span>© 2026 Gauyog kendr. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            {[
              {
                src: "https://t3.ftcdn.net/jpg/05/60/50/16/360_F_560501607_x7crxqBWbmbgK2k8zOL0gICbIbK9hP6y.jpg",
                alt: "UPI",
              },
              {
                src: "https://www.edigitalagency.com.au/wp-content/uploads/new-visa-logo-high-quality-png-latest-800x258.png",
                alt: "Visa",
              },
              {
                src: "https://www.emerce.nl/content/uploads/2017/07/Mastercard_logo5.png",
                alt: "Mastercard",
              },
            ].map((img, i) => (
              <div
                key={i}
                className="h-8 md:h-10 w-14 md:w-16 bg-white border border-gray-100 rounded-lg flex items-center justify-center p-1 shadow-sm"
              >
                <img
                  src={img.src}
                  className="h-full w-full object-contain"
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  width={64}
                  height={40}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#4a703f]/5 rounded-full blur-[100px] -z-10" />
    </footer>
  );
}
