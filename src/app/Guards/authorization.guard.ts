import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserApiService } from '../Services/user-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private userapiservice:UserApiService,private router:Router ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
if (this.userapiservice.isUserLogged) {
return true; 
}else{
  alert("Please Login First");
  this.router.navigate(['/login']);
return false;

}
  }
  
}
