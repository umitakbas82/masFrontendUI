import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {

  constructor(private auth:AuthService,public router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let roleid=Number(localStorage.getItem("roleid"))

      if(roleid==2){
        //console.log("ADMIN DETECT")
        //this.router.navigate(['bildirimonayi'])
        return true
       
      }else(roleid==3)
      //console.log("PERSONEL DETECT")
      this.router.navigate(['anasayfa'])
      return false;
     
  }
  
}
