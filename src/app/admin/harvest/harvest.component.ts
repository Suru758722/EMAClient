import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-harvest',
  templateUrl: './harvest.component.html',
  styleUrls: ['./harvest.component.css']
})
export class HarvestComponent implements OnInit {

 
  detailsForm: FormGroup;
  TableData: any[] = [];
  farmerList: any[] = [];
  machineList: any[] = [];
  equipmentList: any[] = [];
  cropList: any[] = []
  take: number = 1
  moreExist: boolean = false
  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.initializeForm()
  }

  initializeForm() {
    this.detailsForm = this.fb.group({
      Id: [0],
      CropId: [''],
      FarmerId: ['',Validators.required],
      MachineId: ['', Validators.required],
      EquipmentId: ['', Validators.required],
      TypeOperation: [null, Validators.required], 
      OwnHired: ['', Validators.required],
      DieselLPH: [null, Validators.required],
      DriverLabour: [null, Validators.required],
      LabourChargePDay: [null],
      NoOfPass: [null, Validators.required],
    })
  }
  ngOnInit() {
    this.adminService.getAll('Harvesting?take='+this.take).subscribe((data : any) => {
      this.TableData = data.list;
      this.moreExist = data.exist   
    })
    this.adminService.getAll('Admin/GetCrop').subscribe((data) => {
      this.cropList = data;
    })
    this.adminService.getAll('Machine').subscribe((data) => {
      this.machineList = data;
    })
    this.adminService.getAll('Equipment').subscribe((data) => {
      this.equipmentList = data;
    })
    this.detailsForm.controls.CropId.valueChanges.subscribe((data) =>{
      this.adminService.getAll('Farmer/GetFarmerById?Id=0&cropId='+ parseInt(this.detailsForm.controls.CropId.value)).subscribe((data) => {
        this.farmerList = data;
      })
    })
  }

  editData(Id) {
    var singleRecord = this.TableData.find(x => x.id == Id)
    this.detailsForm.setValue({
      Id: singleRecord.id,
      FarmerId: singleRecord.farmerid,
      MachineId: singleRecord.machineId,
      EquipmentId: singleRecord.equipmentId,
      TypeOperation: singleRecord.typeOperation,
      OwnHired: singleRecord.ownHired,
      DieselLPH: singleRecord.dieselLPH,
      DriverLabour: singleRecord.driverLabour,
      LabourChargePDay: singleRecord.labourChargePDay,
      NoOfPass: singleRecord.noOfPass,
      CropId: singleRecord.farmerDetail.crop.id

    })
  }


  _NumberOnly(event: any) {
    const numpattern = /[0-9\.]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!numpattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  _CharacterOnly(event: any) {
    const charpattern = /^[a-zA-Z]+$/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!charpattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  submitForm(model: any) {
    model.FarmerId = parseInt(model.FarmerId)
    model.MachineId = parseInt(model.MachineId)
    model.EquipmentId = parseInt(model.EquipmentId)
    this.adminService.post('Harvesting', model).subscribe((data) => {
      this.TableData = data.list;
      this.moreExist = data.exist   
      this.initializeForm();

    },
      error => {
        console.log("error occured")
      })

  }

  removeItem(Id) {
    this.adminService.delete('Harvesting', Id).subscribe((data) => {
      this.TableData = data.list;
      this.moreExist = data.exist   
    }, error => {
      console.log("error occured")
    })
  }
  viewMore(key){
    if(key=='front'){
      this.take = this.take + 1;
    }else{
      this.take = this.take - 1;
    }
    this.adminService.getAll('Harvesting?take='+ this.take).subscribe((data : any) => {
      this.TableData = data.list;
      this.moreExist = data.exist    
    },
    error => {
      console.log("error occured")
    })
  }
}
