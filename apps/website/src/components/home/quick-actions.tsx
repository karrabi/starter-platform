import { quickActions } from "@/data/mock/home";

export function QuickActions() {
  return (
    <section className="relative z-20 -mt-7">
      <div className="container-site grid grid-cols-3 gap-2 md:max-w-4xl md:gap-5">
        {quickActions.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-primary/20 bg-white p-3 text-center shadow-lg shadow-blue-950/5 md:flex md:items-center md:gap-4 md:p-5 md:text-right"
          >
            <div className="mx-auto mb-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-lg font-black text-white md:mx-0 md:mb-0">
              {item.icon}
            </div>

            <div>
              <h3 className="text-[11px] font-black text-navy md:text-sm">
                {item.title}
              </h3>
              <p className="mt-1 hidden text-xs leading-5 text-muted sm:block">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
