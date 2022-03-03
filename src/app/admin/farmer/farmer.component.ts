import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css']
})
export class FarmerComponent implements OnInit {
  token: string = null
  userId: string = null
  role: string = null
  farmerForm: FormGroup;
  TableData: any[] = []
  
  constructor(private router: Router,private adminService: AdminService, private fb: FormBuilder) {
    this.initilizeForm()
  }

  initilizeForm() {
    this.farmerForm = this.fb.group({
      Id: [0],
      CreatedBy: [''],
      FullName: [null, Validators.required],
      LandHolding: [null, Validators.required],
      Address: [null, Validators.required],
      Phone: [null],
    })
  }

  ngOnInit() {
    this.token = localStorage.getItem("token")
    if (this.token != null) {
      let decodedJWT = JSON.parse(window.atob(this.token.split('.')[1]));
      this.userId = decodedJWT.userId;
      this.role = decodedJWT.role;
    }
    this.adminService.getAll('Farmer').subscribe((data) => {
      this.TableData = data;
      console.log(this.TableData)
    })
  }

  editData(Id) {
    var singleRecord = this.TableData.find(x => x.id == Id)
    this.farmerForm.setValue({
      Id: singleRecord.id,
      FullName: singleRecord.fullName,
      Address: singleRecord.address,
      Phone: singleRecord.phone,
      CreatedBy: singleRecord.createdBy,
      LandHolding: singleRecord.landHolding
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
    model.CreatedBy = this.userId
    this.adminService.post('Farmer', model).subscribe((data) => {
      this.initilizeForm();
      this.TableData = data;
    },
      error => {
        console.log("error occured")
      })

  }

  removeItem(Id) {
    this.adminService.delete('Farmer', Id).subscribe((data) => {
      this.TableData = data;
    }, error => {
      console.log("error occured")
    })
  }
  toDetail(id) {
    this.router.navigate(["admin/farmer-detail"], { queryParams: { id: id } });
  }

 
}
