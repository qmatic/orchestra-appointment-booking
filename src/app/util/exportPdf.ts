// @ts-ignore
import jsPDF from 'jspdf';
import * as autoTable from 'jspdf-autotable';

const getFileName = (name: string) => {
  let timeSpan = new Date().toISOString();
  let sheetName = name || "ExportResult";
  let fileName = `${sheetName}-${timeSpan}`;
  return {
    sheetName,
    fileName
  };
};
export class ExportPdf {
  static exportTableToPdf(tableData: Array<any>, headers: Array<any>, name?: string) {
    let { sheetName, fileName } = getFileName(name);
    var prepare=[];
    tableData.forEach(e=>{
      var tempObj =[];
      tempObj.push(e.startTime);
      tempObj.push(e.startTime);
      tempObj.push(e.endTime);
      tempObj.push(e.customers && e.customers.length > 0 ? e.customers[0].firstName : '');
      tempObj.push(e.customers && e.customers.length > 0 ? e.customers[0].lastName : '');
      tempObj.push(e.resourceName);
      tempObj.push(e.services && e.services.length > 0 ? e.services[0].name : '');
      tempObj.push(e.customers && e.customers.length > 0 ? e.customers[0].properties.email : '');
      tempObj.push(e.customers && e.customers.length > 0 ? e.customers[0].properties.phoneNumber : '');
      tempObj.push(e.updateTime);
      tempObj.push(e.status);
      prepare.push(tempObj);
    });
    const doc = new jsPDF();
    // doc.autoTable({
    //     head: [headers],
    //     body: prepare
    // });
    doc.save(`${fileName}.pdf`);
  }


  static exportHtmlTableToPdf(heading: string, fileName: string, tableId:string){
    const doc = new jsPDF('l');
    doc.setLineWidth(2);
    doc.text(heading, 10, 10);
    // @ts-ignore
    doc.autoTable({
      html: '#'+tableId,
      startY: 20
    });
    // @ts-ignore
    doc.save(`${fileName}.pdf`);

  }
}
