'use client';

import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { ProductForm, type ProductFormValues } from '@/components/forms/ProductForm';
import { useProduct, useUpdateProduct } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

interface EditProductPageProps {
  params: { id: string };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const router = useRouter();
  const { data: product, isLoading } = useProduct(params.id);
  const { mutateAsync: updateProduct, isPending } = useUpdateProduct(params.id);

  const handleSubmit = async (values: ProductFormValues) => {
    await updateProduct(values);
    router.push('/products');
  };

  if (isLoading) {
    return (
      <DashboardShell title="Edit Product">
        <div className="max-w-2xl space-y-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </DashboardShell>
    );
  }

  if (!product) {
    return (
      <DashboardShell title="Product Not Found">
        <p className="text-muted-foreground">The product you are looking for does not exist.</p>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      title={`Edit: ${product.name}`}
      description="Update product information"
    >
      <div className="max-w-2xl">
        <ProductForm
          defaultValues={{
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
          }}
          onSubmit={handleSubmit}
          isLoading={isPending}
          submitLabel="Update Product"
        />
      </div>
    </DashboardShell>
  );
}
