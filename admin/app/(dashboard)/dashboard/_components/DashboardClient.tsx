'use client';

import { Package, ShoppingCart, TrendingUp, AlertTriangle, Users } from 'lucide-react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useStats } from '@/hooks/useStats';

// ─── Stat Cards ───────────────────────────────────────────────────────────────

function StatCard({
  title,
  value,
  sub,
  icon: Icon,
  iconClass = 'text-primary',
  loading,
}: {
  title: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  iconClass?: string;
  loading: boolean;
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

// ─── Revenue Tooltip ──────────────────────────────────────────────────────────

const RevenueTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border bg-background px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold mb-1">{label}</p>
      <p className="text-emerald-600 font-bold">{formatCurrency(payload[0].value)}</p>
    </div>
  );
};

// ─── Stock Tooltip ────────────────────────────────────────────────────────────

const getBarColor = (stock: number) => {
  if (stock === 0) return 'hsl(0, 84%, 60%)';
  if (stock < 10)  return 'hsl(38, 92%, 50%)';
  return 'hsl(142, 71%, 45%)';
};

const StockTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const val: number = payload[0].value;
  return (
    <div className="rounded-xl border bg-background px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold mb-1">{label}</p>
      <p style={{ color: getBarColor(val) }}>
        {val === 0 ? 'Out of stock' : val < 10 ? `${val} units – Low` : `${val} units`}
      </p>
    </div>
  );
};

// ─── Stock badge helpers ──────────────────────────────────────────────────────

function stockBadgeVariant(stock: number, inStock: boolean): 'destructive' | 'warning' | 'success' | 'secondary' {
  if (!inStock || stock === 0) return 'destructive';
  if (stock < 10) return 'warning';
  return 'success';
}

function stockLabel(stock: number, inStock: boolean) {
  if (!inStock || stock === 0) return 'Out of stock';
  if (stock < 10) return `${stock} – Low`;
  return `${stock} in stock`;
}

// ─── Main Dashboard Client ────────────────────────────────────────────────────

export function DashboardClient() {
  const { data: stats, isLoading, isError } = useStats();

  const monthlyRevenue = stats?.monthlyRevenue ?? [];
  const stockLevels    = stats?.stockLevels    ?? [];
  const recentProducts = stats?.recentProducts ?? [];
  const hasRevenue     = monthlyRevenue.some((d) => d.value > 0);
  const totalRevenue   = monthlyRevenue.reduce((acc, d) => acc + d.value, 0);

  return (
    <div className="space-y-6">
      {/* ── Stat Cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total Products"
          value={stats?.totalProducts ?? 0}
          sub={stats ? `${stats.lowStock} low · ${stats.outOfStock} out of stock` : undefined}
          icon={Package}
          loading={isLoading}
        />
        <StatCard
          title="Total Users"
          value={stats?.totalUsers ?? 0}
          sub="Registered customers"
          icon={Users}
          iconClass="text-blue-500"
          loading={isLoading}
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders ?? 0}
          sub="All time orders"
          icon={ShoppingCart}
          iconClass="text-violet-500"
          loading={isLoading}
        />
        <StatCard
          title="Inventory Value"
          value={stats ? formatCurrency(stats.inventoryValue) : '₹0'}
          sub="Based on stock × price"
          icon={TrendingUp}
          iconClass="text-emerald-500"
          loading={isLoading}
        />
        <StatCard
          title="Low / Out of Stock"
          value={stats ? `${stats.lowStock} / ${stats.outOfStock}` : '0 / 0'}
          sub="Low stock / out of stock"
          icon={AlertTriangle}
          iconClass="text-amber-500"
          loading={isLoading}
        />
      </div>

      {/* ── Charts ── */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenue Overview</CardTitle>
            <CardDescription>
              Last 12 months · Total:{' '}
              <span className="font-semibold text-foreground">
                {isLoading ? '...' : formatCurrency(totalRevenue)}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[220px] w-full rounded-xl" />
            ) : !hasRevenue ? (
              <div className="h-[220px] flex items-center justify-center text-sm text-muted-foreground">
                No orders yet — revenue will appear here once orders are placed.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={monthlyRevenue} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => v === 0 ? '₹0' : `₹${(v / 1000).toFixed(0)}k`}
                  />
                  <RechartsTooltip content={<RevenueTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(142, 71%, 45%)"
                    strokeWidth={2}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Stock Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Stock Levels</CardTitle>
            <CardDescription>
              Current inventory per product —{' '}
              <span className="text-destructive font-medium">red = out</span>,{' '}
              <span className="text-amber-500 font-medium">amber = low (&lt;10)</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[220px] w-full rounded-xl" />
            ) : stockLevels.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-16">No products found.</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={stockLevels} margin={{ top: 5, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" interval={0} />
                  <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                  <RechartsTooltip content={<StockTooltip />} />
                  <Bar dataKey="stock" radius={[4, 4, 0, 0]} name="Units">
                    {stockLevels.map((entry, i) => (
                      <Cell key={i} fill={getBarColor(entry.stock)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Recent Products ── */}
      <Card>
        <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">Recent Products</CardTitle>
            <CardDescription>Latest additions to your catalog</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild className="shrink-0">
            <Link href="/products">
              View all <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          ) : recentProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No products yet.</p>
          ) : (
            <div className="space-y-1">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-muted/40 transition-colors gap-2"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {product.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-8 w-8 rounded-md object-contain bg-muted/50 shrink-0"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                        {product.name[0]?.toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">Added {formatDate(product.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-semibold">{formatCurrency(product.price)}</span>
                    <Badge
                      variant={stockBadgeVariant(product.stock, product.inStock)}
                      className="text-xs"
                    >
                      {stockLabel(product.stock, product.inStock)}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                      <Link href={`/products/${product.id}/edit`}>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {isError && (
        <p className="text-center text-sm text-destructive">
          Failed to load dashboard data — check that the backend is running.
        </p>
      )}
    </div>
  );
}
