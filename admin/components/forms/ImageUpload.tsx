'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2, Plus } from 'lucide-react';
import { Control, Controller } from 'react-hook-form';
import { getSession } from 'next-auth/react';
import { useAdminAuthStore } from '@/store/authStore';
import type { ProductFormValues } from './ProductForm';

async function uploadFile(file: File, reactiveToken: string | null): Promise<string> {
  // Use reactive token first; fall back to live NextAuth session call
  let token = reactiveToken;
  if (!token) {
    const session = await getSession();
    token = session?.accessToken ?? null;
  }
  if (!token) throw new Error('Not authenticated — please refresh the page.');

  const form = new FormData();
  form.append('image', file);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((json as { message?: string })?.message ?? `Upload failed (${res.status})`);
  return (json as { data: { url: string } }).data.url;
}

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const token = useAdminAuthStore(s => s.accessToken);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      onChange(await uploadFile(file, token));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-2">
      {label && <p className="text-xs text-muted-foreground">{label}</p>}

      {value ? (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-border group">
          <Image src={value} alt="Product image" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="w-full h-40 rounded-xl border-2 border-dashed border-border hover:border-primary/50 bg-muted/30 hover:bg-muted/50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          {uploading ? (
            <Loader2 size={24} className="animate-spin text-muted-foreground" />
          ) : (
            <>
              <Upload size={24} className="text-muted-foreground" />
              <p className="text-xs text-muted-foreground text-center">
                Click or drag &amp; drop to upload<br />
                <span className="text-[11px]">PNG, JPG, WEBP up to 10 MB</span>
              </p>
            </>
          )}
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}

export function GalleryUpload({ control }: { control: Control<ProductFormValues> }) {
  const token = useAdminAuthStore(s => s.accessToken);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <Controller
      name="galleryImagesRaw"
      control={control}
      render={({ field }) => {
        const urls = field.value
          ? field.value.split(',').map((s) => s.trim()).filter(Boolean)
          : [];

        const addUrl = (url: string) => field.onChange([...urls, url].join(', '));
        const removeUrl = (i: number) => field.onChange(urls.filter((_, idx) => idx !== i).join(', '));

        const handleFile = async (file: File) => {
          setError(null);
          setUploading(true);
          try {
            addUrl(await uploadFile(file, token));
          } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
          } finally {
            setUploading(false);
          }
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        };

        return (
          <div className="space-y-3">
            {urls.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {urls.map((url, i) => (
                  <div key={i} className="relative h-24 rounded-lg overflow-hidden border border-border group">
                    <Image src={url} alt={`Gallery ${i + 1}`} fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => removeUrl(i)}
                      className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 rounded-lg border border-dashed border-border hover:border-primary/50 bg-muted/30 hover:bg-muted/50 px-4 py-2.5 text-xs text-muted-foreground transition-colors disabled:opacity-50"
            >
              {uploading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              {uploading ? 'Uploading…' : 'Add gallery image'}
            </button>

            {error && <p className="text-xs text-destructive">{error}</p>}

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </div>
        );
      }}
    />
  );
}
