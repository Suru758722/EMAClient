import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-irrigation',
  templateUrl: './irrigation.component.html',
  styleUrls: ['./irrigation.component.css']
})
export class IrrigationComponent implements OnInit {

  detailsForm: FormGroup;
  TableData: any[] = [];
  farmerList: any[] = [];
  machineList: any[] = [];
  equipmentList: any[] = [];
  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.initializeForm()
  }

  initializeForm() {
    this.detailsForm = this.fb.group({
      Id: [0],
      FarmerId: ['',Validators.required],
      MachineId: ['', Validators.required],
      EquipmentId: ['', Validators.required],
      TimeTaken: [null, Validators.required], 
      OwnHired: ['', Validators.required],
      EleckWh: [null, Validators.required],
      DriverLabour: [null, Validators.required],
      NoOfPass: [null, Validators.required]
    })
  }
  ngOnInit() {
    this.adminService.getAll('Irrigation').subscribe((data) => {
      this.TableData = data;
      console.log(this.TableData)
    })
    this.adminService.getAll('Farmer').subscribe((data) => {
      this.farmerList = data;
    })
    this.adminService.getAll('Machine').subscribe((data) => {
      this.machineList = data;
    })
    this.adminService.getAll('Equipment').subscribe((data) => {
      this.equipmentList = data;
    })
  }

  editData(Id) {
    var singleRecord = this.TableData.find(x => x.id == Id)
    this.detailsForm.setValue({
      Id: singleRecord.id,
      FarmerId: singleRecord.farmerid,
      MachineId: singleRecord.machineId,
      EquipmentId: singleRecord.equipmentId,
      TimeTaken: singleRecord.timeTaken,
      OwnHired: singleRecord.ownHired,
      EleckWh: singleRecord.eleckWh,
      DriverLabour: singleRecord.operatorLabour,
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
    this.adminService.post('Irrigation', model).subscribe((data) => {
      this.TableData = data;
      this.initializeForm();

    },
      error => {
        console.log("error occured")
      })

  }

  removeItem(Id) {
    this.adminService.delete('Irrigation', Id).subscribe((data) => {
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
