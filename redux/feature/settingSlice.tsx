import baseApi from "../Api/baseApi";


const settingSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    getTermsAndConditions: builder.query({
      query: () => ({
        url: `/settings/terms_conditions/`,
        method: "GET",
      }),
      providesTags: ["Setting"],
    }),
    editTermsAndConditions: builder.mutation({
      query: (data) => ({
        url: `/settings/terms_conditions/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),


    getPrivacyPolicy: builder.query({
      query: () => ({
        url: `/settings/privacy_policies/`,
        method: "GET",
      }),
      providesTags: ["Setting"],
    }),
    updatePrivacyPolice: builder.mutation({
      query: (data) => ({
        url: `/settings/privacy_policies/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),



    getAbout: builder.query({
      query: () => ({
        url: `/settings/about_us/`,
        method: "GET",
      }),
      providesTags: ["Setting"],
    }),

    updateAbout: builder.mutation({
      query: (data) => ({
        url: `/settings/about_us/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),

  }),
});

export const {
  useGetTermsAndConditionsQuery,
  useEditTermsAndConditionsMutation,
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPoliceMutation,
  useGetAboutQuery,
  useUpdateAboutMutation
} = settingSlice;
