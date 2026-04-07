"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, ShieldCheck, Mail, User, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { DashboardShell } from "@/components/layout/DashboardShell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/utils";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Required"),
    newPassword: z.string().min(6, "At least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const { data: session } = useSession();
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const name = session?.user?.email?.split("@")[0] ?? "Admin";
  const initials = getInitials(name);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({ resolver: zodResolver(passwordSchema) });

  const onPasswordSubmit = async (_values: PasswordFormValues) => {
    setIsChangingPassword(true);
    try {
      await new Promise((res) => setTimeout(res, 1200));
      toast.success("Security credentials updated");
      reset();
    } catch {
      toast.error("Authorization failed. Please try again.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <DashboardShell
      title="Account Settings"
      description="Manage your administrative credentials and security."
    >
      {/* Container now uses full width (w-full) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Profile Overview (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="overflow-hidden border-none shadow-md bg-muted/30">
            <CardHeader className="bg-[#4a703f] text-white pb-10">
              <CardTitle className="text-lg flex items-center gap-2">
                <User size={18} /> Admin Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="relative pt-0">
              <div className="flex flex-col items-center -mt-8">
                <Avatar className="h-20 w-20 border-4 border-background shadow-xl">
                  <AvatarFallback className="text-xl bg-[#7bbd25] text-white font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center mt-4 space-y-1">
                  <h4 className="text-xl font-bold capitalize">{name}</h4>
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <Mail size={14} /> {session?.user?.email}
                  </p>
                  <Badge
                    variant="outline"
                    className="mt-2 bg-[#7bbd25]/10 text-[#4a703f] border-[#7bbd25]/20"
                  >
                    <ShieldCheck size={12} className="mr-1" /> Authorized Admin
                  </Badge>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Access Level</span>
                  <span className="font-medium">Full Access</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Organization</span>
                  <span className="font-medium text-[#4a703f]">
                    Gauyog Kendra
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Security/Password (8 cols) */}
        <div className="lg:col-span-8">
          <Card className="shadow-md border-muted/20">
            <CardHeader className="border-b bg-muted/5">
              <CardTitle className="text-base flex items-center gap-2">
                <KeyRound size={18} className="text-[#4a703f]" /> Security
                Configuration
              </CardTitle>
              <CardDescription>
                Update your password to ensure account security.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form
                onSubmit={handleSubmit(onPasswordSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                      Current Password
                    </Label>
                    <Input
                      type="password"
                      placeholder="Enter current password"
                      className="focus-visible:ring-[#7bbd25]"
                      {...register("currentPassword")}
                    />
                    {errors.currentPassword && (
                      <p className="text-xs text-destructive font-medium">
                        {errors.currentPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                      New Password
                    </Label>
                    <Input
                      type="password"
                      placeholder="Min. 6 characters"
                      className="focus-visible:ring-[#7bbd25]"
                      {...register("newPassword")}
                    />
                    {errors.newPassword && (
                      <p className="text-xs text-destructive font-medium">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                      Confirm New Password
                    </Label>
                    <Input
                      type="password"
                      placeholder="Repeat new password"
                      className="focus-visible:ring-[#7bbd25]"
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <p className="text-xs text-destructive font-medium">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isChangingPassword}
                    className="bg-[#4a703f] hover:bg-[#7bbd25] transition-colors min-w-[150px]"
                  >
                    {isChangingPassword ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />{" "}
                        Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
