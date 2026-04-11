import React from "react";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkle, Trees } from "lucide-react";
import { Target, Eye, ShieldCheck } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Instagram, Linkedin, Facebook, Youtube } from "lucide-react";
import {
  Mail,
  Flame,
  Leaf,
  CheckCircle2,
  Factory,
  Users2,
  Globe2,
  Sprout,
} from "lucide-react";
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
      color: "bg-red-600", // Vedic Green
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
      color: "bg-[#4a703f]", // Acid Green
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
  const advantageData = [
    {
      title: "Own Manufacturing",
      subtitle: "In-House Quality",
      desc: "In-house production facility in Gujarat with full quality control.",
      icon: <Factory strokeWidth={1.5} />,
      color: "text-[#4a703f]",
      dotColor: "bg-[#4a703f]",
    },
    {
      title: "Women & Community",
      subtitle: "Rural Livelihoods",
      desc: "Our workforce is majority women from local villages.",
      icon: <Users2 strokeWidth={1.5} />,
      color: "text-[#d4a044]",
    },
    {
      title: "International Expertise",
      subtitle: "Global Standards",
      desc: "Bridging Indian organics with global market needs.",
      icon: <Globe2 strokeWidth={1.5} />,
      color: "text-blue-600",
    },
    {
      title: "Farmer Focused",
      subtitle: "Natural Success",
      desc: "Helping farmers succeed with natural, effective methods.",
      icon: <Sprout strokeWidth={1.5} />,
      color: "text-[#4a703f]",
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
    <div className="mt-20">
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20 overflow-hidden bg-[#fcfdfd]">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#4a703f]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#e9aa43]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-8 bg-[#4a703f]" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#4a703f]">
                  Modern Vedic Alchemists
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-8xl font-black text-slate-900 tracking-[-0.05em] leading-[0.85] mb-8">
                Pure by Nature
                <br />
                <span className="text-[#4a703f] italic"> Proven by Earth.</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-500 font-medium max-w-xl leading-relaxed mb-10 border-l-2 border-slate-200 pl-6">
                We bring together tradition and sustainability to create a
                healthier, more conscious way of living.
              </p>

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
                  className="px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] text-[#4a703f] border-2 border-[#4a703f]/30 hover:border-[#4a703f] transition-all active:scale-95"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="aspect-[4/5] bg-slate-200 rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] ">
                <img
                  src="https://res.cloudinary.com/dbpzzvcik/image/upload/v1775824342/132978ec-ec4c-4c94-86e6-5d716252c48b_g9qfri.jpg"
                  alt="Vedic Dhoop Ritual"
                  className="w-full h-full object-cover "
                />
              </div>

              <div className="absolute -bottom-6 -right-6 -z-10 size-full border-2 border-[#4a703f]/20 rounded-[60px]" />
            </motion.div>
          </div>
        </div>
      </section>
      <div className="bg-[#fcfdfd ] min-h-screen text-slate-900 selection:bg-[#4a703f]/30">
        <div className="fixed top-0 right-0 w-[40%] h-[40%] bg-[#4a703f]/5 rounded-full blur-[120px] -z-10" />
        <div className="bg-[#4a703f]">
          <main className="max-w-[1400px] mx-auto px-6 py-12 ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-6xl md:text-8xl font-black text-slate-100 tracking-tighter leading-[0.85]">
                Built <span className="text-[#4a703f]">on Truth.</span>
              </h2>
            </motion.div>

            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-100 to-transparent hidden md:block" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 relative z-10">
                {missionCards.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative group flex flex-col items-center md:items-start text-center md:text-left px-4"
                  >
                    <div className="relative mb-8">
                      <div
                        className={`absolute inset-0 rounded-full blur-2xl opacity-20 group-hover:opacity-40 group-hover:scale-150 transition-all duration-700 ${card.color}`}
                      />

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

                    <div className="space-y-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-black uppercase tracking-[0.4em] text-slate-300 group-hover:text-[#4a703f] transition-colors">
                          0{index + 1}
                        </span>
                        <h3 className="text-2xl font-black tracking-tight text-[#4a703f]">
                          {card.title}
                        </h3>
                      </div>

                      <p className="text-sm font-bold uppercase tracking-widest text-[#4a703f]/60 italic">
                        {card.subtitle}
                      </p>

                      <p className="text-slate-100 text-sm md:text-base leading-relaxed font-medium max-w-[280px]">
                        {card.desc}
                      </p>
                    </div>

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
          </main>
        </div>
        <div className="w-full bg-[#fdfcfb]">
          {/* SECTION 1: OUR PARTNERSHIP */}
          <section className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Image Placeholder */}
            <div className="lg:col-span-4">
              <div className="aspect-[3/4] rounded-[32px] overflow-hidden bg-gradient-to-br from-[#4a703f]/20 to-[#4a703f]/40 relative border border-slate-100 shadow-sm">
                <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                  <p className="text-[#4a703f]  italic text-sm opacity-60">
                    John, Hitesh and Ram at our Gujarat facility
                  </p>
                </div>
                <img
                  src="https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302434/0fc480c8-6acf-4ff0-a587-cea5c58e069b_lii8qp.jpg"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Text Content */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4a044]">
                  Our Partnership
                </span>
                <h2 className="text-4xl md:text-5xl  font-bold text-[#2d3a29] leading-tight">
                  Where Western Vision Meets Indian Heritage
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed font-medium">
                  Gauyog Kendr is a unique collaboration — a hands-on
                  partnership between international business strategy and
                  deep-rooted Indian agricultural expertise.
                </p>
              </div>

              <div className="space-y-6 text-slate-600 leading-relaxed text-base">
                <p>
                  John Paynter brings decades of international business
                  experience, connecting Gauyog Kendr’s premium organic products
                  to global markets across Europe, the Middle East, and Africa.
                  Working alongside him, Hitesh Pampaniya leads manufacturing
                  operations in Gujarat, drawing on generations of farming
                  knowledge and managing a dedicated team of local workers.
                  Rambhai, the third director, plays a vital role on the ground
                  — overseeing day-to-day production, coordinating with local
                  farming communities, and ensuring every product meets Gauyog
                  Kendr’s exacting standards.
                </p>
                <p>
                  Together, the three directors have built a company where
                  Western quality standards meet traditional Indian organic
                  methods — and where coconut palms sway alongside composting
                  operations under the Gujarat sun. It’s a partnership built on
                  trust, shared values, and a genuine passion for what mother
                  earth can provide.
                </p>
              </div>

              {/* Director Avatars */}
              {/* <div className="flex flex-wrap gap-8 pt-4">
                <Director
                  name="John Paynter"
                  role="International Strategy Director"
                  initial="JP"
                />
                <Director
                  name="Hitesh Pampaniya"
                  role="Managing Director, India Operations"
                  initial="HP"
                />
                <Director
                  name="Rambhai"
                  role="Director, Production & Community"
                  initial="R"
                />
              </div> */}
            </div>
          </section>
          <section className="py-32 px-6 bg-[#fcfdfd] overflow-hidden border-y">
            <div className="max-w-7xl mx-auto">
              {/* --- Unified Header Section --- */}
              <div className="relative mb-24 max-w-2xl">
                {/* Faint watermark text for depth */}
                <span className="absolute top-0 right-0 text-[10vw] font-black text-[#4a703f] opacity-[0.02] select-none pointer-events-none uppercase tracking-tighter">
                  TRUST
                </span>

                <div className="flex items-center gap-3 mb-5">
                  <div className="h-[1px] w-12 bg-[#4a703f]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                    The Gauyog Kendr Advantages
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-slate-950 tracking-[-0.05em] leading-[0.85]">
                  Why <span className="text-[#4a703f]">Gauyog Kendr</span>
                </h2>
                <p className="text-slate-500 text-xl leading-relaxed mt-6 font-medium">
                  A cohesive approach combining production control, social
                  empowerment, and global market vision.
                </p>
              </div>

              {/* --- Modern 4-in-One-Row Layout --- */}
              {/* The design uses overlapping soft glows instead of boxes to connect the items */}
              <div className="relative">
                {/* Subtle Background Glows that connect the columns */}
                <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#4a703f]/5 rounded-full blur-[100px] -z-10" />
                <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-[#d4a044]/5 rounded-full blur-[80px] -z-10" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-16 items-start relative">
                  {advantageData.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="group flex flex-col items-center md:items-start text-center md:text-left space-y-5"
                    >
                      {/* Main Content Area */}
                      <div className="space-y-4">
                        {/* Modernized Icon with soft glow */}
                        <div
                          className={`relative ${item.color} group-hover:scale-110 transition-transform duration-500`}
                        >
                          <div className="absolute inset-0 bg-current opacity-10 blur-xl rounded-full" />
                          <span className="text-5xl block relative z-10">
                            {item.icon}
                          </span>
                        </div>

                        {/* Subtitle / Labelling */}
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-slate-600 transition-colors pt-2">
                          {item.subtitle}
                        </p>

                        {/* Main Title - Smaller and cleaner */}
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                          {item.title}
                        </h3>

                        {/* Description - Cleaner line width for readability */}
                        <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium max-w-xs group-hover:text-slate-800 transition-colors">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: COMMUNITY & WOMEN */}
          <section className="bg-[#4a703f] text-white py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4a044]">
                    Community & Women
                  </span>
                  <h2 className="text-4xl md:text-5xl  font-bold leading-tight">
                    Empowering the Hands that Feed the Earth
                  </h2>
                </div>

                <div className="space-y-6 text-white/80 leading-relaxed font-medium">
                  <p>
                    At Gauyog Kendr, the women of Gujarat are the backbone of
                    our production — and our proudest story.
                  </p>
                  <p>
                    Our facility provides meaningful employment to women from
                    local communities who sort, process, and prepare raw organic
                    materials by hand. From sorting fresh green leaves for
                    bio-inputs to operating weighing stations, these women bring
                    skill, care, and dedication to every product we make.
                  </p>
                  <p>
                    We believe sustainable business means investing in the
                    people around you. By offering fair wages, safe working
                    conditions, and steady employment in rural Gujarat, we help
                    families thrive while producing the purest organic products
                    possible. When you choose Gauyog Kendr, you’re supporting a
                    community — not just buying a product.
                  </p>
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                  <Stat value="60%+" label="WOMEN WORKFORCE" />
                  <Stat value="50+" label="LOCAL FAMILIES SUPPORTED" />
                  <Stat value="100%" label="FAIR WAGE COMMITMENT" />
                </div>
              </div>

              {/* Pure Image Grid Column */}
              <div className="grid grid-cols-2 gap-4">
                {/* Card 1: Hand-Sorted */}
                <div className="group aspect-square bg-[#336a36] rounded-3xl border border-white/10 overflow-hidden relative shadow-inner">
                  {/* Full Image */}
                  <img
                    src="https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302625/e51625c5-4e05-45ee-ade3-3739297e5a59_chikgj.jpg" // Replace with your image path (cover recommended)
                    alt="Hand-sorted workforce"
                    className="w-full h-full object-cover  filter brightness-110 transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Optional subtle gradient overlay to match dark brand */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Card 2: Quality Weighed */}
                <div className="group aspect-square bg-[#336a36] rounded-3xl border border-white/10 overflow-hidden relative shadow-inner">
                  {/* Full Image */}
                  <img
                    src="https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302570/2e52526a-bb97-4628-8b23-8facf9e28c73_zzazcn.jpg" // Replace with your image path (cover recommended)
                    alt="Quality weighing process"
                    className="w-full h-full object-cover filter brightness-110 transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Card 3: Stronger Together (Wide) */}
                <div className="group col-span-2 aspect-[2/1] rounded-3xl border border-white/10 overflow-hidden relative shadow-inner">
                  {/* Full Image */}
                  <img
                    src="https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302469/3eff6049-8246-4172-859b-2b6ecad4a9da_kbigrv.jpg" // Replace with your image path (contain or cover recommended)
                    alt="Gauyog Kendr full team"
                    className="w-full h-full object-cover filter brightness-110 transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="py-16 px-6 md:px-12 bg-[#fcfdfd]">
          <div className="max-w-7xl mx-auto">
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
                  <span className="text-[#4a703f]">Behind the Bloom.</span>
                </h2>
              </div>
              <p className="text-slate-500 font-medium max-w-xs text-lg leading-relaxed border-l-2 border-slate-100 pl-4">
                A small group of seekers dedicated to restoring the purity of
                ancient Himalayan traditions.
              </p>
            </div>

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
                  <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden bg-slate-100 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-slate-200">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    />

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

                    <div
                      className={`absolute inset-0 ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none`}
                    />
                  </div>

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

                  <span className="absolute -top-4 -right-2 text-6xl font-black text-slate-100/50 -z-10 group-hover:text-slate-100 transition-colors">
                    0{index + 1}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <section className="py-24 px-6 md:px-12 bg-[#4a703f] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className=" flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
                    Behind the Scenes
                  </span>
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-100 leading-[0.9]">
                  From Our Hands <br />{" "}
                  <span className="text-[#e9aa43]"> To Your Fields</span>
                </h2>
              </div>
              <p className="text-slate-100 font-medium text-lg leading-relaxed border-l-2 border-slate-100 pl-4">
                A glimpse into our operations — the people, processes, and
                passion behind every Gauyog Kendr product.
              </p>
            </div>

            <div className="flex md:hidden items-center gap-4">
              <button
                onClick={() => scroll("left")}
                className="size-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-900 active:bg-[#4a703f] active:text-white transition-all"
              >
                <ArrowRight className="rotate-180" size={20} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="size-12 rounded-full bg-slate-900 flex items-center justify-center text-white active:bg-[#4a703f] transition-all shadow-lg"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

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

          <div className="mt-8 flex md:hidden items-center justify-between">
            <div className="h-[1px] flex-1 bg-slate-100 relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#4a703f]"
                style={{ width: "30%" }} // You could make this dynamic based on scroll position
              />
            </div>
            <span className="ml-6 text-[10px] font-black uppercase text-slate-400">
              Manual Scroll Enabled
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
function Director({ name, role, initial }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 rounded-full bg-[#1e4620] text-white flex items-center justify-center font-bold text-sm">
        {initial}
      </div>
      <div>
        <h4 className="text-sm font-black text-slate-900">{name}</h4>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          {role}
        </p>
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="space-y-1">
      <div className="text-2xl font-bold text-[#d4a044]">{value}</div>
      <div className="text-[9px] font-black tracking-widest text-white/60 leading-tight uppercase">
        {label}
      </div>
    </div>
  );
}
export default about;
