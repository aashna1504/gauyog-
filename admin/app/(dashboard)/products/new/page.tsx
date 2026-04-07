'use client';

import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { ProductForm, type ProductFormOutput } from '@/components/forms/ProductForm';
import { useCreateProduct } from '@/hooks/useProducts';

export default function NewProductPage() {
  const router = useRouter();
  const { mutateAsync: createProduct, isPending } = useCreateProduct();

  const handleSubmit = async (values: ProductFormOutput) => {
    await createProduct(values);
    router.push('/products');
  };

  return (
    <DashboardShell title="Add Product" description="Create a new product in your catalog">
      <div className="max-w-2xl">
        <ProductForm
          onSubmit={handleSubmit}
          isLoading={isPending}
          submitLabel="Create Product"
        />
      </div>
    </DashboardShell>
  );
}
