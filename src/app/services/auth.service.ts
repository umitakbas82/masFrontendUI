import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs';
import { responseModelDTO } from '../models/responseModelDTO';
import { tokenModelDTO } from '../models/tokenModelDTO';
import { userModelDTO } from '../models/userModelDTO';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //apiUrl="http://192.168.2.125:5000/api/auth/login"
  apiUrl="http://mas.tumas.com.tr/Masapi/api/auth/login"



  public isAuth:boolean=false;
  jwtHelper = new JwtHelperService();
  decotedToken=[];

  constructor(private http:HttpClient, private router:Router, public tost:ToastService) { }


 getToken(user:userModelDTO){
  return this.http.post<responseModelDTO>(this.apiUrl,user).pipe(tap(resp=>{
    var gelen =resp.data as tokenModelDTO;

    if(resp.success){
      localStorage.setItem('username', gelen.username)
      localStorage.setItem('email', gelen.email);
      localStorage.setItem('token', gelen.token);
      localStorage.setItem('personelid',gelen.personelid.toString());
      localStorage.setItem('departmentid',gelen.departmentid.toString());
      localStorage.setItem('roleid',gelen.roleid.toString());
      localStorage.setItem('expTime', gelen.expTime.toLocaleString());
      localStorage.setItem('rolAdi',gelen.rolAdi);
      localStorage.setItem('meslekAdi',gelen.meslekAdi);
      localStorage.setItem('bolumAdi', gelen.bolumAdi);
      this.router.navigate(['main'])
    }
    //console.log(resp)
  }))
 
 }

uname="";
pass="";

 login(){

    
  var dto= new userModelDTO;
  dto.username=this.uname,
  dto.password=this.pass

  this.getToken(dto).subscribe((data:responseModelDTO)=>{

    
    if(data.success){
     
      this.tost.info('Hoş Geldiniz ' +localStorage.getItem("username")?.toString(),'')
      this.router.navigate(['anasayfa'])
    }else{
     this.tost.error('Hatalı Giriş. Lütfen Bilgilerinizi Kontrol Ediniz','login')
     this.router.navigate(['login'])
    }
  },(error)=>{
    this.tost.error('Hata: '+error.message,'Lütfen Bilgilerinizi Kontrol Ediniz')

   
  })
  //console.log(dto ,this.yetkiler )
  

  //this.adminControl();
}


// //  loggedIn(){
// //   console.log('login geldi')
// //   const token=localStorage.getItem("token");
// //   if(token !=null){
// //   return !this.jwtHelper.isTokenExpired(token);
// //   this.router.navigateByUrl("login")
// // }
// //  else
// //    return null;   
// //  }

 logOut(){
  //console.log('çıkış yapıldı')
  this.tost.info('Oturumunuz Sonlanmıştır.',localStorage.getItem("username")?.toString())   

  localStorage.removeItem('token')
  this.router.navigateByUrl("login")
  
    
       
  }


}
