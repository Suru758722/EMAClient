import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginForm: FormGroup;
  signUpForm: FormGroup;
  errorMessage: string = null
  token: string = null
  userCreatd: string = null
  constructor(private router: Router, private fb: FormBuilder, private adminService: AdminService) { }

  ngOnInit() {
    this.initilizeForm()
    this.token = localStorage.getItem("token")

  }

  initilizeForm() {
    this.loginForm = this.fb.group({
      Email: [null, Validators.required],
      Password: [null, Validators.required],
    })

    this.signUpForm = this.fb.group({
      FullName: [null, Validators.required],
      Email: [null, Validators.required],
      Password: [null, Validators.required],
      ConfirmPassword: [null, Validators.required]
    })
  }
  submitForm(model: any, key) {

    if (key == 'login') {
      this.adminService.post('Account/Login', model).subscribe((data) => {

        localStorage.setItem("token", data.value)
        this.token = localStorage.getItem("token")
        this.errorMessage = null
        this.initilizeForm();
        window.location.reload()
      },
        error => {
          this.errorMessage = error.error;
        })
    }
    else {
      this.adminService.post('Account/Register', model).subscribe((data) => {
        this.userCreatd = "Account Registered! Please Login!"
        this.errorMessage = null
        this.initilizeForm();

      },
        error => {
          this.errorMessage = error.error;
        }
      )
    }
  }

  initilizeMessage() {
    this.errorMessage = null;
    this.userCreatd = null
    this.initilizeForm();
  }
  logOut() {
      this.token = null
      localStorage.removeItem('token');
      window.location.reload()

  }
  toComponent(){
    this.router.navigate(['/admin/dashboard']);
  }
 
}
