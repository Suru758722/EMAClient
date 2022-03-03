import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  token: string = null
  userId: string = null
  role: string = null
  constructor() { }

  ngOnInit() {
    this.token = localStorage.getItem("token")
    if (this.token != null) {
      let decodedJWT = JSON.parse(window.atob(this.token.split('.')[1]));
      this.userId = decodedJWT.userId;
      this.role = decodedJWT.role;

    }
  }

}
