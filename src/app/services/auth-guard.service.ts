import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router:Router, private auth: AuthService, public tost:ToastService) { }

  canActivate():boolean{
    const jwtHelper= new JwtHelperService

    const token  =localStorage.getItem("token");
   
    if (token!=null){
      var status =jwtHelper.isTokenExpired(token);
      
      if(status){

        this.tost.error("Oturum Süreniz Dolmuştur, Lütfen Tekrar Giriş Yapınız!","")
        this.router.navigate(['login']);
        return false;
      }else{
        this.auth.isAuth=true;
        return true;
      }
    }else{
      //this.tost.error("Lütfen Kullanıcı Adı Ve Şifrenizle Oturum Açınız!","")
      this.router.navigate(['login'])
      return false
    }

    
   
  }

 


  
 
}
