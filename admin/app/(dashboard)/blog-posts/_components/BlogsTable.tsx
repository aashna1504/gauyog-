'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { MoreHorizontal, Pencil, Trash2, FileText, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from '@/components/ui/dialog';

import { useBlogs, useDeleteBlog } from '@/hooks/useBlog';
import type { BlogPost } from '@/types';

// ─── Delete Dialog ─────────────────────────────────────────────────────────

function DeleteDialog({ post, open, onClose }: { post: BlogPost | null; open: boolean; onClose: () => void }) {
  const { mutate: deleteBlog, isPending } = useDeleteBlog();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Blog Post</DialogTitle>
          <DialogDescription>
            Delete <strong>{post?.title}</strong>? This removes it from the site immediately and cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" disabled={isPending}
            onClick={() => post && deleteBlog(post.id, { onSuccess: onClose })}>
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Table ────────────────────────────────────────────────────────────

export function BlogsTable() {
  const { data: posts, isLoading } = useBlogs();
  const { data: session } = useSession();
  const router = useRouter();
  const isAdmin = session?.user?.role === 'ADMIN';
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <FileText className="h-10 w-10 text-muted-foreground/30 mb-4" />
        <p className="text-sm font-semibold text-muted-foreground">No blog posts yet</p>
        <p className="text-xs text-muted-foreground mt-1">Click "New Post" to publish your first article.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              {['Cover', 'Title', 'Category', 'Date', 'Read Time', 'Status', ...(isAdmin ? ['Actions'] : [])].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white">
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3">
                  {p.image ? (
                    <img src={p.image} alt={p.title}
                      className="w-14 h-10 rounded-md object-cover border border-border"
                      width={56} height={40} loading="lazy" />
                  ) : (
                    <div className="w-14 h-10 rounded-md bg-muted flex items-center justify-center border border-border">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 max-w-[240px]">
                  <p className="font-medium text-foreground truncate">{p.title}</p>
                  <p className="text-[11px] text-muted-foreground font-mono truncate">/blog/{p.slug}</p>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="secondary" className="text-xs">{p.category}</Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">{p.date}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">{p.readTime}</td>
                <td className="px-4 py-3">
                  <Badge variant={p.published ? 'default' : 'outline'}
                    className={`flex items-center gap-1 w-fit text-xs ${p.published ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}`}>
                    {p.published ? <><Eye className="h-3 w-3" /> Live</> : <><EyeOff className="h-3 w-3" /> Draft</>}
                  </Badge>
                </td>
                {isAdmin && (
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => router.push(`/blog-posts/${p.id}/edit`)}>
                          <Pencil className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => setDeleteTarget(p)}>
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAdmin && (
        <DeleteDialog post={deleteTarget} open={!!deleteTarget} onClose={() => setDeleteTarget(null)} />
      )}
    </>
  );
}
