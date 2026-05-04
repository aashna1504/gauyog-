import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";

  // Redirect to sign-in page when no token in URL
  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing reset link");
      navigate("/forgotpassword");
    }
  }, [token, navigate]);

  // Auto-redirect countdown after successful reset
  useEffect(() => {
    if (!done) return;
    if (countdown === 0) { navigate("/signin"); return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [done, countdown, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/reset-password", { token, password });
      setDone(true);
      toast.success("Password reset successfully!");
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to reset password";
      toast.error(msg);
      // Token expired / invalid — send them back to request a new link
      if (error.response?.status === 400) {
        setTimeout(() => navigate("/forgotpassword"), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#4a703f]/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#4a703f]/5 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-[420px] z-10"
      >
        {/* Icon + heading */}
        <div className="mb-10 text-center mt-12">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border shadow-xl mb-6 transition-colors ${done ? "border-[#4a703f]/30" : "border-slate-100"}`}>
            {done
              ? <ShieldCheck className="text-[#4a703f]" size={32} strokeWidth={1.5} />
              : <Lock className="text-[#4a703f]" size={28} strokeWidth={1.5} />
            }
          </div>
          <h1 className="text-4xl font-[900] text-slate-950 tracking-wider leading-none mb-2">
            {done ? "All Done!" : "New Password"}
          </h1>
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
            {done ? "Password Updated" : "Security Gateway"}
          </p>
        </div>

        {done ? (
          /* ── Success state ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white p-8 rounded-[28px] border border-slate-100 shadow-sm"
          >
            <p className="text-sm font-bold text-slate-700 leading-relaxed mb-2">
              Your password has been reset successfully.
            </p>
            <p className="text-[11px] text-slate-400 font-bold mb-6">
              Redirecting to login in{" "}
              <span className="text-[#4a703f] font-black">{countdown}s</span>…
            </p>
            <button
              onClick={() => navigate("/signin")}
              className="w-full bg-[#4a703f] text-white py-4 rounded-full font-black uppercase text-[10px] tracking-widest transition-all hover:bg-[#3a5a30]"
            >
              Go to Login Now
            </button>
          </motion.div>
        ) : (
          /* ── Form ── */
          <>
            <p className="text-center text-sm font-bold text-slate-600 mb-8 leading-relaxed max-w-[340px] mx-auto">
              Choose a strong password with at least 6 characters.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* New password */}
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-[#4a703f] ml-1 transition-colors">
                  New Password
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full bg-white border border-slate-200 px-5 py-4 rounded-full text-sm font-bold text-slate-900 outline-none focus:border-slate-950 focus:ring-[6px] focus:ring-slate-950/[0.03] transition-all placeholder:text-slate-300 placeholder:font-normal"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#4a703f] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-[#4a703f] ml-1 transition-colors">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    required
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    className={`w-full bg-white border px-5 py-4 rounded-full text-sm font-bold text-slate-900 outline-none transition-all placeholder:text-slate-300 placeholder:font-normal ${
                      confirmPassword && password !== confirmPassword
                        ? "border-red-300 focus:ring-4 focus:ring-red-100"
                        : "border-slate-200 focus:border-slate-950 focus:ring-[6px] focus:ring-slate-950/[0.03]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#4a703f] transition-colors"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-[10px] text-red-500 font-bold ml-1">Passwords do not match</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-2 bg-[#4a703f] hover:bg-[#3a5a30] disabled:bg-slate-300 disabled:opacity-70 text-white py-5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-slate-200 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                {loading ? "Updating Password…" : "Set New Password"}
                {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
              </motion.button>
            </form>

            <div className="relative my-8 flex items-center justify-center">
              <div className="w-full h-[1px] bg-slate-100" />
              <span className="absolute bg-[#fcfdfd] px-6 text-[9px] font-[900] text-slate-300 uppercase tracking-[0.5em]">
                OR
              </span>
            </div>

            <div className="text-center">
              <p className="text-[11px] font-bold text-slate-400">
                Remember it now?{" "}
                <span
                  onClick={() => navigate("/signin")}
                  className="text-[#4a703f] font-black uppercase text-[10px] tracking-widest cursor-pointer hover:underline"
                >
                  Sign In
                </span>
              </p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
