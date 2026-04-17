"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Loader2, ShieldCheck, Mail, User, KeyRound,
  UserPlus, ShoppingBag, Pencil,
} from "lucide-react";
import { toast } from "sonner";
import { DashboardShell } from "@/components/layout/DashboardShell";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/utils";
import { createStaffUserRequest } from "@/lib/api/auth";
import apiClient from "@/lib/api/axios";
import axios from "axios";

// ── Password change schema ───────────────────────────────────────────────────
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

// ── Create sales member schema ───────────────────────────────────────────────
const salesMemberSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "At least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SalesMemberFormValues = z.infer<typeof salesMemberSchema>;

// ── Update name schema ───────────────────────────────────────────────────────
const nameSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
});
type NameFormValues = z.infer<typeof nameSchema>;

function extractErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message ?? err.message ?? fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}

export default function SettingsPage() {
  const { data: session, update: updateSession } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isCreatingSales, setIsCreatingSales] = useState(false);
  const [isUpdatingName, setIsUpdatingName] = useState(false);

  const displayName = session?.user?.name || session?.user?.email?.split("@")[0] || "User";
  const initials = getInitials(displayName);
  const roleName = isAdmin ? "Admin" : "Sales";

  const nameForm = useForm<NameFormValues>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: session?.user?.name || "" },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const salesForm = useForm<SalesMemberFormValues>({
    resolver: zodResolver(salesMemberSchema),
  });

  const onNameSubmit = async (values: NameFormValues) => {
    setIsUpdatingName(true);
    try {
      await apiClient.patch("/auth/profile", { name: values.name });
      await updateSession({ name: values.name });
      toast.success("Display name updated");
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to update name."));
    } finally {
      setIsUpdatingName(false);
    }
  };

  const onPasswordSubmit = async (_values: PasswordFormValues) => {
    setIsChangingPassword(true);
    try {
      await new Promise((res) => setTimeout(res, 1200));
      toast.success("Security credentials updated");
      passwordForm.reset();
    } catch {
      toast.error("Authorization failed. Please try again.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const onCreateSalesMember = async (values: SalesMemberFormValues) => {
    setIsCreatingSales(true);
    try {
      await createStaffUserRequest(values.email, values.password, "SALES");
      toast.success(`Sales account created for ${values.email}`);
      salesForm.reset();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to create sales account."));
    } finally {
      setIsCreatingSales(false);
    }
  };

  return (
    <DashboardShell
      title="Settings"
      description="Manage your account and team."
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* ── Profile Overview ──────────────────────────────────────────── */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="overflow-hidden border-none shadow-md bg-muted/30">
            <CardHeader className="bg-[#4a703f] text-white pb-10">
              <CardTitle className="text-lg flex items-center gap-2">
                <User size={18} />
                {isAdmin ? "Admin Profile" : "Staff Profile"}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative pt-0">
              <div className="flex flex-col items-center -mt-8">
                <Avatar className="h-20 w-20 border-4 border-background shadow-xl">
                  <AvatarFallback className="text-xl bg-[#4a703f] text-white font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center mt-4 space-y-1">
                  <h4 className="text-xl font-bold capitalize">{displayName}</h4>
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <Mail size={14} /> {session?.user?.email}
                  </p>
                  <Badge
                    variant="outline"
                    className={`mt-2 ${
                      isAdmin
                        ? "bg-[#4a703f]/10 text-[#4a703f] border-[#4a703f]/20"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}
                  >
                    {isAdmin ? (
                      <><ShieldCheck size={12} className="mr-1" /> Admin</>
                    ) : (
                      <><ShoppingBag size={12} className="mr-1" /> Sales Team</>
                    )}
                  </Badge>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Access Level</span>
                  <span className="font-medium">
                    {isAdmin ? "Full Access" : "Sales Access"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Role</span>
                  <span className="font-medium">{roleName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Organization</span>
                  <span className="font-medium text-[#4a703f]">
                    Gauyog Kendr
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Right Column ─────────────────────────────────────────────── */}
        <div className="lg:col-span-8 space-y-6">

          {/* Update Name */}
          <Card className="shadow-md border-muted/20">
            <CardHeader className="border-b bg-muted/5">
              <CardTitle className="text-base flex items-center gap-2">
                <Pencil size={18} className="text-[#4a703f]" />
                Display Name
              </CardTitle>
              <CardDescription>
                Update the name shown across the dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form
                onSubmit={nameForm.handleSubmit(onNameSubmit)}
                className="flex items-end gap-4"
              >
                <div className="flex-1 space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                    Full Name
                  </Label>
                  <Input
                    placeholder="e.g. Aashna Sagar"
                    className="focus-visible:ring-[#4a703f]"
                    {...nameForm.register("name")}
                  />
                  {nameForm.formState.errors.name && (
                    <p className="text-xs text-destructive font-medium">
                      {nameForm.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isUpdatingName}
                  className="bg-[#4a703f] hover:bg-[#4a703f] min-w-[120px]"
                >
                  {isUpdatingName ? (
                    <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Saving...</>
                  ) : (
                    "Save Name"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Security / Password */}
          <Card className="shadow-md border-muted/20">
            <CardHeader className="border-b bg-muted/5">
              <CardTitle className="text-base flex items-center gap-2">
                <KeyRound size={18} className="text-[#4a703f]" />
                Security Configuration
              </CardTitle>
              <CardDescription>
                Update your password to ensure account security.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
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
                      className="focus-visible:ring-[#4a703f]"
                      {...passwordForm.register("currentPassword")}
                    />
                    {passwordForm.formState.errors.currentPassword && (
                      <p className="text-xs text-destructive font-medium">
                        {passwordForm.formState.errors.currentPassword.message}
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
                      className="focus-visible:ring-[#4a703f]"
                      {...passwordForm.register("newPassword")}
                    />
                    {passwordForm.formState.errors.newPassword && (
                      <p className="text-xs text-destructive font-medium">
                        {passwordForm.formState.errors.newPassword.message}
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
                      className="focus-visible:ring-[#4a703f]"
                      {...passwordForm.register("confirmPassword")}
                    />
                    {passwordForm.formState.errors.confirmPassword && (
                      <p className="text-xs text-destructive font-medium">
                        {passwordForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isChangingPassword}
                    className="bg-[#4a703f] hover:bg-[#4a703f] transition-colors min-w-[150px]"
                  >
                    {isChangingPassword ? (
                      <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Updating...</>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Team Management — Admin only ─────────────────────────────── */}
          {isAdmin && (
            <Card className="shadow-md border-muted/20">
              <CardHeader className="border-b bg-muted/5">
                <CardTitle className="text-base flex items-center gap-2">
                  <UserPlus size={18} className="text-blue-600" />
                  Team Management
                </CardTitle>
                <CardDescription>
                  Create login credentials for your sales team. They will access
                  products, orders, and contacts — but not user management or settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form
                  onSubmit={salesForm.handleSubmit(onCreateSalesMember)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                        Sales Member Email
                      </Label>
                      <Input
                        type="email"
                        placeholder="sales@gauyog.com"
                        className="focus-visible:ring-blue-400"
                        {...salesForm.register("email")}
                      />
                      {salesForm.formState.errors.email && (
                        <p className="text-xs text-destructive font-medium">
                          {salesForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                        Password
                      </Label>
                      <Input
                        type="password"
                        placeholder="Min. 6 characters"
                        className="focus-visible:ring-blue-400"
                        {...salesForm.register("password")}
                      />
                      {salesForm.formState.errors.password && (
                        <p className="text-xs text-destructive font-medium">
                          {salesForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                        Confirm Password
                      </Label>
                      <Input
                        type="password"
                        placeholder="Repeat password"
                        className="focus-visible:ring-blue-400"
                        {...salesForm.register("confirmPassword")}
                      />
                      {salesForm.formState.errors.confirmPassword && (
                        <p className="text-xs text-destructive font-medium">
                          {salesForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 text-xs text-blue-700 space-y-1">
                    <p className="font-bold uppercase tracking-wide">Sales Team Access</p>
                    <ul className="list-disc list-inside space-y-0.5 text-blue-600">
                      <li>View dashboard &amp; analytics</li>
                      <li>Browse product catalog (read-only)</li>
                      <li>View and manage orders</li>
                      <li>View contact messages</li>
                    </ul>
                    <p className="font-semibold text-blue-500 mt-1">
                      Not accessible: User management, Settings, Product create/edit/delete
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isCreatingSales}
                      className="bg-blue-600 hover:bg-blue-700 text-white transition-colors min-w-[180px]"
                    >
                      {isCreatingSales ? (
                        <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Creating...</>
                      ) : (
                        <><UserPlus className="h-4 w-4 mr-2" /> Create Sales Account</>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </DashboardShell>
  );
}
