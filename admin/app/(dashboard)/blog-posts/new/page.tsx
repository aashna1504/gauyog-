'use client';

import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { BlogForm, type BlogFormOutput } from '@/components/forms/BlogForm';
import { useCreateBlog } from '@/hooks/useBlog';

export default function NewBlogPostPage() {
  const router = useRouter();
  const { mutateAsync: createBlog, isPending } = useCreateBlog();

  const handleSubmit = async (values: BlogFormOutput) => {
    await createBlog(values);
    router.push('/blog-posts');
  };

  return (
    <DashboardShell title="New Blog Post" description="Write and publish a new article">
      <div className="max-w-4xl">
        <BlogForm onSubmit={handleSubmit} isLoading={isPending} submitLabel="Publish Post" />
      </div>
    </DashboardShell>
  );
}
