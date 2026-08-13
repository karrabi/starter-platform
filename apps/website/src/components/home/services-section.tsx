import { serviceCards } from "@/data/mock/home";

export function ServicesSection() {
  return (
    <section className="section-spacing">
      <div className="container-site">
        <div className="relative rounded-[32px] bg-primary px-5 pb-14 pt-8 text-center md:px-12">
          <h2 className="text-2xl font-black text-white">خدمات</h2>
          <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-accent" />

          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {serviceCards.map((service) => (
              <article
                key={service.id}
                className="relative rounded-2xl bg-white p-5 text-right shadow-lg shadow-blue-950/10 md:p-7"
              >
                <span className="absolute -top-3 left-4 flex h-8 w-8 items-center justify-center rounded-lg border border-primary/10 bg-white text-accent">
                  ◆
                </span>

                <h3 className="text-base font-black text-navy">
                  {service.title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-muted md:text-sm">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
