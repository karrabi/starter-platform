export const routes = {
  login: "/login",

  dashboard: "/dashboard",

  products: "/products",
  createProduct: "/products/create",

  blog: "/blog",
  createBlog: "/blog/create",
  editBlog: (id: number) => `/blog/${id}/edit`,

  pages: "/pages",
  createPage: "/pages/create",
  editPage: (id: number) => `/pages/${id}/edit`,

  media: "/media",

  categories: "/categories",

  tags: "/tags",

  navigation: "/navigation",
  createNavigation: "/navigation/create",
  editNavigation: (id: number) => `/navigation/${id}/edit`,
  navigationItems: (id: number) => `/navigation/${id}/items`,

  users: "/users",

  settings: "/settings",
} as const;
