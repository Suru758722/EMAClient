import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private excelService: ExcelService, private adminService: AdminService) { }

  ngOnInit() {
  }
  downloadSurway(){
    this.adminService.getAll('Account/DownloadSurway',null).subscribe((data : any)=>{
      this.excelService.exportAsExcelFile(data,'surway_data');
    })
    
  }
}
