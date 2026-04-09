'use client';

import { useEffect, useState } from 'react';
import { Package, ShoppingCart, TrendingUp, AlertTriangle, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import apiClient from '@/lib/api/axios';

interface Stats {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  inventoryValue: number;
  lowStock: number;
  outOfStock: number;
}

function StatCard({
  title,
  value,
  sub,
  icon: Icon,
  iconClass = 'text-primary',
  loading = false,
}: {
  title: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  iconClass?: string;
  loading?: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconClass}`} />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-8 w-24 bg-muted animate-pulse rounded" />
        ) : (
          <p className="text-2xl font-bold">{value}</p>
        )}
        {sub && !loading && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get('/orders/stats')
      .then((res) => setStats(res.data?.data ?? null))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <StatCard
        title="Total Products"
        value={stats?.totalProducts ?? '—'}
        sub={stats ? `${stats.lowStock} low stock` : undefined}
        icon={Package}
        loading={loading}
      />
      <StatCard
        title="Total Users"
        value={stats?.totalUsers ?? '—'}
        sub="Registered customers"
        icon={Users}
        iconClass="text-blue-500"
        loading={loading}
      />
      <StatCard
        title="Total Orders"
        value={stats?.totalOrders ?? '—'}
        sub="All time orders"
        icon={ShoppingCart}
        iconClass="text-violet-500"
        loading={loading}
      />
      <StatCard
        title="Inventory Value"
        value={stats ? formatCurrency(stats.inventoryValue) : '—'}
        sub="Based on stock × price"
        icon={TrendingUp}
        iconClass="text-emerald-500"
        loading={loading}
      />
      <StatCard
        title="Low / Out of Stock"
        value={stats ? `${stats.lowStock} / ${stats.outOfStock}` : '—'}
        sub="Low stock / out of stock"
        icon={AlertTriangle}
        iconClass="text-amber-500"
        loading={loading}
      />
    </div>
  );
}
