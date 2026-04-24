"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Trash2,
  ArrowUpDown,
  Pencil,
  Eye,
} from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DataTable } from "@/components/tables/DataTable";

import {
  useUsers,
  useDeleteUser,
  useUpdateUser,
  useUser,
} from "@/hooks/useUsers";

import { formatDate, getInitials } from "@/lib/utils";
import type { User } from "@/types";


// ─── DELETE DIALOG ─────────────────────────────────────────

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
            Delete <strong>{user?.email}</strong>? This action is permanent.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() => user && deleteUser(user.id, { onSuccess: onClose })}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


// ─── EDIT DIALOG ─────────────────────────────────────────

type EditForm = {
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "SALES";
};

function EditUserDialog({
  user,
  open,
  onClose,
}: {
  user: User | null;
  open: boolean;
  onClose: () => void;
}) {
  const { mutate: updateUser, isPending } = useUpdateUser(user?.id ?? "");
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<EditForm>();

  const onOpenChange = (isOpen: boolean) => {
    if (isOpen && user) {
      reset({
        name: user.name ?? "",
        email: user.email,
        role: user.role,
      });
    }
    if (!isOpen) onClose();
  };

  const onSubmit = (data: EditForm) => {
    if (!user) return;

    updateUser(data, {
      onSuccess: onClose,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update user info</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input {...register("name")} />
          </div>

          <div>
            <Label>Email</Label>
            <Input {...register("email", { required: true })} />
          </div>

          <div>
            <Label>Role</Label>
            <Select
              value={watch("role")}
              onValueChange={(v) =>
                setValue("role", v as "USER" | "ADMIN" | "SALES")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="USER">USER</SelectItem>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
                <SelectItem value="SALES">SALES</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


// ─── USER DETAILS ─────────────────────────────────────────

function UserDetailsDialog({
  userId,
  open,
  onClose,
}: {
  userId: string | null;
  open: boolean;
  onClose: () => void;
}) {
  const { data: user, isLoading } = useUser(userId ?? "");

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        {isLoading && <Skeleton className="h-20 w-full" />}

        {user && (
          <div className="space-y-4">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Joined:</strong> {formatDate(user.createdAt)}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}


// ─── MAIN TABLE ─────────────────────────────────────────

export function UsersTable() {
  const { data, isLoading } = useUsers();

  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [editTarget, setEditTarget] = useState<User | null>(null);
  const [viewUserId, setViewUserId] = useState<string | null>(null);

  const users: User[] = data?.users ?? [];

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "email",
      header: "User",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                {getInitials(user.name ?? user.email)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p>{user.name ?? "No name"}</p>
              <p className="text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <Badge>{row.original.role}</Badge>,
    },
    {
      accessorKey: "createdAt",
      header: "Joined",
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setViewUserId(user.id)}>
                <Eye className="mr-2 h-4 w-4" /> View
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setEditTarget(user)}>
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setDeleteTarget(user)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (isLoading) {
    return <Skeleton className="h-40 w-full" />;
  }

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <DataTable columns={columns} data={users} />
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div key={user.id} className="border rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <Avatar>
                  <AvatarFallback>
                    {getInitials(user.email)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-medium">{user.name ?? "No name"}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              <Badge>{user.role}</Badge>
            </div>

            <p className="text-xs mt-2 text-muted-foreground">
              Joined: {formatDate(user.createdAt)}
            </p>

            <div className="flex gap-2 justify-end mt-3">
              <Button size="sm" onClick={() => setViewUserId(user.id)}>
                <Eye className="h-4 w-4" />
              </Button>

              <Button size="sm" onClick={() => setEditTarget(user)}>
                <Pencil className="h-4 w-4" />
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => setDeleteTarget(user)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Dialogs */}
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