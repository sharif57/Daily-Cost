import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    // baseUrl: "https://enitiative.org/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      console.log("token", token);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Story",
    'Setting',
    'Dashboard',

  ],
  endpoints: () => ({}),
});

export default baseApi;
