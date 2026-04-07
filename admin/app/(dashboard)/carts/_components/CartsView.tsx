'use client';

import { useQuery } from '@tanstack/react-query';
import { ShoppingCart, Package, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllCarts } from '@/lib/api/carts';
import { formatCurrency, formatDate } from '@/lib/utils';

export function CartsView() {
  const { data: carts, isLoading, isError } = useQuery({
    queryKey: ['carts'],
    queryFn: getAllCarts,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-48 w-full" />)}
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <AlertCircle className="h-10 w-10 text-muted-foreground" />
          <div>
            <p className="font-semibold">Admin cart endpoint not available</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add a <code className="text-xs bg-muted px-1 py-0.5 rounded">/api/admin/carts</code> endpoint
              to your backend to view all customer carts here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!carts?.length) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 gap-3">
          <ShoppingCart className="h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground">No active carts found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {carts.map((cart) => {
        const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        return (
          <Card key={cart.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  {cart.user?.email ?? cart.userId.slice(0, 8) + '...'}
                </CardTitle>
                <Badge variant="secondary">
                  {cart.items.length} item{cart.items.length !== 1 ? 's' : ''}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{formatDate(cart.createdAt)}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {cart.items.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <Package className="h-3 w-3 text-muted-foreground shrink-0" />
                    <span className="truncate">{item.product.name}</span>
                  </div>
                  <span className="shrink-0 text-muted-foreground ml-2">×{item.quantity}</span>
                </div>
              ))}
              {cart.items.length > 3 && (
                <p className="text-xs text-muted-foreground">+{cart.items.length - 3} more items</p>
              )}
              <div className="pt-2 border-t flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Est. Total</span>
                <span className="font-semibold text-sm">{formatCurrency(total)}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
