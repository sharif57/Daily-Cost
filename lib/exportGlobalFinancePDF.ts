import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { GlobalFinancialOverviewData, IncomeRecentTransaction } from '@/redux/feature/userSlice'

interface ExportOptions {
  page: number
  totalTransactions: number
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const formatCurrency = (value?: number): string => {
  return `$${(value ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

const formatDate = (value: string): string => {
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

const formatAmount = (amount: string, type: string): string => {
  const value = Number(amount || 0)
  const sign = type === 'INCOME' ? '+' : '-'
  return `${sign}${formatCurrency(value)}`
}

export async function exportGlobalFinancePDF(
  report: GlobalFinancialOverviewData,
  transactions: IncomeRecentTransaction[],
  options: ExportOptions,
): Promise<void> {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageWidth = 210
  const now = new Date()
  const invoiceNo = `GF-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${String(options.page).padStart(2, '0')}`

  pdf.setFillColor(9, 10, 88)
  pdf.rect(0, 0, pageWidth, 38, 'F')

  pdf.setTextColor(255, 255, 255)
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(20)
  pdf.text('GLOBAL FINANCE INVOICE', 14, 15)

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(9)
  pdf.text(`Generated: ${now.toLocaleDateString()}`, 14, 23)
  pdf.text(`Invoice: ${invoiceNo}`, 14, 29)

  pdf.text(`Page: ${options.page}`, 195, 23, { align: 'right' })
  pdf.text(`Rows: ${transactions.length}/${options.totalTransactions}`, 195, 29, { align: 'right' })

  autoTable(pdf, {
    startY: 45,
    head: [['Metric', 'Value']],
    body: [
      ['Total Revenue', formatCurrency(report.total_revenue)],
      ['Total Expense', formatCurrency(report.total_expense)],
      ['Total Income', formatCurrency(report.total_income)],
      ['Zakat Expense', formatCurrency(report.zakat_expense)],
    ],
    margin: { left: 14, right: 14 },
    headStyles: { fillColor: [9, 10, 88] },
    styles: { fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 112, halign: 'right' },
    },
  })

  const monthlyDataBody = (report.monthly_data ?? []).map((item) => [
    monthNames[item.month - 1] ?? `M${item.month}`,
    formatCurrency(item.income),
    formatCurrency(item.expense),
  ])

  autoTable(pdf, {
    startY: (pdf as unknown as { lastAutoTable?: { finalY?: number } }).lastAutoTable?.finalY
      ? ((pdf as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8)
      : 90,
    head: [['Month', 'Income', 'Expense']],
    body: monthlyDataBody,
    margin: { left: 14, right: 14 },
    headStyles: { fillColor: [9, 10, 88] },
    styles: { fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 45 },
      1: { cellWidth: 68, halign: 'right' },
      2: { cellWidth: 69, halign: 'right' },
    },
  })

  const txBody = transactions.map((tx) => [
    formatDate(tx.date),
    tx.category,
    tx.notes || 'N/A',
    formatAmount(tx.amount, tx.type),
    tx.type,
  ])

  autoTable(pdf, {
    startY: (pdf as unknown as { lastAutoTable?: { finalY?: number } }).lastAutoTable
      ? ((pdf as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8)
      : 150,
    head: [['Date', 'Category', 'Notes', 'Amount', 'Type']],
    body: txBody,
    margin: { left: 14, right: 14 },
    headStyles: { fillColor: [9, 10, 88] },
    styles: { fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 28 },
      1: { cellWidth: 32 },
      2: { cellWidth: 58 },
      3: { cellWidth: 36, halign: 'right' },
      4: { cellWidth: 28, halign: 'center' },
    },
    didParseCell(data) {
      if (data.section !== 'body') return
      const row = transactions[data.row.index]
      if (!row) return

      if (data.column.index === 3 || data.column.index === 4) {
        data.cell.styles.textColor = row.type === 'INCOME' ? [22, 163, 74] : [220, 38, 38]
      }
    },
  })

  const totalPages = pdf.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i)
    pdf.setTextColor(120, 122, 160)
    pdf.setFontSize(8)
    pdf.text(`Page ${i} of ${totalPages}`, 195, 289, { align: 'right' })
  }

  const fileName = `global-finance-invoice-page-${options.page}-${now.toISOString().slice(0, 10)}.pdf`
  pdf.save(fileName)
}
