import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ModernForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // --- BACKEND HANDLER ---
  const handleResetRequest = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);

    // Simulate Backend API call: fetch('/api/forgot-password', { method: 'POST', body: ... })
    console.log(`Sending reset link to: ${email}`);

    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true); // Toggle the visual state to "Success"
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] flex items-center justify-center p-6 relative overflow-hidden m-9 ">
      {/* BACKGROUND SPIRIT: Organic Abstract Auras (Matches Login) */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#7bbd25]/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#4a703f]/5 blur-[120px] rounded-full" />

      {/* THE COMPACT CARD (420px Width to match Login) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-[420px] z-10"
      >
        {/* HEADER: Minimalist & Bold */}
        <div className="mb-12 text-center  mt-12 ">
          <h1 className="text-4xl font-[900] text-slate-950 tracking-tighter mb-2 leading-none">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border border-slate-100 shadow-xl mb-6 group transition-colors ${isSent ? "border-[#7bbd25]/30" : "hover:border-[#7bbd25]"}`}
            >
              {isSent ? (
                <ShieldCheck
                  className="text-[#7bbd25]"
                  size={32}
                  strokeWidth={1.5}
                />
              ) : (
                <HelpCircle
                  className="text-[#4a703f]"
                  size={32}
                  strokeWidth={1.5}
                />
              )}
            </motion.div>{" "}
            {isSent ? "Check Your Email" : "Forgot Password?"}
          </h1>
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mt-2">
            {isSent ? "Verification Link Sent" : "Security Gateway"}
          </p>
        </div>

        {/* --- FORM STATE --- */}
        {!isSent ? (
          <>
            <p className="text-center text-sm font-bold text-slate-600 mb-10 leading-relaxed max-w-[340px] mx-auto">
              Enter the email address associated with your Gauyog Kendr
              account, and we'll send a secure reset link.
            </p>

            <form className="space-y-4" onSubmit={handleResetRequest}>
              {/* FIELD: EMAIL */}
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-[#7bbd25] ml-1 transition-colors">
                  Registered Email Address
                </label>
                <div className="relative">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-white border border-slate-200 px-5 py-4 rounded-full text-sm font-bold text-slate-900 outline-none focus:border-slate-950 focus:ring-[6px] focus:ring-slate-950/[0.03] transition-all placeholder:text-slate-300 placeholder:font-normal"
                  />
                  <Mail
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-950 transition-colors"
                    size={18}
                  />
                </div>
              </div>

              {/* PRIMARY ACTION */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-2 bg-[#4a703f] hover:bg-[#7bbd25] disabled:bg-slate-300 disabled:opacity-70 text-white py-5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-slate-200 transition-all duration-500 flex items-center justify-center gap-3 group"
              >
                {isLoading ? "Validating Request..." : "Send Reset Link"}
                {!isLoading && (
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                )}
              </motion.button>
            </form>
          </>
        ) : (
          /* --- SUCCESS STATE --- */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white p-8 rounded-[28px] border border-slate-100 shadow-sm"
          >
            <p className="text-sm font-bold text-slate-700 leading-relaxed mb-8">
              A password reset link has been successfully dispatched to{" "}
              <span className="text-slate-950 font-black">{email}</span>. Please
              check your inbox and click the link within 30 minutes.
            </p>
            <p className="text-[11px] font-bold text-slate-400 mb-2">
              Didn't receive the email?
            </p>
            <button
              onClick={handleResetRequest}
              className="text-[#7bbd25] font-black uppercase text-[10px] tracking-widest hover:text-[#4a703f] transition-colors"
            >
              {isLoading ? "Retrying..." : "Resend Link"}
            </button>
          </motion.div>
        )}

        {/* OR DIVIDER */}
        <div className="relative my-10 flex items-center justify-center">
          <div className="w-full h-[1px] bg-slate-100" />
          <span className="absolute bg-[#fcfdfd] px-6 text-[9px] font-[900] text-slate-300 uppercase tracking-[0.5em]">
            OR
          </span>
        </div>

        {/* FOOTER: ACCOUNT OPTIONS */}
        <div className="text-center group cursor-pointer space-y-4">
          <p className="text-[11px] font-bold text-slate-400 flex flex-col items-center gap-2">
            Just remembered?
            <span
              onClick={() => navigate("/signin")}
              className="text-[#7bbd25] text-xs font-black uppercase tracking-[0.1em] border-b border-transparent group-hover:border-[#7bbd25] transition-all"
            >
              Login to Account
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
