import type { Metadata } from 'next';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { DashboardClient } from './_components/DashboardClient';

export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  return (
    <DashboardShell
      title="Dashboard"
      description="Overview of your Gauyog store"
    >
      <DashboardClient />
    </DashboardShell>
  );
}
