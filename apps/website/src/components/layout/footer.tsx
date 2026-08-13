import Link from "next/link";

import {
  getContactSettings,
  getGeneralSettings,
  getSocialSettings,
} from "@/services/settings.service";

export async function Footer() {
  const [general, contact, social] = await Promise.all([
    getGeneralSettings(),
    getContactSettings(),
    getSocialSettings(),
  ]);

  const socialLinks = [
    { label: "Instagram", url: social.instagram },
    { label: "LinkedIn", url: social.linkedin },
    { label: "Facebook", url: social.facebook },
  ].filter((item) => item.url);

  return (
    <footer id="contact" className="pb-8">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[30px] bg-primary px-7 py-12 text-white md:px-12">
          <div className="absolute inset-0 opacity-10 footer-pattern" />

          <div className="relative grid gap-10 md:grid-cols-3">
            <div>
              <h2 className="text-xl font-black">
                آشنایی بیشتر با {general.siteName}
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/80">
                {general.siteDescription ||
                  "ارائه خدمات تخصصی طراحی، چاپ و تبلیغات برای کسب‌وکارها و برندها."}
              </p>
            </div>

            <div>
              <h3 className="font-black">لینک‌های مفید</h3>

              <div className="mt-4 flex flex-col gap-2 text-sm text-white/80">
                <Link href="/">خانه</Link>
                <a href="#services">خدمات</a>
                <a href="#portfolio">نمونه کارها</a>
                <a href="#articles">مقالات</a>
              </div>
            </div>

            <div>
              <h3 className="font-black">تماس با ما</h3>

              <div className="mt-4 space-y-2 text-sm text-white/80">
                {contact.phone && <p>{contact.phone}</p>}
                {contact.email && <p>{contact.email}</p>}
                {contact.address && <p>{contact.address}</p>}
              </div>

              <div className="mt-5 flex gap-3">
                {socialLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-xs"
                  >
                    {item.label.charAt(0)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="py-5 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} {general.siteName}
        </p>
      </div>
    </footer>
  );
}
