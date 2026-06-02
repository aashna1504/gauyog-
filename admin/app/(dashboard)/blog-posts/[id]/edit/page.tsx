'use client';

import { useParams, useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { BlogForm, blogPostToFormDefaults, type BlogFormOutput } from '@/components/forms/BlogForm';
import { useBlog, useUpdateBlog } from '@/hooks/useBlog';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const postId = params?.id ?? '';

  const { data: post, isLoading } = useBlog(postId);
  const { mutateAsync: updateBlog, isPending } = useUpdateBlog(postId);

  const handleSubmit = async (values: BlogFormOutput) => {
    await updateBlog(values);
    router.push('/blog-posts');
  };

  if (isLoading) {
    return (
      <DashboardShell title="Edit Blog Post">
        <div className="max-w-4xl space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </DashboardShell>
    );
  }

  if (!post) {
    return (
      <DashboardShell title="Post Not Found">
        <p className="text-muted-foreground">The blog post you are looking for does not exist.</p>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      title={`Edit: ${post.title}`}
      description="Update the article content and settings"
    >
      <div className="max-w-4xl">
        <BlogForm
          defaultValues={blogPostToFormDefaults(post)}
          onSubmit={handleSubmit}
          isLoading={isPending}
          submitLabel="Save Changes"
        />
      </div>
    </DashboardShell>
  );
}
