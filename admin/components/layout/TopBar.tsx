'use client';

import { useSession, signOut } from 'next-auth/react';
import { LogOut, Settings, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getInitials } from '@/lib/utils';
import { toast } from 'sonner';
import { useUIStore } from '@/store/uiStore';

export function TopBar() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toggleMobileSidebar } = useUIStore();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    toast.success('Signed out successfully');
    router.push('/login');
  };

  const displayName = session?.user?.name || session?.user?.email?.split('@')[0] || 'User';
  const initials = getInitials(displayName);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b bg-background/95 px-3 sm:px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Left: hamburger (mobile) */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 md:hidden"
          onClick={toggleMobileSidebar}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Right: user menu */}
      <div className="flex items-center gap-2 ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 gap-2 px-2 rounded-full">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs bg-[#4a703f] text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-xs font-semibold leading-none">
                  {displayName}
                </span>
                <Badge
                  variant="secondary"
                  className={`h-4 px-1 text-[10px] mt-0.5 ${
                    session?.user?.role === 'ADMIN'
                      ? 'bg-[#4a703f]/10 text-[#4a703f]'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {session?.user?.role === 'ADMIN' ? 'Admin' : 'Sales'}
                </Badge>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground truncate">{session?.user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/settings')}>
              <Settings className="h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-destructive focus:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
