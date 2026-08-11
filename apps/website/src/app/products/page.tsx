import Link from "next/link";

import { getActiveProducts } from "@/services/product.service";

import Image from "next/image";
import { getMediaUrl } from "@/lib/media";

export default async function ProductsPage() {
  const products = await getActiveProducts();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-bold">Products</h1>

      {products.length === 0 ? (
        <p className="mt-8 text-gray-600">No active products yet.</p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const featuredMedia =
              product.media.find((item) => item.featured) ?? product.media[0];

            const imageUrl = getMediaUrl(featuredMedia?.media.path);

            return (
              <article
                key={product.id}
                className="overflow-hidden rounded-lg border"
              >
                {imageUrl && (
                  <Link href={`/products/${product.slug}`} className="block">
                    <div className="relative aspect-square w-full bg-gray-50">
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                  </Link>
                )}

                <div className="p-6">
                  <h2 className="text-xl font-semibold">
                    <Link
                      href={`/products/${product.slug}`}
                      className="hover:underline"
                    >
                      {product.name}
                    </Link>
                  </h2>

                  {product.shortDescription && (
                    <p className="mt-3 text-gray-600">
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
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
