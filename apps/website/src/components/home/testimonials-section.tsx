import Image from "next/image";

import { testimonials } from "@/data/mock/home";

export function TestimonialsSection() {
  const testimonial = testimonials[0];

  return (
    <section className="section-spacing bg-[#f7f8fb]">
      <div className="container-site grid items-center gap-10 md:grid-cols-[1fr_2fr]">
        <div>
          <span className="text-lg font-black text-navy">نظرات مشتریان</span>

          <h2 className="mt-2 text-4xl font-black leading-tight text-navy">
            در مورد <span className="text-accent">ما</span>
          </h2>

          <button className="mt-6 rounded-full bg-navy px-5 py-2 text-xs font-bold text-white">
            مشاهده همه
          </button>
        </div>

        <div className="rounded-3xl bg-[#e8edf7] p-5 md:p-10">
          <article className="mx-auto max-w-xl rounded-2xl bg-primary p-7 text-white">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="font-black">{testimonial.name}</h3>
                <span className="text-xs text-white/70">
                  {testimonial.role}
                </span>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-white/90">
              {testimonial.text}
            </p>
          </article>

          <div className="mt-4 text-center text-gray-500">● ● ●</div>
        </div>
      </div>
    </section>
  );
}
