'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DataTable } from '@/components/tables/DataTable';
import { useContacts } from '@/hooks/useContacts';
import { formatDate } from '@/lib/utils';
import type { ContactMessage } from '@/types';

function ContactDetailDialog({
  contact,
  open,
  onClose,
}: {
  contact: ContactMessage | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!contact) return null;

  const fields: { label: string; value: string | null }[] = [
    { label: 'Name', value: contact.name },
    { label: 'Email', value: contact.email },
    { label: 'Phone', value: contact.phone },
    { label: 'Role', value: contact.role },
    { label: 'Interested In', value: contact.interest },
    { label: 'Status', value: contact.status },
    { label: 'Received', value: formatDate(contact.createdAt) },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Contact Message</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {fields.map(({ label, value }) =>
              value ? (
                <div key={label} className="space-y-0.5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {label}
                  </p>
                  <p className="text-sm font-medium text-foreground">{value}</p>
                </div>
              ) : null,
            )}
          </div>
          <div className="space-y-1 border-t pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Message
            </p>
            <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
              {contact.message}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ContactsTable() {
  const { data, isLoading } = useContacts();
  const messages = data?.messages ?? [];
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const columns: ColumnDef<ContactMessage>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 font-semibold hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.email}</p>
          {row.original.phone && (
            <p className="text-xs text-muted-foreground">{row.original.phone}</p>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) =>
        row.original.role ? (
          <Badge variant="outline">{row.original.role}</Badge>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        ),
    },
    {
      accessorKey: 'interest',
      header: 'Interested In',
      cell: ({ row }) =>
        row.original.interest ? (
          <span className="text-xs text-muted-foreground">{row.original.interest}</span>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        ),
    },
    {
      accessorKey: 'message',
      header: 'Message',
      cell: ({ row }) => (
        <p className="text-sm text-muted-foreground max-w-xs truncate">
          {row.original.message}
        </p>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <Badge variant="secondary">{row.original.status}</Badge>,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 font-semibold hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Received <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt)}</span>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelected(row.original)}
          className="h-7 w-7 p-0"
        >
          <Eye className="h-4 w-4" />
          <span className="sr-only">View details</span>
        </Button>
      ),
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
        data={messages}
        searchKey="name"
        searchPlaceholder="Search contacts..."
      />
      <ContactDetailDialog
        contact={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
