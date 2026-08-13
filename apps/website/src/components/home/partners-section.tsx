import Image from "next/image";

import { partners } from "@/data/mock/home";

export function PartnersSection() {
  return (
    <section className="pb-20">
      <div className="container-site">
        <div className="relative rounded-3xl bg-primary px-6 py-9">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white ring-4 ring-white">
            همکاری‌های ما
          </div>

          <div className="flex items-center gap-7 overflow-hidden pt-3">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="relative h-14 min-w-[120px] flex-1"
              >
                <Image
                  src={partner.image}
                  alt={partner.name}
                  fill
                  sizes="150px"
                  className="object-contain brightness-0 invert"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
