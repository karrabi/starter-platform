import prisma from "../database/prisma";

export async function seedSettings() {
  const settings = [
    {
      key: "general",
      value: {
        siteName: "چاپخونه",
        email: "",
        phone: "",
        address: "",
        logo: "",
      },
    },
    {
      key: "seo",
      value: {
        title: "",
        description: "",
        keywords: [],
      },
    },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: {
        key: setting.key,
      },
      update: {},
      create: setting,
    });
  }
}
