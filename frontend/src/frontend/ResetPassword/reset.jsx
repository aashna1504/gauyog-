import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token") || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid reset link");
      return;
    }

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
      toast.success("Password reset successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[30px] border border-slate-100 p-8 shadow-sm">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Reset Password</h1>
        <p className="text-sm text-slate-500 mb-6">Create your new secure password.</p>

        {done ? (
          <button
            onClick={() => navigate("/signin")}
            className="w-full bg-[#4a703f] text-white py-4 rounded-full font-black uppercase text-xs tracking-widest"
          >
            Go To Login
          </button>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">New Password</label>
              <div className="relative mt-1">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-full text-sm font-bold"
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Confirm Password</label>
              <div className="relative mt-1">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-full text-sm font-bold"
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4a703f] hover:bg-[#7bbd25] disabled:opacity-60 text-white py-4 rounded-full font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2"
            >
              {loading ? "Resetting..." : "Reset Password"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
