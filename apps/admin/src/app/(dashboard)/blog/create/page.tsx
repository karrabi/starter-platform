"use client";

import { useRouter } from "next/navigation";

import { BlogForm } from "@/components/blog/blog-form";
import { PageHeader } from "@/components/layout/page-header";
import { PageContainer } from "@/components/ui/page-container";

import { useCreateBlog } from "@/hooks/use-create-blog";

import { routes } from "@/config/routes";

import type { CreateBlogRequest } from "@/types/blog";

export default function CreateBlogPage() {
  const router = useRouter();
  const createMutation = useCreateBlog();

  async function handleCreate(data: CreateBlogRequest) {
    await createMutation.mutateAsync(data);

    router.push(routes.blog);
  }

  return (
    <PageContainer>
      <PageHeader title="Create Blog" description="Create a new blog post." />

      <BlogForm
        mode="create"
        isSubmitting={createMutation.isPending}
        onSubmit={handleCreate}
      />
    </PageContainer>
  );
}
