"use client";

import { useParams, useRouter } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import {
  ProductForm,
  type ProductFormOutput,
} from "@/components/forms/ProductForm";
import { useProduct, useUpdateProduct } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const productId = params?.id;

  const { data: product, isLoading } = useProduct(productId || "");
  const { mutateAsync: updateProduct, isPending } = useUpdateProduct(
    productId || "",
  );

  const handleSubmit = async (values: ProductFormOutput) => {
    if (!productId) return;
    await updateProduct(values);
    router.push("/products");
  };

  if (isLoading) {
    return (
      <DashboardShell title="Edit Product">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </DashboardShell>
    );
  }

  if (!product) {
    return (
      <DashboardShell title="Product Not Found">
        <p className="text-muted-foreground">
          The product you are looking for does not exist.
        </p>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      title={`Edit: ${product.name}`}
      description="Update product information and inventory status"
    >
      {/* Note: I have wrapped the ProductForm in a wider container. 
          To effectively use the right side, the ProductForm component itself 
          should use a grid (e.g., <div className="grid grid-cols-1 md:grid-cols-2 gap-6">)
          inside its internal render.
      */}
      <div className="max-w-6xl">
        <ProductForm
          defaultValues={{
            name: product.name,
            scientificName: product.scientificName ?? "",
            description: product.description,
            ingredients: product.ingredients ?? "",
            sku: product.sku ?? "",
            batchNo: product.batchNo ?? "",
            mfgDate: product.mfgDate ?? "",
            bestBefore: product.bestBefore ?? "",
            usageInstructions: product.usageInstructions ?? "",
            storageInstructions: product.storageInstructions ?? "",
            safetyInstructions: product.safetyInstructions ?? "",
            price: product.price,
            discountPrice: product.discountPrice ?? undefined,
            category: product.category,
            inStock: product.inStock,
            weight: product.weight ?? "",
            weightOptions: product.weightOptions ?? [],
            imageUrl: product.imageUrl ?? "",
            image1kg: product.image1kg ?? "",
            price1kg: product.price1kg ?? undefined,
            image3kg: product.image3kg ?? "",
            price3kg: product.price3kg ?? undefined,
            image5kg: product.image5kg ?? "",
            price5kg: product.price5kg ?? undefined,
            galleryImagesRaw: product.galleryImages?.join(", ") ?? "",
            benefitsRaw: product.benefits?.join("\n") ?? "",
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
