import Link from "next/link";

import { getActiveProducts } from "@/services/product.service";

export default async function ProductsPage() {
  const products = await getActiveProducts();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-bold">Products</h1>

      {products.length === 0 ? (
        <p className="mt-8 text-gray-600">No active products yet.</p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="rounded-lg border p-6">
              <h2 className="text-xl font-semibold">
                <Link
                  href={`/products/${product.slug}`}
                  className="hover:underline"
                >
                  {product.name}
                </Link>
              </h2>

              {product.shortDescription && (
                <p className="mt-3 text-gray-600">{product.shortDescription}</p>
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
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
