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
  UserPlus,
  Phone,
  User,
} from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function ModernSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const notify = useNotificationStore((s) => s.show);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    setIsLoading(true);
    try {
      const res = await api.post("/auth/signup", {
        email,
        password,
        role: "USER",
      });
      const u = res.data.data.user;
      setAuth(u, res.data.data.accessToken, res.data.data.refreshToken);
      notify(`Account ready, ${u.email.split("@")[0]}!`, "signup");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (response) => {
    if (!response.credential) {
      toast.error("Google signup failed");
      return;
    }

    try {
      const res = await api.post("/auth/google", {
        credential: response.credential,
      });
      const u = res.data.data.user;
      setAuth(u, res.data.data.accessToken, res.data.data.refreshToken);
      notify(`Account ready, ${u.email.split("@")[0]}!`, "signup");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Google signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] flex items-center justify-center p-6 relative overflow-hidden m-9 lg:pt-32 pt-20">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#7bbd25]/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#4a703f]/5 blur-[120px] rounded-full" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-[500px] z-10"
      >
        <div className="mb-10 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg transition-colors border border-slate-50"
            >
              <UserPlus className="text-[#4a703f]" size={24} strokeWidth={2} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-[900] text-slate-950 tracking-tighter leading-none"
            >
              Create Account
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-16"
          >
            Join Us Today
          </motion.p>
        </div>

        <form className="space-y-4" onSubmit={handleSignUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-[#7bbd25] ml-1 transition-colors">
                First Name
              </label>
              <div className="relative">
                <input
                  required
                  type="text"
                  placeholder="John"
                  className="w-full bg-white border border-slate-200 px-5 py-3.5 rounded-full text-sm font-bold text-slate-900 outline-none focus:border-slate-950 focus:ring-[6px] focus:ring-slate-950/[0.03] transition-all"
                />
                <User
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-slate-950 transition-colors"
                  size={16}
                />
              </div>
            </div>
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-[#7bbd25] ml-1 transition-colors">
                Last Name
              </label>
              <div className="relative">
                <input
                  required
                  type="text"
                  placeholder="Doe"
                  className="w-full bg-white border border-slate-200 px-5 py-3.5 rounded-full text-sm font-bold text-slate-900 outline-none focus:border-slate-950 focus:ring-[6px] focus:ring-slate-950/[0.03] transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-[#7bbd25] ml-1 transition-colors">
              Email
            </label>
            <div className="relative">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-white border border-slate-200 px-5 py-3.5 rounded-full text-sm font-bold text-slate-900 outline-none focus:border-slate-950 focus:ring-[6px] focus:ring-slate-950/[0.03] transition-all"
              />
              <Mail
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-slate-950 transition-colors"
                size={17}
              />
            </div>
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-[#7bbd25] ml-1 transition-colors">
              Mobile Number
            </label>
            <div className="relative">
              <input
                required
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="w-full bg-white border border-slate-200 px-5 py-3.5 rounded-full text-sm font-bold text-slate-900 outline-none focus:border-slate-950 focus:ring-[6px] focus:ring-slate-950/[0.03] transition-all"
              />
              <Phone
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-slate-950 transition-colors"
                size={17}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-[#7bbd25] ml-1 transition-colors">
                Password
              </label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-200 px-5 py-3.5 rounded-full text-sm font-bold text-slate-900 outline-none focus:border-slate-950 focus:ring-[6px] focus:ring-slate-950/[0.03] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-200 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-[#7bbd25] ml-1 transition-colors">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-200 px-5 py-3.5 rounded-full text-sm font-bold text-slate-900 outline-none focus:border-slate-950 focus:ring-[6px] focus:ring-slate-950/[0.03] transition-all"
                />
                <Lock
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-slate-950 transition-colors"
                  size={16}
                />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 py-2 ml-1">
            <div className="relative flex items-center mt-0.5">
              <div>
                <h1>Sign</h1>
              </div>
              <input
                required
                type="checkbox"
                id="terms"
                className="peer w-4 h-4 rounded-md border-slate-200 text-[#4a703f] focus:ring-0 cursor-pointer appearance-none bg-white border transition-all checked:bg-[#4a703f]"
              />
              <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <label
              htmlFor="terms"
              className="text-[14px] font-medium text-slate-500 leading-relaxed cursor-pointer select-none"
            >
              By signing up I agree with{" "}
              <span className="text-[#7bbd25] font-black cursor-pointer hover:underline">
                terms and conditions
              </span>
            </label>
          </div>

          <motion.button
            disabled={isLoading}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-2 bg-[#4a703f] hover:bg-[#7bbd25] rounded-full text-white py-5 font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-slate-200/50 transition-all duration-500 flex items-center justify-center gap-3 group"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
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
            onError={() => toast.error("Google signup failed")}
            shape="pill"
            theme="outline"
            size="large"
            text="signup_with"
          />
        </div>

        <div className="text-center">
          <p className="text-[14px] font-bold text-slate-600">
            Already have an Account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-[#7bbd25] font-black uppercase tracking-[0.1em] ml-1 hover:text-slate-950 transition-colors"
            >
              Login
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
