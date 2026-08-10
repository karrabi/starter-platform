import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductBySlug } from "@/services/product.service";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await getProductBySlug(slug);

    return {
      title: product.seo?.title || product.name,

      description: product.seo?.description || undefined,
    };
  } catch {
    return {};
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  let product;

  try {
    product = await getProductBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <article>
        <h1 className="text-4xl font-bold">{product.name}</h1>
        {product.shortDescription && (
          <p className="mt-4 text-xl text-gray-600">
            {product.shortDescription}
          </p>
        )}
        {product.categories.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.categories.map(({ category }) => (
              <span
                key={category.id}
                className="rounded bg-gray-100 px-2 py-1 text-sm"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        {product.description?.body && (
          <div className="mt-8 text-lg leading-8 text-gray-700">
            {product.description.body}
          </div>
        )}

        {product.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {product.tags.map(({ tag }) => (
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
