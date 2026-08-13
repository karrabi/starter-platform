import Image from "next/image";

import { posts } from "@/data/mock/home";

export function BlogSection() {
  return (
    <section className="pb-24">
      <div className="container-site">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-black text-navy">مقالات</h2>

          <button className="rounded-full bg-navy px-5 py-2 text-xs font-bold text-white">
            مشاهده همه
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {posts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-black text-navy">{post.title}</h3>

                <span className="mt-2 block text-[10px] text-gray-400">
                  {post.date}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
