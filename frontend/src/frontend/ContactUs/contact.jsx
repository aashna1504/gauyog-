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
import { Heart, Leaf, Users } from "lucide-react";
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
const commitments = [
  {
    title: "Circular Economy",
    desc: "We transform Gir cow dung and coconut husks into high-value organic products, closing the loop on farm waste.",
    color: "#4a703f",
  },
  {
    title: "Zero Chemicals",
    desc: "Our manufacturing uses only natural composting and biological enrichment. No synthetic chemicals.",
    color: "#4a703f",
  },
  {
    title: "Community First",
    desc: "We employ local women and invest in Gujarat's rural economy to lift families and preserve traditional heritage.",
    color: "#d4a044",
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
          className="absolute top-0 right-0 w-[30%] h-full bg-[#4a703f]/5 -skew-x-12 translate-x-10 -z-10"
        />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#744926]/5 rounded-full blur-[80px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 items-center gap-12 relative z-10">
          <div className="md:col-span-7 text-center md:text-left">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100"
            >
              <HandshakeIcon size={14} className="text-[#4a703f]" />
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
              Grow
              <span className="text-[#4a703f] italic font-medium">
                {" "}
                Together.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-gray-500 text-lg md:text-xl max-w-md mx-auto md:mx-0 leading-relaxed font-medium"
            >
              Whether you're a distributor, retailer, co-operative, or farmer
              looking to go organic — we'd love to hear.
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

              <div className="absolute top-1/2 -left-12 -translate-y-1/2 flex items-center gap-3 bg-white/40 backdrop-blur-xl px-5 py-3 rounded-full shadow-lg border border-white/30 transform group-hover:bg-[#4a703f] group-hover:text-white transition-all duration-500">
                <Globe
                  size={24}
                  className="text-[#4a703f] group-hover:text-white"
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
              className="absolute -inset-10 bg-[#4a703f]/15 blur-3xl -z-10 rounded-full"
            />
          </motion.div>
        </div>
      </motion.div>
      <section className="relative bg-[#4a703f] py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* --- LEFT SIDE: BENTO IMAGE GRID --- */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {/* Large Vertical Image */}
              <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-[#4a703f]/10 group shadow-xl">
                <img
                  src="https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302434/0fc480c8-6acf-4ff0-a587-cea5c58e069b_lii8qp.jpg"
                  alt="Rooted in Community"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              {/* Established Badge */}
              <div className="bg-[#d4a044] rounded-3xl p-6 text-center shadow-lg shadow-[#d4a044]/20">
                <span className="block text-3xl  font-black text-[#2d3a29]">
                  2021
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2d3a29]/60">
                  Est. Gujarat, India
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-12">
              {/* Small Top Image */}
              <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-[#4a703f]/10 group shadow-xl">
                <img
                  src="https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302623/2f2687a2-eb32-4584-84d0-afffeab3406c_fan0jr.jpg"
                  alt="Global Trade"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              {/* Large Bottom Image */}
              <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-[#4a703f]/10 group shadow-xl">
                <img
                  src="https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302534/57f06c99-83a3-467b-ab68-c0f1a57ea899_v2ovpk.jpg"
                  alt="Leadership"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: CONTENT --- */}
          <div className="lg:col-span-6 space-y-10">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4a044]">
                  Our Story
                </span>
                <div className="h-[1px] w-12 bg-[#d4a044] mt-1" />
              </div>

              <h2 className="text-5xl md:text-6xl  font-bold text-white leading-[1.1]">
                Born from the{" "}
                <span className="text-[#4a703f] italic font-medium text-6xl">
                  Earth,
                </span>{" "}
                <br />
                Built for the World
              </h2>

              <div className="space-y-2 text-slate-100 text-lg leading-relaxed">
                <p className="font-semibold text-[#4a703f]">
                  Gauyog Kendr brings together Indian agricultural heritage and
                  international business vision to create premium organic
                  products.
                </p>
                <p>
                  What began as a small cow dung-based fertiliser operation in
                  Gujarat has grown into a thriving enterprise. Our story is
                  rooted in the belief that everything we need for healthy
                  farming comes from mother earth herself.
                </p>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#4a703f]/30 flex items-center justify-center shrink-0">
                  <Leaf className="text-[#4a703f]" size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Natural Farming
                  </h4>
                  <p className="text-xs text-slate-200 mt-1">
                    100% organic, chemical-free production.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#d4a044]/30 flex items-center justify-center shrink-0">
                  <Users className="text-[#d4a044]" size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Women First</h4>
                  <p className="text-xs text-slate-200 mt-1">
                    Employing and empowering local women.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center shrink-0">
                  <Globe className="text-blue-700" size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Global Reach</h4>
                  <p className="text-xs text-slate-200 mt-1">
                    International quality, worldwide coverage.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-red-800/30 flex items-center justify-center shrink-0">
                  <Heart className="text-red-900" size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Farmer Support
                  </h4>
                  <p className="text-xs text-slate-200 mt-1">
                    Helping farmers transition to organic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header - Simple & Left Aligned like your image */}
          <div className="mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4a044] mb-4 block"
            >
              Our Commitment
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-bold leading-tight max-w-2xl">
              Sustainability Is Our{" "}
              <span className="text-[#4a703f] italic">Foundation</span>
            </h2>
            <p className="mt-6 text-slate-500 text-lg max-w-xl">
              Every product returns value to the earth through a circular
              approach.
            </p>
          </div>

          {/* 3-in-a-row Row - No Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {commitments.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="group"
              >
                {/* Title - Bold and Serif */}
                <h3 className="text-2xl  font-bold text-[#2d3a29] mb-4">
                  {item.title}
                </h3>

                {/* Description - Clean and legible */}
                <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                  {item.desc}
                </p>

                {/* Animated Accent Line */}
                <motion.div className="mt-8 h-[1px] bg-slate-100 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-current"
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "0%" }}
                    transition={{ delay: 0.5 + idx * 0.2, duration: 1 }}
                    style={{ color: item.color }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full min-h-[800px] flex flex-col lg:flex-row overflow-hidden bg-white">
        <section className="w-full bg-[#fcfdfd] pb-24">
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

                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#4a703f]/20 blur-[80px] rounded-full" />
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
                        className="w-9 h-9 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-[#4a703f] transition-all duration-300"
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
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-[#4a703f] text-[9px] font-black uppercase tracking-[0.2em]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4a703f] animate-ping" />
                      Direct Channel
                    </div>
                    <h3 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">
                      Get in{" "}
                      <span className="text-[#4a703f] italic font-medium">
                        Touch.
                      </span>
                    </h3>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-1.5 group">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-[#4a703f]">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={form.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3.5 rounded-full outline-none focus:bg-white focus:border-[#4a703f] focus:ring-4 focus:ring-[#4a703f]/5 transition-all text-sm font-bold text-gray-900"
                        />
                        <User
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-200 group-focus-within:text-[#4a703f]"
                          size={18}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 group">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-[#4a703f]">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={form.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3.5 rounded-full outline-none focus:bg-white focus:border-[#4a703f] focus:ring-4 focus:ring-[#4a703f]/5 transition-all text-sm font-bold text-gray-900"
                        />
                        <Mail
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-200 group-focus-within:text-[#4a703f]"
                          size={18}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 group">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-[#4a703f]">
                        Your Message
                      </label>
                      <textarea
                        rows="3"
                        placeholder="How can we help?"
                        value={form.message}
                        onChange={(e) =>
                          handleChange("message", e.target.value)
                        }
                        className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3.5 rounded-full outline-none focus:bg-white focus:border-[#4a703f] focus:ring-4 focus:ring-[#4a703f]/5 transition-all text-sm font-bold text-gray-900 resize-none"
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
