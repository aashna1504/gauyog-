import { Package, ShoppingCart, TrendingUp, AlertTriangle, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import type { StatsData } from '@/lib/api/stats';

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

export function DashboardStats({ stats }: { stats: StatsData | null }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <StatCard
        title="Total Products"
        value={stats?.totalProducts ?? 0}
        sub={stats ? `${stats.lowStock} low · ${stats.outOfStock} out of stock` : undefined}
        icon={Package}
      />
      <StatCard
        title="Total Users"
        value={stats?.totalUsers ?? 0}
        sub="Registered customers"
        icon={Users}
        iconClass="text-blue-500"
      />
      <StatCard
        title="Total Orders"
        value={stats?.totalOrders ?? 0}
        sub="All time orders"
        icon={ShoppingCart}
        iconClass="text-violet-500"
      />
      <StatCard
        title="Inventory Value"
        value={stats ? formatCurrency(stats.inventoryValue) : '₹0'}
        sub="Based on stock × price"
        icon={TrendingUp}
        iconClass="text-emerald-500"
      />
      <StatCard
        title="Low / Out of Stock"
        value={stats ? `${stats.lowStock} / ${stats.outOfStock}` : '0 / 0'}
        sub="Low stock / out of stock"
        icon={AlertTriangle}
        iconClass="text-amber-500"
      />
    </div>
  );
}
