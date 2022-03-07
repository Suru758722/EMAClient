import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-seedbeed',
  templateUrl: './seedbeed.component.html',
  styleUrls: ['./seedbeed.component.css']
})
export class SeedbeedComponent implements OnInit {


  detailsForm: FormGroup;
  TableData: any[] = [];
  farmerList: any[] = [];
  machineList: any[] = [];
  equipmentList: any[] = [];
  cropList: any[] = []
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
      Rate: [null, Validators.required],
      DieselLPH: [null, Validators.required],
      DriverLabour: [null, Validators.required],
      NoOfPass: [null, Validators.required],
    })
  }
  ngOnInit() {
    this.adminService.getAll('SeedBeed').subscribe((data) => {
      this.TableData = data;
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
  }

  getFarmer(){
    console.log(this.detailsForm.controls.CropId)
    this.adminService.getAll('Farmer/GetFarmerById?Id=0&cropId='+ parseInt(this.detailsForm.controls.CropId.value)).subscribe((data) => {
      this.farmerList = data;
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
      Rate: singleRecord.rate,
      DieselLPH: singleRecord.dieselLPH,
      DriverLabour: singleRecord.driverLabour,
      NoOfPass: singleRecord.noOfPass
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
    this.adminService.post('SeedBeed', model).subscribe((data) => {
      this.TableData = data;
      this.initializeForm();

    },
      error => {
        console.log("error occured")
      })

  }

  removeItem(Id) {
    this.adminService.delete('SeedBeed', Id).subscribe((data) => {
      this.TableData = data;
    }, error => {
      console.log("error occured")
    })
  }
  getValue(id,key){
    if(key == 'farmer' && this.farmerList.length > 0)
    return this.farmerList.find(x => x.id == id).fullName;
    else if(key == 'machine' && this.machineList.length > 0)
    return this.machineList.find(x => x.id == id).name;
    else if(key == 'equip' && this.equipmentList.length > 0)
    return this.equipmentList.find(x => x.id == id).name;

  }

}
