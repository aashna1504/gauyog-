'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Trash2, ArrowUpDown, Pencil, Eye } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { DataTable } from '@/components/tables/DataTable';
import { useUsers, useDeleteUser, useUpdateUser, useUser } from '@/hooks/useUsers';
import { formatDate, getInitials } from '@/lib/utils';
import type { User } from '@/types';

// ─── Delete Dialog ─────────────────────────────────────────────────────────

function DeleteUserDialog({
  user, open, onClose,
}: { user: User | null; open: boolean; onClose: () => void }) {
  const { mutate: deleteUser, isPending } = useDeleteUser();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Delete <strong>{user?.email}</strong>? This will permanently remove
            their account and all associated data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() => user && deleteUser(user.id, { onSuccess: onClose })}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Edit Dialog ───────────────────────────────────────────────────────────

type EditForm = { name: string; email: string; role: 'USER' | 'ADMIN' };

function EditUserDialog({
  user, open, onClose,
}: { user: User | null; open: boolean; onClose: () => void }) {
  const { mutate: updateUser, isPending } = useUpdateUser(user?.id ?? '');
  const { register, handleSubmit, setValue, watch, reset } = useForm<EditForm>();

  const onOpenChange = (isOpen: boolean) => {
    if (isOpen && user) {
      reset({ name: user.name ?? '', email: user.email, role: user.role });
    }
    if (!isOpen) onClose();
  };

  const onSubmit = (data: EditForm) => {
    if (!user) return;
    updateUser(
      { name: data.name || undefined, email: data.email, role: data.role },
      { onSuccess: onClose },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update user details and role.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="edit-name">Name</Label>
            <Input id="edit-name" placeholder="Full name" {...register('name')} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
              type="email"
              placeholder="Email address"
              {...register('email', { required: true })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Role</Label>
            <Select
              value={watch('role')}
              onValueChange={(v) => setValue('role', v as 'USER' | 'ADMIN')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">USER</SelectItem>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── View Details Dialog ───────────────────────────────────────────────────

function UserDetailsDialog({
  userId, open, onClose,
}: { userId: string | null; open: boolean; onClose: () => void }) {
  const { data: user, isLoading } = useUser(userId ?? '');

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>Full profile and account information</DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="space-y-3 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        )}

        {user && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="text-lg">
                  {getInitials(user.name ?? user.email.split('@')[0])}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-base">{user.name ?? '—'}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Badge
                  className="mt-1"
                  variant={user.role === 'ADMIN' ? 'default' : 'secondary'}
                >
                  {user.role}
                </Badge>
              </div>
            </div>

            <InfoSection title="Account">
              <InfoRow label="ID" value={user.id} mono />
              <InfoRow label="Joined" value={formatDate(user.createdAt)} />
              <InfoRow label="Last updated" value={formatDate(user.updatedAt)} />
            </InfoSection>

            {(user as any).deliveryDetails && (
              <InfoSection title="Delivery Address">
                {(() => {
                  const d = (user as any).deliveryDetails;
                  return (
                    <>
                      <InfoRow
                        label="Name"
                        value={[d.firstName, d.lastName].filter(Boolean).join(' ') || '—'}
                      />
                      <InfoRow label="Phone" value={d.phone ?? '—'} />
                      <InfoRow label="Email" value={d.email ?? '—'} />
                      <InfoRow label="Address" value={d.address ?? '—'} />
                      <InfoRow label="Building" value={d.building ?? '—'} />
                    </>
                  );
                })()}
              </InfoSection>
            )}

            {(user as any).cart?.items?.length > 0 && (
              <InfoSection title={`Cart (${(user as any).cart.items.length} items)`}>
                {(user as any).cart.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm py-1 px-3">
                    <span className="text-muted-foreground truncate max-w-[60%]">
                      {item.product.name}
                    </span>
                    <span>
                      ×{item.quantity} — ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </InfoSection>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
        {title}
      </p>
      <div className="rounded-lg border divide-y">{children}</div>
    </div>
  );
}

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between items-center px-3 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={`font-medium text-right max-w-[60%] truncate ${
          mono ? ' text-xs' : ''
        }`}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Main Table ────────────────────────────────────────────────────────────

export function UsersTable() {
  const { data, isLoading } = useUsers();
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [editTarget, setEditTarget] = useState<User | null>(null);
  const [viewUserId, setViewUserId] = useState<string | null>(null);

  // Backend returns { users: User[], meta: {...} }
  const users: User[] = data?.users ?? [];

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 font-semibold hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          User <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: ({ row }) => {
        const user = row.original;
        const name = user.name ?? user.email.split('@')[0];
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">
                {user.name ?? (
                  <span className="text-muted-foreground italic">No name</span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <Badge variant={row.original.role === 'ADMIN' ? 'default' : 'secondary'}>
          {row.original.role}
        </Badge>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 font-semibold hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Joined <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {formatDate(row.original.createdAt)}
        </span>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setViewUserId(user.id)}>
                <Eye className="h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setEditTarget(user)}>
                <Pencil className="h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => setDeleteTarget(user)}
              >
                <Trash2 className="h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={users}
        searchKey="email"
        searchPlaceholder="Search by email..."
      />

      <DeleteUserDialog
        user={deleteTarget}
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
      />

      <EditUserDialog
        user={editTarget}
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
      />

      <UserDetailsDialog
        userId={viewUserId}
        open={!!viewUserId}
        onClose={() => setViewUserId(null)}
      />
    </>
  );
}
