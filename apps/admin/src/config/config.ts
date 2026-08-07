export const config = {
  appName: "Starter Platform Admin",

  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api",

  mediaBaseUrl: (
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api"
  ).replace(/\/api\/?$/, ""),
  defaultLanguage: "en",
};
