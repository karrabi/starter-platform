import prisma from "../database/prisma";

const settings = [
  {
    key: "site_name",
    value: {
      value: "چاپخونه",
    },
  },
  {
    key: "site_email",
    value: {
      value: "",
    },
  },
  {
    key: "site_phone",
    value: {
      value: "",
    },
  },
  {
    key: "site_address",
    value: {
      value: "",
    },
  },
  {
    key: "site_logo",
    value: {
      value: "",
    },
  },
];

export async function seedSettings() {
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
