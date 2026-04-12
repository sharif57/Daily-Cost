// 'use client'

// import Sidebar from '@/components/dashboard/sidebar'
// import Header from '@/components/dashboard/header'
// import FinancialKPICards from '@/components/financial/financial-kpi-cards'
// import RevenueChart from '@/components/financial/revenue-chart'
// import ExpensesBreakdown from '@/components/financial/expenses-breakdown'
// import RiskIndicators from '@/components/financial/risk-indicators'
// import TransactionsTable from '@/components/financial/transactions-table'
// import { Download } from 'lucide-react'
// import { useParams } from 'next/navigation'

// export default function FinancialOverviewPage() {
//   const params = useParams();
//   const userId = params.id
//   return (
//     <div className="flex h-screen bg-background">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />
//         <main className="flex-1 overflow-y-auto">
//           <div className="p-4 md:p-6 lg:p-8 ">
//             {/* Header Section */}
//             <div className="flex items-center justify-between mb-8">
//               <h1 className="text-3xl md:text-4xl font-bold text-foreground">
//                 Financial Overview
//               </h1>
//               <button className="flex items-center gap-2 px-6 py-2.5  text-primary-foreground bg-[#090A58] rounded-full hover:bg-primary/90 transition-colors">
//                 <Download className="w-5 h-5" />
//                 <span className="text-sm font-semibold">Export Report</span>
//               </button>
//             </div>

//             {/* KPI Cards */}
//             <FinancialKPICards userId={userId as string} />

//             {/* Charts Section */}
//             {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
//               <div className="lg:col-span-2">
//                 <RevenueChart title={'Financial Overview'} description={'Revenue vs Expenses (Last 6 Month)'} />
//               </div>
//               <ExpensesBreakdown />
//             </div> */}

//             {/* Risk & Transactions Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-8 mb-8">
//               {/* <RiskIndicators /> */}
//               <TransactionsTable userId={userId as string}  />
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }
'use client'

import Sidebar from '@/components/dashboard/sidebar'
import Header from '@/components/dashboard/header'
import FinancialKPICards from '@/components/financial/financial-kpi-cards'
import RevenueChart from '@/components/financial/revenue-chart'
import ExpensesBreakdown from '@/components/financial/expenses-breakdown'
import RiskIndicators from '@/components/financial/risk-indicators'
import TransactionsTable from '@/components/financial/transactions-table'
import { Download, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useFinancialOverviewQuery } from '@/redux/feature/userSlice'
import { exportInvoicePDF } from '@/lib/exportInvoicePDF'

export default function FinancialOverviewPage() {
  const params  = useParams()
  const userId  = params.id as string

  const { data } = useFinancialOverviewQuery(userId)
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    if (!data?.data) return
    setExporting(true)
    try {
      await exportInvoicePDF(data.data, userId)
    } catch (err) {
      console.error('Export failed:', err)
      alert('Export failed. Please try again.')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Financial Overview
              </h1>

              {/* ── Export button ── */}
              <button
                onClick={handleExport}
                disabled={exporting || !data?.data}
                className="flex items-center gap-2 px-6 py-2.5 text-white bg-[#090A58] rounded-full
                           hover:bg-[#0d0f70] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {exporting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm font-semibold">Exporting…</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span className="text-sm font-semibold">Export Report</span>
                  </>
                )}
              </button>
            </div>

            {/* KPI Cards */}
            <FinancialKPICards userId={userId} />

            {/* Risk & Transactions Section */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-8 mb-8">
              <TransactionsTable userId={userId} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}