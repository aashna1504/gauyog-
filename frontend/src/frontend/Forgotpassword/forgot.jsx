import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function ModernForgotPassword() {
  const [email, setEmail]       = useState("");
  const [isSent, setIsSent]     = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [devLink, setDevLink]   = useState(null);   // only set in dev when email fails
  const [emailSent, setEmailSent] = useState(false); // true when actually delivered
  const navigate = useNavigate();

  const handleResetRequest = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      const res = await api.post("/auth/forgot-password", { email });
      const data = res.data?.data;

      setIsSent(true);
      setEmailSent(!!data?.emailDelivered);

      // Dev fallback: email provider not configured yet — show clickable link
      if (data?.devResetLink && !data?.emailDelivered) {
        setDevLink(data.devResetLink);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] flex items-center justify-center p-6 relative overflow-hidden m-9">
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#4a703f]/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#4a703f]/5 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-[420px] z-10"
      >
        {/* Icon + heading */}
        <div className="mb-12 text-center mt-12">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border border-slate-100 shadow-xl mb-6 transition-colors ${isSent ? "border-[#4a703f]/30" : "hover:border-[#4a703f]"}`}
          >
            {isSent
              ? <ShieldCheck className="text-[#4a703f]" size={32} strokeWidth={1.5} />
              : <HelpCircle  className="text-[#4a703f]" size={32} strokeWidth={1.5} />
            }
          </motion.div>
          <h1 className="text-4xl font-[900] text-slate-950 tracking-wider mb-2 leading-none">
            {isSent ? (emailSent ? "Check Your Email" : "Link Ready") : "Forgot Password?"}
          </h1>
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mt-2">
            {isSent ? "Verification Link Sent" : "Security Gateway"}
          </p>
        </div>

        {!isSent ? (
          /* ── Request form ── */
          <>
            <p className="text-center text-sm font-bold text-slate-600 mb-10 leading-relaxed max-w-[340px] mx-auto">
              Enter the email address associated with your Gauyog Kendr account,
              and we'll send a secure reset link.
            </p>

            <form className="space-y-4" onSubmit={handleResetRequest}>
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-[#4a703f] ml-1 transition-colors">
                  Registered Email Address
                </label>
                <div className="relative">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    placeholder="name@example.com"
                    className="w-full bg-white border border-slate-200 px-5 py-4 rounded-full text-sm font-bold text-slate-900 outline-none focus:border-slate-950 focus:ring-[6px] focus:ring-slate-950/[0.03] transition-all placeholder:text-slate-300 placeholder:font-normal"
                  />
                  <Mail
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-950 transition-colors"
                    size={18}
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-2 bg-[#4a703f] hover:bg-[#3a5a30] disabled:bg-slate-300 disabled:opacity-70 text-white py-5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-slate-200 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                {isLoading ? "Sending…" : "Send Reset Link"}
                {!isLoading && (
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                )}
              </motion.button>
            </form>
          </>
        ) : (
          /* ── Sent state ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-[28px] border border-slate-100 shadow-sm"
          >
            {emailSent ? (
              /* Email actually delivered */
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#4a703f]/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-[#4a703f]" size={22} />
                </div>
                <p className="text-sm font-bold text-slate-700 leading-relaxed mb-6">
                  A password reset link has been sent to{" "}
                  <span className="text-slate-950 font-black">{email}</span>.
                  <br />
                  <span className="text-[12px] text-slate-400 font-medium mt-1 block">
                    Check your inbox and click the link within 30 minutes.
                  </span>
                </p>
                <p className="text-[11px] font-bold text-slate-400 mb-2">
                  Didn't receive it?
                </p>
                <button
                  onClick={handleResetRequest}
                  disabled={isLoading}
                  className="text-[#4a703f] font-black uppercase text-[10px] tracking-widest hover:underline disabled:opacity-50"
                >
                  {isLoading ? "Resending…" : "Resend Link"}
                </button>
              </div>
            ) : devLink ? (
              /* Dev mode: email not delivered, show clickable link */
              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 border border-amber-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Dev Mode
                </div>
                <p className="text-sm font-bold text-slate-600 leading-relaxed mb-5">
                  Email couldn't be delivered to{" "}
                  <span className="text-slate-950 font-black">{email}</span>.
                  <br />
                  <span className="text-[12px] text-slate-400 font-medium">
                    Use the link below to reset your password.
                  </span>
                </p>

                <a
                  href={devLink}
                  className="inline-flex items-center gap-2 bg-[#4a703f] text-white px-6 py-3 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-[#3a5a30] transition-colors mb-4"
                >
                  Reset Password Now
                  <ExternalLink size={13} />
                </a>

                <p className="text-[10px] text-slate-400 font-bold mt-4 leading-relaxed">
                  To enable real email delivery, add your Gmail App Password
                  to <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">.env</code>
                </p>
              </div>
            ) : (
              /* Sent but unknown delivery status */
              <div className="text-center">
                <p className="text-sm font-bold text-slate-700 leading-relaxed mb-6">
                  If an account exists for{" "}
                  <span className="text-slate-950 font-black">{email}</span>,
                  a reset link has been sent. Please check your inbox.
                </p>
                <button
                  onClick={handleResetRequest}
                  disabled={isLoading}
                  className="text-[#4a703f] font-black uppercase text-[10px] tracking-widest hover:underline disabled:opacity-50"
                >
                  {isLoading ? "Resending…" : "Resend Link"}
                </button>
              </div>
            )}
          </motion.div>
        )}

        <div className="relative my-10 flex items-center justify-center">
          <div className="w-full h-[1px] bg-slate-100" />
          <span className="absolute bg-[#fcfdfd] px-6 text-[9px] font-[900] text-slate-300 uppercase tracking-[0.5em]">
            OR
          </span>
        </div>

        <div className="text-center cursor-pointer">
          <p className="text-[11px] font-bold text-slate-400 flex flex-col items-center gap-2">
            Just remembered?
            <span
              onClick={() => navigate("/signin")}
              className="text-[#4a703f] text-xs font-black uppercase tracking-[0.1em] border-b border-transparent hover:border-[#4a703f] transition-all"
            >
              Login to Account
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
