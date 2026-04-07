'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

const DUMMY_PRODUCTS = [
  { id: '1', name: 'A2 Bilona Ghee 500ml',   price: 850,  stock: 142, createdAt: '2024-12-01' },
  { id: '2', name: 'Fresh Cow Milk 1L',       price: 65,   stock: 8,   createdAt: '2024-11-28' },
  { id: '3', name: 'Paneer 200g',             price: 120,  stock: 56,  createdAt: '2024-11-25' },
  { id: '4', name: 'Cultured Buttermilk 1L',  price: 45,   stock: 0,   createdAt: '2024-11-20' },
  { id: '5', name: 'Organic Curd 400g',       price: 90,   stock: 23,  createdAt: '2024-11-15' },
];

export function RecentProducts() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">Recent Products</CardTitle>
          <CardDescription>Latest additions to your catalog</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/products">
            View all <ExternalLink className="h-3 w-3 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {DUMMY_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                  {product.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.createdAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-3">
                <span className="text-sm font-semibold">{formatCurrency(product.price)}</span>
                <Badge
                  variant={
                    product.stock === 0 ? 'destructive'
                    : product.stock < 10 ? 'warning'
                    : 'success'
                  }
                  className="text-xs"
                >
                  {product.stock === 0 ? 'Out of stock' : `${product.stock} left`}
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
      </CardContent>
    </Card>
  );
}
