import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms'
import { ApiService } from './../../../services/api.service'
import { AuthService } from './../../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  })
  isLogin: boolean = false
  errorMessage: string

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isUserLogin()
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.loginForm.value)
    console.log('Your form data : ', this.loginForm.value)

    this.api.postTypeRequest('user/login', this.loginForm.value).subscribe((res: any) => {
      if (res.status) {
        console.log(res)
        this.auth.setDataInLocalStorage('userData', JSON.stringify(res.data))
        this.auth.setDataInLocalStorage('token', res.token)
        this.router.navigate([''])
      } else {
      }
    }, err => {
      this.errorMessage = err['error'].message
    });

  }

  isUserLogin(){
    console.log(this.auth.getUserDetails())

    if(this.auth.getUserDetails() != null){
      this.isLogin = true
    }
  }

  logout(){
    this.auth.clearStorage()
    this.router.navigate(['']);
  }

}
