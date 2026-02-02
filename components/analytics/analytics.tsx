import { Download, Plus } from "lucide-react";
import AnalyticsCard from "./analytics-card";
import AnalysisChart from "./analytics-chart";
import Windows from "./Windows";
import HighValueSessions from "./HighValueSessions";


export default function Analysis() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-2xl font-bold text-[#0D0C0C]">
            User Behavior Analytics
          </h1>
          <p className="text-sm sm:text-lg font-normal text-muted-foreground mt-1">
            Insights into platform engagement, session quality and feature adoption.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#090A58] text-white text-sm font-medium hover:bg-[#070847] transition">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* KPI Cards */}
      <AnalyticsCard />

      {/* Charts and Tables */}
      <AnalysisChart />
      <div className=" flex flex-col lg:flex-row gap-6">
        <Windows />
        <HighValueSessions />
      </div>

    </div>
  )
}
