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
    {
      label: "Facebook",
      url: social.facebook,
    },
    {
      label: "Instagram",
      url: social.instagram,
    },
    {
      label: "LinkedIn",
      url: social.linkedin,
    },
    {
      label: "X",
      url: social.x,
    },
    {
      label: "YouTube",
      url: social.youtube,
    },
  ].filter((item) => item.url);

  return (
    <footer className="mt-16 border-t bg-gray-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <h2 className="font-semibold">{general.siteName}</h2>

          {general.siteDescription && (
            <p className="mt-3 text-sm text-gray-600">
              {general.siteDescription}
            </p>
          )}
        </div>

        <div>
          <h2 className="font-semibold">Contact</h2>

          <div className="mt-3 space-y-2 text-sm text-gray-600">
            {contact.email && (
              <p>
                <a href={`mailto:${contact.email}`} className="hover:underline">
                  {contact.email}
                </a>
              </p>
            )}

            {contact.phone && (
              <p>
                <a href={`tel:${contact.phone}`} className="hover:underline">
                  {contact.phone}
                </a>
              </p>
            )}

            {contact.address && <p>{contact.address}</p>}
          </div>
        </div>

        <div>
          <h2 className="font-semibold">Follow us</h2>

          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-4 text-sm text-gray-500">
          © {new Date().getFullYear()} {general.siteName}
        </div>
      </div>
    </footer>
  );
}
