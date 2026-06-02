'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { BlogsTable } from './_components/BlogsTable';

export default function BlogPostsPage() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <DashboardShell
      title="Blog Posts"
      description="Manage articles published on the main site"
      action={
        isAdmin ? (
          <Button asChild>
            <Link href="/blog-posts/new">
              <Plus className="h-4 w-4" />
              New Post
            </Link>
          </Button>
        ) : undefined
      }
    >
      <BlogsTable />
    </DashboardShell>
  );
}
