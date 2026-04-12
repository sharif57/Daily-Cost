"use client";

import baseApi from "../Api/baseApi";

export interface AppUser {
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
  document?: string;
  auth_is_reset_password: boolean;
  auth_one_time_code: string | number | null;
  auth_expire_at: string | null;
}

export interface SingleUserResponse {
  success: boolean;
  message: string;
  data: AppUser;
}

export interface UsersMeta {
  page: number;
  limit: number;
  totalPage: number;
  total: number;
}

export interface AllUsersPayload {
  data: AppUser[];
  meta: UsersMeta;
}

export interface AllUsersResponse {
  success: boolean;
  message: string;
  data: AllUsersPayload;
}

export interface AllUsersQueryParams {
  search?: string;
  status?: boolean;
  role?: string;
  page?: number;
  limit?: number;
}

export interface IncomeRecentTransaction {
  id: string;
  type: string;
  amount: string;
  category: string;
  notes: string;
  date: string;
  image: string;
  document: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface IncomeGrowthVsPreviousMonth {
  percentage: number;
  income: number;
}

export interface IncomeReportData {
  total_income: number;
  average_monthly_income: number;
  growth_vs_previous_month: IncomeGrowthVsPreviousMonth;
  recent_transactions: IncomeRecentTransaction[];
  meta: UsersMeta;
}

export interface IncomeReportResponse {
  success: boolean;
  message: string;
  meta: UsersMeta;
  data: IncomeReportData;
}

export interface ExpenseGrowthVsPreviousMonth {
  percentage: number;
  expense: number;
}

export interface ExpenseReportData {
  total_expense: number;
  average_monthly_expense: number;
  growth_vs_previous_month: ExpenseGrowthVsPreviousMonth;
  recent_transactions: IncomeRecentTransaction[];
  meta: UsersMeta;
}

export interface ExpenseReportResponse {
  success: boolean;
  message: string;
  meta: UsersMeta;
  data: ExpenseReportData;
}

export interface UserIncomeOverviewQueryParams {
  id: string;
  page?: number;
  limit?: number;
}

export interface UserExpenseOverviewQueryParams {
  id: string;
  page?: number;
  limit?: number;
}

export interface GlobalOverviewUser {
  name: string;
  email: string;
  image: string;
}

export interface GlobalMonthlyData {
  month: number;
  income: number;
  expense: number;
}

export interface GlobalFinancialOverviewData {
  user: GlobalOverviewUser;
  total_revenue: number;
  total_expense: number;
  total_income: number;
  zakat_expense: number;
  monthly_data: GlobalMonthlyData[];
  recent_transactions: IncomeRecentTransaction[];
}

export interface GlobalFinancialOverviewResponse {
  success: boolean;
  message: string;
  data: GlobalFinancialOverviewData;
}

export interface ProfitLossYearlyMonthlyData {
  month: number;
  income: number;
  expense: number;
}

export interface ProfitLossCategoryWiseExpense {
  [key: string]: number;
}

export interface ProfitLossReportData {
  total_revenue: number;
  total_expense: number;
  total_income: number;
  net_profit_percentage: number;
  yearly_monthly_data: ProfitLossYearlyMonthlyData[];
  category_wise_expense: ProfitLossCategoryWiseExpense;
  recent_transactions: IncomeRecentTransaction[];
  meta: UsersMeta;
}

export interface ProfitLossReportResponse {
  success: boolean;
  message: string;
  meta: UsersMeta;
  data: ProfitLossReportData;
}

export interface ProfitLossQueryParams {
  id: string;
  page?: number;
  limit?: number;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),

      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: data,
        // Don't set Content-Type so browser adds multipart/form-data boundary for FormData
        formData: true,
      }),
      invalidatesTags: ["User"],
    }),

    allUsers: builder.query<AllUsersResponse, AllUsersQueryParams | void>({
      query: (params) => ({
        url: `/user`,
        method: "GET",
        params: {
          search: params?.search || undefined,
          status: params?.status,
          role: params?.role || undefined,
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
        },
      }),
      providesTags: ["User"],
    }),

    // /user/get-single-user/0291deea-2589-4584-8493-c9666638bb5a
    singleUser: builder.query<SingleUserResponse, string>({
      query: (id) => ({
        url: `/user/get-single-user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // /transaction/income/0291deea-2589-4584-8493-c9666638bb5a
    financialOverview: builder.query<IncomeReportResponse, string>({
      query: (id) => ({
        url: `/transaction/income/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // /transaction/income/0291deea-2589-4584-8493-c9666638bb5a?page=1&limit=10
    userIncomeOverview: builder.query<IncomeReportResponse, UserIncomeOverviewQueryParams>({
      query: ({ id, page = 1, limit = 10 }) => ({
        url: `/transaction/income/${id}`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["User"],
    }),

    // >>/transaction/overview/0291deea-2589-4584-8493-c9666638bb5a
    globalTransactionOverview: builder.query<GlobalFinancialOverviewResponse, string>({
      query: (id) => ({
        url: `/transaction/overview/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // /transaction/expense/0291deea-2589-4584-8493-c9666638bb5a?page=1&limit=10
    userExpenseOverview: builder.query<ExpenseReportResponse, UserExpenseOverviewQueryParams>({
      query: ({ id, page = 1, limit = 10 }) => ({
        url: `/transaction/expense/${id}`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["User"],
    }),

    // /transaction/profit-loss/0291deea-2589-4584-8493-c9666638bb5a?page=1&limit=10
    profitLoss: builder.query<ProfitLossReportResponse, ProfitLossQueryParams>({
      query: ({ id, page = 1, limit = 10 }) => ({
        url: `/transaction/profit-loss/${id}`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["User"],
    }),
    // user/add-document/a1430c05-3347-4b30-a832-bd5a9c809337
    updateDocument: builder.mutation({
      query: ({ id, document }) => ({
        url: `/user/add-document/${id}`,
        method: "PATCH",
        body: document,
        formData: true,
      }),
      invalidatesTags: ["User"],
    }),
    // /guest/approve/aa4e35b1-3a68-4ff2-9b90-d97a422c66a7
    approveGuest: builder.mutation({
      query: (id) => ({
        url: `/guest/approve/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),

    // guest/reject/e592cbbc-4cf7-4e5f-9cf3-facad9dbffa6
    rejectGuest: builder.mutation({
      query: (id) => ({
        url: `/guest/reject/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),

  }),
});

export const { useUserProfileQuery, useUpdateProfileMutation, useAllUsersQuery, useSingleUserQuery, useFinancialOverviewQuery, useUserIncomeOverviewQuery, useGlobalTransactionOverviewQuery, useUserExpenseOverviewQuery, useProfitLossQuery, useUpdateDocumentMutation , useApproveGuestMutation, useRejectGuestMutation } = userApi;
