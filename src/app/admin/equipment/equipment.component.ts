import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  detailsForm: FormGroup;
   TableData: any[] = []
  constructor(private adminService: AdminService,private fb: FormBuilder) { 
    this.initializeForm()
  }

  initializeForm(){
    this.detailsForm = this.fb.group({      
      Id: [0],
      Name: [null,Validators.required],     
      EquipmentType:  [null,Validators.required],
      Size :  [null],
      Capacity :  [null,Validators.required],
      WeightKg:  [null,Validators.required],
      LifeHr:  [null,Validators.required],
      },)
  }
  ngOnInit() {
    this.adminService.getAll('Equipment').subscribe((data) =>{
        this.TableData = data;
        console.log(this.TableData)
    })
  }

  editData(Id){
     var singleRecord = this.TableData.find(x => x.id == Id)
     this.detailsForm.setValue({
      Id: singleRecord.id,
      Name: singleRecord.name,
      EquipmentType: singleRecord.equipmentType,
      Size: singleRecord.size,
      Capacity: singleRecord.capacity,
      WeightKg: singleRecord.weightKG,
      LifeHr: singleRecord.lifeHr
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

    _CharacterOnly(event : any) {
      const charpattern = /^[a-zA-Z]+$/;
      let inputChar = String.fromCharCode(event.charCode);

      if(!charpattern.test(inputChar)){
          event.preventDefault();
      }
    }
    submitForm(model: any){
      
        this.adminService.post('Equipment',model).subscribe((data) =>{
          this.TableData = data;
          this.initializeForm();

      },
      error =>{
        console.log("error occured")
      })
       
        }

        removeItem(Id) {
          this.adminService.delete('Equipment',Id).subscribe((data) =>{
            this.TableData = data;
        },error =>{
          console.log("error occured")
        })
        }


}
