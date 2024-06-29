import { Component, OnInit } from '@angular/core';

import { responseModelDTO } from '../models/responseModelDTO';
import { sifreDesgistirModelDTO } from '../models/sifreDegistirModelDTO';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  username:any;
  personelid:any

  sifre:sifreDesgistirModelDTO={
    PersonnelId: 0,
    oldPassword: '',
    newPassword: ''
  }
  

 
  constructor(public auth:AuthService, public services:DataService,public tost:ToastService) { }

  ngOnInit(): void {


    this.username =localStorage.getItem("username")?.toString();
    this.personelid=localStorage.getItem("personelid")?.toString();
    this.sifre.PersonnelId= Number(this.personelid);
    //console.log(this.personelid)
  }



  
  

   

  yeniPassw(){
    this.services.postPassw(this.sifre).subscribe((resp:any)=>{  
    

      console.log("YENİ ŞİFRE", resp, "PERSONEL ID",this.personelid, "ESKİ SİFRE",this.sifre.oldPassword, "YENİ SİFRE",this.sifre.newPassword)

      if(resp.success){
        this.tost.success("Şifreniz Değiştirilmiştir","")
      }else{
        this.tost.error('Hata: ' + resp.message, 'Lütfen Bilgilerinizi Kontrol Ediniz')
      }
      
    })
  
  }

  
  }
  






 

