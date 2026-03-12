"use client";

import baseApi from "../Api/baseApi";

export interface DashboardYearUserCount {
  month: number;
  count: number;
}

export interface DashboardReportData {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalIncome: number;
  totalExpense: number;
  totalRevenue: number;
  negativeCashFlow: number;
  upcomingReminders: number;
  currentYearUserCount: DashboardYearUserCount[];
}

export interface DashboardReportResponse {
  success: boolean;
  message: string;
  data: DashboardReportData;
}

export interface ReminderItem {
  id: string;
  title: string;
  category: string;
  amount: string;
  due_date: string;
  repeat: string;
  status: string;
  notes: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface ReminderMeta {
  page: number;
  limit: number;
  totalPage: number;
  total: number;
}

export interface ReminderReportData {
  total_reminder: number;
  week_due: number;
  overdue: number;
  reminders: ReminderItem[];
  meta: ReminderMeta;
}

export interface ReminderReportResponse {
  success: boolean;
  message: string;
  meta: ReminderMeta;
  data: ReminderReportData;
}

export interface ReminderReportQueryParams {
  page?: number;
  limit?: number;
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // /transaction/dashboard-report
    dashboardReport: builder.query<DashboardReportResponse, void>({
      query: () => ({
        url: "/transaction/dashboard-report",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    // /reminder/reports
    reminderReport: builder.query<ReminderReportResponse, ReminderReportQueryParams | void>({
      query: (params) => ({
        url: "/reminder/reports",
        method: "GET",
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
        },
      }),
      providesTags: ["Dashboard"],
    }),

  }),
});

export const { useDashboardReportQuery, useReminderReportQuery } = dashboardApi;
