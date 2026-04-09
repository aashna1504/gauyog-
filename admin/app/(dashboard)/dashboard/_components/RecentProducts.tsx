'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatDate } from '@/lib/utils';
import apiClient from '@/lib/api/axios';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  inStock: boolean;
  imageUrl?: string;
  createdAt: string;
}

function stockBadgeVariant(stock: number, inStock: boolean): 'destructive' | 'warning' | 'success' | 'secondary' {
  if (!inStock || stock === 0) return 'destructive';
  if (stock < 10) return 'warning';
  return 'success';
}

function stockLabel(stock: number, inStock: boolean) {
  if (!inStock || stock === 0) return 'Out';
  if (stock < 10) return `${stock} low`;
  return `${stock}`;
}

export function RecentProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get('/orders/stats')
      .then((res) => setProducts(res.data?.data?.recentProducts ?? []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2">
        <div>
          <CardTitle className="text-base">Recent Products</CardTitle>
          <CardDescription>Latest additions to your catalog</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild className="shrink-0">
          <Link href="/products">
            View all <ExternalLink className="h-3 w-3 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No products yet.</p>
        ) : (
          <div className="space-y-1">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-muted/40 transition-colors gap-2"
              >
                {/* Left: image/initial + name */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-8 w-8 rounded-md object-contain bg-muted/50 shrink-0"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                      {product.name[0]}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">
                      Added {formatDate(product.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Right: price + stock badge + edit link */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-semibold hidden xs:inline">
                    {formatCurrency(product.price)}
                  </span>
                  <Badge
                    variant={stockBadgeVariant(product.stock, product.inStock)}
                    className="text-xs hidden sm:inline-flex"
                  >
                    {stockLabel(product.stock, product.inStock)}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                    <Link href={`/products/${product.id}/edit`}>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
