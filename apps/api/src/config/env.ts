function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} environment variable is not defined`);
  }

  return value;
}

const port = Number(process.env.PORT ?? 4000);

if (!Number.isInteger(port) || port <= 0) {
  throw new Error("PORT environment variable must be a valid port number");
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",

  PORT: port,

  JWT_SECRET: requireEnv("JWT_SECRET"),

  DATABASE_URL: requireEnv("DATABASE_URL"),

  CORS_ORIGINS: process.env.CORS_ORIGINS ?? "",

  UPLOAD_DIR: process.env.UPLOAD_DIR ?? "uploads",
};
