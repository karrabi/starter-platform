import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getBlogBySlug } from "@/services/blog.service";

import { getSiteUrl } from "@/lib/site-url";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const blog = await getBlogBySlug(slug);
    const url = getSiteUrl(`/blog/${slug}`);

    return {
      title: blog.seo?.title || blog.title,

      description: blog.seo?.description || undefined,

      keywords: blog.seo?.keywords || undefined,

      alternates: {
        canonical: url,
      },

      openGraph: {
        type: "article",
        url,
        title: blog.seo?.title || blog.title,
        description: blog.seo?.description || undefined,

        ...(blog.publishedAt
          ? {
              publishedTime: blog.publishedAt,
            }
          : {}),
      },

      twitter: {
        card: "summary_large_image",
        title: blog.seo?.title || blog.title,
        description: blog.seo?.description || undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let blog;

  try {
    blog = await getBlogBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <article>
        <h1 className="text-4xl font-bold">
          {blog.content.heading || blog.title}
        </h1>

        {blog.publishedAt && (
          <p className="mt-3 text-sm text-gray-500">
            {new Date(blog.publishedAt).toLocaleDateString()}
          </p>
        )}

        {blog.categories.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {blog.categories.map(({ category }) => (
              <span
                key={category.id}
                className="rounded bg-gray-100 px-2 py-1 text-sm"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        {blog.content.body && (
          <div className="mt-8 text-lg leading-8 text-gray-700">
            {blog.content.body}
          </div>
        )}

        {blog.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {blog.tags.map(({ tag }) => (
              <span key={tag.id} className="text-sm text-gray-500">
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}
