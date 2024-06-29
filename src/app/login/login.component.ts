import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ToastService } from '../services/toast.service';


import { responseModelDTO } from '../models/responseModelDTO';
import { userModelDTO } from '../models/userModelDTO';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isAdmin = true;
  isPersonel=true;
  yetkiler!: string[];


  uname="";
  pass="";

  constructor(public router:Router, public service:AuthService, public tost:ToastService) { localStorage.clear(); }

  ngOnInit(): void {
    this.adminControl();
    
  }

  login(){

    
    var dto= new userModelDTO;
    dto.username=this.uname,
    dto.password=this.pass

    this.service.getToken(dto).subscribe((data:responseModelDTO)=>{

      
      if(data.success){
       
        this.tost.info('Hoş Geldiniz ' +localStorage.getItem("username")?.toString(),'')
        this.adminControl();
        //this.router.navigate(['anasayfa'])
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

  adminControl(){ 
    var rol = localStorage.getItem("roleid")
   //console.log("ROLÜ",rol);
     
     if( Number(rol) === 2 ){
       this.isAdmin=true
       this.router.navigate(['bolumistatistik'])
       //console.log(" ADMIN",this.isAdmin)
     }else{
       this.isAdmin=false
       this.router.navigate(['anasayfa'])
       //console.log("admin değil",this.isAdmin)
     }
     
   }
 

  
  

}
