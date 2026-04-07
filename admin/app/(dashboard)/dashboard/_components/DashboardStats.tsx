'use client';

import { Users, Package, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

const DUMMY_STATS = {
  totalProducts: 48,
  totalUsers: 312,
  totalOrders: 87,
  inventoryValue: 284500,
  lowStock: 6,
  outOfStock: 3,
};

function StatCard({
  title,
  value,
  sub,
  icon: Icon,
  iconClass = 'text-primary',
}: {
  title: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  iconClass?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconClass}`} />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Products"
        value={DUMMY_STATS.totalProducts}
        sub={`${DUMMY_STATS.lowStock} low stock`}
        icon={Package}
      />
      <StatCard
        title="Inventory Value"
        value={formatCurrency(DUMMY_STATS.inventoryValue)}
        sub="Based on stock × price"
        icon={TrendingUp}
        iconClass="text-emerald-500"
      />
      <StatCard
        title="Low Stock Alerts"
        value={DUMMY_STATS.lowStock}
        sub="Products below 10 units"
        icon={AlertTriangle}
        iconClass="text-amber-500"
      />
      <StatCard
        title="Out of Stock"
        value={DUMMY_STATS.outOfStock}
        sub="Requires immediate attention"
        icon={ShoppingCart}
        iconClass="text-destructive"
      />
    </div>
  );
}
