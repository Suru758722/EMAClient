import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {

  detailForm: FormGroup;
  TableData: any[] = []
  farmerList: any[] = [];

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.initializeForm()
  }

  initializeForm() {
    this.detailForm = this.fb.group({
      Id: [0],
      FarmerId: ['', Validators.required],
      GrainProduction: [null, Validators.required],
      StrawProduction: [null, Validators.required],
      Price: [null, Validators.required],

    })
  }
  ngOnInit() {
    this.adminService.getAll('Production').subscribe((data) => {
      this.TableData = data;
      console.log(this.TableData)
    })
    this.adminService.getAll('Farmer').subscribe((data) => {
      this.farmerList = data;
    })
  }

  editData(Id) {
    var singleRecord = this.TableData.find(x => x.id == Id)
    this.detailForm.setValue({
      Id: singleRecord.id,
      FarmerId: singleRecord.farmerid,
      GrainProduction: singleRecord.grainProduction,
      StrawProduction: singleRecord.strawProduction,
      Price: singleRecord.price,

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
    this.adminService.post('Production', model).subscribe((data) => {
      this.TableData = data;
      this.initializeForm();

    },
      error => {
        console.log("error occured")
      })

  }

  removeItem(Id) {
    this.adminService.delete('Production', Id).subscribe((data) => {
      this.TableData = data;
    }, error => {
      console.log("error occured")
    })
  }
  getValue(id, key) {
    if (key == 'farmer' && this.farmerList.length > 0)
      return this.farmerList.find(x => x.id == id).fullName;
  }

}
