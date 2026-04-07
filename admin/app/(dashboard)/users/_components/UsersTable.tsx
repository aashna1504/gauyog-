'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Trash2, ArrowUpDown, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { DataTable } from '@/components/tables/DataTable';
import { useUsers, useDeleteUser } from '@/hooks/useUsers';
import { formatDate, getInitials } from '@/lib/utils';
import type { User } from '@/types';

function DeleteUserDialog({
  user,
  open,
  onClose,
}: {
  user: User | null;
  open: boolean;
  onClose: () => void;
}) {
  const { mutate: deleteUser, isPending } = useDeleteUser();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Delete <strong>{user?.email}</strong>? This will remove all their data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>Cancel</Button>
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

export function UsersTable() {
  const { data: users, isLoading } = useUsers();
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

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
              <p className="font-medium text-sm">{name}</p>
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
      header: 'Joined',
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt)}</span>
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
        {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={users ?? []}
        searchKey="email"
        searchPlaceholder="Search by email..."
      />
      <DeleteUserDialog
        user={deleteTarget}
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
      />
    </>
  );
}
