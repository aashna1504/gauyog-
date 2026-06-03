"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  Loader2,
  ExternalLink,
} from "lucide-react";
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
import { forgotPasswordRequest } from "@/lib/api/auth";
import axios from "axios";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});
type FormValues = z.infer<typeof schema>;

function extractError(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message ?? err.message ?? fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}

function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [devLink, setDevLink] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const submit = async (values: FormValues) => {
    try {
      const redirectBase =
        typeof window !== "undefined" ? window.location.origin : undefined;
      const result = await forgotPasswordRequest(values.email, redirectBase);
      setSubmittedEmail(values.email);
      setSent(true);
      setEmailSent(!!result?.emailDelivered);
      if (result?.devResetLink && !result?.emailDelivered) {
        setDevLink(result.devResetLink);
      }
    } catch (err) {
      toast.error(extractError(err, "Failed to send reset link. Please try again."));
    }
  };

  const resend = async () => {
    try {
      const redirectBase =
        typeof window !== "undefined" ? window.location.origin : undefined;
      await forgotPasswordRequest(submittedEmail, redirectBase);
      toast.success("Reset link resent!");
    } catch (err) {
      toast.error(extractError(err, "Failed to resend. Please try again."));
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
                  sent ? "border-[#4a703f]/30 bg-[#4a703f]/5" : "border-slate-100 bg-white"
                }`}
              >
                {sent ? (
                  <ShieldCheck className="text-[#4a703f]" size={28} strokeWidth={1.5} />
                ) : (
                  <Mail className="text-[#4a703f]" size={24} strokeWidth={1.5} />
                )}
              </div>
            </div>
            <CardTitle className="text-2xl font-black tracking-wider">
              {sent ? (emailSent ? "Check Your Inbox" : "Link Ready") : "Reset Password"}
            </CardTitle>
            <CardDescription className="text-xs">
              {sent
                ? "Follow the link to create a new password."
                : "Enter your admin email to receive a reset link."}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8 pt-4">
            {!sent ? (
              <form onSubmit={handleSubmit(submit)} className="space-y-4" noValidate>
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

                <Button
                  type="submit"
                  className="w-full h-12 bg-[#4a703f] hover:bg-[#3a5a30] text-white rounded-full font-black uppercase tracking-widerst text-[11px] shadow-xl shadow-[#4a703f]/20 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2 group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight
                        size={15}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                {emailSent ? (
                  <>
                    <p className="text-sm font-bold text-slate-700 leading-relaxed">
                      A reset link was sent to{" "}
                      <span className="text-slate-950 font-black">{submittedEmail}</span>.
                      <br />
                      <span className="text-[12px] text-slate-400 font-medium block mt-1">
                        Check your inbox and click the link within 30 minutes.
                      </span>
                    </p>
                    <button
                      onClick={resend}
                      className="text-[#4a703f] font-black uppercase text-[10px] tracking-widerst hover:underline"
                    >
                      Resend Link
                    </button>
                  </>
                ) : devLink ? (
                  <>
                    <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-widerst px-3 py-1.5 rounded-full border border-amber-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Dev Mode — Email not configured
                    </div>
                    <p className="text-sm font-bold text-slate-600 leading-relaxed">
                      Reset link for{" "}
                      <span className="text-slate-950 font-black">{submittedEmail}</span>
                    </p>
                    <Link
                      href={devLink}
                      className="inline-flex items-center gap-2 bg-[#4a703f] text-white px-6 py-3 rounded-full font-black text-[11px] uppercase tracking-widerst hover:bg-[#3a5a30] transition-colors"
                    >
                      Reset Password Now
                      <ExternalLink size={13} />
                    </Link>
                    <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
                      Add{" "}
                      <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                        GMAIL_APP_PASSWORD
                      </code>{" "}
                      to <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">.env</code>{" "}
                      to enable real email delivery.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-bold text-slate-700 leading-relaxed">
                      If an admin account exists for{" "}
                      <span className="text-slate-950 font-black">{submittedEmail}</span>,
                      a reset link has been sent.
                    </p>
                    <button
                      onClick={resend}
                      className="text-[#4a703f] font-black uppercase text-[10px] tracking-widerst hover:underline"
                    >
                      Resend Link
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Divider */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="w-full h-px bg-slate-100" />
              <span className="absolute bg-white px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">
                or
              </span>
            </div>

            <p className="text-center text-xs font-semibold text-slate-500">
              Remembered your password?{" "}
              <Link
                href="/login"
                className="text-[#4a703f] font-black hover:text-[#3a5a30] transition-colors ml-1"
              >
                Back to Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminForgotPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ForgotPasswordForm />
    </Suspense>
  );
}
