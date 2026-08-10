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

export type SettingsGroup = "general" | "seo" | "contact" | "social";

export type SettingsMap = {
  general: GeneralSettings;
  seo: SeoSettings;
  contact: ContactSettings;
  social: SocialSettings;
};

export type SettingResponse<T> = {
  id: number;
  key: string;
  value: T;
  createdAt: string;
  updatedAt: string;
};
