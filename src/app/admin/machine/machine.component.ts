import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {

  machineForm: FormGroup;
   TableData: any[] = []
   take: number = 1
   moreExist: boolean = false
  constructor(private adminService: AdminService,private fb: FormBuilder) { 
    this.initializeForm()
  }

  initializeForm(){
    this.machineForm = this.fb.group({      
      Id: [0],
      Name: [null,Validators.required],     
      BrandName:  [null,Validators.required],
      ModelId :  [null],
      MachineType:  [null,Validators.required],
      HP :  [null],
      WeightKg:  [null,Validators.required],
      LifeHr:  [null,Validators.required],
      },)
  }
  ngOnInit() {
    this.adminService.getAll('Machine?take='+ this.take).subscribe((data: any) =>{
      this.TableData = data.list;
      this.moreExist = data.exist    
    })
  }

  editData(Id){
     var singleRecord = this.TableData.find(x => x.id == Id)
     this.machineForm.setValue({
      Id: singleRecord.id,
      Name: singleRecord.name,
      BrandName: singleRecord.brandName,
      ModelId: singleRecord.modelId,
      MachineType: singleRecord.machineType,
      HP: singleRecord.hp,
      WeightKg: singleRecord.weightKg,
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
      
        this.adminService.post('Machine',model).subscribe((data) =>{
          this.TableData = data.list;
      this.moreExist = data.exist    
          this.initializeForm();

      },
      error =>{
        console.log("error occured")
      })
       
        }

        removeItem(Id) {
          this.adminService.delete('Machine',Id).subscribe((data) =>{
            this.TableData = data.list;
            this.moreExist = data.exist    
        },error =>{
          console.log("error occured")
        })
        }
        viewMore(key){
          if(key=='front'){
            this.take = this.take + 1;
          }else{
            this.take = this.take - 1;
          }
          this.adminService.getAll('Machine?take='+ this.take).subscribe((data : any) => {
            this.TableData = data.list;
            this.moreExist = data.exist    
          },
          error => {
            console.log("error occured")
          })
        }
}
