export const env = {
    PORT: Number(process.env.PORT ?? 4000),
    JWT_SECRET: process.env.JWT_SECRET ?? "",
    DATABASE_URL: process.env.DATABASE_URL ?? ""
};