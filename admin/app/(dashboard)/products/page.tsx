'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { ProductsTable } from './_components/ProductsTable';

export default function ProductsPage() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <DashboardShell
      title="Products"
      description={isAdmin ? 'Manage your product catalog' : 'Browse the product catalog'}
      action={
        isAdmin ? (
          <Button asChild>
            <Link href="/products/new">
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </Button>
        ) : undefined
      }
    >
      <ProductsTable />
    </DashboardShell>
  );
}
