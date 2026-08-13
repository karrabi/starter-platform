import { faqs } from "@/data/mock/home";

export function FAQSection() {
  return (
    <section className="section-spacing">
      <div className="container-site">
        <h2 className="mb-8 text-xl font-black text-navy">سوالات متداول</h2>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="group rounded-xl bg-white px-5 py-4 shadow-sm ring-1 ring-gray-100"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-navy">
                {faq.question}

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xl text-primary">
                  +
                </span>
              </summary>

              <p className="mt-4 border-t border-gray-100 pt-4 text-sm leading-7 text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
