'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRef, useState } from 'react';
import { Loader2, Plus, Trash2, ChevronUp, ChevronDown, X, Upload, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getSession } from 'next-auth/react';
import { useAdminAuthStore } from '@/store/authStore';
import type { BlogPost, ContentBlock, FaqItem } from '@/types';

// ─── Standalone blog image upload (plain <img> preview — avoids Next.js /_next/image 500) ──
function BlogImageUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useAdminAuthStore((s) => s.accessToken);

  const handleFile = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      let authToken = token;
      if (!authToken) {
        const session = await getSession();
        authToken = session?.accessToken ?? null;
      }
      const form = new FormData();
      form.append('image', file);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: 'POST',
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
        body: form,
      });
      const json = await res.json().catch(() => ({})) as { data?: { url: string }; message?: string };
      if (!res.ok) throw new Error(json.message ?? `Upload failed (${res.status})`);
      onChange(json.data!.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative w-full rounded-xl overflow-hidden border border-border group" style={{ height: '180px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Cover" className="w-full h-full object-cover" />
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
          onClick={() => !uploading && inputRef.current?.click()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          onDragOver={(e) => e.preventDefault()}
          className="w-full h-44 rounded-xl border-2 border-dashed border-border hover:border-primary/50 bg-muted/30 hover:bg-muted/50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
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
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} />
    </div>
  );
}

const BLOG_CATEGORIES = [
  'Organic Farming', 'Natural Fertilizer', 'Ayurvedic Benefits',
  'Cow-Based Products', 'Sustainability', 'Farming Tips',
];

const BLOCK_TYPES = [
  { value: 'intro',       label: 'Intro Paragraph' },
  { value: 'text',        label: 'Text Paragraph' },
  { value: 'heading',     label: 'Section Heading' },
  { value: 'list',        label: 'Bullet List' },
  { value: 'conclusion',  label: 'Conclusion Paragraph' },
] as const;

// ─── Zod schema ───────────────────────────────────────────────────────────────

const contentBlockSchema = z.object({
  type: z.enum(['intro', 'text', 'heading', 'list', 'conclusion']),
  text: z.string().optional().default(''),
  // List items stored newline-separated for easy editing
  itemsRaw: z.string().optional().default(''),
});

const faqItemSchema = z.object({
  question: z.string().default(''),
  answer:   z.string().default(''),
});

const blogFormSchema = z.object({
  title:           z.string().min(1, 'Title is required'),
  slug:            z.string().optional(),
  excerpt:         z.string().min(1, 'Excerpt is required'),
  metaDescription: z.string().optional(),
  category:        z.string().min(1, 'Category is required'),
  author:          z.string().default('Gauyog Kendr'),
  date:            z.string().min(1, 'Date is required'),
  readTime:        z.string().default('5 min read'),
  image:           z.string().optional(),
  published:       z.boolean().default(true),
  tagsRaw:         z.string().optional(),
  content:         z.array(contentBlockSchema).default([]),
  faq:             z.array(faqItemSchema).default([]),
});

export type BlogFormValues = z.infer<typeof blogFormSchema>;

export interface BlogFormOutput {
  title: string;
  slug?: string;
  excerpt: string;
  metaDescription?: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image?: string;
  published: boolean;
  tags: string[];
  content: ContentBlock[];
  faq: FaqItem[];
}

interface BlogFormProps {
  defaultValues?: Partial<BlogFormValues>;
  onSubmit: (values: BlogFormOutput) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

// ─── helpers to convert BlogPost → form default values ────────────────────────
export function blogPostToFormDefaults(p: BlogPost): BlogFormValues {
  return {
    title:           p.title,
    slug:            p.slug,
    excerpt:         p.excerpt,
    metaDescription: p.metaDescription ?? '',
    category:        p.category,
    author:          p.author,
    date:            p.date,
    readTime:        p.readTime,
    image:           p.image ?? '',
    published:       p.published,
    tagsRaw:         p.tags.join(', '),
    content: p.content.map((b) => ({
      type:     b.type,
      text:     b.text ?? '',
      itemsRaw: b.items?.join('\n') ?? '',
    })),
    faq: p.faq.map((f) => ({ question: f.question, answer: f.answer })),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BlogForm({ defaultValues, onSubmit, isLoading, submitLabel = 'Save Post' }: BlogFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: '', slug: '', excerpt: '', metaDescription: '', category: 'Organic Farming',
      author: 'Gauyog Kendr', date: new Date().toISOString().split('T')[0],
      readTime: '5 min read', image: '', published: true, tagsRaw: '',
      content: [], faq: [],
      ...defaultValues,
    },
  });

  // Content blocks array
  const {
    fields: contentFields,
    append: appendBlock,
    remove: removeBlock,
    swap:   swapBlock,
  } = useFieldArray({ control, name: 'content' });

  // FAQ items array
  const {
    fields: faqFields,
    append: appendFaq,
    remove: removeFaq,
  } = useFieldArray({ control, name: 'faq' });

  const handleFormSubmit = (values: BlogFormValues) => {
    const tags = (values.tagsRaw ?? '')
      .split(',').map((t) => t.trim()).filter(Boolean);

    const content: ContentBlock[] = values.content.map(({ type, text, itemsRaw }) => {
      if (type === 'list') {
        return { type, items: (itemsRaw ?? '').split('\n').map((s) => s.trim()).filter(Boolean) };
      }
      return { type, text: text ?? '' };
    });

    const faq: FaqItem[] = values.faq
      .filter((f) => f.question.trim() && f.answer.trim())
      .map(({ question, answer }) => ({ question, answer }));

    return onSubmit({
      title:           values.title,
      slug:            values.slug || undefined,
      excerpt:         values.excerpt,
      metaDescription: values.metaDescription || undefined,
      category:        values.category,
      author:          values.author || 'Gauyog Kendr',
      date:            values.date,
      readTime:        values.readTime || '5 min read',
      image:           values.image || undefined,
      published:       values.published,
      tags, content, faq,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">

      {/* ── Basic Info ─────────────────────────────────────────────────── */}
      <Card>
        <CardHeader><CardTitle className="text-base">Basic Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" placeholder="e.g. Benefits of Panchgavya for Organic Farming" {...register('title')}
                className={errors.title ? 'border-destructive' : ''} />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug <span className="text-muted-foreground text-xs">(auto-generated if blank)</span></Label>
              <Input id="slug" placeholder="my-blog-post-url" {...register('slug')} />
            </div>

            <div className="space-y-2">
              <Label>Category *</Label>
              <Controller name="category" control={control} render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {BLOG_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              )} />
              {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" placeholder="Gauyog Kendr" {...register('author')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input id="date" type="date" {...register('date')}
                className={errors.date ? 'border-destructive' : ''} />
              {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="readTime">Read Time</Label>
              <Input id="readTime" placeholder="5 min read" {...register('readTime')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagsRaw">Tags <span className="text-muted-foreground text-xs">(comma-separated)</span></Label>
              <Input id="tagsRaw" placeholder="organic, farming, panchgavya" {...register('tagsRaw')} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt * <span className="text-muted-foreground text-xs">(shown on listing page)</span></Label>
            <Textarea id="excerpt" rows={2} placeholder="A short compelling summary of the article..."
              {...register('excerpt')} className={errors.excerpt ? 'border-destructive' : ''} />
            {errors.excerpt && <p className="text-xs text-destructive">{errors.excerpt.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description <span className="text-muted-foreground text-xs">(SEO, ~160 chars)</span></Label>
            <Textarea id="metaDescription" rows={2} placeholder="Search engine description..."
              {...register('metaDescription')} />
          </div>

          <div className="flex items-center gap-3">
            <Controller name="published" control={control} render={({ field }) => (
              <Switch id="published" checked={field.value} onCheckedChange={field.onChange} />
            )} />
            <Label htmlFor="published" className="cursor-pointer">
              Published <span className="text-muted-foreground text-xs ml-1">(uncheck to save as draft)</span>
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* ── Cover Image ────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cover Image</CardTitle>
          <p className="text-xs text-muted-foreground">Click or drag &amp; drop an image from your device — uploaded directly to Cloudinary.</p>
        </CardHeader>
        <CardContent>
          <Controller name="image" control={control} render={({ field }) => (
            <BlogImageUpload value={field.value ?? ''} onChange={field.onChange} />
          )} />
        </CardContent>
      </Card>

      {/* ── Content Blocks ─────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Article Content</CardTitle>
          <p className="text-xs text-muted-foreground">Build the article body by adding blocks. Use headings to break up sections.</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {contentFields.map((field, i) => {
            const blockType = watch(`content.${i}.type`);
            return (
              <div key={field.id} className="rounded-xl border border-border bg-muted/20 overflow-hidden">
                {/* Block header */}
                <div className="flex items-center gap-2 px-3 py-2 bg-muted/40 border-b border-border">
                  <Controller name={`content.${i}.type`} control={control} render={({ field: f }) => (
                    <Select value={f.value} onValueChange={f.onChange}>
                      <SelectTrigger className="h-7 w-44 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {BLOCK_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )} />
                  <div className="flex-1" />
                  <Button type="button" variant="ghost" size="icon" className="h-6 w-6"
                    onClick={() => i > 0 && swapBlock(i, i - 1)} disabled={i === 0}>
                    <ChevronUp className="h-3 w-3" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="h-6 w-6"
                    onClick={() => i < contentFields.length - 1 && swapBlock(i, i + 1)}
                    disabled={i === contentFields.length - 1}>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive"
                    onClick={() => removeBlock(i)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                {/* Block body */}
                <div className="px-3 py-3">
                  {blockType === 'list' ? (
                    <div className="space-y-1">
                      <Textarea rows={4}
                        placeholder={"One item per line:\nBoosts seed germination\nImproves soil structure\nReduces chemical dependency"}
                        {...register(`content.${i}.itemsRaw`)} />
                      <p className="text-[11px] text-muted-foreground">One bullet point per line.</p>
                    </div>
                  ) : (
                    <Textarea
                      rows={blockType === 'heading' ? 1 : 3}
                      placeholder={blockType === 'heading' ? 'Section heading...' : 'Paragraph text...'}
                      {...register(`content.${i}.text`)}
                    />
                  )}
                </div>
              </div>
            );
          })}

          <Button type="button" variant="outline" className="w-full border-dashed"
            onClick={() => appendBlock({ type: 'text', text: '', itemsRaw: '' })}>
            <Plus className="h-4 w-4 mr-2" /> Add Content Block
          </Button>
        </CardContent>
      </Card>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">FAQ <span className="font-normal text-muted-foreground text-sm">(optional)</span></CardTitle>
          <p className="text-xs text-muted-foreground">Frequently asked questions shown at the bottom of the article. Also used for FAQ schema markup (SEO).</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {faqFields.map((field, i) => (
            <div key={field.id} className="rounded-xl border border-border p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">FAQ {i + 1}</span>
                <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive"
                  onClick={() => removeFaq(i)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-2">
                <Input placeholder="Question..." {...register(`faq.${i}.question`)} />
                <Textarea rows={2} placeholder="Answer..." {...register(`faq.${i}.answer`)} />
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" className="w-full border-dashed"
            onClick={() => appendFaq({ question: '', answer: '' })}>
            <Plus className="h-4 w-4 mr-2" /> Add FAQ
          </Button>
        </CardContent>
      </Card>

      {/* ── Submit ─────────────────────────────────────────────────────── */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Saving...</> : submitLabel}
        </Button>
      </div>
    </form>
  );
}
