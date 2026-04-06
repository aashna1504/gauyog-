import React from "react";
import { MapPin, Mail, PhoneCall, ArrowUpRight, Globe } from "lucide-react";
import { motion } from "framer-motion";

const contactInfo = [
  {
    category: "The Physical Space",
    detail:
      "01, IN Village Badalpara Taluka Veraval, Gir Somnath, Prabhas Patan Junagadh, Gujarat, India-362268",
    label: "Get Directions",
    icon: MapPin,
    href: "#",
    color: "text-emerald-500",
  },
  {
    category: "Digital Inbox",
    detail: " john@gauyogkendr.com",
    label: "Drop a Message",
    icon: Mail,
    href: "mailto:info@gauyogkendr.com",
    color: "text-blue-500",
  },
  {
    category: "Voice Support",
    detail: (
      <>
        +91 79849 97996 <br />
        +91 93282 91724
      </>
    ),
    label: "Take A Call",
    icon: PhoneCall,
    href: "tel:#",
    color: "text-[#7bbd25]",
  },
];

export default function ModernContactStrip() {
  return (
    <div className="bg-[#fcfdfd ] pt-20 px-6 relative overflow-hidden ">
      <div className="max-w-7xl mx-auto">
        {/* TOP INTRO */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-[#7bbd25] font-bold text-xs uppercase tracking-[0.4em] mb-4"
          >
            <Globe size={16} /> Global Connectivity
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tighter">
            Let's <span className="text-[#7bbd25] italic">Connect.</span>
          </h2>
        </div>

        {/* DATA STRIP - NO CARDS, JUST BORDERS & SPACE */}
        <div className="flex flex-col lg:flex-row border-t border-gray-100">
          {contactInfo.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex-1 py-12 lg:px-10 border-b lg:border-b-0 lg:border-r border-gray-100 last:border-r-0 group relative overflow-hidden"
            >
              {/* BACKGROUND INTERACTION */}
              <div className="absolute inset-0 bg-gray-50/50 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out -z-10" />

              <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                <div className="space-y-6">
                  {/* ICON & CATEGORY */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-full bg-white shadow-sm border border-gray-50 ${item.color} group-hover:rotate-12 transition-transform duration-500`}
                    >
                      <item.icon size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                      {item.category}
                    </span>
                  </div>

                  {/* LARGE DETAIL TEXT */}
                  <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight pr-4">
                    {item.detail}
                  </p>
                </div>

                {/* INTERACTIVE LINK */}
                <a
                  href={item.href}
                  className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest text-gray-900 group-hover:text-[#7bbd25] transition-all"
                >
                  {item.label}
                  <div className="relative overflow-hidden w-5 h-5">
                    <ArrowUpRight
                      size={20}
                      className="absolute group-hover:-translate-y-full group-hover:translate-x-full transition-all duration-500"
                    />
                    <ArrowUpRight
                      size={20}
                      className="absolute -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500"
                    />
                  </div>
                </a>
              </div>

              {/* OVERSIZED GHOST ICON */}
              <item.icon
                size={180}
                className={`absolute -bottom-10 -right-10 opacity-[0.02] group-hover:opacity-[0.09] transition-opacity duration-700 pointer-events-none`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
