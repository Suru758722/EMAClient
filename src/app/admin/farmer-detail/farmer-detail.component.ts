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
  sedbeedList: any[] = [];
  sowingList: any[] = [];
  fertilizerList: any[] = [];
  intercultureList: any[] = [];
  plantprotectionList: any[] = [];
  irrigationList: any[] = [];
  harvestingList: any[] = [];
  productionList: any[] = [];
  farmerList: any[] = [];
  machineList: any[] = [];
  equipmentList: any[] = [];
  constructor(private adminService: AdminService, private route: ActivatedRoute,) { 
    this.route.queryParams.subscribe((data) => {
      this.farmerId = data['id'];
      
    });
  }

  ngOnInit() {
    this.adminService.get('Farmer/GetFarmerById',this.farmerId).subscribe((response) => {
      this.farmerDetail = response;
    });
    this.adminService.getAll('Machine').subscribe((data) => {
      this.machineList = data;
    })
    this.adminService.getAll('Equipment').subscribe((data) => {
      this.equipmentList = data;
    })
    this.adminService.getAll('SeedBeed').subscribe((data) => {
      this.sedbeedList = data;
    })
    this.adminService.getAll('Sowing').subscribe((data) => {
      this.sowingList = data;
    })
    this.adminService.getAll('Fertilizer').subscribe((data) => {
      this.fertilizerList = data;
    })
    this.adminService.getAll('InterCulture').subscribe((data) => {
      this.intercultureList = data;
    })
    this.adminService.getAll('PlantProtection').subscribe((data) => {
      this.plantprotectionList = data;
    })
    this.adminService.getAll('Irrigation').subscribe((data) => {
      this.irrigationList = data;
    })
    this.adminService.getAll('Harvesting').subscribe((data) => {
      this.harvestingList = data;
    })
    this.adminService.getAll('Production').subscribe((data) => {
      this.productionList = data;
    })
  }
  getValue(id,key){
    
     if(key == 'machine' && this.machineList.length > 0)
    return this.machineList.find(x => x.id == id).name;
    else if(key == 'equip' && this.equipmentList.length > 0)
    return this.equipmentList.find(x => x.id == id).name;

  }
}
