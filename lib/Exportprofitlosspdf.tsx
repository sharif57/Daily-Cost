import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// ─── Types ────────────────────────────────────────────────────────────────────
interface MonthlyData {
  month: string | number
  income?: number
  expense?: number
  profit?: number
}

interface Transaction {
  id: string
  date: string
  notes?: string
  category: string
  amount: string | number
  type: string
}

interface ProfitLossReport {
  total_income?: number
  total_expense?: number
  net_profit?: number
  net_loss?: number
  profit_margin?: number
  yearly_monthly_data?: MonthlyData[]
  category_wise_expense?: Record<string, number>
  recent_transactions?: Transaction[]
  meta?: { total?: number; page?: number; limit?: number }
}

// ─── Palette ──────────────────────────────────────────────────────────────────
const NAVY = [9, 10, 88] as [number, number, number]
const GOLD = [234, 179, 8] as [number, number, number]
const EMERALD = [5, 150, 105] as [number, number, number]
const CRIMSON = [185, 28, 28] as [number, number, number]
const LIGHT = [245, 246, 255] as [number, number, number]
const MUTED = [120, 122, 160] as [number, number, number]
const WHITE = [255, 255, 255] as [number, number, number]
const DARK = [15, 17, 60] as [number, number, number]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const $ = (v?: number) =>
  `$${(v ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const dt = (v: string) =>
  new Date(v).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })

const pct = (v?: number) => `${(v ?? 0).toFixed(2)}%`

// Draw a rounded-corner card (fill + optional top accent)
function card(
  pdf: jsPDF,
  x: number, y: number, w: number, h: number,
  accentColor?: [number, number, number],
) {
  pdf.setFillColor(...LIGHT)
  pdf.roundedRect(x, y, w, h, 3, 3, 'F')
  if (accentColor) {
    pdf.setFillColor(...accentColor)
    pdf.roundedRect(x, y, w, 3.5, 2, 2, 'F')
    pdf.rect(x, y + 1.5, w, 2, 'F')
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export async function exportProfitLossPDF(
  report: ProfitLossReport,
  userId: string,
) {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W = 210
  const now = new Date()
  const ref = `PL-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${userId.slice(-6).toUpperCase()}`

  /* ══════════════════════════════════════════════════════
     1.  HERO HEADER
  ══════════════════════════════════════════════════════ */
  // Navy base
  pdf.setFillColor(...NAVY)
  pdf.rect(0, 0, W, 46, 'F')

  // Gold diagonal slash (top-right)
  pdf.setFillColor(...GOLD)
  pdf.triangle(W - 50, 0, W, 0, W, 46, 'F')

  // Thin emerald bottom stripe
  pdf.setFillColor(...EMERALD)
  pdf.rect(0, 43, W, 3, 'F')

  // Left: Report title
  pdf.setTextColor(...WHITE)
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(20)
  pdf.text('PROFIT & LOSS', 14, 17)
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(180, 182, 220)
  pdf.text('SUMMARY REPORT', 14, 24)

  // Ref badge
  pdf.setDrawColor(...WHITE)
  pdf.setLineWidth(0.25)
  pdf.roundedRect(14, 29, 62, 8, 2, 2, 'S')
  pdf.setTextColor(210, 212, 255)
  pdf.setFontSize(7.5)
  pdf.text(`Ref: ${ref}`, 17, 34.2)

  // Right: date + user
  pdf.setTextColor(...WHITE)
  pdf.setFontSize(7.5)
  pdf.setFont('helvetica', 'normal')
  pdf.text('Generated on', W - 14, 14, { align: 'right' })
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(9)
  pdf.text(
    now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    W - 14, 20.5, { align: 'right' },
  )
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(7.5)
  pdf.setTextColor(180, 182, 220)
  pdf.text(`User ID: ${userId}`, W - 14, 27, { align: 'right' })

  /* ══════════════════════════════════════════════════════
     2.  KPI SUMMARY CARDS  (4 across)
  ══════════════════════════════════════════════════════ */
  const isProfit = (report.net_profit ?? 0) >= (report.net_loss ?? 0)
  const netValue = isProfit ? report.net_profit : report.net_loss
  const netLabel = isProfit ? 'Net Profit' : 'Net Loss'
  const netColor = isProfit ? EMERALD : CRIMSON

  const kpis = [
    { label: 'Total Income', value: $(report.total_income), accent: EMERALD },
    { label: 'Total Expense', value: $(report.total_expense), accent: CRIMSON },
    { label: netLabel, value: $(netValue), accent: netColor },
    { label: 'Profit Margin', value: pct(report.profit_margin), accent: NAVY },
  ]

  const gap = 5
  const cardW = (W - 14 * 2 - gap * 3) / 4
  const cardY = 51

  kpis.forEach((k, i) => {
    const x = 14 + i * (cardW + gap)
    card(pdf, x, cardY, cardW, 30, k.accent)

    pdf.setTextColor(...MUTED)
    pdf.setFontSize(6.5)
    pdf.setFont('helvetica', 'normal')
    const wrapped = pdf.splitTextToSize(k.label, cardW - 6)
    pdf.text(wrapped, x + 4, cardY + 10)

    pdf.setTextColor(...DARK)
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.text(k.value, x + 4, cardY + 23)
  })

  /* ══════════════════════════════════════════════════════
     3.  MONTHLY INCOME vs EXPENSE TABLE
  ══════════════════════════════════════════════════════ */
  let cursor = cardY + 38

  pdf.setFillColor(...NAVY)
  pdf.rect(14, cursor, 3, 7, 'F')
  pdf.setTextColor(...NAVY)
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Monthly Breakdown — Income vs Expense', 20, cursor + 5.5)
  cursor += 10

  const monthly = report.yearly_monthly_data ?? []

  if (monthly.length > 0) {
    const monthlyBody = monthly.map((m) => {
      const profit = (m.income ?? 0) - (m.expense ?? 0)
      return [
        m.month ?? '',
        $(m.income),
        $(m.expense),
        profit >= 0 ? `+${$(profit)}` : `${$(profit)}`,
      ]
    })

    autoTable(pdf, {
      startY: cursor,
      head: [['Month', 'Income', 'Expense', 'Net']],
      body: monthlyBody,
      margin: { left: 14, right: 14 },
      styles: {
        font: 'helvetica', fontSize: 8,
        cellPadding: { top: 3.5, bottom: 3.5, left: 4, right: 4 },
        textColor: [20, 20, 60],
      },
      headStyles: {
        fillColor: NAVY, textColor: WHITE,
        fontStyle: 'bold', fontSize: 8.5,
      },
      alternateRowStyles: { fillColor: [248, 248, 255] },
      columnStyles: {
        0: { cellWidth: 36 },
        1: { cellWidth: 46, halign: 'right' },
        2: { cellWidth: 46, halign: 'right' },
        3: { cellWidth: 46, halign: 'right', fontStyle: 'bold' },
      },
      didParseCell(data) {
        if (data.section === 'body' && data.column.index === 3) {
          const raw = String(data.cell.raw)
          data.cell.styles.textColor = raw.startsWith('+') ? EMERALD : CRIMSON
        }
      },
    })

    cursor = (pdf as any).lastAutoTable.finalY + 8
  }

  /* ══════════════════════════════════════════════════════
     4.  CATEGORY-WISE EXPENSE
  ══════════════════════════════════════════════════════ */
  const catExpense = report.category_wise_expense ?? {}
  const catEntries = Object.entries(catExpense)

  if (catEntries.length > 0) {
    // Check if we need a new page
    if (cursor > 220) { pdf.addPage(); cursor = 16 }

    pdf.setFillColor(...NAVY)
    pdf.rect(14, cursor, 3, 7, 'F')
    pdf.setTextColor(...NAVY)
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Expense by Category', 20, cursor + 5.5)
    cursor += 10

    const totalExp = report.total_expense ?? 1
    const catBody = catEntries
      .sort((a, b) => b[1] - a[1])
      .map(([cat, amt]) => [
        cat,
        $(amt),
        `${((amt / totalExp) * 100).toFixed(1)}%`,
      ])

    autoTable(pdf, {
      startY: cursor,
      head: [['Category', 'Amount', 'Share']],
      body: catBody,
      margin: { left: 14, right: 14 },
      styles: {
        font: 'helvetica', fontSize: 8,
        cellPadding: { top: 3.5, bottom: 3.5, left: 4, right: 4 },
        textColor: [20, 20, 60],
      },
      headStyles: {
        fillColor: NAVY, textColor: WHITE,
        fontStyle: 'bold', fontSize: 8.5,
      },
      alternateRowStyles: { fillColor: [248, 248, 255] },
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 55, halign: 'right' },
        2: { cellWidth: 35, halign: 'right', fontStyle: 'bold' },
      },
    })

    cursor = (pdf as any).lastAutoTable.finalY + 8
  }

  /* ══════════════════════════════════════════════════════
     5.  RECENT TRANSACTIONS TABLE
  ══════════════════════════════════════════════════════ */
  const txns = report.recent_transactions ?? []

  if (txns.length > 0) {
    if (cursor > 210) { pdf.addPage(); cursor = 16 }

    pdf.setFillColor(...NAVY)
    pdf.rect(14, cursor, 3, 7, 'F')
    pdf.setTextColor(...NAVY)
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Recent Transactions', 20, cursor + 5.5)
    cursor += 10

    const txBody = txns.map((tx) => {
      const amt = Number(tx.amount || 0)
      const sign = tx.type === 'INCOME' ? '+' : '-'
      return [
        dt(tx.date),
        tx.notes || 'N/A',
        tx.category,
        `${sign}${$(amt)}`,
        tx.type,
      ]
    })

    autoTable(pdf, {
      startY: cursor,
      head: [['Date', 'Description', 'Category', 'Amount', 'Type']],
      body: txBody,
      margin: { left: 14, right: 14 },
      styles: {
        font: 'helvetica', fontSize: 7.5,
        cellPadding: { top: 3.5, bottom: 3.5, left: 3, right: 3 },
        textColor: [20, 20, 60],
      },
      headStyles: {
        fillColor: NAVY, textColor: WHITE,
        fontStyle: 'bold', fontSize: 8,
      },
      alternateRowStyles: { fillColor: [248, 248, 255] },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 58 },
        2: { cellWidth: 38 },
        3: { cellWidth: 32, halign: 'right', fontStyle: 'bold' },
        4: { cellWidth: 21, halign: 'center' },
      },
      didParseCell(data) {
        if (data.section === 'body') {
          const row = txns[data.row.index]
          if (!row) return
          const isIncome = row.type === 'INCOME'
          if (data.column.index === 3 || data.column.index === 4) {
            data.cell.styles.textColor = isIncome ? EMERALD : CRIMSON
            data.cell.styles.fontStyle = 'bold'
          }
        }
      },
    })
  }

  /* ══════════════════════════════════════════════════════
     6.  FOOTER — every page
  ══════════════════════════════════════════════════════ */
  const pages = pdf.getNumberOfPages()
  for (let p = 1; p <= pages; p++) {
    pdf.setPage(p)

    // gold accent line
    pdf.setFillColor(...GOLD)
    pdf.rect(14, 283, W - 28, 0.8, 'F')

    // divider line
    pdf.setDrawColor(...MUTED)
    pdf.setLineWidth(0.15)
    pdf.line(14, 284.5, W - 14, 284.5)

    pdf.setFontSize(7)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(...NAVY)
    pdf.text('Profit & Loss Summary Report', 14, 289.5)

    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(...MUTED)
    pdf.text('Confidential — Internal Use Only', W / 2, 289.5, { align: 'center' })

    pdf.setTextColor(...NAVY)
    pdf.text(`Page ${p} of ${pages}`, W - 14, 289.5, { align: 'right' })
  }

  /* ══════════════════════════════════════════════════════
     7.  SAVE
  ══════════════════════════════════════════════════════ */
  const fileName = `profit-loss-${userId.slice(-8)}-${now.toISOString().slice(0, 10)}.pdf`
  pdf.save(fileName)
}