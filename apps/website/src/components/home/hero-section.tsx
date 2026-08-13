import Image from "next/image";

export function HeroSection() {
  return (
    <section className="hero-grid relative overflow-hidden bg-primary text-white">
      <div className="container-site relative min-h-[610px] md:min-h-[600px]">
        <div className="relative z-20 flex min-h-[610px] flex-col items-center pt-32 text-center md:min-h-[600px] md:items-start md:justify-center md:pt-0 md:text-right">
          <span className="mb-3 text-sm font-bold text-accent">
            چاپ حرفه‌ای، نتیجه حرفه‌ای
          </span>

          <h1 className="text-5xl font-black leading-tight md:text-7xl">
            چاپ روشنی
          </h1>

          <p className="mt-3 text-base font-medium text-white/90 md:text-xl">
            چاپ روشنی، راهی برای دیده شدن
          </p>

          <div className="mt-7 flex gap-3">
            <a
              href="#services"
              className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-navy"
            >
              مشاهده خدمات
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white/70 px-6 py-3 text-sm font-bold"
            >
              تماس با ما
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 z-10 h-[320px] w-[330px] -translate-x-1/2 md:left-0 md:h-[520px] md:w-[540px] md:translate-x-0">
          <Image
            src="/images/home/hero-hand.png"
            alt="چاپ و بسته بندی"
            fill
            priority
            sizes="(max-width: 768px) 330px, 540px"
            className="object-contain object-bottom"
          />
        </div>

        <div className="absolute bottom-0 left-0 hidden h-[390px] w-[520px] opacity-90 md:block">
          <Image
            src="/images/home/hero-shapes.png"
            alt=""
            fill
            sizes="520px"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
