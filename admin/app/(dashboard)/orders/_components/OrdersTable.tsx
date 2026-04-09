'use client';

import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/tables/DataTable';
import { formatDate, formatCurrency } from '@/lib/utils';
import apiClient from '@/lib/api/axios';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  status: string;
  paymentMethod: string;
  total: number;
  subtotal: number;
  createdAt: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  items: OrderItem[];
  user?: { email: string; name?: string };
}

const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  PENDING:    'outline',
  CONFIRMED:  'default',
  PROCESSING: 'secondary',
  SHIPPED:    'default',
  DELIVERED:  'secondary',
  CANCELLED:  'destructive',
};

export function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get('/orders?limit=100')
      .then((res) => setOrders(res.data?.data?.orders ?? []))
      .catch(() => setOrders([]))
      .finally(() => setIsLoading(false));
  }, []);

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'id',
      header: 'Order ID',
      cell: ({ row }) => (
        <span className="font-mono text-xs">#{row.original.id.slice(0, 8).toUpperCase()}</span>
      ),
    },
    {
      accessorKey: 'user',
      header: 'Customer',
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-sm">
            {row.original.firstName
              ? `${row.original.firstName} ${row.original.lastName ?? ''}`
              : (row.original.user?.name ?? '—')}
          </p>
          <p className="text-xs text-muted-foreground">
            {row.original.email ?? row.original.user?.email ?? '—'}
          </p>
        </div>
      ),
    },
    {
      accessorKey: 'total',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 font-semibold hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Total <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: ({ row }) => <span className="font-bold">₹{row.original.total.toLocaleString('en-IN')}</span>,
    },
    {
      accessorKey: 'paymentMethod',
      header: 'Payment',
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.paymentMethod}</Badge>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={STATUS_VARIANT[row.original.status] ?? 'secondary'}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: 'items',
      header: 'Items',
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.items?.length ?? 0} item(s)
        </span>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt)}</span>
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
    <DataTable
      columns={columns}
      data={orders}
      searchKey="id"
      searchPlaceholder="Search by order ID..."
    />
  );
}
