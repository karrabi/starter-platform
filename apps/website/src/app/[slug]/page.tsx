import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPageBySlug } from "@/services/page.service";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const page = await getPageBySlug(slug);

    return {
      title: page.seo?.title || page.title,

      description: page.seo?.description || undefined,

      keywords: page.seo?.keywords || undefined,
    };
  } catch {
    return {};
  }
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;

  let page;

  try {
    page = await getPageBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <article>
        <h1 className="text-4xl font-bold">
          {page.content.heading || page.title}
        </h1>

        {page.content.body && (
          <div className="mt-6 text-lg leading-8 text-gray-700">
            {page.content.body}
          </div>
        )}
      </article>
    </main>
  );
}
