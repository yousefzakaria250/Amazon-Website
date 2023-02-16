import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRegisterComponent } from '../Components/user-register/user-register.component';
import { IUser, LoginInfo } from '../Models/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
isuserloggedsubject:BehaviorSubject<boolean>;
  private httpOptions={};
  constructor(private httpClient: HttpClient) {
    this.isuserloggedsubject = new BehaviorSubject<boolean>(this.isUserLogged);
    this.httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
  }
  
  public loginUser(user: LoginInfo): Observable<any> {
    return this.httpClient.post<any>(`${environment.APIBaseURL}/User/SignIn`, user);
  }
  
  public saveUser(user: IUser): Observable<any> {
    return this.httpClient.post<any>(`${environment.APIBaseURL}/User/SignUpAsViewer`, user);
  }
  get isUserLogged(){
    return (localStorage.getItem('token')) ? true:false 
  }
  get loggedStatus():Observable<boolean>{
   return this.isuserloggedsubject.asObservable();
  }

}
