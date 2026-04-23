'use client';

import { useEffect, useState, useCallback } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil, Check, X } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/tables/DataTable';

import { formatDate } from '@/lib/utils';
import apiClient from '@/lib/api/axios';
import { toast } from 'sonner';

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
  trackingId: string | null;
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
  PENDING: 'outline',
  CONFIRMED: 'default',
  PROCESSING: 'secondary',
  SHIPPED: 'default',
  DELIVERED: 'secondary',
  CANCELLED: 'destructive',
};

const STATUS_COLOR: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  CONFIRMED: 'bg-blue-100 text-blue-800 border-blue-200',
  PROCESSING: 'bg-purple-100 text-purple-800 border-purple-200',
  SHIPPED: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  DELIVERED: 'bg-green-100 text-green-800 border-green-200',
  CANCELLED: 'bg-red-100 text-red-800 border-red-200',
};

const ORDER_STATUSES = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

// ── Inline status dropdown ───────────────────────────────────────────────────
function StatusSelect({
  orderId,
  current,
  onUpdated,
}: {
  orderId: string;
  current: string;
  onUpdated: (id: string, status: string) => void;
}) {
  const [updating, setUpdating] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    if (newStatus === current) return;
    setUpdating(true);
    try {
      await apiClient.patch(`/orders/${orderId}/status`, { status: newStatus });
      onUpdated(orderId, newStatus);
      toast.success(`Status → ${newStatus}`);
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <select
      value={current}
      onChange={handleChange}
      disabled={updating}
      className={`text-[10px] font-bold border rounded-lg px-2 py-1 appearance-none cursor-pointer focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${STATUS_COLOR[current] ?? 'bg-slate-100 text-slate-600'}`}
    >
      {ORDER_STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}

// ── Inline tracking ID editor ────────────────────────────────────────────────
function TrackingIdCell({
  orderId,
  trackingId,
  onUpdated,
}: {
  orderId: string;
  trackingId: string | null;
  onUpdated: (id: string, trackingId: string | null) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(trackingId ?? '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiClient.patch(`/orders/${orderId}/tracking`, { trackingId: value });
      onUpdated(orderId, value.trim() || null);
      toast.success('Tracking ID saved');
      setEditing(false);
    } catch {
      toast.error('Failed to save tracking ID');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setValue(trackingId ?? '');
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="flex items-center gap-1 min-w-[160px]">
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
          }}
          placeholder="e.g. DTDC123456789"
          className="flex-1 text-xs border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:border-primary font-mono"
        />
        <button
          onClick={handleSave}
          disabled={saving}
          className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors disabled:opacity-50"
        >
          <Check size={13} />
        </button>
        <button
          onClick={handleCancel}
          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
        >
          <X size={13} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 group">
      {trackingId ? (
        <span className="font-mono text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-md border border-slate-200">
          {trackingId}
        </span>
      ) : (
        <span className="text-xs text-muted-foreground italic">Not set</span>
      )}
      <button
        onClick={() => setEditing(true)}
        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-primary hover:bg-slate-100 rounded transition-all"
        title="Edit tracking ID"
      >
        <Pencil size={11} />
      </button>
    </div>
  );
}

// ── Main table ───────────────────────────────────────────────────────────────
export function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = useCallback(() => {
    setIsLoading(true);
    apiClient
      .get('/orders?limit=200')
      .then((res) => setOrders(res.data?.data?.orders ?? []))
      .catch(() => {
        setOrders([]);
        toast.error('Failed to load orders');
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const handleStatusUpdated = (id: string, status: string) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));

  const handleTrackingUpdated = (id: string, trackingId: string | null) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, trackingId } : o)));

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'id',
      header: 'Order ID',
      cell: ({ row }) => (
        <div className="space-y-0.5">
          <span className="text-xs font-mono font-semibold">
            #{row.original.id.slice(0, 8).toUpperCase()}
          </span>
          <p className="text-[10px] text-muted-foreground font-mono">
            {row.original.id}
          </p>
        </div>
      ),
    },
    {
      id: 'trackingId',
      header: 'Tracking ID',
      cell: ({ row }) => (
        <TrackingIdCell
          orderId={row.original.id}
          trackingId={row.original.trackingId}
          onUpdated={handleTrackingUpdated}
        />
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
              : row.original.user?.name ?? '—'}
          </p>
          <p className="text-xs text-muted-foreground">
            {row.original.email ?? row.original.user?.email ?? '—'}
          </p>
          {row.original.phone && (
            <p className="text-xs text-muted-foreground">{row.original.phone}</p>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'total',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Total <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: ({ row }) => (
        <span className="font-bold">₹{row.original.total.toLocaleString('en-IN')}</span>
      ),
    },
    {
      accessorKey: 'paymentMethod',
      header: 'Payment',
      cell: ({ row }) => <Badge variant="outline">{row.original.paymentMethod}</Badge>,
    },
    {
      accessorKey: 'items',
      header: 'Items',
      cell: ({ row }) => (
        <div className="space-y-0.5">
          <span className="text-sm font-medium">
            {row.original.items?.length ?? 0} item{(row.original.items?.length ?? 0) !== 1 ? 's' : ''}
          </span>
          {row.original.items?.slice(0, 2).map((item) => (
            <p key={item.id} className="text-[10px] text-muted-foreground truncate max-w-[140px]">
              {item.quantity}× {item.name}
            </p>
          ))}
          {(row.original.items?.length ?? 0) > 2 && (
            <p className="text-[10px] text-muted-foreground">+{row.original.items.length - 2} more</p>
          )}
        </div>
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
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">{formatDate(row.original.createdAt)}</span>
      ),
    },
    {
      id: 'actions',
      header: 'Update Status',
      cell: ({ row }) => (
        <StatusSelect
          orderId={row.original.id}
          current={row.original.status}
          onUpdated={handleStatusUpdated}
        />
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <DataTable
          columns={columns}
          data={orders}
          searchKey="id"
          searchPlaceholder="Search by order ID..."
        />
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {orders.length === 0 && (
          <p className="text-center text-muted-foreground py-12 text-sm font-medium">No orders yet.</p>
        )}
        {orders.map((o) => (
          <div key={o.id} className="border rounded-lg p-4 shadow-sm bg-white space-y-3">
            {/* IDs */}
            <div className="space-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Order ID</p>
                  <span className="text-xs font-semibold font-mono">#{o.id.slice(0, 8).toUpperCase()}</span>
                </div>
                <Badge variant={STATUS_VARIANT[o.status] ?? 'secondary'}>{o.status}</Badge>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Tracking ID</p>
                <TrackingIdCell
                  orderId={o.id}
                  trackingId={o.trackingId}
                  onUpdated={(id, trackingId) =>
                    setOrders((prev) => prev.map((ord) => (ord.id === id ? { ...ord, trackingId } : ord)))
                  }
                />
              </div>
            </div>

            {/* Customer */}
            <div>
              <p className="text-sm font-medium">
                {o.firstName ? `${o.firstName} ${o.lastName ?? ''}` : o.user?.name ?? '—'}
              </p>
              <p className="text-xs text-muted-foreground">{o.email ?? o.user?.email ?? '—'}</p>
              {o.phone && <p className="text-xs text-muted-foreground">{o.phone}</p>}
            </div>

            {/* Items */}
            {o.items?.length > 0 && (
              <div className="text-xs text-muted-foreground space-y-0.5">
                {o.items.slice(0, 3).map((item) => (
                  <p key={item.id}>{item.quantity}× {item.name}</p>
                ))}
                {o.items.length > 3 && <p>+{o.items.length - 3} more</p>}
              </div>
            )}

            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold text-sm">₹{o.total.toLocaleString('en-IN')}</span>
                <span className="text-xs text-muted-foreground ml-2">{o.paymentMethod}</span>
              </div>
              <span className="text-xs text-muted-foreground">{formatDate(o.createdAt)}</span>
            </div>

            <StatusSelect
              orderId={o.id}
              current={o.status}
              onUpdated={(id, status) =>
                setOrders((prev) => prev.map((ord) => (ord.id === id ? { ...ord, status } : ord)))
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}
