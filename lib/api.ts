const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API = {
  login: `${BASE_URL}/login`,

  products: {
    list: `${BASE_URL}/products`,
    create: `${BASE_URL}/products`,
    byId: (id: string | number) => `${BASE_URL}/products/${id}`,
  },

  categories: {
    list: `${BASE_URL}/categories`,
    create: `${BASE_URL}/categories`,
    byId: (id: string | number) => `${BASE_URL}/categories/${id}`,
  },
};
