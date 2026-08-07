const TOKEN_KEY = "starter-platform-token";

export const tokenStorage = {
  get() {
    if (typeof window === "undefined") return null;

    return localStorage.getItem(TOKEN_KEY);
  },

  set(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  remove() {
    localStorage.removeItem(TOKEN_KEY);
  },
};
