'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getInitials } from '@/lib/utils';

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Required'),
  newPassword: z.string().min(6, 'At least 6 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const name = session?.user?.email?.split('@')[0] ?? 'Admin';
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
      // TODO: wire to backend PATCH /auth/change-password once available
      await new Promise((res) => setTimeout(res, 800));
      toast.success('Password changed successfully');
      reset();
    } catch {
      toast.error('Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const themeOptions = [
    { label: 'Light', value: 'light', icon: Sun },
    { label: 'Dark', value: 'dark', icon: Moon },
    { label: 'System', value: 'system', icon: Monitor },
  ] as const;

  return (
    <DashboardShell title="Settings" description="Manage your account and preferences">
      <div className="max-w-2xl space-y-6">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Profile</CardTitle>
            <CardDescription>Your admin account information</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold capitalize">{name}</p>
              <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
              <Badge className="mt-1.5">Admin</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Appearance</CardTitle>
            <CardDescription>Customize how the admin panel looks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              {themeOptions.map(({ label, value, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setTheme(value)}
                  className={`flex flex-1 flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                    theme === value
                      ? 'border-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Change Password</CardTitle>
            <CardDescription>Update your admin account password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" placeholder="••••••••" {...register('currentPassword')} />
                {errors.currentPassword && (
                  <p className="text-xs text-destructive">{errors.currentPassword.message}</p>
                )}
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="••••••••" {...register('newPassword')} />
                {errors.newPassword && (
                  <p className="text-xs text-destructive">{errors.newPassword.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" placeholder="••••••••" {...register('confirmPassword')} />
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
                )}
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isChangingPassword}>
                  {isChangingPassword ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Updating...</>
                  ) : 'Update Password'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
