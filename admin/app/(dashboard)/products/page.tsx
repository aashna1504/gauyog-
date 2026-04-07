import type { Metadata } from 'next';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { ProductsTable } from './_components/ProductsTable';

export const metadata: Metadata = { title: 'Products' };

export default function ProductsPage() {
  return (
    <DashboardShell
      title="Products"
      description="Manage your product catalog"
      action={
        <Button asChild>
          <Link href="/products/new">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      }
    >
      <ProductsTable />
    </DashboardShell>
  );
}
