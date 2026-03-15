import baseApi from "../Api/baseApi";

export interface AdminUser {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  password: string;
  email: string;
  phone: string | null;
  role: string;
  image: string;
  gender: string;
  google_id: string;
  facebook_id: string;
  apple_id: string;
  online: boolean;
  is_deleted: boolean;
  is_verified: boolean;
  auth_is_reset_password: boolean;
  auth_one_time_code: number | string | null;
  auth_expire_at: string | null;
}

export interface GetAllAdminResponse {
  success: boolean;
  message: string;
  data: AdminUser[];
}

export interface CreateAdminPayload {
  name: string;
  email: string;
  password: string;
}

export interface CreateAdminResponse {
  success: boolean;
  message: string;
  data?: AdminUser;
}

export interface CapitalApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  has_noa: boolean;
  has_cbs_report: boolean;
  has_acra_record: boolean;
  has_bank_statement: boolean;
  capital_range: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CapitalApplicationsMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface CapitalApplicationsResponse {
  success: boolean;
  message: string;
  meta: CapitalApplicationsMeta;
  data: CapitalApplication[];
}

export interface CapitalApplicationsQueryParams {
  page?: number;
  limit?: number;
}


const AdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
// user/all-admin
    getAllAdmin: builder.query<GetAllAdminResponse, void>({
      query: () => ({
        url: `/user/all-admin/`,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),

    // /user/create-admin
    createAdmin: builder.mutation<CreateAdminResponse, CreateAdminPayload>({
      query: (data) => ({
        url: `/user/create-admin/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),

    // /guest?page=1&limit=10
    getGuests: builder.query<CapitalApplicationsResponse, CapitalApplicationsQueryParams | void>({
      query: (params) => ({
        url: `/guest`,
        method: "GET",
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
        },
      }),
      providesTags: ["Admin"],
    }),

    
  }),
});

export const { 
    useGetAllAdminQuery,
    useCreateAdminMutation,
    useGetGuestsQuery
} = AdminApi;
