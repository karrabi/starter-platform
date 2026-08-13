import Image from "next/image";

import { portfolio } from "@/data/mock/home";

import { SectionTitle } from "./section-title";

export function PortfolioSection() {
  return (
    <section className="pb-20">
      <div className="container-site">
        <SectionTitle>نمونه کارها</SectionTitle>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
          {portfolio.map((item) => (
            <article
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-3xl border border-accent bg-[#fff9e8]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 pb-5 pt-16">
                <h3 className="font-black text-white">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
