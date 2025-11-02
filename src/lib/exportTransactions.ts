import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { Transaction } from "@/components/TransactionForm";

export const exportToPDF = (transactions: Transaction[]) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text("Transaction Statement", 14, 20);
  
  // Add date range
  doc.setFontSize(11);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
  
  // Prepare table data
  const tableData = transactions.map(t => [
    new Date(t.date).toLocaleDateString(),
    t.category,
    t.type.charAt(0).toUpperCase() + t.type.slice(1),
    t.paymentMethod,
    t.description || "-",
    `₹${t.amount.toLocaleString()}`
  ]);
  
  // Add table
  autoTable(doc, {
    head: [["Date", "Category", "Type", "Payment Method", "Description", "Amount"]],
    body: tableData,
    startY: 40,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [99, 102, 241] },
  });
  
  // Add summary
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  
  const totalInvestments = transactions
    .filter(t => t.type === "investment")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  
  const finalY = (doc as any).lastAutoTable.finalY || 40;
  
  doc.setFontSize(12);
  doc.text("Summary", 14, finalY + 15);
  doc.setFontSize(10);
  doc.text(`Total Income: ₹${totalIncome.toLocaleString()}`, 14, finalY + 25);
  doc.text(`Total Expenses: ₹${totalExpenses.toLocaleString()}`, 14, finalY + 32);
  doc.text(`Total Investments: ₹${totalInvestments.toLocaleString()}`, 14, finalY + 39);
  doc.text(`Net Balance: ₹${(totalIncome - totalExpenses).toLocaleString()}`, 14, finalY + 46);
  
  // Save the PDF
  doc.save(`transactions-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportToExcel = (transactions: Transaction[]) => {
  // Prepare data for Excel
  const excelData = transactions.map(t => ({
    Date: new Date(t.date).toLocaleDateString(),
    Category: t.category,
    Type: t.type.charAt(0).toUpperCase() + t.type.slice(1),
    "Payment Method": t.paymentMethod,
    Description: t.description || "-",
    Amount: Number(t.amount),
  }));
  
  // Calculate summary
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  
  const totalInvestments = transactions
    .filter(t => t.type === "investment")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  
  // Add summary rows
  const summaryData = [
    {},
    { Date: "Summary", Category: "", Type: "", "Payment Method": "", Description: "", Amount: "" },
    { Date: "Total Income", Category: "", Type: "", "Payment Method": "", Description: "", Amount: totalIncome },
    { Date: "Total Expenses", Category: "", Type: "", "Payment Method": "", Description: "", Amount: totalExpenses },
    { Date: "Total Investments", Category: "", Type: "", "Payment Method": "", Description: "", Amount: totalInvestments },
    { Date: "Net Balance", Category: "", Type: "", "Payment Method": "", Description: "", Amount: totalIncome - totalExpenses },
  ];
  
  // Create worksheet
  const ws = XLSX.utils.json_to_sheet([...excelData, ...summaryData]);
  
  // Set column widths
  ws['!cols'] = [
    { wch: 12 },
    { wch: 20 },
    { wch: 12 },
    { wch: 15 },
    { wch: 30 },
    { wch: 12 }
  ];
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Transactions");
  
  // Save the file
  XLSX.writeFile(wb, `transactions-${new Date().toISOString().split('T')[0]}.xlsx`);
};
