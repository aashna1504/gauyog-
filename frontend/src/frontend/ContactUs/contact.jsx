import React, { useState } from "react";
import {
  ChevronRight,
  MessageCircle,
  Globe,
  Clock,
  CheckCircle,
  HandshakeIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
  Instagram,
  Twitter,
  Facebook,
  User,
  ArrowRightCircle,
} from "lucide-react";
import { Globe2, Sparkles, Zap, Shield } from "lucide-react";
import api from "../../api/axios";
import toast from "react-hot-toast";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};
const stats = [
  {
    id: "01",
    title: "Global Reach",
    detail: "Rishikesh & Beyond",
    icon: <Globe2 size={18} />,
  },
  {
    id: "02",
    title: "Instant Sync",
    detail: "Real-time Support",
    icon: <Zap size={18} />,
  },
  {
    id: "03",
    title: "Sanctuary Grade",
    detail: "100% Data Privacy",
    icon: <Shield size={18} />,
  },
];
export default function KineticContactBanner() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/contact", form);
      toast.success("Message sent successfully");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16 lg:mt-10">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative w-full py-20 md:py-24 bg-[#fcfdfd ] overflow-hidden border-b border-gray-100"
      >
      
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 right-0 w-[30%] h-full bg-[#7bbd25]/5 -skew-x-12 translate-x-10 -z-10"
        />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#744926]/5 rounded-full blur-[80px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 items-center gap-12 relative z-10">
         
          <div className="md:col-span-7 text-center md:text-left">
           
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100"
            >
              <HandshakeIcon size={14} className="text-[#7bbd25]" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
                Direct Touch
              </span>
            </motion.div>

            
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-black text-gray-900 leading-none tracking-tighter"
              style={{
                fontFamily:
                  "'Baskerville Old Face', 'Libre Baskerville', serif",
              }}
            >
              Reach Out to
              <span className="text-[#7bbd25] italic font-medium"> Us.</span>
            </motion.h1>

          
            <motion.p
              variants={itemVariants}
              className="mt-6 text-gray-500 text-lg md:text-xl max-w-md mx-auto md:mx-0 leading-relaxed font-medium"
            >
              Have questions about our products?{" "}
            </motion.p>
          </div>

          
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            className="md:col-span-5 relative size-72 md:size-80 mx-auto md:mr-0 flex items-center justify-center group"
          >
            
            <div className="relative z-10 size-60 md:size-64 rounded-full border border-slate-100/50 flex flex-col items-center justify-center overflow-hidden">
             
              <div className="absolute inset-0 bg-gradient-to-tr from-[#4a703f]/10 to-transparent pointer-events-none" />
            </div>

           
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 z-20 pointer-events-none"
            >
            
              <div className="absolute top-1/2 -right-12 -translate-y-1/2 flex items-center gap-3 bg-white/40 backdrop-blur-xl px-5 py-3 rounded-full shadow-lg border border-white/30 transform group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                <div className="size-8 rounded-full bg-[#4a703f] flex items-center justify-center text-white">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-900 group-hover:text-slate-100">
                    Response
                  </p>
                  <p className="text-sm font-bold tracking-tight text-gray-900 group-hover:text-white">
                    &lt; 2 Hours
                  </p>
                </div>
              </div>

             
              <div className="absolute top-1/2 -left-12 -translate-y-1/2 flex items-center gap-3 bg-white/40 backdrop-blur-xl px-5 py-3 rounded-full shadow-lg border border-white/30 transform group-hover:bg-[#7bbd25] group-hover:text-white transition-all duration-500">
                <Globe
                  size={24}
                  className="text-[#7bbd25] group-hover:text-white"
                />
                <p className="text-sm font-bold text-gray-900 group-hover:text-white">
                  Active Support
                </p>
              </div>
            </motion.div>

            
            <div className="absolute inset-0 border border-dashed border-slate-200 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute -inset-8 border border-slate-100/50 rounded-full -z-10 animate-[spin_30s_linear_infinite_reverse]" />

         
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -inset-10 bg-[#7bbd25]/15 blur-3xl -z-10 rounded-full"
            />
          </motion.div>
        </div>
      </motion.div>
      <section className="w-full bg-white py-12 md:py-16 overflow-hidden relative border-t border-gray-50">
       
        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-gray-50/50 font-black text-[12vw] leading-none select-none pointer-events-none tracking-tighter">
          CONNECTIVITY
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-12">
           
            <div className="max-w-xl space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 text-[#7bbd25]"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                  The Network
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black text-[#4a703f] leading-[0.9] tracking-tighter">
                A seamless flow <br />
                <span className="text-gray-300 italic font-light">
                  from us to you.
                </span>
              </h2>
            </div>

          
            <div className="w-full lg:w-auto grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-[#fcfdfd ] border border-gray-100 rounded-[32px] min-w-[240px] group transition-all duration-500 hover:shadow-2xl hover:shadow-[#7bbd25]/5"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black text-gray-800 group-hover:text-[#7bbd25] transition-colors">
                      {item.id}
                    </span>
                    <div className="p-2 bg-white rounded-full shadow-sm text-[#4a703f] group-hover:bg-[#7bbd25] group-hover:text-white transition-all duration-500">
                      {item.icon}
                    </div>
                  </div>
                  <h4 className="text-sm font-black text-[#4a703f] uppercase tracking-widest mb-1">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-xs font-bold italic uppercase tracking-wider">
                    {item.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full min-h-[800px] flex flex-col lg:flex-row overflow-hidden bg-white">
       
        <section className="w-full bg-[#fcfdfd ] pb-24">
          <div className="max-w-7xl mx-auto px-6">
         
            <div className="flex flex-col lg:flex-row overflow-hidden bg-white rounded-[48px] shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-gray-100 min-h-[750px]">
             
              <div className="w-full lg:w-[40%] p-10 md:p-14 flex flex-col items-center justify-between relative group overflow-hidden">
                
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-[#4a703f] opacity-[0.98]" />
                  <img
                    src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20 grayscale"
                    alt="Nature texture"
                  />
                
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#7bbd25]/20 blur-[80px] rounded-full" />
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/10 blur-[80px] rounded-full" />
                </div>

               
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-8 h-[1px] bg-white/20" />
                </div>

             
                <div className="relative z-10 w-full flex flex-col items-center text-center">
                  <h2 className="text-5xl font-black text-white leading-tight tracking-tighter mb-10">
                    Reach <br />
                    <span className="italic font-light text-[#e9aa43]">
                      Beyond.
                    </span>
                  </h2>

               
                  <div className="w-full max-w-xs space-y-8">
                    {[
                      {
                        icon: <MapPin />,
                        label: "Our Sanctuary",
                        val: "01, IN Village Badalpara Taluka Veraval, Gir Somnath, Prabhas Patan Junagadh, Gujarat, India-362268.",
                      },
                      {
                        icon: <Phone />,
                        label: "Voice",
                        val: (
                          <>
                            +91 79849 97996 <br />
                            +91 93282 91724
                          </>
                        ),
                      },
                      {
                        icon: <Mail />,
                        label: "Digital",
                        val: " john@gauyogkendr.com",
                      },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -3 }}
                        className="flex flex-col items-center group"
                      >
                        <div className="p-2.5 rounded-full bg-white/5 border border-white/10 group-hover:border-white group-hover:bg-white/10 transition-all duration-500 mb-3">
                          {React.cloneElement(item.icon, {
                            size: 18,
                            className:
                              "text-white/40 group-hover:text-white transition-colors",
                          })}
                        </div>
                        <p className="text-white/70 text-[7px] font-black uppercase tracking-[0.3em] mb-1">
                          {item.label}
                        </p>
                        <p className="text-white text-sm font-bold tracking-tight">
                          {item.val}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                
                <div className="relative z-10 flex gap-3 p-1 bg-black/10 backdrop-blur-xl rounded-full border border-white/5">
                  {[<Instagram />, <Twitter />, <Facebook />].map(
                    (icon, idx) => (
                      <button
                        key={idx}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-[#7bbd25] transition-all duration-300"
                      >
                        {React.cloneElement(icon, { size: 14 })}
                      </button>
                    ),
                  )}
                </div>
              </div>

             
              <div className="w-full lg:w-[60%] bg-[#fdfefd] p-10 md:p-16 flex flex-col justify-center relative">
                <form
                  className="max-w-md w-full mx-auto"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-10 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-[#7bbd25] text-[9px] font-black uppercase tracking-[0.2em]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7bbd25] animate-ping" />
                      Direct Channel
                    </div>
                    <h3 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">
                      Get in{" "}
                      <span className="text-[#7bbd25] italic font-medium">
                        Touch.
                      </span>
                    </h3>
                  </div>

                  <div className="space-y-5">
                   
                    <div className="space-y-1.5 group">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-[#7bbd25]">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={form.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3.5 rounded-full outline-none focus:bg-white focus:border-[#7bbd25] focus:ring-4 focus:ring-[#7bbd25]/5 transition-all text-sm font-bold text-gray-900"
                        />
                        <User
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-200 group-focus-within:text-[#7bbd25]"
                          size={18}
                        />
                      </div>
                    </div>

                   
                    <div className="space-y-1.5 group">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-[#7bbd25]">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={form.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3.5 rounded-full outline-none focus:bg-white focus:border-[#7bbd25] focus:ring-4 focus:ring-[#7bbd25]/5 transition-all text-sm font-bold text-gray-900"
                        />
                        <Mail
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-200 group-focus-within:text-[#7bbd25]"
                          size={18}
                        />
                      </div>
                    </div>

                    
                    <div className="space-y-1.5 group">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-[#7bbd25]">
                        Your Message
                      </label>
                      <textarea
                        rows="3"
                        placeholder="How can we help?"
                        value={form.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3.5 rounded-full outline-none focus:bg-white focus:border-[#7bbd25] focus:ring-4 focus:ring-[#7bbd25]/5 transition-all text-sm font-bold text-gray-900 resize-none"
                      />
                    </div>

                
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-4 bg-[#4a703f] hover:bg-[#744926] disabled:opacity-60 text-white py-4 rounded-full flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 shadow-lg shadow-gray-200 group"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
