import { apiGet } from "@/lib/api";

export type GeneralSettings = {
  siteName: string;
  siteDescription: string;
  logoMediaId: number | null;
  faviconMediaId: number | null;
};

export type SeoSettings = {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultOgImageId: number | null;
};

export type ContactSettings = {
  email: string;
  phone: string;
  address: string;
};

export type SocialSettings = {
  facebook: string;
  instagram: string;
  linkedin: string;
  x: string;
  youtube: string;
};

export function getGeneralSettings() {
  return apiGet<GeneralSettings>("/settings/public/general");
}

export function getSeoSettings() {
  return apiGet<SeoSettings>("/settings/public/seo");
}

export function getContactSettings() {
  return apiGet<ContactSettings>("/settings/public/contact");
}

export function getSocialSettings() {
  return apiGet<SocialSettings>("/settings/public/social");
}
