import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-fertilizer',
  templateUrl: './fertilizer.component.html',
  styleUrls: ['./fertilizer.component.css']
})
export class FertilizerComponent implements OnInit {

 
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
      Labourer: [null, Validators.required],
      Capacity: [null, Validators.required],
      NoOfPass: [null, Validators.required],
      Material1: [null, Validators.required], 
      Material2: [null],
      Material3: [null],
      Material4: [null],
      QtyKgPHa1: [null, Validators.required],
      QtyKgPHa2: [null],
      QtyKgPHa3: [null],
      QtyKgPHa4: [null],
    })
  }
  ngOnInit() {
    this.adminService.getAll('Fertilizer').subscribe((data) => {
      this.TableData = data;
      console.log(this.TableData)
    })
    this.adminService.getAll('Farmer').subscribe((data) => {
      this.farmerList = data;
    })
    
  }

  editData(Id) {
    var singleRecord = this.TableData.find(x => x.id == Id)
    this.detailsForm.setValue({
      Id: singleRecord.id,
      FarmerId: singleRecord.farmerid,
      Labourer: singleRecord.labourer,
      Capacity: singleRecord.capacity,
      NoOfPass: singleRecord.noOfPass,
      Material1: singleRecord.material1,
      Material2: singleRecord.material2,
      Material3: singleRecord.material3,
      Material4: singleRecord.material4,
      QtyKgPHa1: singleRecord.qtyKgPHa1,
      QtyKgPHa2: singleRecord.qtyKgPHa2,
      QtyKgPHa3: singleRecord.qtyKgPHa3,
      QtyKgPHa4: singleRecord.qtyKgPHa4,

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
    this.adminService.post('Fertilizer', model).subscribe((data) => {
      this.TableData = data;
      this.initializeForm();

    },
      error => {
        console.log("error occured")
      })

  }

  removeItem(Id) {
    this.adminService.delete('Fertilizer', Id).subscribe((data) => {
      this.TableData = data;
    }, error => {
      console.log("error occured")
    })
  }
  getValue(id,key){
    if(key == 'farmer' && this.farmerList.length > 0)
    return this.farmerList.find(x => x.id == id).fullName;
    
  }

}
