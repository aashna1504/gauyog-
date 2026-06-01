import { useState } from "react";
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
  User,
} from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);
import { useNavigate } from "react-router-dom";

export default function ModernSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
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
        name: name.trim() || undefined,
        email,
        password,
        role: "USER",
      });
      const u = res.data.data.user;
      setAuth(u, res.data.data.accessToken, res.data.data.refreshToken);
      notify(`Welcome, ${u.name || u.email.split("@")[0]}!`, "signup");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      const res = await api.post("/auth/google", {
        access_token: tokenResponse.access_token,
      });
      const u = res.data.data.user;
      setAuth(u, res.data.data.accessToken, res.data.data.refreshToken);
      notify(`Welcome, ${u.name || u.email.split("@")[0]}!`, "signup");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Google signup failed");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => toast.error("Google signup failed"),
  });

  return (
    <div className="min-h-screen flex">
      {/* ── Left: Image Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center p-12 overflow-hidden gap-8">
        <img
          src="https://res.cloudinary.com/dbpzzvcik/image/upload/q_auto,f_auto,w_1200/v1778741516/DSC00359_1_yojjjm.jpg"
          alt="Gauyog"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width={1200}
          height={800}
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#744926]/60 via-transparent to-[#4a703f]/70" />

        {/* Tagline */}
        <div className="relative z-10 space-y-4 text-center">
          <div className="w-12 h-1 bg-[#e9aa43] rounded-full mx-auto" />
          <h2 className="text-5xl font-black text-white  tracking-wider">
            Join the Natural
            <br />
            <span className="text-[#e9aa43] italic">Revolution.</span>
          </h2>
          <p className="text-white/75 text-base font-medium max-w-sm leading-relaxed mx-auto">
            Be part of a growing community that chooses nature over chemicals —
            for healthier harvests and a better planet.
          </p>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/15 w-full max-w-sm">
          <p className="text-white/85 text-sm font-medium leading-relaxed italic mb-4">
            "The answer to healthier food lies in going back to nature — not
            away from it."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#e9aa43] flex items-center justify-center font-black text-xs text-white flex-shrink-0">
              G
            </div>
            <div>
              <p className="text-white font-black text-xs uppercase tracking-widerst">
                Gauyog Kendr
              </p>
              <p className="text-white/50 text-[10px] uppercase tracking-widerst">
                Gir Somnath, Gujarat
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Form Panel ── */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center bg-white overflow-y-auto px-4 md:px-6 py-6 pt-24 lg:pt-16 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[480px]"
        >
          {/* Header */}
          <div className="mb-5 lg:mt-20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#744926]/10 flex items-center justify-center">
                <UserPlus className="text-[#744926]" size={20} />
              </div>
              <h1 className="text-3xl font-[900] text-slate-900 tracking-wider">
                Create account
              </h1>
            </div>
            <p className="text-sm text-slate-400 font-medium ml-[52px]">
              Join us — it only takes a minute
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSignUp}>
            {/* Full Name */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-[#744926] ml-1 transition-colors">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-2xl text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#744926] focus:ring-4 focus:ring-[#744926]/10 transition-all"
                />
                <User
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#744926] transition-colors"
                  size={16}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-[#744926] ml-1 transition-colors">
                Email
              </label>
              <div className="relative">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-2xl text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#744926] focus:ring-4 focus:ring-[#744926]/10 transition-all"
                />
                <Mail
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#744926] transition-colors"
                  size={16}
                />
              </div>
            </div>

            {/* Password + Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-[#744926] ml-1 transition-colors">
                  Password
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-2xl text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#744926] focus:ring-4 focus:ring-[#744926]/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-[#744926] ml-1 transition-colors">
                  Confirm
                </label>
                <div className="relative">
                  <input
                    required
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-2xl text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#744926] focus:ring-4 focus:ring-[#744926]/10 transition-all"
                  />
                  <Lock
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#744926] transition-colors"
                    size={15}
                  />
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 py-1 ml-1">
              <div className="relative flex items-center mt-0.5 flex-shrink-0">
                <input
                  required
                  type="checkbox"
                  id="terms"
                  className="peer w-4 h-4 rounded border-slate-200 focus:ring-0 cursor-pointer appearance-none bg-white border transition-all checked:bg-[#744926]"
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
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
              <label
                htmlFor="terms"
                className="text-xs font-medium text-slate-500 leading-relaxed cursor-pointer select-none"
              >
                I agree to the{" "}
                <span className="text-[#744926] font-black hover:underline cursor-pointer">
                  terms and conditions
                </span>
              </label>
            </div>

            {/* Submit */}
            <motion.button
              disabled={isLoading}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-2 bg-[#744926] hover:bg-[#4a703f] text-white py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-xs shadow-lg shadow-[#744926]/20 transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-60 disabled:cursor-not-allowed"
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

          {/* Divider */}
          <div className="relative my-5 md:my-8 flex items-center justify-center">
            <div className="w-full h-px bg-slate-100" />
            <span className="absolute bg-white px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">
              or
            </span>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={() => googleLogin()}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-all text-sm font-semibold text-slate-700 shadow-sm mb-5 md:mb-8"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Login link */}
          <p className="text-center text-sm font-semibold text-slate-500">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-[#4a703f] font-black hover:text-[#744926] transition-colors ml-1"
            >
              Login
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
