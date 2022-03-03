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
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.token = localStorage.getItem("token")

    this.adminService.getAll('Account/GetAllUser').subscribe((data) =>{
        this.TableData = data;
        console.log(this.TableData)
    })
  }

  changeStatus(Id){
    this.adminService.getAll('Account/ChangeUserStatus?Id='+Id).subscribe((data) =>{
      this.TableData = data;
      console.log(this.TableData)
  })
  }
}
