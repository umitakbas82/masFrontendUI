import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { departmanModelDTO } from '../models/departmanModelDTO';
import { DataService } from '../services/data.service';
import { OpsService } from '../services/ops.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-yonetim-paneli',
  templateUrl: './yonetim-paneli.component.html',
  styleUrls: ['./yonetim-paneli.component.css']
})
export class YonetimPaneliComponent implements OnInit {


  // departman:departmanModelDTO={
  //   personnelid: 0,
  //   adSoyad: '',
  //   toplamBildirim: 0,
  //   onaylananbildirimSayisi: 0,
  //   bekleyenBildirimSayisi: 0,
  //   reddedilenBildirimSayisi: 0
  // }

  personelize:any
  departmanid:any
  departman =[];
  constructor(private service:DataService, public tost:ToastService, public spinner:NgxSpinnerService, public operations:OpsService,public route: Router) { }

  
  
  ngOnInit(): void {
    this.departmanid=Number(localStorage.getItem('departmentid'))
    this.personelize = localStorage.getItem("personelid")?.toString()
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.bölümBilgileri(this.departmanid)
  }

  bölümBilgileri(departmentid:number){
    this.service.departmanBilgileri(departmentid).subscribe((resp:any)=>{
      this.departman=resp.data

      console.log("DEPATMAN BİLGİLERİ", resp.data)
    })
  }


  
  popopen:any
   onClick(personelid:any){
    
 
     
     const url=this.route.createUrlTree(["/personeldetay/"+personelid])
     console.log()
      this.popopen= window.open(url.toString(), "mypopup", "resizable=no, toolbar=no,  menubar=no, status=no, directories=no, location=no, width=2000, height=800, left=10 top=100");
      
    //  console.log("POPUP", this.popopen)
    //  console.log("PERSONEL ID" ,personelid)
    //  console.log("Open")
   }
  
 
    
  

}
