import { BlogSection } from "@/components/home/blog-section";
import { FAQSection } from "@/components/home/faq-section";
import { HeroSection } from "@/components/home/hero-section";
import { PartnersSection } from "@/components/home/partners-section";
import { PartnersStrip } from "@/components/home/partners-strip";
import { PortfolioSection } from "@/components/home/portfolio-section";
import { QuickActions } from "@/components/home/quick-actions";
import { ServicesSection } from "@/components/home/services-section";
import { ServicesShowcase } from "@/components/home/services-showcase";
import { TestimonialsSection } from "@/components/home/testimonials-section";

export default function HomePage() {
  return (
    <main className="flex-1 overflow-hidden">
      <HeroSection />
      <QuickActions />
      <ServicesShowcase />
      <PartnersStrip />
      <ServicesSection />

      <div id="portfolio">
        <PortfolioSection />
      </div>

      <PartnersSection />
      <TestimonialsSection />
      <FAQSection />

      <div id="articles">
        <BlogSection />
      </div>
    </main>
  );
}
