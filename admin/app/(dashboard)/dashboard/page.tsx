import type { Metadata } from 'next';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { DashboardStats } from './_components/DashboardStats';
import { RevenueChart } from './_components/RevenueChart';
import { StockChart } from './_components/StockChart';
import { RecentProducts } from './_components/RecentProducts';

export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  return (
    <DashboardShell
      title="Dashboard"
      description="Overview of your Gauyog store"
    >
      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <StockChart />
      </div>

      <RecentProducts />
    </DashboardShell>
  );
}
