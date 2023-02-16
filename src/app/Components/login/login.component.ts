import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInfo } from 'src/app/Models/iuser';
import { UserApiService } from 'src/app/Services/user-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
isuserlogged:boolean=false;
  loginForm : FormGroup
  message = '';
  UserInfoLog: LoginInfo = {} as LoginInfo;
  constructor(private formbuilder: FormBuilder, private userApiService: UserApiService, private router: Router) { 
    this.loginForm = this.formbuilder.group({
      userName:['',Validators.required],
      password:['',Validators.required],
    }) 
  }

  ngOnInit(): void {
    this.isuserlogged = this.userApiService.isUserLogged; 
  }
  get userName() {
    return this.loginForm.get('userName');
  }
  get password() {
    return this.loginForm.get('password');
  }
  login(){
    
    this.UserInfoLog = this.loginForm.value;
    this.UserInfoLog.rememberMe = true
    this.UserInfoLog.returnUrl=""
    this.userApiService.loginUser(this.UserInfoLog).subscribe({next: (res) => {
      if (res.success==true){
      localStorage.setItem('token',res.data.toekn)

      localStorage.setItem('username',res.data.user.userName);

      console.log(res.data);
      localStorage.setItem('userId',res.data.user.id)

      this.router.navigate(['/'])
    }else{
      this.message=res.message;
    }
    },error : (err)=>{
      console.log(err);
      this.message='Wrong username or password!!'
    }})
  }  
logout(){
 localStorage.removeItem('token')

}

}
