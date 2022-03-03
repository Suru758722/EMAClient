import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: any, excelFileName: string): void {
    
    const myworksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.seedBeed);
    const myworksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.sowing);
    const myworksheet3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.fertilizer);
    const myworksheet4: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.interCulture);
    const myworksheet5: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.plantProtection);
    const myworksheet6: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.irrigation);
    const myworksheet7: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.harvesting);
    const myworksheet8: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.production);

    const myworkbook: XLSX.WorkBook = { Sheets: {
         'seedBeed': myworksheet1,
         'sowing' : myworksheet2,
         'fertilizer' : myworksheet3,
         'interCulture' : myworksheet4,
         'plantProtection' : myworksheet5,
         'irrigation' : myworksheet6,
         'harvesting' : myworksheet7,
         'production' : myworksheet8
         }, SheetNames: [
             'seedBeed',
             'sowing',
             'fertilizer',
             'interCulture',
             'plantProtection',
             'irrigation',
             'harvesting',
             'production'
            ]
         };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported'+ EXCEL_EXTENSION);
  }

}