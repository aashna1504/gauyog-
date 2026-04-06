import React from "react";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkle, Trees } from "lucide-react";
import { Target, Eye, ShieldCheck } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Instagram, Linkedin, Facebook, Youtube } from "lucide-react";
import { Mail, Flame, Leaf, CheckCircle2 } from "lucide-react";
import { useRef } from "react";
function about() {
  const reveal = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  const missionCards = [
    {
      title: "Mission",
      subtitle: "What we do",
      desc: "At Gauyog Kendr, we are dedicated to preserving traditional Vedic practices through sustainable and organic living. We offer pure, farm-sourced products crafted with care and authenticity.",
      icon: <Target className="text-white" size={20} />,
      color: "bg-[#4a703f]", // Vedic Green
      glowColor: "text-green-100/60",
    },
    {
      title: "Vision",
      subtitle: "Where we're going",
      desc: "To become a trusted sanctuary that promotes sustainable living and holistic wellness through pure, natural practices. We aim to reconnect people with nature and traditional wisdom for a healthier future.",
      icon: <Eye className="text-white" size={20} />,
      color: "bg-[#e9aa43]", // Golden Amber
      glowColor: "text-amber-100/60",
    },
    {
      title: "Values",
      subtitle: "What we stand for",
      desc: "We stand for purity, authenticity, and sustainability in everything we do. Our values are rooted in trust, ethical practices, and respect for nature. We are committed to delivering quality while preserving traditional wisdom.",
      icon: <ShieldCheck className="text-white" size={20} />,
      color: "bg-[#7bbd25]", // Acid Green
      glowColor: "text-green-50/60",
    },
  ];
  const team = [
    {
      name: "John Paynter",
      role1: "Director & Founder",
      role: "International Strategy Lead",
      image:
        "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775126971/c01d8c99-c1ae-4d5d-b8b1-c0c0a77dd43b_fvjb28.jpg",
      color: "bg-[#4a703f]", // Vedic Green
    },
    {
      name: "Hitesh Bhai",
      role: " Innovation Lead",
      image:
        "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775126951/bc1fca8d-38aa-49f5-8bf9-c966891a4b3f_qw61xd.jpg",
      color: "bg-[#4a703f]", // Golden Amber
    },
    {
      name: "Ram Bhai",
      role: " Operations Head",
      image:
        "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775126939/3ca0fa6d-4b0c-446f-9f12-2bedba055316_crr926.jpg",
      color: "bg-[#4a703f]", // Acid Green
    },
  ];
  const reasons = [
    {
      id: "01",
      title: "Pure by Nature",
      subtitle: "100% Chemical-Free",
      desc: "Crafted with natural ingredients, our products are free from harmful chemicals, ensuring a clean and safe experience.",
      color: "bg-[#4a703f]", // Vedic Green
      icon: <ShieldCheck size={24} />,
    },
    {
      id: "02",
      title: "Ethical Sourcing",
      subtitle: "From Gaushala to You",
      desc: "All ingredients are responsibly sourced from our sanctuary and trusted natural sources, ensuring quality and care.",
      color: "bg-[#e9aa43]", // Golden Amber
      icon: <Flame size={24} />,
    },
    {
      id: "03",
      title: "Holistic Wellness",
      subtitle: "Inspired by Vedic Wisdom",
      desc: "Every product is designed to promote balance, positivity, and a healthier lifestyle through traditional knowledge.",
      color: "bg-[#7bbd25]", // Acid Green
      icon: <Leaf size={24} />,
    },
  ];
  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1590779033100-9f60705a2f3b?q=80&w=1000",
      title: "Farmer Workshop",
      size: "md:col-span-2 md:row-span-2",
    },
    {
      url: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=1000",
      title: "Quality Check",
      size: "md:col-span-1 md:row-span-1",
    },
    {
      url: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1000",
      title: "Vedic Guidance",
      size: "md:col-span-1 md:row-span-2",
    },
    {
      url: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=1000",
      title: "Organic Fields",
      size: "md:col-span-1 md:row-span-1",
    },
    {
      url: "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=1000",
      title: "Community Meet",
      size: "md:col-span-2 md:row-span-1",
    },
    {
      url: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1000",
      title: "Traditional Sourcing",
      size: "md:col-span-1 md:row-span-1",
    },
    {
      url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000",
      title: "The Sanctuary",
      size: "md:col-span-1 md:row-span-1",
    },
    {
      url: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1000",
      title: "Harvest Ritual",
      size: "md:col-span-2 md:row-span-2",
    },
    {
      url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1000",
      title: "Soil Health",
      size: "md:col-span-1 md:row-span-1",
    },
    {
      url: "https://images.unsplash.com/photo-1595841696677-54897f28bc12?q=80&w=1000",
      title: "Pure Ethics",
      size: "md:col-span-1 md:row-span-1",
    },
  ];
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = current.offsetWidth * 0.8; // Match the 80% width of cards
    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  return (
    <div className="mt-10">
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20 overflow-hidden bg-[#fcfdfd ]">
        {/* Background Decorative Element - Soft Gradient Orb */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#7bbd25]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#e9aa43]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* --- LEFT CONTENT: THE MESSAGE --- */}
          <div className="lg:col-span-7 z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Short Headline (Who you are) */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-8 bg-[#4a703f]" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#4a703f]">
                  Modern Vedic Alchemists
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-8xl font-black text-slate-900 tracking-[-0.05em] leading-[0.85] mb-8">
                Pure by Nature
                <br />
                <span className="text-[#7bbd25] italic"> Proven by Earth.</span>
              </h1>

              {/* One-line Value Proposition */}
              <p className="text-lg md:text-xl text-slate-500 font-medium max-w-xl leading-relaxed mb-10 border-l-2 border-slate-200 pl-6">
                We bring together tradition and sustainability to create a healthier, more conscious way of living.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-5">
                <button
                  onClick={() => (window.location.href = "/shop")}
                  className="group bg-[#744926] hover:bg-[#4a703f] text-white px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center gap-3 shadow-2xl active:scale-95"
                >
                  Explore Services
                  <ArrowUpRight
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </button>

                <button
                  onClick={() => (window.location.href = "/contact")}
                  className="px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] text-[#7bbd25] border-2 border-[#7bbd25]/30 hover:border-[#7bbd25] transition-all active:scale-95"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT CONTENT: THE VISUAL ANCHOR --- */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative z-10"
            >
              {/* Main Image Container */}
              <div className="aspect-[4/5] bg-slate-200 rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] relative group">
                <img
                  src="https://res.cloudinary.com/dbpzzvcik/image/upload/v1775044121/Screenshot_2026-04-01_171816_klxne1.png"
                  alt="Vedic Dhoop Ritual"
                  className="w-full h-full object-cover hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                />

                {/* Floating Badge on Image */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[30px] flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-[9px] font-black uppercase tracking-widest mb-1">
                      Current Batch
                    </p>
                    <p className="text-white font-bold">Himlayan Cedar</p>
                  </div>
                  <div className="size-12 bg-[#e9aa43] rounded-full flex items-center justify-center text-white">
                    <Trees size={20} />
                  </div>
                </div>
              </div>

              {/* Decorative Card Offset */}
              <div className="absolute -bottom-6 -right-6 -z-10 size-full border-2 border-[#7bbd25]/20 rounded-[60px]" />
            </motion.div>
          </div>
        </div>
      </section>
      <div className="bg-[#fcfdfd ] min-h-screen text-slate-900 selection:bg-[#7bbd25]/30">
        {/* Background Decor */}
        <div className="fixed top-0 right-0 w-[40%] h-[40%] bg-[#7bbd25]/5 rounded-full blur-[120px] -z-10" />

        <main className="max-w-[1400px] mx-auto px-6 py-12">
          {/* Header Section - Centered & Tight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85]">
              Built <span className="text-[#7bbd25]">on Truth.</span>
            </h2>
          </motion.div>

          {/* --- THE NARRATIVE RIBBON (No Cards) --- */}
          <div className="relative">
            {/* Background "Heritage Line" - Passes through all sections */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 relative z-10">
              {missionCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative group flex flex-col items-center md:items-start text-center md:text-left px-4"
                >
                  {/* Floating Icon Aura - The only "Shape" */}
                  <div className="relative mb-8">
                    {/* The "Aura" - A soft glow that expands on hover */}
                    <div
                      className={`absolute inset-0 rounded-full blur-2xl opacity-20 group-hover:opacity-40 group-hover:scale-150 transition-all duration-700 ${card.color}`}
                    />

                    {/* The Icon - Suspended in space */}
                    <div
                      className={`relative z-10 size-md rounded-full border border-slate-100 bg-white flex items-center justify-center shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500`}
                    >
                      <div
                        className={`size-10 rounded-full ${card.color} flex items-center justify-center text-white shadow-inner`}
                      >
                        {React.cloneElement(card.icon, { size: 18 })}
                      </div>
                    </div>
                  </div>

                  {/* Typography Section */}
                  <div className="space-y-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-black uppercase tracking-[0.4em] text-slate-300 group-hover:text-[#4a703f] transition-colors">
                        0{index + 1}
                      </span>
                      <h3 className="text-2xl font-black tracking-tight text-slate-900">
                        {card.title}
                      </h3>
                    </div>

                    <p className="text-sm font-bold uppercase tracking-widest text-[#4a703f]/60 italic">
                      {card.subtitle}
                    </p>

                    <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium max-w-[280px]">
                      {card.desc}
                    </p>
                  </div>

                  {/* Modern Interactive Detail - Floating Dot */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      delay: index * 0.5,
                    }}
                    className={`hidden md:block absolute -right-2 top-1/2 size-1.5 rounded-full ${card.color} opacity-30`}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Accent - A thin, minimal bar */}
          <div className="mt-20 flex justify-center">
            <div className="h-[2px] w-24 bg-slate-200 relative">
              <div className="absolute inset-0 bg-[#7bbd25] w-0 group-hover:w-full transition-all duration-1000" />
            </div>
          </div>
        </main>
        <section className="py-16 px-6 md:px-12 bg-[#fcfdfd ]">
          <div className="max-w-7xl mx-auto">
            {/* Header - Tighter & Minimal */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                    The Collective
                  </span>
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
                  The Hands <br />{" "}
                  <span className="text-[#7bbd25]">Behind the Bloom.</span>
                </h2>
              </div>
              <p className="text-slate-500 font-medium max-w-xs text-sm leading-relaxed border-l-2 border-slate-100 pl-4">
                A small group of seekers dedicated to restoring the purity of
                ancient Himalayan traditions.
              </p>
            </div>

            {/* --- TEAM GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden bg-slate-100 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-slate-200">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    />

                    {/* Floating Social Glass-morphism Badge */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-white/20 backdrop-blur-xl border border-white/30 p-4 rounded-[24px] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-around items-center">
                      <Linkedin
                        size={18}
                        className="text-white cursor-pointer hover:text-slate-900 transition-colors"
                      />
                      <Instagram
                        size={18}
                        className="text-white cursor-pointer hover:text-slate-900 transition-colors"
                      />
                      <Mail
                        size={18}
                        className="text-white cursor-pointer hover:text-slate-900 transition-colors"
                      />
                    </div>

                    {/* Color Accent Overlay on hover */}
                    <div
                      className={`absolute inset-0 ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none`}
                    />
                  </div>

                  {/* Text Content - Tighter spacing */}
                  <div className="mt-6 text-center md:text-left px-2">
                    <h3 className="text-xl font-black tracking-tight text-slate-900 mb-1 flex flex-col items-center md:items-start gap-1">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#e9aa43] italic">
                        {member.role1}
                      </span>
                      <span className="text-2xl md:text-3xl leading-none">
                        {member.name}
                      </span>
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-[#4a703f] transition-colors">
                      {member.role}
                    </p>
                  </div>

                  {/* Decorative Number (Subtle) */}
                  <span className="absolute -top-4 -right-2 text-6xl font-black text-slate-100/50 -z-10 group-hover:text-slate-100 transition-colors">
                    0{index + 1}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* --- THE GROUND REALITY GALLERY --- */}
      <section className="py-24 px-6 md:px-12 bg-[#fcfdfd] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 mb-3"
              >
                <div className="size-1.5 rounded-full bg-[#7bbd25]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                  Field Documentation
                </span>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
                Direct from <br />
                <span className="text-[#7bbd25]">The Source.</span>
              </h2>
            </div>

            {/* Mobile Navigation Buttons - Visible only on Mobile */}
            <div className="flex md:hidden items-center gap-4">
              <button
                onClick={() => scroll("left")}
                className="size-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-900 active:bg-[#7bbd25] active:text-white transition-all"
              >
                <ArrowRight className="rotate-180" size={20} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="size-12 rounded-full bg-slate-900 flex items-center justify-center text-white active:bg-[#7bbd25] transition-all shadow-lg"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Container: Slider on Mobile (with Ref), Grid on Desktop */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto pb-8 md:pb-0 md:grid md:grid-cols-5 gap-4 md:gap-2 snap-x snap-mandatory scrollbar-hide no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {[
              "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302434/0fc480c8-6acf-4ff0-a587-cea5c58e069b_lii8qp.jpg",
              "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302469/3eff6049-8246-4172-859b-2b6ecad4a9da_kbigrv.jpg",
              "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302518/7e586c73-db01-4e96-aeb5-ab0a83b14714_dmsnrp.jpg",
              "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302534/57f06c99-83a3-467b-ab68-c0f1a57ea899_v2ovpk.jpg",
              "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302548/37e48444-39eb-4c31-83e6-77bd9029cf55_atnrah.jpg",
              "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302570/2e52526a-bb97-4628-8b23-8facf9e28c73_zzazcn.jpg",
              "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302598/bd4a46fe-4b00-4d42-8a64-19677841ec23_mexmji.jpg",
              "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302623/2f2687a2-eb32-4584-84d0-afffeab3406c_fan0jr.jpg",
              "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302625/e51625c5-4e05-45ee-ade3-3739297e5a59_chikgj.jpg",
              "https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302654/455f921f-c6bf-4385-8da6-396c523e5dd4_qkp4bc.jpg",
            ].map((url, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative min-w-[85%] md:min-w-0 aspect-square overflow-hidden bg-slate-100 border-[8px] border-transparent md:hover:border-white transition-all duration-500 z-10 snap-center"
              >
                <img
                  src={`${url}?q=80&w=800&auto=format&fit=crop`}
                  alt="Field Work"
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <span className="text-[9px] font-black text-white uppercase tracking-tighter">
                    Frame 0{index + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Pagination Tracker */}
          <div className="mt-8 flex md:hidden items-center justify-between">
            <div className="h-[1px] flex-1 bg-slate-100 relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#7bbd25]"
                style={{ width: "30%" }} // You could make this dynamic based on scroll position
              />
            </div>
            <span className="ml-6 text-[10px] font-black uppercase text-slate-400">
              Manual Scroll Enabled
            </span>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 md:px-12 bg-[#fcfdfd] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header - Overlapping Layout */}
          <div className="relative mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[1px] w-12 bg-[#4a703f]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                The Gauyog Kendr Advantages
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-[-0.05em] leading-[0.85] z-10 relative">
              Why <br /> <span className="text-[#4a703f]">Gauyog Kendr</span>
            </h2>

            <span className="absolute -bottom-10 right-0 text-[12vw] font-black text-slate-50 opacity-[0.04] select-none pointer-events-none uppercase tracking-tighter">
              Ethical
            </span>
          </div>

          {/* --- THE FEATURE STACK --- */}
          <div className="flex flex-col">
            {reasons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative py-10 md:py-14 border-b border-slate-100 flex flex-col md:flex-row md:items-center gap-8 md:gap-16 hover:bg-[#fcfdfd ]/50 transition-all duration-500 px-4 md:px-8 overflow-hidden"
              >
                {/* Left Side: Large Dynamic Number Glyph */}
                <div className="relative flex items-center md:w-1/4">
                  <span className="text-7xl md:text-8xl font-black leading-none tracking-tighter text-slate-700 group-hover:text-[#7bbd25] transition-colors duration-500 relative z-10">
                    0{index + 1}
                  </span>
                  {/* Animated Background Fill for Number */}
                  <motion.div
                    className={`absolute left-0 bottom-0 w-full h-0 group-hover:h-full ${item.color} opacity-10 transition-all duration-500 -z-10 rounded-xl`}
                  />
                  {/* Vertical Accent Line */}
                  <div
                    className={`ml-6 h-12 w-[2px] bg-slate-100 group-hover:bg-[#7bbd25] transition-all duration-500 hidden md:block`}
                  />
                </div>

                {/* Middle: Title & Subtitle Stack */}
                <div className="md:w-1/3">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7bbd25] mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    {item.subtitle}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-none">
                    {item.title}
                  </h3>
                </div>

                {/* Right: Description with "Aura" text weight */}
                <div className="md:w-5/12">
                  <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium group-hover:text-slate-700 transition-colors">
                    {item.desc}
                  </p>
                </div>

                {/* Hover Interaction: Subtle Side Glow */}
                <div
                  className={`absolute left-0 top-0 w-[4px] h-0 group-hover:h-full transition-all duration-500 ${item.color}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 md:px-12 bg-[#fcfdfd ] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-stretch gap-0 bg-white rounded-[40px] md:rounded-[60px] border border-slate-100 shadow-sm overflow-hidden">
            {/* LEFT SIDE: THE BRAND IMAGE (Replacing the Map) */}
            {/* LEFT SIDE: THE BRAND IMAGE (FIXED Visibility) */}
            <div className="lg:w-5/12 relative min-h-[400px] lg:min-h-full overflow-hidden group bg-slate-50 border-r border-slate-100 flex items-center justify-center">
              {/* The Image - Swapped object-cover for object-contain */}
              <img
                src="https://res.cloudinary.com/dbpzzvcik/image/upload/v1775037259/cow_v6ymwb.png"
                alt="Gauyog Kendr Sanctuary"
                className="w-full h-auto max-h-[90%] object-contain object-center transform transition-transform duration-1000 group-hover:scale-110 p-4"
              />

              {/* NEW: Modern gradient for text readability (Required since bg is now light) */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-900/60 to-transparent z-[5]" />

              {/* Floating Label (Z-index updated for readability) */}
              <div className="absolute bottom-10 left-10 z-[10] drop-shadow-lg">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/90">
                  The Sanctuary
                </span>
                <h3 className="text-4xl font-black text-white tracking-tighter italic">
                  Gauyog Kendr.
                </h3>
              </div>
            </div>

            {/* RIGHT SIDE: THE INFORMATION GRID */}
            <div className="lg:w-7/12 p-8 md:p-16 lg:p-20 flex flex-col justify-between space-y-16">
              {/* 01. Heading & Socials */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                <div className="max-w-xs">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 mb-4"
                  >
                    <div className="size-1.5 rounded-full bg-[#7bbd25]" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                      Reach Out
                    </span>
                  </motion.div>
                  <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                    Let's
                    <span className="text-[#7bbd25]"> Connect.</span>
                  </h2>
                </div>

                {/* Modern Social Pills */}
                <div className="flex gap-3">
                  {[
                    <Instagram size={18} />,
                    <Linkedin size={18} />,
                    <Facebook size={18} />,
                    <Youtube size={18} />,
                  ].map((icon, i) => (
                    <div
                      key={i}
                      className="size-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#7bbd25] hover:text-white transition-all duration-500 cursor-pointer"
                    >
                      {icon}
                    </div>
                  ))}
                </div>
              </div>

              {/* 02. Contact Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8">
                {/* Address */}
                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin size={16} className="text-[#7bbd25]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-[#4a703f] transition-colors">
                      Our Space
                    </span>
                  </div>
                  <p className="text-lg font-bold text-slate-900 leading-snug">
                    01, IN Village Badalpara Taluka Veraval, Gir Somnath,
                    Prabhas Patan Junagadh, Gujarat, India-362268
                  </p>
                </div>

                {/* Communication */}
                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail size={16} className="text-[#7bbd25]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-[#4a703f] transition-colors">
                      Direct Lines
                    </span>
                  </div>
                  <p className="text-lg font-bold text-slate-900">
                    +91 79849 97996 <br />
                    +91 93282 91724
                  </p>
                  <p className="text-lg font-bold text-slate-500 hover:text-slate-900 transition-colors">
                    john@gauyogkendr.com
                  </p>
                </div>

                {/* Availability */}
                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock size={16} className="text-[#7bbd25]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-[#4a703f] transition-colors">
                      Hours
                    </span>
                  </div>
                  <p className="text-lg font-bold text-slate-900">Mon — Sat</p>
                  <p className="text-slate-500 font-medium italic text-sm">
                    9:00 AM to 7:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default about;
