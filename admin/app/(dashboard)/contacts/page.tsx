import type { Metadata } from 'next';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { ContactsTable } from './_components/ContactsTable';

export const metadata: Metadata = { title: 'Contacts' };

export default function ContactsPage() {
  return (
    <DashboardShell title="Contacts" description="Contact form submissions from website">
      <ContactsTable />
    </DashboardShell>
  );
}
