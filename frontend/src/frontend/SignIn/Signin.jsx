import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import useAuthStore from "../../store/authStore";
import useNotificationStore from "../../store/notificationStore";
import toast from "react-hot-toast";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  UserCircle2,
  LogIn,
} from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function ModernSignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const notify = useNotificationStore((s) => s.show);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const u = res.data.data.user;
      setAuth(u, res.data.data.accessToken, res.data.data.refreshToken);
      notify(`Welcome back, ${u.email.split("@")[0]}!`, "login");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (response) => {
    if (!response.credential) {
      toast.error("Google authentication failed");
      return;
    }

    try {
      const res = await api.post("/auth/google", {
        credential: response.credential,
      });
      const u = res.data.data.user;
      setAuth(u, res.data.data.accessToken, res.data.data.refreshToken);
      notify(`Welcome back, ${u.email.split("@")[0]}!`, "login");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] flex items-center justify-center p-6 relative overflow-hidden m-9 mt-16">
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#7bbd25]/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#4a703f]/5 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-[420px] z-10"
      >
        <div className="mb-10 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg transition-colors border border-slate-50 group-hover:border-[#7bbd25]/30"
            >
              <LogIn className="text-[#4a703f]" size={24} strokeWidth={2} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-[900] text-slate-950 tracking-tighter leading-none"
            >
              Login
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-16"
          >
            Secure Access
          </motion.p>
        </div>

        <form className="space-y-4" onSubmit={handleSignIn}>
          <div className="space-y-1.5 group">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-[#7bbd25] ml-1 transition-colors">
              Email
            </label>
            <div className="relative">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                placeholder="name@example.com"
                className="w-full bg-white border border-slate-200 px-5 py-4 rounded-full text-sm font-bold text-slate-900 outline-none focus:border-slate-950 focus:ring-[6px] focus:ring-slate-950/[0.03] transition-all"
              />
              <Mail
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-950 transition-colors"
                size={18}
              />
            </div>
          </div>

          <div className="space-y-1.5 group">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-[#7bbd25] transition-colors">
                Password
              </label>
              <button
                onClick={() => navigate("/forgotpassword")}
                type="button"
                className="text-[10px] font-black text-[#7bbd25] hover:text-slate-950 uppercase tracking-widest transition-colors"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-slate-200 px-5 py-4 rounded-full text-sm font-bold text-slate-900 outline-none focus:border-slate-950 focus:ring-[6px] focus:ring-slate-950/[0.03] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 py-1 ml-1">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded-md border-slate-200 text-[#4a703f] focus:ring-0 cursor-pointer"
            />
            <label
              htmlFor="remember"
              className="text-[12px] font-bold text-slate-600 cursor-pointer"
            >
              Remember me
            </label>
          </div>

          <motion.button
            disabled={isLoading}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-2 bg-[#4a703f] hover:bg-[#7bbd25] text-white py-5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-slate-200/50 transition-all duration-500 flex items-center justify-center gap-3 group"
          >
            {isLoading ? "Authenticating..." : "Log In"}
            {!isLoading && (
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            )}
          </motion.button>
        </form>

        <div className="relative my-10 flex items-center justify-center">
          <div className="w-full h-[1px] bg-slate-100" />
          <span className="absolute bg-[#fcfdfd] px-6 text-[9px] font-[900] text-slate-300 uppercase tracking-[0.5em]">
            OR
          </span>
        </div>

        <div className="flex justify-center mb-8">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google login failed")}
            shape="pill"
            theme="outline"
            size="large"
            text="signin_with"
          />
        </div>

        <div className="text-center mt-0">
          <p className="text-[14px] font-bold text-slate-600">
            Don't have an Account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-[#7bbd25] font-black uppercase ml-1 hover:text-slate-950 transition-colors"
            >
              Sign Up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
