import { Component, OnInit } from '@angular/core'
import { Validators, FormBuilder } from '@angular/forms'
import { ApiService } from './../../../services/api.service'
import { AuthService } from './../../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    username: ["", Validators.required],
    email: ["", Validators.required],
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
    console.log('Your form data : ', this.registerForm.value)
    this.api.postTypeRequest('user/register', this.registerForm.value).subscribe((res: any) => {
      if (res.status) {
        console.log(res)
        this.auth.setDataInLocalStorage('userData', JSON.stringify(res.data))
        this.auth.setDataInLocalStorage('token', res.token)
        this.router.navigate(['login'])
      } else {
        console.log(res)
        alert(res.msg)
      }
    }, err => {
      this.errorMessage = err['error'].message
    })
  }

  isUserLogin(){
    console.log(this.auth.getUserDetails())

    if(this.auth.getUserDetails() != null){
      this.isLogin = true
    }
  }

  logout(){
    this.auth.clearStorage()
    this.router.navigate([''])
  }

}
