import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Models/iuser';
import { UserApiService } from 'src/app/Services/user-api.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  userFormGroup: FormGroup;
  newUser: IUser = {} as IUser;
  success = false;
  errMessage = ''
  constructor(private formbuilder: FormBuilder, private userApiService: UserApiService, private router: Router) {

    this.newUser = {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: ""
    }
    this.userFormGroup = this.formbuilder.group({
      userName: ['', [Validators.required, Validators.minLength(7)]],
      email: ['', [Validators.required,
      Validators.pattern('^[a-z 0-9]{3,15}(@)(gmail)(.com)|(yahoo)(.com)$')]],
      password: ['', [Validators.required]],
      confirmPassword: ['']
    })
  }

  get userName() {
    return this.userFormGroup.get('userName');
  }
  get email() {
    return this.userFormGroup.get('email');
  }
  get password() {
    return this.userFormGroup.get('password');
  }
  get confirmPassword() {
    return this.userFormGroup.get('confirmPassword');
  }
  ngOnInit(): void {
  }
  saveUser() {
    this.newUser = this.userFormGroup.value;
    this.newUser.role = "Admin"
    this.userApiService.saveUser(this.newUser).subscribe({next:() => {
      this.success = true
     },error : (err) =>{
       if(err.error.code == 11000)
         this.errMessage= 'User already exists!! Try something else.'
       else 
         this.errMessage= 'Something went wrong!!'
     }})
  }
}
