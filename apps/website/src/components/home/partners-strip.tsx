import Image from "next/image";

import { partners } from "@/data/mock/home";

export function PartnersStrip() {
  return (
    <section className="border-y border-gray-100 py-6">
      <div className="container-site flex items-center gap-8 overflow-hidden">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="relative h-12 min-w-[110px] flex-1 md:h-14"
          >
            <Image
              src={partner.image}
              alt={partner.name}
              fill
              sizes="150px"
              className="object-contain grayscale opacity-55"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
