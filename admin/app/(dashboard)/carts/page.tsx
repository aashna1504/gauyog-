import type { Metadata } from 'next';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { CartsView } from './_components/CartsView';

export const metadata: Metadata = { title: 'Carts' };

export default function CartsPage() {
  return (
    <DashboardShell
      title="Carts"
      description="View customer shopping carts"
    >
      <CartsView />
    </DashboardShell>
  );
}
