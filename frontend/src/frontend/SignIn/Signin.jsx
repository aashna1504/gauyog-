import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import useAuthStore from "../../store/authStore";
import useNotificationStore from "../../store/notificationStore";
import toast from "react-hot-toast";
import { Mail, Eye, EyeOff, ArrowRight, LogIn } from "lucide-react";
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
      notify(`Welcome back, ${u.name || u.email.split("@")[0]}!`, "login");
      navigate(u.role === "ADMIN" ? "/admin" : "/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (response) => {
    if (!response.credential) { toast.error("Google authentication failed"); return; }
    try {
      const res = await api.post("/auth/google", { credential: response.credential });
      const u = res.data.data.user;
      setAuth(u, res.data.data.accessToken, res.data.data.refreshToken);
      notify(`Welcome back, ${u.name || u.email.split("@")[0]}!`, "login");
      navigate(u.role === "ADMIN" ? "/admin" : "/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ── Left: Image Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        <img
          src="https://res.cloudinary.com/dbpzzvcik/image/upload/v1775302434/0fc480c8-6acf-4ff0-a587-cea5c58e069b_lii8qp.jpg"
          alt="Gauyog"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#4a703f]/60 via-transparent to-[#744926]/70" />

        {/* Logo */}
        <div className="relative z-10">
      
        </div>

        {/* Tagline */}
        <div className="relative z-10 space-y-4">
          <div className="w-12 h-1 bg-[#e9aa43] rounded-full" />
          <h2 className="text-5xl font-black text-white leading-tight tracking-tight">
            Pure by Nature.<br />
            <span className="text-[#e9aa43] italic">Proven by Earth.</span>
          </h2>
          <p className="text-white/75 text-base font-medium max-w-sm leading-relaxed">
            100% natural products from Gir Somnath, Gujarat — crafted with Vedic
            wisdom and certified for the world.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { val: "5+", label: "Years" },
            { val: "100%", label: "Organic" },
            { val: "5000+", label: "Farmers" },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15">
              <p className="text-2xl font-black text-[#e9aa43]">{s.val}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Form Panel ── */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center bg-white overflow-y-auto px-6 py-8 pt-28 lg:pt-16 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[420px]"
        >
        
    

          {/* Header */}
          <div className="lg:m-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#4a703f]/10 flex items-center justify-center">
                <LogIn className="text-[#4a703f]" size={20} />
              </div>
              <h1 className="text-3xl font-[900] text-slate-900 tracking-tighter">Welcome back</h1>
            </div>
            <p className="text-sm text-slate-400 font-medium ml-[52px]">Sign in to your account</p>
          </div>

          <form className="space-y-4" onSubmit={handleSignIn}>
            {/* Email */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-[#4a703f] ml-1 transition-colors">
                Email
              </label>
              <div className="relative">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-2xl text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#4a703f] focus:ring-4 focus:ring-[#4a703f]/10 transition-all"
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#4a703f] transition-colors" size={17} />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-[#4a703f] ml-1 transition-colors">
                Password
              </label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-2xl text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#4a703f] focus:ring-4 focus:ring-[#4a703f]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-3 py-1 ml-1">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-slate-200 focus:ring-0 cursor-pointer accent-[#4a703f]"
              />
              <label htmlFor="remember" className="text-xs font-semibold text-slate-500 cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Submit */}
            <motion.button
              disabled={isLoading}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-2 bg-[#4a703f] hover:bg-[#744926] text-white py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-xs shadow-lg shadow-[#4a703f]/20 transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Log In"}
              {!isLoading && (
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-8 flex items-center justify-center">
            <div className="w-full h-px bg-slate-100" />
            <span className="absolute bg-white px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">or</span>
          </div>

          {/* Google */}
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

          {/* Sign up link */}
          <p className="text-center text-sm font-semibold text-slate-500">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-[#744926] font-black hover:text-[#4a703f] transition-colors ml-1"
            >
              Sign Up
            </button>
          </p>
        </motion.div>
      </div>

    </div>
  );
}
