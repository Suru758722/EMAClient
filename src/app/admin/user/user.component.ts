import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  TableData: any[] = []
  token: string = null
  take: number = 1
  moreExist: boolean = false
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.token = localStorage.getItem("token")

    this.adminService.getAll('Account/GetAllUser?take='+ this.take).subscribe((data : any) =>{
      this.TableData = data.list;
      this.moreExist = data.exist    
    })
  }

  changeStatus(Id){
    this.adminService.getAll('Account/ChangeUserStatus?Id='+Id+"&take="+this.take).subscribe((data : any) =>{
      this.TableData = data.list;
      this.moreExist = data.exist 
  })
  }

  viewMore(key){
    if(key=='front'){
      this.take = this.take + 1;
    }else{
      this.take = this.take - 1;
    }
    this.adminService.getAll('Account/GetAllUser?take='+ this.take).subscribe((data : any) => {
      this.TableData = data.list;
      this.moreExist = data.exist    
    },
    error => {
      console.log("error occured")
    })
  }
}
