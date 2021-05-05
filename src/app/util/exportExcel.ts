import * as XLSX from "xlsx";


export class ExportExcel {
  static exportTableToExcel(tableId: string, fileName?: string, sheetName?: string) {
   /* table id is passed over here */
   const element = document.getElementById(tableId);
   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, { raw: true });
   /* generate workbook and add the worksheet */
   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, sheetName);
   // XLSX.utils.format_cell(ws['A2'].w.s);
   /* save to file */
   XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}
