"use client";

import { useParams, useRouter } from "next/navigation";

import { BlogForm } from "@/components/blog/blog-form";
import { PageHeader } from "@/components/layout/page-header";
import { PageContainer } from "@/components/ui/page-container";

import { useBlog } from "@/hooks/use-blog";
import { useUpdateBlog } from "@/hooks/use-update-blog";

import { routes } from "@/config/routes";

import type { CreateBlogRequest, UpdateBlogRequest } from "@/types/blog";

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const { data: blog, isLoading } = useBlog(id);

  const updateMutation = useUpdateBlog();

  async function handleUpdate(data: CreateBlogRequest) {
    const updateData: UpdateBlogRequest = data;

    await updateMutation.mutateAsync({
      id,
      data: updateData,
    });

    router.push(routes.blog);
  }

  if (isLoading) {
    return <PageContainer>Loading...</PageContainer>;
  }

  if (!blog) {
    return <PageContainer>Blog not found.</PageContainer>;
  }

  const content =
    blog.content &&
    typeof blog.content === "object" &&
    typeof blog.content.body === "string"
      ? blog.content.body
      : "";

  const seo = blog.seo && typeof blog.seo === "object" ? blog.seo : {};

  const seoTitle = typeof seo.title === "string" ? seo.title : "";

  const seoDescription =
    typeof seo.description === "string" ? seo.description : "";

  const seoOgImageId = typeof seo.ogImageId === "number" ? seo.ogImageId : null;

  const categoryIds = Array.isArray(blog.categories)
    ? blog.categories.map((item) => item.categoryId)
    : [];

  const tagIds = Array.isArray(blog.tags)
    ? blog.tags.map((item) => item.tagId)
    : [];

  return (
    <PageContainer>
      <PageHeader title="Edit Blog" description="Edit blog post." />

      <BlogForm
        mode="edit"
        isSubmitting={updateMutation.isPending}
        onSubmit={handleUpdate}
        initialValues={{
          title: blog.title,
          slug: blog.slug,
          summary: blog.summary ?? "",
          content,
          status: blog.status,

          categoryIds,
          tagIds,

          seoTitle,
          seoDescription,
          seoOgImageId,
        }}
      />
    </PageContainer>
  );
}
