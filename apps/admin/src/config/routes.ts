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

  media: "/media",

  categories: "/categories",

  tags: "/tags",

  navigation: "/navigation",

  users: "/users",

  settings: "/settings",
} as const;
