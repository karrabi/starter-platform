import Image from "next/image";

import { services } from "@/data/mock/home";

import { SectionTitle } from "./section-title";

export function ServicesShowcase() {
  return (
    <section id="services" className="section-spacing">
      <div className="container-site">
        <SectionTitle>خدمات</SectionTitle>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service, index) => (
            <article
              key={service.id}
              className={`group relative min-h-[260px] overflow-hidden rounded-3xl text-white ${
                index === 0 ? "md:row-span-2 md:min-h-[540px]" : ""
              }`}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 100vw, 50vw"
                }
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

              <div className="relative z-10 flex h-full min-h-[260px] flex-col justify-end p-6 md:p-8">
                <span className="mb-2 h-1 w-8 rounded-full bg-accent" />

                <h3 className="text-xl font-black md:text-2xl">
                  {service.title}
                </h3>

                <p className="mt-2 max-w-md text-sm leading-7 text-white/85">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
