'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash2, ArrowUpDown, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { DataTable } from '@/components/tables/DataTable';
import { useProducts, useDeleteProduct, useUpdateProduct } from '@/hooks/useProducts';
import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/types';

const CATEGORY_COLORS: Record<string, string> = {
  Dairy:    'bg-blue-100 text-blue-800',
  Ghee:     'bg-amber-100 text-amber-800',
  Herbs:    'bg-green-100 text-green-800',
  Grains:   'bg-yellow-100 text-yellow-800',
  Wellness: 'bg-purple-100 text-purple-800',
  Garden:   'bg-teal-100 text-teal-800',
  Pantry:   'bg-orange-100 text-orange-800',
};

function StockToggle({ product }: { product: Product }) {
  const { mutate: updateProduct, isPending } = useUpdateProduct(product.id);
  return (
    <Switch
      checked={product.inStock}
      disabled={isPending}
      onCheckedChange={(checked) => updateProduct({ inStock: checked })}
    />
  );
}

function DeleteDialog({
  product,
  open,
  onClose,
}: {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}) {
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const handleDelete = () => {
    if (!product) return;
    deleteProduct(product.id, { onSuccess: onClose });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{product?.name}</strong>? This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ProductsTable() {
  const { data: products, isLoading } = useProducts();
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 font-semibold hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Product <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: ({ row }) => {
        const p = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg overflow-hidden bg-muted flex-shrink-0 flex items-center justify-center">
              {p.imageUrl ? (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Package className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="font-medium leading-tight">{p.name}</p>
              {p.scientificName && (
                <p className="text-xs text-muted-foreground">{p.scientificName}</p>
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => {
        const cat = row.original.category;
        const colorClass = CATEGORY_COLORS[cat] ?? 'bg-gray-100 text-gray-800';
        return (
          <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ${colorClass}`}>
            {cat}
          </span>
        );
      },
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => {
        const p = row.original;
        return (
          <div>
            <span className="font-semibold">{formatCurrency(p.price)}</span>
            {p.discountPrice && (
              <span className="ml-2 text-xs text-muted-foreground line-through">
                {formatCurrency(p.discountPrice)}
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'inStock',
      header: 'In Stock',
      cell: ({ row }) => <StockToggle product={row.original} />,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const product = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/products/${product.id}/edit`}>
                  <Pencil className="h-4 w-4" /> Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => setDeleteTarget(product)}
              >
                <Trash2 className="h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={products ?? []}
        searchKey="name"
        searchPlaceholder="Search products..."
      />
      <DeleteDialog
        product={deleteTarget}
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
      />
    </>
  );
}
