'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { MoreHorizontal, Pencil, Trash2, Package } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  useProducts,
  useDeleteProduct,
  useUpdateProduct,
} from '@/hooks/useProducts';

import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/types';


// ─── CATEGORY COLORS ─────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  Dairy: 'bg-blue-100 text-blue-800',
  Ghee: 'bg-amber-100 text-amber-800',
  Herbs: 'bg-green-100 text-green-800',
  Grains: 'bg-yellow-100 text-yellow-800',
  Wellness: 'bg-purple-100 text-purple-800',
  Garden: 'bg-teal-100 text-teal-800',
  Pantry: 'bg-orange-100 text-orange-800',
};


// ─── STOCK TOGGLE ─────────────────────────

function StockToggle({ product }: { product: Product }) {
  const { mutate: updateProduct, isPending } = useUpdateProduct(product.id);

  return (
    <Switch
      checked={product.inStock}
      disabled={isPending}
      onCheckedChange={(checked) =>
        updateProduct({ inStock: checked })
      }
    />
  );
}


// ─── DELETE DIALOG ─────────────────────────

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
            Delete <strong>{product?.name}</strong>? This cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


// ─── MAIN COMPONENT ─────────────────────────

export function ProductsTable() {
  const { data: products, isLoading } = useProducts();
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === 'ADMIN';
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Responsive Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {(products ?? []).map((p) => {
          const colorClass =
            CATEGORY_COLORS[p.category] ?? 'bg-gray-100 text-gray-800';

          return (
            <div
              key={p.id}
              className="border rounded-lg p-3 bg-white shadow-sm hover:shadow-md hover:scale-[1.02] transition"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="h-9 w-9 rounded-md overflow-hidden bg-[#f3f8ee] flex items-center justify-center flex-shrink-0">
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <Package className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {p.name}
                    </p>

                    {p.scientificName && (
                      <p className="text-[10px] text-muted-foreground truncate">
                        {p.scientificName}
                      </p>
                    )}
                  </div>
                </div>

                {isAdmin && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" className="h-7 w-7">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/products/${p.id}/edit`}>
                          <Pencil className="h-4 w-4 mr-2" /> Edit
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeleteTarget(p)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              {/* Category */}
              <div className="mt-2">
                <span
                  className={`inline-flex text-[10px] px-2 py-0.5 rounded ${colorClass}`}
                >
                  {p.category}
                </span>
              </div>

              {/* Price */}
              <div className="mt-2 text-sm">
                <span className="font-semibold">
                  {formatCurrency(p.price)}
                </span>

                {p.discountPrice && (
                  <span className="ml-1 text-[10px] line-through text-muted-foreground">
                    {formatCurrency(p.discountPrice)}
                  </span>
                )}
              </div>

              {/* Bottom */}
              <div className="mt-2 flex items-center justify-between">
                <Badge
                  variant={p.stock <= 5 ? 'destructive' : 'secondary'}
                  className="text-[10px]"
                >
                  {p.stock}
                </Badge>

                {isAdmin && (
                  <div className="scale-75 origin-right">
                    <StockToggle product={p} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Dialog */}
      {isAdmin && (
        <DeleteDialog
          product={deleteTarget}
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}