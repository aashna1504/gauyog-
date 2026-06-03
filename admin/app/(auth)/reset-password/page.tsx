"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, ShieldCheck, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { resetPasswordRequest } from "@/lib/api/auth";
import axios from "axios";
import Link from "next/link";

const schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

function extractError(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message ?? err.message ?? fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [done, setDone] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const passwordValue = watch("password", "");

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing reset link");
      router.push("/forgot-password");
    }
  }, [token, router]);

  useEffect(() => {
    if (!done) return;
    if (countdown === 0) { router.push("/login"); return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [done, countdown, router]);

  const onSubmit = async (values: FormValues) => {
    try {
      await resetPasswordRequest(token, values.password);
      setDone(true);
      toast.success("Password reset successfully!");
    } catch (err) {
      const msg = extractError(err, "Failed to reset password. Please try again.");
      toast.error(msg);
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        setTimeout(() => router.push("/forgot-password"), 2000);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfcfb] p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-[#4a703f]/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#4a703f]/5 rounded-full blur-3xl" />

      <div className="w-full max-w-[440px] space-y-6 relative z-10">
        {/* Brand */}
        <div className="text-center space-y-1">
          <h1 className="text-4xl font-black tracking-wider text-[#1a1a1a]">
            Gauyog Kendr
          </h1>
          <p className="text-[#4a703f] font-bold text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-1">
            <ShieldCheck className="h-3 w-3" /> Management Portal
          </p>
        </div>

        <Card className="shadow-2xl border-none rounded-[32px] bg-white/90 backdrop-blur-md overflow-hidden ring-1 ring-black/5">
          <CardHeader className="pb-2 pt-8 text-center">
            <div className="flex justify-center mb-3">
              <div
                className={`w-14 h-14 rounded-full border flex items-center justify-center shadow-lg transition-colors ${
                  done ? "border-[#4a703f]/30 bg-[#4a703f]/5" : "border-slate-100 bg-white"
                }`}
              >
                {done ? (
                  <ShieldCheck className="text-[#4a703f]" size={28} strokeWidth={1.5} />
                ) : (
                  <Lock className="text-[#4a703f]" size={24} strokeWidth={1.5} />
                )}
              </div>
            </div>
            <CardTitle className="text-2xl font-black tracking-wider">
              {done ? "Password Updated" : "New Password"}
            </CardTitle>
            <CardDescription className="text-xs">
              {done
                ? "Your admin password has been reset successfully."
                : "Choose a strong password for your admin account."}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8 pt-4">
            {done ? (
              <div className="text-center space-y-4">
                <p className="text-sm font-bold text-slate-700 leading-relaxed">
                  Redirecting to login in{" "}
                  <span className="text-[#4a703f] font-black">{countdown}s</span>…
                </p>
                <Button
                  onClick={() => router.push("/login")}
                  className="w-full h-12 bg-[#4a703f] hover:bg-[#3a5a30] text-white rounded-full font-black uppercase tracking-widerst text-[11px] transition-all active:scale-[0.98]"
                >
                  Go to Login Now
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                {/* New password */}
                <div className="space-y-1 group">
                  <Label className="text-[10px] uppercase tracking-widerst font-black text-slate-400 ml-4 group-focus-within:text-[#4a703f] transition-colors">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 6 characters"
                      {...register("password")}
                      className="h-12 rounded-full border-slate-200 bg-slate-50/50 px-6 focus-visible:ring-[#4a703f] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#4a703f] transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[10px] text-red-500 font-bold ml-4">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm password */}
                <div className="space-y-1 group">
                  <Label className="text-[10px] uppercase tracking-widerst font-black text-slate-400 ml-4 group-focus-within:text-[#4a703f] transition-colors">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Repeat your password"
                      {...register("confirmPassword")}
                      className={`h-12 rounded-full bg-slate-50/50 px-6 focus-visible:ring-[#4a703f] transition-all ${
                        errors.confirmPassword
                          ? "border-red-300"
                          : "border-slate-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#4a703f] transition-colors"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-[10px] text-red-500 font-bold ml-4">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-[#4a703f] hover:bg-[#3a5a30] text-white rounded-full font-black uppercase tracking-widerst text-[11px] shadow-xl shadow-[#4a703f]/20 transition-all active:scale-[0.98] mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Set New Password"
                  )}
                </Button>

                {/* Divider */}
                <div className="relative my-2 flex items-center justify-center">
                  <div className="w-full h-px bg-slate-100" />
                  <span className="absolute bg-white px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">
                    or
                  </span>
                </div>

                <p className="text-center text-xs font-semibold text-slate-500">
                  Remember it now?{" "}
                  <Link
                    href="/login"
                    className="text-[#4a703f] font-black hover:text-[#3a5a30] transition-colors ml-1"
                  >
                    Back to Login
                  </Link>
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
