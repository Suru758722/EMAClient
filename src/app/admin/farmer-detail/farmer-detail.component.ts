import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-farmer-detail',
  templateUrl: './farmer-detail.component.html',
  styleUrls: ['./farmer-detail.component.css']
})
export class FarmerDetailComponent implements OnInit {

  farmerId: number = null
  farmerDetail: any
  CropDetails: any
  constructor(private adminService: AdminService, private route: ActivatedRoute,) { 
    this.route.queryParams.subscribe((data) => {
      this.farmerId = data['id'];
      
    });
  }

  ngOnInit() {
    this.adminService.getAll('Farmer/GetFarmerById?Id='+this.farmerId+"&cropId=0").subscribe((response) => {
      this.farmerDetail = response[0];
    });
    this.adminService.getAll('Farmer/GetSurveyDataByFarmerId?farmerId='+this.farmerId).subscribe((data) => {
      this.CropDetails = data;
    })
    
  }

}
