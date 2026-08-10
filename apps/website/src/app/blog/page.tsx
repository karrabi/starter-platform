import Link from "next/link";

import { getPublishedBlogs } from "@/services/blog.service";

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-bold">Blog</h1>

      {blogs.length === 0 ? (
        <p className="mt-8 text-gray-600">No published posts yet.</p>
      ) : (
        <div className="mt-8 space-y-8">
          {blogs.map((blog) => (
            <article key={blog.id} className="border-b pb-8">
              <h2 className="text-2xl font-semibold">
                <Link href={`/blog/${blog.slug}`} className="hover:underline">
                  {blog.title}
                </Link>
              </h2>

              {blog.content.excerpt && (
                <p className="mt-3 text-gray-600">{blog.content.excerpt}</p>
              )}

              {blog.publishedAt && (
                <p className="mt-3 text-sm text-gray-500">
                  {new Date(blog.publishedAt).toLocaleDateString()}
                </p>
              )}

              {blog.categories.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
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
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
