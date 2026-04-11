import type { Metadata } from 'next';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { UsersTable } from './_components/UsersTable';

export const metadata: Metadata = { title: 'Users' };

export default function UsersPage() {
  return (
    <DashboardShell
      title="Users"
      description="Manage all registered users"
    >
      <UsersTable />
    </DashboardShell>
  );
}
