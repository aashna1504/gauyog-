"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload, GalleryUpload } from "@/components/forms/ImageUpload";

const CATEGORIES = [
  "Fertilizer",
  "Coco",
];

const WEIGHT_OPTIONS = ["1kg", "3kg", "5kg"];

const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  scientificName: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  ingredients: z.string().optional(),
  benefitsRaw: z.string().optional(),
  sku: z.string().optional(),
  batchNo: z.string().optional(),
  mfgDate: z.string().optional(),
  bestBefore: z.string().optional(),
  usageInstructions: z.string().optional(),
  storageInstructions: z.string().optional(),
  safetyInstructions: z.string().optional(),
  price: z.coerce.number().positive("Price must be a positive number"),
  discountPrice: z.coerce
    .number()
    .positive()
    .optional()
    .or(z.literal(0))
    .transform((v) => v || undefined),
  category: z.string().min(1, "Category is required"),
  inStock: z.boolean(),
  weight: z.string().optional(),
  weightOptions: z.array(z.string()).default([]),
  // Per-weight variant images and prices
  imageUrl: z.string().optional(),
  image1kg: z.string().optional(),
  price1kg: z.coerce.number().positive().optional().or(z.literal(0)).transform((v) => v || undefined),
  image3kg: z.string().optional(),
  price3kg: z.coerce.number().positive().optional().or(z.literal(0)).transform((v) => v || undefined),
  image5kg: z.string().optional(),
  price5kg: z.coerce.number().positive().optional().or(z.literal(0)).transform((v) => v || undefined),
  galleryImagesRaw: z.string().optional(),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export type ProductFormOutput = Omit<
  ProductFormValues,
  "galleryImagesRaw" | "benefitsRaw"
> & {
  galleryImages: string[];
  benefits: string[];
};

interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormOutput) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

export function ProductForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel = "Save Product",
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      scientificName: "",
      description: "",
      ingredients: "",
      benefitsRaw: "",
      sku: "",
      batchNo: "",
      mfgDate: "",
      bestBefore: "",
      usageInstructions: "",
      storageInstructions: "",
      safetyInstructions: "",
      price: 0,
      discountPrice: undefined,
      category: "Fertilizer",
      inStock: true,
      weight: "",
      weightOptions: [],
      imageUrl: "",
      image1kg: "",
      price1kg: undefined,
      image3kg: "",
      price3kg: undefined,
      image5kg: "",
      price5kg: undefined,
      galleryImagesRaw: "",
      stock: 0,
      ...defaultValues,
    },
  });

  const selectedWeightOptions = watch("weightOptions");
  const selectedWeight = watch("weight");
  const dropdownWeightOptions = Array.from(
    new Set([...(selectedWeightOptions || []), ...(selectedWeight ? [selectedWeight] : [])])
  );

  const handleFormSubmit = (values: ProductFormValues) => {
    const { galleryImagesRaw, benefitsRaw, ...rest } = values;
    const galleryImages = galleryImagesRaw
      ? galleryImagesRaw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const benefits = benefitsRaw
      ? benefitsRaw
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    return onSubmit({ ...rest, galleryImages, benefits });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                placeholder="e.g. Organic Himalayan Ghee"
                {...register("name")}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="scientificName">Scientific / Local Name</Label>
              <Input
                id="scientificName"
                placeholder="e.g. Badri Cow Ghee"
                {...register("scientificName")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={errors.category ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-xs text-destructive">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Default Weight / Volume</Label>
              <Controller
                name="weight"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || "none"}
                    onValueChange={(value) =>
                      field.onChange(value === "none" ? "" : value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select default weight" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No default</SelectItem>
                      {dropdownWeightOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <p className="text-xs text-muted-foreground">
                Shown as the default selected weight on storefront.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Available Weights / Volumes</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {WEIGHT_OPTIONS.map((option) => {
                const checked = selectedWeightOptions.includes(option);
                return (
                  <label
                    key={option}
                    className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm cursor-pointer transition-colors ${
                      checked
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/40"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...selectedWeightOptions, option]
                          : selectedWeightOptions.filter((w) => w !== option);

                        setValue("weightOptions", updated, {
                          shouldDirty: true,
                          shouldTouch: true,
                        });

                        const currentDefault = selectedWeight;
                        if (currentDefault && !updated.includes(currentDefault)) {
                          setValue("weight", "", {
                            shouldDirty: true,
                            shouldTouch: true,
                          });
                        }
                      }}
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="The story of the product and its health benefits..."
              rows={4}
              {...register("description")}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && (
              <p className="text-xs text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ingredients">Ingredients</Label>
              <Textarea
                id="ingredients"
                placeholder="e.g. 100% sun-dried Gir cow dung, no fillers..."
                rows={2}
                {...register("ingredients")}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  placeholder="e.g. VE-CDP-1KG"
                  {...register("sku")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batchNo">Batch No.</Label>
                <Input id="batchNo" placeholder="e.g. See printed label" {...register("batchNo")} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mfgDate">Mfg Date</Label>
              <Input id="mfgDate" type="date" {...register("mfgDate")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bestBefore">Best Before</Label>
              <Input id="bestBefore" placeholder="e.g. 18 months from mfg" {...register("bestBefore")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="usageInstructions">How To Use</Label>
            <Textarea
              id="usageInstructions"
              placeholder={"e.g. Mix 200–500g per square meter into garden beds before planting."}
              rows={3}
              {...register("usageInstructions")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="storageInstructions">Storage Instructions</Label>
            <Textarea
              id="storageInstructions"
              placeholder={"e.g. Store in a cool, dry place in sealed packaging."}
              rows={3}
              {...register("storageInstructions")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="safetyInstructions">Safety & Cautions</Label>
            <Textarea
              id="safetyInstructions"
              placeholder={"e.g. For agricultural use only. Use mask if applying in windy conditions."}
              rows={3}
              {...register("safetyInstructions")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefitsRaw">Benefits</Label>
            <Textarea
              id="benefitsRaw"
              placeholder={"e.g.\nBoosts immunity\nRich in Omega-3\nNo artificial additives"}
              rows={4}
              {...register("benefitsRaw")}
            />
            <p className="text-xs text-muted-foreground">
              One benefit per line. Each will appear with a tick mark on the product page.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Pricing & Stock */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pricing &amp; Stock</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("price")}
                className={errors.price ? "border-destructive" : ""}
              />
              {errors.price && (
                <p className="text-xs text-destructive">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="discountPrice">Discount / MRP (₹)</Label>
              <Input
                id="discountPrice"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00 (strike-through)"
                {...register("discountPrice")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity *</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                placeholder="0"
                {...register("stock")}
                className={errors.stock ? "border-destructive" : ""}
              />
              {errors.stock && (
                <p className="text-xs text-destructive">
                  {errors.stock.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Controller
              name="inStock"
              control={control}
              render={({ field }) => (
                <Switch
                  id="inStock"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="inStock" className="cursor-pointer">
              In Stock
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Weight Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Weight Variants</CardTitle>
          <p className="text-xs text-muted-foreground">Set a separate price and image for each weight. Selecting a weight on the storefront will show the matching price and image.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 1kg */}
          <div className="rounded-xl border border-border p-4 space-y-3">
            <p className="text-sm font-bold uppercase tracking-widest text-[#4a703f]">1 kg</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price (₹)</Label>
                <Input type="number" step="0.01" min="0" placeholder="e.g. 350" {...register("price1kg")} />
                <p className="text-[11px] text-muted-foreground">Leave blank to use base price.</p>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Image</Label>
                <Controller
                  name="image1kg"
                  control={control}
                  render={({ field }) => (
                    <ImageUpload value={field.value ?? ""} onChange={field.onChange} />
                  )}
                />
              </div>
            </div>
          </div>

          {/* 3kg */}
          <div className="rounded-xl border border-border p-4 space-y-3">
            <p className="text-sm font-bold uppercase tracking-widest text-[#4a703f]">3 kg</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price (₹)</Label>
                <Input type="number" step="0.01" min="0" placeholder="e.g. 950" {...register("price3kg")} />
                <p className="text-[11px] text-muted-foreground">Leave blank to use base price.</p>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Image</Label>
                <Controller
                  name="image3kg"
                  control={control}
                  render={({ field }) => (
                    <ImageUpload value={field.value ?? ""} onChange={field.onChange} />
                  )}
                />
              </div>
            </div>
          </div>

          {/* 5kg */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 space-y-3">
            <p className="text-sm font-bold uppercase tracking-widest text-amber-700">5 kg</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price (₹)</Label>
                <Input type="number" step="0.01" min="0" placeholder="e.g. 1500" {...register("price5kg")} />
                <p className="text-[11px] text-muted-foreground">Leave blank to use base price.</p>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Image</Label>
                <Controller
                  name="image5kg"
                  control={control}
                  render={({ field }) => (
                    <ImageUpload value={field.value ?? ""} onChange={field.onChange} />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="space-y-2">
            <Label>Gallery Images</Label>
            <p className="text-xs text-muted-foreground">Additional images shown in the product slider.</p>
            <GalleryUpload control={control} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" /> Saving...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  );
}
