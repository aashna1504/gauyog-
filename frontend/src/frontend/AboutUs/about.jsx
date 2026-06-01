import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { clUrl, clSrcSet } from "../../utils/cloudinary";
import { ArrowUpRight, Sparkle, Trees } from "lucide-react";
import { Target, Eye, ShieldCheck } from "lucide-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  TrendingUp,
} from "lucide-react";
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
      color: "bg-[#744926]",
      glowColor: "text-green-100/60",
    },
    {
      title: "Vision",
      subtitle: "Where we're going",
      desc: "To regenerate the living soil of millions of farms — replacing harmful chemicals with the wisdom of nature — so that land grows richer with every harvest, and natural farming becomes the way the world grows once again.",
      icon: <Eye className="text-white" size={20} />,
      color: "bg-[#744926]",
      glowColor: "text-amber-100/60",
    },
    {
      title: "Values",
      subtitle: "What we stand for",
      desc: "We stand for purity, authenticity, and sustainability in everything we do. Our values are rooted in trust, ethical practices, and respect for nature. We are committed to delivering quality while preserving traditional wisdom.",
      icon: <ShieldCheck className="text-white" size={20} />,
      color: "bg-[#744926]",
      glowColor: "text-green-50/60",
    },
  ];
  const team = [
    {
      name: "John Paynter",
      role1: "Director",
      role: "International Strategy Lead",
      bio: "An Australian finance veteran and former brokerage owner. John bridges global business acumen with a deep passion for eco-organic investing to drive Gauyog Kendr's strategic growth.",
      image:
        "https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto:best,f_auto/v1775126971/c01d8c99-c1ae-4d5d-b8b1-c0c0a77dd43b_fvjb28.jpg",
      color: "bg-[#4a703f]", // Vedic Green
    },
    {
      name: "Hitesh Pampania",
      role1: "Co-Founder & Director",
      role: "Technology, Research & Scale",
      bio: "Hitesh Pampania is a Computer Engineer with over 10 years of experience in IT, website development, and digital systems, including operating businesses in Australia. Guided by a strong commitment to sustainable agriculture and rural empowerment, he transitioned his career toward organic fertilizer production in India. Hitesh conducted extensive field research across Gujarat, particularly in the Kutch region, to develop high-quality cow dung and cow urine-based organic fertilizers. His work focuses on improving soil health, supporting organic farming, and increasing the economic value of cows to promote their protection. By integrating technology, research, and sustainability, he plays a key role in scaling Gauyog Kendr’s impact across farming communities.",
      image:
        "https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto:best,f_auto/v1775126951/bc1fca8d-38aa-49f5-8bf9-c966891a4b3f_qw61xd.jpg",
      color: "bg-[#4a703f]", // Golden Amber
    },
    {
      name: "Rambhai Barad",
      role1: "Co-Founder & Director",
      role: "Operations & Regional Leadership",
      bio: "Rambhai Barad is a respected entrepreneur with strong business roots across Gujarat especially in the Somnath region. With extensive experience in construction distribution and large-scale commercial operations he brings operational strength and regional leadership to the organization. His involvement in Gauyog Kendr is purpose-driven rather than profit-driven  Rambhai’s primary goals are cow protection employment generation for rural communities and supporting the transition of Gujarat’s farmland toward organic agriculture. He views this initiative as a way into give back to nature strengthen village economies and create long-term environmental impact.",
      image:
        "https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto:best,f_auto/v1775126939/3ca0fa6d-4b0c-446f-9f12-2bedba055316_crr926.jpg",
      color: "bg-[#4a703f]", // Acid Green
    },
  ];
  const advantageData = [
    {
      title: "Own Manufacturing",
      subtitle: "In-House Quality",
      desc: "In-house production facility in Gujarat with full quality control.",
      icon: <Factory strokeWidth={1.5} />,
      color: "text-[#744926]",
      dotColor: "bg-[#744926]",
    },
    {
      title: "Women & Community",
      subtitle: "Rural Livelihoods",
      desc: "Our workforce is majority women from local villages.",
      icon: <Users2 strokeWidth={1.5} />,
      color: "text-[#744926]",
    },
    {
      title: "International Expertise",
      subtitle: "Global Standards",
      desc: "Bridging Indian organics with global market needs.",
      icon: <Globe2 strokeWidth={1.5} />,
      color: "text-[#744926]",
    },
    {
      title: "Farmer Focused",
      subtitle: "Natural Success",
      desc: "Helping farmers succeed with natural, effective methods.",
      icon: <Sprout strokeWidth={1.5} />,
      color: "text-[#744926]",
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
  const features = [
    {
      title: "Soil Vitality",
      desc: "Restoring health with essential microbes.",
      icon: <Sprout size={18} />,
      color: "#744926",
    },
    {
      title: "Pure Growth",
      desc: "100% chemical-free agricultural solutions.",
      icon: <ShieldCheck size={18} />,
      color: "#744926",
    },
    {
      title: "Higher Yield",
      desc: "Optimized root strength & productivity.",
      icon: <TrendingUp size={18} />,
      color: "#744926",
    },
    {
      title: "Vedic Roots",
      desc: "Sustainable traditions for the future.",
      icon: <Leaf size={18} />,
      color: "#744926",
    },
  ];
  const scrollRef = useRef(null);
  const partnershipImages = [
    "https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto:best,f_auto/v1778739066/DSC00727_1_cgyreu.jpg",
    "https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto:best,f_auto/v1778740839/DSC00531_1_ufdg3f.jpg",

    "https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto:best,f_auto/v1778739371/DSC00751_1_oj5pup.jpg",
    "https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto:best,f_auto/v1778742848/DSC00757_1_mrx5rk.jpg",
    "https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto:best,f_auto/v1778742258/DSC00611_1_ckc6b8.jpg",
  ];
  const [partnershipSlide, setPartnershipSlide] = useState(0);

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = current.offsetWidth * 0.8; // Match the 80% width of cards
    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (partnershipImages.length <= 1) return;
    const timer = setInterval(() => {
      setPartnershipSlide((prev) => (prev + 1) % partnershipImages.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [partnershipImages.length]);

  const prevPartnershipSlide = () => {
    setPartnershipSlide((prev) =>
      prev === 0 ? partnershipImages.length - 1 : prev - 1,
    );
  };

  const nextPartnershipSlide = () => {
    setPartnershipSlide((prev) => (prev + 1) % partnershipImages.length);
  };
  return (
    <div className="mt-20">
      <section className="relative flex items-center justify-center px-4 md:px-6 py-8 md:py-12 overflow-hidden bg-[#fcfdfd]">
        {/* --- LAYER 1: ABSTRACT BACKGROUND DNA --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Geometric Rings */}
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full border border-[#4a703f]/10" />
          <div className="absolute top-[-12%] left-[-7%] w-[600px] h-[600px] rounded-full border border-[#4a703f]/5" />

          {/* Subtle Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] grayscale"
            style={{
              backgroundImage: "radial-gradient(#4a703f 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* --- LEFT: COMPACT NARRATIVE --- */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-3 md:mb-6">
                  <div className="h-[1px] w-10 bg-[#4a703f]" />
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#4a703f]">
                    POWERED BY NATURE
                  </span>
                </div>

                <h1 className="text-3xl md:text-7xl font-black text-slate-900 tracking-wider leading-[1] md:leading-[0.9] mb-4 md:mb-8">
                  Pure by Nature <br />
                  <span className="text-[#4a703f] italic underline decoration-[#744926]/80 tracking-wider underline-offset-4">
                    Proven by Earth.
                  </span>
                </h1>

                <div className="flex flex-wrap items-center gap-4 md:gap-8">
                  <p className="text-base text-slate-500 font-medium max-w-sm leading-relaxed border-l-2 border-[#744926] pl-6">
                    Transforming ancient wisdom into biological solutions for
                    restoring soil health and farmer prosperity.
                  </p>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => (window.location.href = "/shop")}
                      className="group bg-[#744926] text-white p-5 rounded-full transition-all shadow-xl shadow-[#4a703f]/20"
                    >
                      <ArrowUpRight
                        size={24}
                        className="group-hover:rotate-45 transition-transform"
                      />
                    </button>
                    <span
                      onClick={() => (window.location.href = "/shop")}
                      className="text-[10px] font-black uppercase tracking-widerst text-slate-900"
                    >
                      Explore <br />
                      Products
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* --- RIGHT: THE 4 PILLARS (Replaces Single Image) --- */}
            <div className="lg:col-span-5 relative py-4 md:py-8">
              <div className="space-y-5 md:space-y-10 relative">
                {/* Vertical Connecting Line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#744926] via-slate-200 to-transparent" />

                {[
                  {
                    n: "01",
                    t: "Respect the Soil",
                    d: "Healthy soil is the foundation of all life. Our products restore biology naturally.",
                  },
                  {
                    n: "02",
                    t: "Honour Tradition",
                    d: "Centuries of Indian wisdom — Gir cow dung and time-tested methods.",
                  },
                  {
                    n: "03",
                    t: "Help Farmers Thrive",
                    d: "Making organic inputs affordable to switch from chemical to natural.",
                  },
                  {
                    n: "04",
                    t: "Protect the Planet",
                    d: "A circular economy transforming agricultural waste into healing inputs.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * i }}
                    className="relative pl-10 group"
                  >
                    {/* Node Dot */}
                    <div className="absolute left-0 top-1 w-[22px] h-[22px] rounded-full border-2 bg-white shadow-md flex items-center justify-center z-10 border-[#4a703f] transition-all">
                      <div className="w-2 h-2 rounded-full bg-[#4a703f]" />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-[#744926] tracking-wider">
                          {item.n}
                        </span>
                        <h3 className="text-sm font-black uppercase tracking-widerst text-slate-900 group-hover:text-[#4a703f] transition-colors">
                          {item.t}
                        </h3>
                      </div>
                      <p className="text-[12px] text-slate-500 font-medium leading-relaxed mt-1 max-w-xs">
                        {item.d}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* --- BOTTOM: COMPACT FEATURE GRID --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-1 pt-5 md:pt-10 border-t border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
          >
            {features.map((item, idx) => (
              <div key={idx} className="group cursor-default">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    style={{ color: item.color }}
                    className="opacity-80 group-hover:scale-110 transition-transform"
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-[11px] font-black uppercase tracking-widerst text-slate-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[12px] text-slate-500 font-medium leading-relaxed group-hover:text-slate-900 transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      <div className="bg-[#fcfdfd ] min-h-screen text-slate-900 selection:bg-[#4a703f]/30">
        <div className="fixed top-0 right-0 w-[40%] h-[40%] bg-[#4a703f]/5 rounded-full blur-[120px] -z-10" />
        <div className="bg-[#4a703f]">
          <main className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-5 md:mb-16"
            >
              <h2 className="text-3xl md:text-8xl font-black text-slate-100 tracking-wider  md:leading-[0.85]">
                Built <span className="text-[#e9aa43]">on Truth.</span>
              </h2>
            </motion.div>

            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-100 to-transparent hidden md:block" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 relative z-10">
                {missionCards.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative group flex flex-row md:flex-col items-start gap-4 md:gap-0 md:items-start text-left md:text-left px-3 md:px-4 py-3 md:py-0 bg-white/5 md:bg-transparent rounded-2xl md:rounded-none"
                  >
                    <div className="relative flex-shrink-0 mb-0 md:mb-8">
                      <div
                        className={`absolute inset-0 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700 ${card.color}`}
                      />
                      <div className="relative z-10 rounded-full border border-slate-100 bg-white flex items-center justify-center shadow-sm w-10 h-10 md:w-12 md:h-12">
                        <div
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${card.color} flex items-center justify-center text-white shadow-inner`}
                        >
                          {React.cloneElement(card.icon, { size: 16 })}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 md:space-y-3 flex-1 min-w-0">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
                          0{index + 1}
                        </span>
                        <h3 className="text-base md:text-2xl font-black tracking-wider text-[#e9aa43]">
                          {card.title}
                        </h3>
                      </div>

                      <p className="hidden md:block text-sm font-bold uppercase tracking-widerst text-[#4a703f]/60 italic">
                        {card.subtitle}
                      </p>

                      <p className="text-slate-200 text-xs md:text-base leading-relaxed font-medium">
                        {card.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </main>
          <div className="flex justify-center items-center py-4 md:pb-8">
            <button className="w-[260px] md:w-[300px] py-3 md:py-4 bg-[#744926] text-white rounded-full font-black uppercase tracking-widerst text-xs flex items-center justify-center gap-2">
              Contact Us
            </button>
          </div>
        </div>
        <div className="w-full bg-[#fdfcfb]">
          {/* SECTION 1: OUR PARTNERSHIP */}
          <section className="max-w-7xl mx-auto py-8 md:py-20 px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-start">
            {/* Left Image Placeholder */}
            <div className="lg:col-span-4">
              <div className="h-[300px] w-full lg:h-auto lg:aspect-[3/4] rounded-[32px] overflow-hidden relative border border-slate-100 shadow-sm bg-[#eef5ea]">
                <motion.img
                  key={partnershipSlide}
                  src={clUrl(partnershipImages[partnershipSlide], 700)}
                  srcSet={clSrcSet(partnershipImages[partnershipSlide], [350, 700, 900])}
                  sizes="(max-width: 1024px) 100vw, 420px"
                  alt="Partnership"
                  initial={{ opacity: 0.7, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={700}
                  height={933}
                />

                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/55 to-transparent">
                  <p className="text-white/90 italic text-sm">
                    John, Hitesh and Ram at our Gujarat facility
                  </p>
                </div>

                {partnershipImages.length > 1 && (
                  <>
                    <button
                      onClick={prevPartnershipSlide}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-[#2d3a29] flex items-center justify-center hover:bg-white transition-colors"
                      aria-label="Previous partnership image"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      onClick={nextPartnershipSlide}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-[#2d3a29] flex items-center justify-center hover:bg-white transition-colors"
                      aria-label="Next partnership image"
                    >
                      <ArrowRight size={16} />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                      {partnershipImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setPartnershipSlide(idx)}
                          className={`h-2 rounded-full transition-all ${
                            idx === partnershipSlide
                              ? "w-6 bg-white"
                              : "w-2 bg-white/60 hover:bg-white/90"
                          }`}
                          aria-label={`Go to partnership image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Text Content */}
            <div className="lg:col-span-8 space-y-5 md:space-y-8">
              <div className="space-y-2 md:space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#e9aa43]">
                  Our Partnership
                </span>
                <h2 className="text-2xl md:text-5xl font-bold text-[#2d3a29] ">
                  Where Western Vision Meets Indian Heritage
                </h2>
                <p className="text-slate-700 text-sm md:text-lg leading-relaxed font-medium">
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
          <section className="py-12 md:py-32 px-4 md:px-6 bg-[#fcfdfd] overflow-hidden border-y">
            <div className="max-w-7xl mx-auto">
              {/* --- Unified Header Section --- */}
              <div className="relative mb-10 md:mb-24 max-w-2xl">
                {/* Faint watermark text for depth */}
                <span className="absolute top-0 right-0 text-[10vw] font-black text-[#4a703f] opacity-[0.02] select-none pointer-events-none uppercase tracking-wider">
                  TRUST
                </span>

                <div className="flex items-center gap-3 mb-2">
                  <div className="h-[1px] w-12 bg-[#4a703f]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
                    The Gauyog Kendr Advantages
                  </span>
                </div>
                <h2 className="text-3xl md:text-7xl font-black text-slate-950 tracking-wider  md:leading-[0.85]">
                  Why <span className="text-[#4a703f]">Gauyog Kendr</span>
                </h2>
                <p className="text-slate-500 text-sm md:text-xl leading-relaxed mt-3 md:mt-6 font-medium">
                  A cohesive approach combining production control, social
                  empowerment, and global market vision.
                </p>
              </div>

              {/* --- Modern 4-in-One-Row Layout --- */}
              {/* The design uses overlapping soft glows instead of boxes to connect the items */}
              <div className="relative">
                {/* Subtle Background Glows that connect the columns */}
                <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#4a703f]/5 rounded-full blur-[100px] -z-10" />
                <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-[#e9aa43]/5 rounded-full blur-[80px] -z-10" />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-12 md:gap-y-16 items-start relative">
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
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-600 group-hover:text-slate-800 transition-colors pt-2">
                          {item.subtitle}
                        </p>

                        {/* Main Title - Smaller and cleaner */}
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-wider ">
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
          <section className="bg-[#4a703f] text-white py-10 md:py-24 px-4 md:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="space-y-5 md:space-y-8">
                <div className="space-y-2 md:space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#e9aa43]">
                    Community & Women
                  </span>
                  <h2 className="text-2xl md:text-5xl font-bold  tracking-wider">
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
                <div className="grid grid-cols-3 gap-3 md:gap-8 pt-5 md:pt-8 border-t border-white/10">
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
                    src={clUrl("https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/v1778741236/DSC00393_1_wmyf6e.jpg", 600)}
                    srcSet={clSrcSet("https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/v1778741236/DSC00393_1_wmyf6e.jpg", [300, 600])}
                    sizes="(max-width: 1024px) 50vw, 320px"
                    alt="Hand-sorted workforce"
                    className="w-full h-full object-cover filter brightness-110 transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={600}
                  />
                  {/* Optional subtle gradient overlay to match dark brand */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Card 2: Quality Weighed */}
                <div className="group aspect-square bg-[#336a36] rounded-3xl border border-white/10 overflow-hidden relative shadow-inner">
                  {/* Full Image */}
                  <img
                    src={clUrl("https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/v1778741619/DSC00374_1_rc1jjo.jpg", 600)}
                    srcSet={clSrcSet("https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/v1778741619/DSC00374_1_rc1jjo.jpg", [300, 600])}
                    sizes="(max-width: 1024px) 50vw, 320px"
                    alt="Quality weighing process"
                    className="w-full h-full object-cover filter brightness-110 transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Card 3: Stronger Together (Wide) */}
                <div className="group col-span-2 aspect-[2/1] rounded-3xl border border-white/10 overflow-hidden relative shadow-inner">
                  {/* Full Image */}
                  <img
                    src={clUrl("https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/v1778741516/DSC00359_1_yojjjm.jpg", 900)}
                    srcSet={clSrcSet("https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/v1778741516/DSC00359_1_yojjjm.jpg", [480, 900])}
                    sizes="(max-width: 1024px) 100vw, 640px"
                    alt="Gauyog Kendr full team"
                    className="w-full h-full object-cover filter brightness-110 transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    width={900}
                    height={450}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="py-10 md:py-16 px-4 md:px-12 bg-[#fcfdfd]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
              <div className="max-w-xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
                    The Collective
                  </span>
                </motion.div>
                <h2 className="text-3xl md:text-7xl font-black tracking-wider text-slate-900  md:leading-[0.9]">
                  Hands
                  <span className="text-[#4a703f]"> Behind the Bloom.</span>
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
                      src={clUrl(member.image, 600)}
                      srcSet={clSrcSet(member.image, [300, 600])}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                      alt={member.name}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={750}
                    />

                    <div className="absolute inset-x-5 bottom-5 top-20 bg-black/65 backdrop-blur-md border border-white/20 rounded-[24px] p-4 md:p-5 opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 overflow-y-auto">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e9aa43] mb-2">
                        {member.role1}
                      </p>
                      <h3 className="text-lg font-black text-white  mb-2">
                        {member.name}
                      </h3>
                      <p className="text-[13px] font-medium text-white/90 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>

                    <div
                      className={`absolute inset-0 ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none`}
                    />

                    <div className="absolute left-5 bottom-5 bg-white/90 backdrop-blur px-3 py-2 rounded-xl border border-white/70">
                      <p className="text-[9px] uppercase tracking-[0.2em] font-black text-[#744926]">
                        {member.role1}
                      </p>
                      <p className="text-sm font-black text-slate-900 ">
                        {member.name}
                      </p>
                    </div>
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
      <section className="py-10 md:py-24 px-4 md:px-12 bg-[#744926] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
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
                <h2 className="text-3xl md:text-7xl font-black tracking-wider text-slate-100  md:leading-[0.9]">
                  Our Hands To
                  <br />
                  <span className="text-[#e9aa43]">Your Fields</span>
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
                aria-label="Scroll gallery left"
                className="size-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-900 active:bg-[#4a703f] active:text-white transition-all"
              >
                <ArrowRight className="rotate-180" size={20} aria-hidden="true" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll gallery right"
                className="size-12 rounded-full bg-slate-900 flex items-center justify-center text-white active:bg-[#4a703f] transition-all shadow-lg"
              >
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto pb-8 md:pb-0 md:grid md:grid-cols-5 gap-4 md:gap-2 snap-x snap-mandatory scrollbar-hide no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {[
              "v1778741619/DSC00374_1_rc1jjo.jpg",
              "v1778742848/DSC00757_1_mrx5rk.jpg",
              "v1778742382/DSC00385_1_iivpfp.jpg",
              "v1778741405/DSC00367_1_frji1m.jpg",
              "v1778743001/DSC00737_1_yuwn5e.jpg",
              "v1778739708/DSC00642_2_1_vch4fe.jpg",
              "v1778741516/DSC00359_1_yojjjm.jpg",
              "v1778738318/DSC00345_jtxnnk.jpg",
              "v1778741041/DSC00541_1_sofgme.jpg",
              "v1778740839/DSC00531_1_ufdg3f.jpg",
            ].map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative min-w-[85%] md:min-w-0 aspect-square overflow-hidden bg-slate-100 border-[8px] border-transparent md:hover:border-white transition-all duration-500 z-10 snap-center"
              >
                <img
                  src={clUrl(`https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/${path}`, 600)}
                  srcSet={clSrcSet(`https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/${path}`, [300, 600])}
                  sizes="(max-width: 1024px) 85vw, 260px"
                  alt="Field Work"
                  className="w-full h-full object-cover transition-all duration-700"
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={600}
                />
                <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <span className="text-[9px] font-black text-white uppercase tracking-wider">
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
            <span className="ml-6 text-[10px] font-black uppercase text-slate-100">
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
        <p className="text-sm font-black text-slate-900">{name}</p>
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
          {role}
        </p>
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="space-y-1">
      <div className="text-2xl font-bold text-[#e9aa43]">{value}</div>
      <div className="text-[9px] font-black tracking-widerst text-white/60  uppercase">
        {label}
      </div>
    </div>
  );
}
export default about;
