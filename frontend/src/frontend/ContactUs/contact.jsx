import React, { useState, useRef, useEffect } from "react";
import { clUrl, clSrcSet } from "../../utils/cloudinary";
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
    color: "#e9aa43",
  },
];
function MultiSelect({
  placeholder,
  options,
  selected,
  onChange,
  accentColor = "#4a703f",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (val) => {
    onChange(
      selected.includes(val)
        ? selected.filter((v) => v !== val)
        : [...selected, val],
    );
  };

  const displayText = selected.length
    ? selected.length === 1
      ? selected[0]
      : `${selected[0]} +${selected.length - 1} more`
    : placeholder;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full bg-gray-50/50 border px-5 py-3 rounded-full text-left text-sm font-semibold flex items-center justify-between transition-all outline-none ${
          open
            ? "bg-white border-[#4a703f] ring-4 ring-[#4a703f]/5"
            : "border-gray-100 hover:border-gray-200"
        } ${selected.length ? "text-gray-900" : "text-gray-400"}`}
      >
        <span className="truncate pr-2">{displayText}</span>
        <ChevronRight
          size={15}
          className={`shrink-0 transition-transform duration-200 text-gray-300 ${open ? "-rotate-90" : "rotate-90"}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 top-[calc(100%+6px)] left-0 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl shadow-black/8 overflow-hidden">
          {options.map((opt) => {
            const checked = selected.includes(opt);
            return (
              <label
                key={opt}
                className={`flex items-center gap-3 px-5 py-2.5 cursor-pointer transition-colors text-sm font-semibold ${
                  checked
                    ? "bg-[#4a703f]/5 text-[#4a703f]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center border-2 shrink-0 transition-all ${
                    checked
                      ? "bg-[#4a703f] border-[#4a703f]"
                      : "border-gray-300"
                  }`}
                >
                  {checked && (
                    <svg
                      viewBox="0 0 10 8"
                      className="w-2.5 h-2"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path
                        d="M1 4l3 3 5-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                {opt}
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(opt)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function KineticContactBanner() {
  const ROLES = [
    "Farmer",
    "Nursery Owner",
    "Terrace Gardener",
    "Distributor / Dealer",
    "Government / NGO",
    "Other",
  ];
  const INTERESTS = [
    "Organic Fertilizers",
    "Cow-Based Products",
    "Coco Peat / Coco Fiber",
    "Bulk Purchase",
    "Distribution / Dealership",
  ];
  const PRODUCTS = [
    "Ganjiv Amrut",
    "Active Soil",
    "Amrut Mati",
    "Cow Dung Powder",
    "Cow Dung Slurry",
  ];
  const INDIAN_STATES = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu & Kashmir",
    "Ladakh",
    "Puducherry",
  ];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    village: "",
    district: "",
    state: "",
    roles: [],
    otherRole: "",
    interests: [],
    products: [],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.message) {
      toast.error(
        "Please fill all required fields (Name, Mobile, Email, Message)",
      );
      return;
    }

    const roles = form.roles.map((r) =>
      r === "Other" && form.otherRole.trim()
        ? `Other: ${form.otherRole.trim()}`
        : r,
    );

    setIsSubmitting(true);
    try {
      await api.post("/contact", {
        name: form.name,
        phone: form.phone,
        email: form.email,
        village: form.village,
        district: form.district,
        state: form.state,
        roles,
        interests: form.interests,
        products: form.products,
        message: form.message,
      });
      toast.success("Enquiry sent successfully! We'll be in touch shortly.");
      setForm({
        name: "",
        phone: "",
        email: "",
        village: "",
        district: "",
        state: "",
        roles: [],
        otherRole: "",
        interests: [],
        products: [],
        message: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send enquiry");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative w-full py-12 md:py-20 overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-[35%] h-full bg-[#4a703f]/4 -skew-x-12 translate-x-10 -z-10" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#e9aa43]/8 rounded-full blur-[120px] -z-10" />
        <div className="absolute top-16 left-[25%] w-72 h-72 bg-[#4a703f]/5 rounded-full blur-[90px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-12 items-start gap-5 lg:gap-10 relative z-10">
          {/* LEFT SIDE — Modern info card */}
          <motion.div variants={itemVariants} className="md:col-span-5">
            <div className="relative bg-gradient-to-br from-[#744926] via-[#3d5f34] to-[#744926] rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-10 overflow-hidden h-full">
              {/* Decorative orbs inside card */}
              <div className="absolute -top-14 -right-14 w-52 h-52 bg-white/5 rounded-full pointer-events-none" />
              <div className="absolute top-1/2 right-6 w-20 h-20 bg-white/3 rounded-full pointer-events-none" />

              {/* Heading */}
              <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-wider mb-3 md:mb-5">
                Connect
                <span className="text-[#e9aa43] italic font-medium block">
                  With Us.
                </span>
              </h1>

              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-5 md:mb-10 max-w-xs">
                Whether you're a distributor, retailer, co-operative, or farmer
                looking to go organic — we'd love to hear.
              </p>

              {/* Contact Info Blocks */}
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
                  <div className="w-10 h-10 bg-[#4a703f] rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                    <Phone size={15} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#4a703f] mb-0.5">
                      Call Us
                    </p>
                    <p className="text-[#4a703f] font-bold text-sm">
                      +91 79849 97996
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white  rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
                  <div className="w-10 h-10 bg-[#4a703f] rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                    <Mail size={15} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#4a703f] mb-0.5">
                      Email Us
                    </p>
                    <p className="text-[#4a703f] font-bold text-sm">
                      support@gauyogkendr.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-white/5">
                  <div className="w-10 h-10 bg-[#4a703f] rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                    <MapPin size={15} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#4a703f] mb-0.5">
                      Location
                    </p>
                    <p className="text-[#4a703f] font-bold text-sm">
                      Gir Somnath, Gujarat
                    </p>
                  </div>
                </div>
              </div>

              {/* Response time */}
              <div className="mt-4 md:mt-6 flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 bg-[#e9aa43]/15 rounded-2xl border border-[#e9aa43]/20">
                <div className="w-2 h-2 bg-[#e9aa43] rounded-full animate-pulse shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#e9aa43]/80">
                  Responds within 24 hours
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE — Form */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
            className="md:col-span-7 w-full"
          >
            <div className="w-full bg-white rounded-[34px] border border-gray-100 shadow-[0_24px_70px_rgba(0,0,0,0.08)] overflow-hidden">
              {/* Form Header — gradient banner */}
              <div className="relative bg-gradient-to-br from-[#4a703f] to-[#2b4422] px-7 py-6 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/5 rounded-full pointer-events-none" />
                <div className="absolute -bottom-6 left-10 w-20 h-20 bg-[#e9aa43]/10 rounded-full pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/10 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e9aa43] animate-ping" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/80">
                      Direct Channel
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-white ">
                    Let's{" "}
                    <span className="text-[#e9aa43] italic font-medium">
                      Grow Together
                    </span>
                  </h2>
                  <p className="text-white/55 text-sm mt-1.5 max-w-md leading-relaxed">
                    Fill in your details and we'll reach out to nurture the
                    partnership.
                  </p>
                </div>
              </div>

              <form className="w-full p-4 md:p-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
                  <div className="lg:col-span-2">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#4a703f] mb-3 flex items-center gap-2">
                      <span className="w-4 h-[1px] bg-[#4a703f]" /> Basic
                      Details
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1.5 group">
                        <label className="text-[10px] font-black uppercase tracking-widerst text-gray-600 group-focus-within:text-[#4a703f]">
                          Full Name <span className="text-[#744926]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Your full name"
                            value={form.name}
                            onChange={(e) =>
                              handleChange("name", e.target.value)
                            }
                            className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3 rounded-full outline-none focus:bg-white focus:border-[#4a703f] focus:ring-4 focus:ring-[#4a703f]/5 transition-all text-sm font-semibold text-gray-900"
                          />
                          <User
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-200 group-focus-within:text-[#4a703f]"
                            size={16}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5 group">
                        <label className="text-[10px] font-black uppercase tracking-widerst text-gray-600 group-focus-within:text-[#4a703f]">
                          Mobile Number{" "}
                          <span className="text-[#744926]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="+91 79849 97996"
                            value={form.phone}
                            onChange={(e) =>
                              handleChange("phone", e.target.value)
                            }
                            className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3 rounded-full outline-none focus:bg-white focus:border-[#4a703f] focus:ring-4 focus:ring-[#4a703f]/5 transition-all text-sm font-semibold text-gray-900"
                          />
                          <Phone
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-200 group-focus-within:text-[#4a703f]"
                            size={16}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5 group">
                        <label className="text-[10px] font-black uppercase tracking-widerst text-gray-600 group-focus-within:text-[#4a703f]">
                          Email Address{" "}
                          <span className="text-[#744926]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={(e) =>
                              handleChange("email", e.target.value)
                            }
                            className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3 rounded-full outline-none focus:bg-white focus:border-[#4a703f] focus:ring-4 focus:ring-[#4a703f]/5 transition-all text-sm font-semibold text-gray-900"
                          />
                          <Mail
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-200 group-focus-within:text-[#4a703f]"
                            size={16}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5 group">
                        <label className="text-[10px] font-black uppercase tracking-widerst text-gray-600 group-focus-within:text-[#4a703f]">
                          Village / City
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Veraval"
                          value={form.village}
                          onChange={(e) =>
                            handleChange("village", e.target.value)
                          }
                          className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3 rounded-full outline-none focus:bg-white focus:border-[#4a703f] focus:ring-4 focus:ring-[#4a703f]/5 transition-all text-sm font-semibold text-gray-900"
                        />
                      </div>

                      <div className="space-y-1.5 group">
                        <label className="text-[10px] font-black uppercase tracking-widerst text-gray-600 group-focus-within:text-[#4a703f]">
                          District
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Gir Somnath"
                          value={form.district}
                          onChange={(e) =>
                            handleChange("district", e.target.value)
                          }
                          className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3 rounded-full outline-none focus:bg-white focus:border-[#4a703f] focus:ring-4 focus:ring-[#4a703f]/5 transition-all text-sm font-semibold text-gray-900"
                        />
                      </div>

                      <div className="space-y-1.5 group">
                        <label className="text-[10px] font-black uppercase tracking-widerst text-gray-600 group-focus-within:text-[#4a703f]">
                          State
                        </label>
                        <div className="relative">
                          <select
                            value={form.state}
                            onChange={(e) =>
                              handleChange("state", e.target.value)
                            }
                            className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3 rounded-full outline-none focus:bg-white focus:border-[#4a703f] focus:ring-4 focus:ring-[#4a703f]/5 transition-all text-sm font-semibold text-gray-900 appearance-none cursor-pointer"
                          >
                            <option value="">Select your state…</option>
                            {INDIAN_STATES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          <ChevronRight
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 rotate-90 pointer-events-none group-focus-within:text-[#4a703f]"
                            size={16}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 group">
                    <label className="text-[10px] font-black uppercase tracking-widerst text-gray-600">
                      You Are A…
                    </label>
                    <MultiSelect
                      placeholder="Select your role(s)…"
                      options={ROLES}
                      selected={form.roles}
                      onChange={(val) => handleChange("roles", val)}
                    />
                    {form.roles.includes("Other") && (
                      <input
                        type="text"
                        placeholder="Please specify…"
                        value={form.otherRole}
                        onChange={(e) =>
                          handleChange("otherRole", e.target.value)
                        }
                        className="w-full bg-gray-50/50 border border-gray-100 px-5 py-2.5 rounded-full outline-none focus:bg-white focus:border-[#4a703f] focus:ring-4 focus:ring-[#4a703f]/5 transition-all text-sm font-semibold text-gray-900"
                      />
                    )}
                  </div>

                  <div className="space-y-1.5 group">
                    <label className="text-[10px] font-black uppercase tracking-widerst text-gray-600">
                      Area of Interest
                    </label>
                    <MultiSelect
                      placeholder="Select area(s) of interest…"
                      options={INTERESTS}
                      selected={form.interests}
                      onChange={(val) => handleChange("interests", val)}
                    />
                  </div>

                  <div className="space-y-1.5 group lg:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widerst text-gray-600">
                      Product Interest
                    </label>
                    <MultiSelect
                      placeholder="Select product(s)..."
                      options={PRODUCTS}
                      selected={form.products}
                      onChange={(val) => handleChange("products", val)}
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#4a703f] mb-3 flex items-center gap-2">
                      <span className="w-4 h-[1px] bg-[#4a703f]" /> Message /
                      Requirement{" "}
                      <span className="text-[#744926] normal-case font-black">
                        *
                      </span>
                    </p>
                    <textarea
                      rows="4"
                      placeholder="Tell us about your requirements, quantities, or any specific questions…"
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="w-full bg-gray-50/50 border border-gray-100 px-5 py-3.5 rounded-3xl outline-none focus:bg-white focus:border-[#4a703f] focus:ring-4 focus:ring-[#4a703f]/5 transition-all text-sm font-semibold text-gray-900 resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-2 lg:col-span-2 bg-[#4a703f] hover:bg-[#3a5a30] disabled:opacity-60 text-white py-4 rounded-full flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 shadow-lg shadow-[#4a703f]/20 group"
                  >
                    {isSubmitting ? "Sending Enquiry..." : "Send Enquiry"}
                    <Send
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <section className="relative bg-[#744926] py-12 md:py-24 px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
          {/* --- LEFT SIDE: BENTO IMAGE GRID --- */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 md:gap-4">
            <div className="space-y-4">
              {/* Large Vertical Image */}
              <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-[#4a703f]/10 group shadow-xl">
                <img
                  src={clUrl("https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/v1778741619/DSC00374_1_rc1jjo.jpg", 600)}
                  srcSet={clSrcSet("https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/v1778741619/DSC00374_1_rc1jjo.jpg", [300, 600])}
                  sizes="(max-width: 1024px) 50vw, 300px"
                  alt="Rooted in Community"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={800}
                />
              </div>
              {/* Established Badge */}
              <div className="bg-[#4a703f] rounded-3xl p-6 text-center shadow-lg shadow-[#4a703f]/20">
                <span className="block text-3xl  font-black text-white">
                  2026
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
                  Est. Gujarat, India
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-12">
              {/* Small Top Image */}
              <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-[#4a703f]/10 group shadow-xl">
                <img
                  src={clUrl("https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/v1778740198/DSC00585_1_ypoyj7.jpg", 600)}
                  srcSet={clSrcSet("https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/v1778740198/DSC00585_1_ypoyj7.jpg", [300, 600])}
                  sizes="(max-width: 1024px) 50vw, 300px"
                  alt="Global Trade"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={600}
                />
              </div>
              {/* Large Bottom Image */}
              <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-[#4a703f]/10 group shadow-xl">
                <img
                  src={clUrl("https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/v1778741041/DSC00541_1_sofgme.jpg", 600)}
                  srcSet={clSrcSet("https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto/v1778741041/DSC00541_1_sofgme.jpg", [300, 600])}
                  sizes="(max-width: 1024px) 50vw, 300px"
                  alt="Leadership"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={600}
                />
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: CONTENT --- */}
          <div className="lg:col-span-6 space-y-6 md:space-y-10">
            <div className="space-y-3 md:space-y-6">
              <div className="inline-block">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#e9aa43]">
                  Our Story
                </span>
                <div className="h-[1px] w-12 bg-[#e9aa43] mt-1" />
              </div>

              <h2 className="text-3xl md:text-6xl tracking-wider font-bold text-white leading-[1.1]">
                Born from the{" "}
                <span className="text-white italic font-medium md:text-6xl">
                  Earth,
                </span>{" "}
                <br />
                Built for the World
              </h2>

              <div className="space-y-2 text-slate-100 text-sm md:text-lg leading-relaxed">
                <p className="font-semibold text-[#e9aa43]">
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
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 pt-4 md:pt-6 border-t border-slate-100">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-green-600/30 flex items-center justify-center shrink-0">
                  <Leaf className="text-green-600" size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    Natural Farming
                  </h3>
                  <p className="text-xs text-slate-200 mt-1">
                    100% organic, chemical-free production.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#e9aa43]/30 flex items-center justify-center shrink-0">
                  <Users className="text-[#e9aa43]" size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Women First</h3>
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
                  <h3 className="font-bold text-white text-sm">Global Reach</h3>
                  <p className="text-xs text-slate-200 mt-1">
                    International quality, worldwide coverage.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-red-700/30 flex items-center justify-center shrink-0">
                  <Heart className="text-red-600" size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    Farmer Support
                  </h3>
                  <p className="text-xs text-slate-200 mt-1">
                    Helping farmers transition to organic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24 px-4 md:px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-[#e9aa43] mb-2 md:mb-4 block"
            >
              Our Commitment
            </motion.span>
            <h2 className="text-2xl md:text-6xl font-bold tracking-wider  max-w-2xl">
              Sustainability Is Our{" "}
              <span className="text-[#4a703f] italic">Foundation</span>
            </h2>
            <p className="mt-3 md:mt-6 text-slate-500 text-sm md:text-lg max-w-xl">
              Every product returns value to the earth through a circular
              approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {commitments.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="group"
              >
                <h3 className="text-lg md:text-2xl font-bold text-[#2d3a29] mb-2 md:mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                  {item.desc}
                </p>
                <motion.div className="mt-5 md:mt-8 h-[1px] bg-slate-100 relative overflow-hidden">
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
    </div>
  );
}
