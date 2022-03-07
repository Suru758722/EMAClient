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
  take: number = 1
  moreExist: boolean = false
  cropList: any[] = []
  constructor(private router: Router,private adminService: AdminService, private fb: FormBuilder) {
    this.initilizeForm()
  }

  initilizeForm() {
    this.farmerForm = this.fb.group({
      Id: [0],
      CropId: ['',Validators.required],
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
    this.adminService.getAll('Farmer?take='+this.take).subscribe((data : any) => {
      this.TableData = data.list;
      this.moreExist = data.exist    
    },
    error => {
      console.log("error occured")
    })
    this.adminService.getAll('Admin/GetCrop').subscribe((data) => {
      this.cropList = data;
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
    model.CropId = parseInt(model.CropId)
    this.adminService.post('Farmer', model).subscribe((data) => {
      this.initilizeForm();
      this.TableData = data.list;
      this.moreExist = data.exist
    },
      error => {
        console.log("error occured")
      })

  }

  removeItem(Id) {
    this.adminService.delete('Farmer', Id).subscribe((data) => {
      this.TableData = data.list;
      this.moreExist = data.exist
    }, error => {
      console.log("error occured")
    })
  }
  toDetail(id) {
    this.router.navigate(["admin/farmer-detail"], { queryParams: { id: id } });
  }

  viewMore(key){
    if(key=='front'){
      this.take = this.take + 1;
    }else{
      this.take = this.take - 1;
    }
    this.adminService.getAll('Farmer?take='+ this.take).subscribe((data : any) => {
      this.TableData = data.list;
      this.moreExist = data.exist    
    },
    error => {
      console.log("error occured")
    })
  }
 
}
