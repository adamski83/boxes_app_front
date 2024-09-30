import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { MockData, MockDataItem } from "src/types";

export const generatePDF = (data: MockData) => {
  const doc = new jsPDF();
  const tableColumn = ["Name of the Box", "Description", "Amount"];
  const tableRows: any[] = [];

  data.forEach((item: MockDataItem) => {
    const itemData = [item.name, item.usage, item.amount];
    tableRows.push(itemData);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
  });

  doc.save("items.pdf");
  console.log("PDF generated successfully");
};
