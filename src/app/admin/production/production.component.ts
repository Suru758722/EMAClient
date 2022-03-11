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
  cropList: any[] = []
  take: number = 1
  moreExist: boolean = false
  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.initializeForm()
  }

  initializeForm() {
    this.detailForm = this.fb.group({
      Id: [0],
      CropId: [''],
      FarmerId: ['', Validators.required],
      GrainProduction: [null, Validators.required],
      StrawProduction: [null, Validators.required],
      Price: [null, Validators.required],

    })
  }
  ngOnInit() {
    this.adminService.getAll('Production?take='+ this.take).subscribe((data : any) => {
      this.TableData = data.list;
      this.moreExist = data.exist
    })
    this.adminService.getAll('Admin/GetCrop').subscribe((data) => {
      this.cropList = data;
    })
    this.detailForm.controls.CropId.valueChanges.subscribe((data) =>{
      this.adminService.getAll('Farmer/GetFarmerById?Id=0&cropId='+ parseInt(this.detailForm.controls.CropId.value)).subscribe((data) => {
        this.farmerList = data;
      })
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
    this.adminService.post('Production', model).subscribe((data) => {
      this.TableData = data.list;
      this.moreExist = data.exist
      this.initializeForm();

    },
      error => {
        console.log("error occured")
      })

  }

  removeItem(Id) {
    this.adminService.delete('Production', Id).subscribe((data) => {
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
    this.adminService.getAll('Production?take='+ this.take).subscribe((data : any) => {
      this.TableData = data.list;
      this.moreExist = data.exist    
    },
    error => {
      console.log("error occured")
    })
  }

}
