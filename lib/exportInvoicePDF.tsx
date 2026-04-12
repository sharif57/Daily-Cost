import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Transaction {
  id: string
  date: string
  notes?: string
  category: string
  amount: string
  type: 'INCOME' | 'EXPENSE'
  image?: string
}

interface FinancialReport {
  total_income?: number
  average_monthly_income?: number
  growth_vs_previous_month?: {
    percentage?: number
    income?: number
  }
  recent_transactions?: Transaction[]
  meta?: { total?: number }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (v?: number) =>
  `$${(v ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const fmtDate = (v: string) =>
  new Date(v).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })

const fmtAmount = (amount: string, type: string) => {
  const n = Number(amount || 0)
  const prefix = type === 'INCOME' ? '+' : '-'
  return `${prefix}${fmt(n)}`
}

// Brand palette
const NAVY   = [9, 10, 88]    as [number,number,number]   // #090A58
const SLATE  = [30, 32, 80]   as [number,number,number]   // dark navy-slate
const GOLD   = [234, 179, 8]  as [number,number,number]   // accent gold
const LIGHT  = [245, 246, 255]as [number,number,number]   // near-white tint
const MUTED  = [120, 122, 160]as [number,number,number]   // muted text
const GREEN  = [22, 163, 74]  as [number,number,number]
const RED    = [220, 38, 38]  as [number,number,number]

// ─── Main export function ─────────────────────────────────────────────────────
export async function exportInvoicePDF(report: FinancialReport, userId: string) {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W = 210
  const now = new Date()
  const invoiceNo = `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${userId.slice(-6).toUpperCase()}`

  // ── 1. Hero header strip ───────────────────────────────────────────────────
  pdf.setFillColor(...NAVY)
  pdf.rect(0, 0, W, 42, 'F')

  // diagonal accent slash
  pdf.setFillColor(...GOLD)
  pdf.triangle(W - 45, 0, W, 0, W, 42, 'F')

  // Brand name
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(22)
  pdf.setFont('helvetica', 'bold')
  pdf.text('FINANCIAL', 14, 16)
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(180, 182, 220)
  pdf.text('OVERVIEW REPORT', 14, 23)

  // Invoice number badge
  pdf.setFillColor(255, 255, 255, 0.15)
  pdf.setDrawColor(255, 255, 255)
  pdf.setLineWidth(0.3)
  pdf.roundedRect(14, 28, 60, 8, 2, 2, 'S')
  pdf.setTextColor(200, 200, 255)
  pdf.setFontSize(8)
  pdf.text(`Invoice No: ${invoiceNo}`, 17, 33.5)

  // Date block (right side)
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'normal')
  pdf.text('Generated', W - 50, 14, { align: 'left' })
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text(
    now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    W - 50, 20, { align: 'left' }
  )
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'normal')
  pdf.text(`User ID: ${userId}`, W - 50, 28)

  // ── 2. KPI summary cards ───────────────────────────────────────────────────
  const growthPct  = report.growth_vs_previous_month?.percentage ?? 0
  const growthInc  = report.growth_vs_previous_month?.income ?? 0
  const txCount    = report.recent_transactions?.length ?? 0
  const totalTx    = report.meta?.total ?? 0

  const kpis = [
    { label: 'Total Income',          value: fmt(report.total_income) },
    { label: 'Avg Monthly Income',    value: fmt(report.average_monthly_income) },
    { label: 'Growth Income Amount',  value: fmt(growthInc) },
    { label: 'Recent Transactions',   value: `${txCount} / ${totalTx}` },
  ]

  const cardW = (W - 14 * 2 - 3 * 5) / 4   // 4 cards with 5mm gaps
  kpis.forEach((kpi, i) => {
    const x = 14 + i * (cardW + 5)
    const y = 48

    // card background
    pdf.setFillColor(...LIGHT)
    pdf.roundedRect(x, y, cardW, 28, 3, 3, 'F')

    // top accent bar
    pdf.setFillColor(...NAVY)
    pdf.roundedRect(x, y, cardW, 4, 2, 2, 'F')
    pdf.rect(x, y + 2, cardW, 2, 'F')  // square off bottom of top bar

    // label
    pdf.setTextColor(...MUTED)
    pdf.setFontSize(6.5)
    pdf.setFont('helvetica', 'normal')
    const lines = pdf.splitTextToSize(kpi.label, cardW - 4)
    pdf.text(lines, x + 3, y + 10)

    // value
    pdf.setTextColor(...NAVY)
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'bold')
    pdf.text(kpi.value, x + 3, y + 21)
  })

  // growth badge
  const growthY = 80
  const isPos = growthPct >= 0
  pdf.setFillColor(...(isPos ? GREEN : RED))
  pdf.roundedRect(14, growthY, 80, 7, 2, 2, 'F')
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'bold')
  pdf.text(
    `${isPos ? '▲' : '▼'} ${isPos ? '+' : ''}${growthPct.toFixed(2)}%  vs previous month`,
    54, growthY + 4.8, { align: 'center' }
  )

  // ── 3. Section title ───────────────────────────────────────────────────────
  const tableStartY = 93

  // left accent line + title
  pdf.setFillColor(...NAVY)
  pdf.rect(14, tableStartY, 3, 7, 'F')
  pdf.setTextColor(...NAVY)
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Large Transactions — Last 30 Days', 20, tableStartY + 5.5)

  // ── 4. Transactions table ──────────────────────────────────────────────────
  const transactions = report.recent_transactions ?? []

  const tableBody = transactions.map((tx) => [
    fmtDate(tx.date),
    tx.notes || 'N/A',
    tx.category,
    fmtAmount(tx.amount, tx.type),
    tx.type,
  ])

  autoTable(pdf, {
    startY: tableStartY + 9,
    head: [['Date', 'Description', 'Category', 'Amount', 'Type']],
    body: tableBody,
    margin: { left: 14, right: 14 },
    styles: {
      font: 'helvetica',
      fontSize: 8,
      cellPadding: { top: 4, bottom: 4, left: 4, right: 4 },
      textColor: [30, 30, 60],
    },
    headStyles: {
      fillColor: NAVY,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.5,
    },
    alternateRowStyles: {
      fillColor: [248, 248, 255],
    },
    columnStyles: {
      0: { cellWidth: 26 },
      1: { cellWidth: 60 },
      2: { cellWidth: 35 },
      3: { cellWidth: 30, halign: 'right', fontStyle: 'bold' },
      4: { cellWidth: 22, halign: 'center' },
    },
    didParseCell(data) {
      // Color the Amount and Type columns
      if (data.section === 'body') {
        const row = transactions[data.row.index]
        if (!row) return
        const isIncome = row.type === 'INCOME'
        if (data.column.index === 3) {
          data.cell.styles.textColor = isIncome ? GREEN : RED
        }
        if (data.column.index === 4) {
          data.cell.styles.textColor = isIncome ? GREEN : RED
          data.cell.styles.fontStyle = 'bold'
        }
      }
    },
  })

  // ── 5. Footer on every page ────────────────────────────────────────────────
  const totalPages = pdf.getNumberOfPages()
  for (let p = 1; p <= totalPages; p++) {
    pdf.setPage(p)

    // thin divider
    pdf.setDrawColor(...MUTED)
    pdf.setLineWidth(0.2)
    pdf.line(14, 284, W - 14, 284)

    // left: brand
    pdf.setTextColor(...NAVY)
    pdf.setFontSize(7.5)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Financial Overview Report', 14, 289)

    // center: confidential
    pdf.setTextColor(...MUTED)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Confidential — Internal Use Only', W / 2, 289, { align: 'center' })

    // right: page number
    pdf.setTextColor(...NAVY)
    pdf.text(`Page ${p} of ${totalPages}`, W - 14, 289, { align: 'right' })
  }

  // ── 6. Save ────────────────────────────────────────────────────────────────
  const fileName = `financial-report-${userId.slice(-8)}-${now.toISOString().slice(0, 10)}.pdf`
  pdf.save(fileName)
}