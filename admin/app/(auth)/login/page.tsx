"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2, ShieldCheck, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginRequest, signupRequest } from "@/lib/api/auth";
import { useAdminAuthStore } from "@/store/authStore";
import axios from "axios";

const authSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.confirmPassword !== undefined &&
        data.confirmPassword !== "" &&
        data.password !== data.confirmPassword
      )
        return false;
      return true;
    },
    { message: "Passwords do not match", path: ["confirmPassword"] },
  );

type AuthFormValues = z.infer<typeof authSchema>;

/** Pull a human-readable message out of an Axios error or plain Error */
function extractErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message ?? err.message ?? fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}

function AdminAuthForm() {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const callbackError = searchParams.get("error");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: AuthFormValues) => {
    setIsLoading(true);
    try {
      if (authMode === "signin") {
        // ── Step 1: hit the backend directly so we get the real error message ──
        let loginData;
        try {
          loginData = await loginRequest(values.email, values.password);
        } catch (err) {
          toast.error(
            extractErrorMessage(
              err,
              "Login failed. Please check your credentials.",
            ),
          );
          return;
        }

        // ── Step 2: check staff role before creating a session ──
        if (loginData.user.role !== "ADMIN" && loginData.user.role !== "SALES") {
          toast.error("Access denied. This portal is for staff only.");
          return;
        }

        // ── Store token immediately so API calls work regardless of NextAuth state ──
        useAdminAuthStore.getState().setAccessToken(loginData.accessToken);

        // ── Step 3: create the NextAuth session (pass pre-fetched tokens to avoid a second backend call) ──
        let result;
        try {
          result = await signIn("credentials", {
            email: values.email,
            password: values.password,
            accessToken: loginData.accessToken,
            refreshToken: loginData.refreshToken,
            userId: loginData.user.id,
            userName: loginData.user.name ?? "",
            userRole: loginData.user.role,
            redirect: false,
            callbackUrl: "/dashboard",
          });
        } catch {
          toast.error("Session creation failed. Please try again.");
          return;
        }

        if (result?.error) {
          toast.error("Session creation failed. Please try again.");
          return;
        }

        const roleName = loginData.user.role === "ADMIN" ? "Admin" : "Sales Team";
        toast.success(`Welcome back, ${roleName}!`);
        router.push("/dashboard");
      } else {
        // ── Signup: create an ADMIN account ──
        try {
          await signupRequest(values.email, values.password);
        } catch (err) {
          toast.error(
            extractErrorMessage(err, "Registration failed. Please try again."),
          );
          return;
        }

        toast.success("Admin account created! You can now sign in.");
        toggleMode("signin");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    reset();
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

        {/* Tabs */}
        <div className="flex p-1 bg-slate-100 rounded-full border border-slate-200">
          <button
            onClick={() => toggleMode("signin")}
            className={`flex-1 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
              authMode === "signin"
                ? "bg-white text-[#4a703f] shadow-sm"
                : "text-slate-400"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => toggleMode("signup")}
            className={`flex-1 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
              authMode === "signup"
                ? "bg-white text-[#4a703f] shadow-sm"
                : "text-slate-400"
            }`}
          >
            New Admin
          </button>
        </div>

        <Card className="shadow-2xl border-none rounded-[32px] bg-white/90 backdrop-blur-md overflow-hidden ring-1 ring-black/5">
          <CardHeader className="pb-2 pt-8 text-center">
            <CardTitle className="text-2xl font-black tracking-wider">
              {authMode === "signin" ? "Access Console" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-xs">
              {authMode === "signin"
                ? "Enter your staff credentials to continue."
                : "Register a new administrative identity."}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8 pt-4">
            {/* URL-level error (e.g. redirected back from a protected page) */}
            {callbackError === "unauthorized" && (
              <div className="mb-6 rounded-xl bg-red-50 border border-red-100 p-3 text-[11px] text-red-600 font-bold text-center uppercase tracking-wider">
                Unauthorized — Admin access required
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate
            >
              {/* Email */}
              <div className="space-y-1 group">
                <Label className="text-[10px] uppercase tracking-widerst font-black text-slate-400 ml-4 group-focus-within:text-[#4a703f] transition-colors">
                  Admin Email
                </Label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="name@gauyog.com"
                    {...register("email")}
                    className="h-12 rounded-full border-slate-200 bg-slate-50/50 px-6 focus-visible:ring-[#4a703f] transition-all"
                  />
                  <Mail className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                </div>
                {errors.email && (
                  <p className="text-[10px] text-red-500 font-bold ml-4">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1 group">
                <Label className="text-[10px] uppercase tracking-widerst font-black text-slate-400 ml-4 group-focus-within:text-[#4a703f] transition-colors">
                  Security Key
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className="h-12 rounded-full border-slate-200 bg-slate-50/50 px-6 focus-visible:ring-[#4a703f] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#4a703f]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[10px] text-red-500 font-bold ml-4">
                    {errors.password.message}
                  </p>
                )}
                {authMode === "signin" && (
                  <div className="flex justify-end pr-1">
                    <Link
                      href="/forgot-password"
                      className="text-[10px] font-bold text-[#4a703f] hover:text-[#3a5a30] transition-colors uppercase tracking-wider"
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}
              </div>

              {/* Confirm Password — signup only */}
              {authMode === "signup" && (
                <div className="space-y-1 group animate-in slide-in-from-top-2 duration-300">
                  <Label className="text-[10px] uppercase tracking-widerst font-black text-slate-400 ml-4 group-focus-within:text-[#4a703f]">
                    Verify Key
                  </Label>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...register("confirmPassword")}
                      className="h-12 rounded-full border-slate-200 bg-slate-50/50 px-6 focus-visible:ring-[#4a703f] transition-all"
                    />
                    <Lock className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-[10px] text-red-500 font-bold ml-4">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-[#4a703f] hover:bg-[#4a703f] text-white rounded-full font-black uppercase tracking-widerst text-[11px] shadow-xl shadow-[#4a703f]/20 transition-all active:scale-[0.98] mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : authMode === "signin" ? (
                  "Unlock Dashboard"
                ) : (
                  "Register Admin"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminAuthPage() {
  return (
    <Suspense fallback={null}>
      <AdminAuthForm />
    </Suspense>
  );
}
