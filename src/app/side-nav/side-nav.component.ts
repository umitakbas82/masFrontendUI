import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { userModelDTO } from '../models/userModelDTO';
import { yenibildirimModelDTO } from '../models/yenibildirimModelDTO';
import { PersonelComponent } from '../personel/personel.component';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  
  yeniBildirim:yenibildirimModelDTO={
    PersonnelId: 0,
    ProjectId: 0,
    WorkSheetDescription: '',
    saat: 0,
    dakika: 0,
    WorkDate: new Date(),
    Departmentid: 1,
    WorkType: 0
  }
  


  yetki:any
  isAdmin = true;
  isPersonel=true;
  personelize:any;
  dateTime = new Date();

  constructor(public authservice:AuthService, public router:Router, private service: DataService, private spinner: NgxSpinnerService,private tost :ToastService,public listele:PersonelComponent) { }

  ngOnInit(): void {
    this.personelize = localStorage.getItem("personelid")?.toString();
    this.yeniBildirim.PersonnelId = Number(this.personelize);
    this.adminControl();
    this.personelControl();
    this.projeListele()
    this.listele.bildirimListele();
    
  }

  admin:userModelDTO ={
    username: undefined,
    password: undefined
  }

  time = { hour: this.yeniBildirim.saat, minute: this.yeniBildirim.dakika };
  spinners = false
  toggleSpinners() {
    this.spinners = !this.spinners; 
   
  }

  
  adminControl(){ 
   var rol = localStorage.getItem("roleid")
  //console.log("ROLÜ",rol);
    
    if( Number(rol) === 2 ){
      this.isAdmin=true
      
      //console.log("admin geldi",this.isAdmin)
    }else{
      this.isAdmin=false
      
      //console.log("admin değil",this.isAdmin)
    }
    
  }

  personelControl(){
    var rol = localStorage.getItem("roleid")
    if(Number(rol) === 3){
      this.isPersonel=true
    }else{
      this.isPersonel=false
    }

  }

  bildirimGonder=this.yeniBildirim

  bildirimEkle(){
    var saat:number=this.time.hour
  
    this.bildirimGonder.saat=this.time.hour;
    this.bildirimGonder.dakika=this.time.minute
    
    var wt = Number(this.yeniBildirim.WorkType);
    this.yeniBildirim.WorkType = wt;  
    
  
    this.service.addBildirim(this.bildirimGonder).subscribe((resp:any)=>{
      
     console.log(this.bildirimGonder,resp, resp.success)
  
      if(resp.success){
        console.log("tost true");
        this.tost.success('Bildiriminiz Kaydedilmiştir',"");
      }
      else if(!resp.success)
        {
        console.log("tost false")
        this.tost.error('Hata: ' + resp.message, 'Lütfen Bilgilerinizi Kontrol Ediniz')
        }
      else
      {
        //artık yapacak bişey yok
      }      
    })    
    this.listele.bildirimListele();
   }


   projeListesi:any=[]
   bosSecilen: any = [];
   projeListele() {
     this.service.getAllProj().subscribe((resp: any) => {
   
       // this.projeListesi=this.projectList
       this.projeListesi = resp.data
       //console.log("PROJELERİN LİSTESİ", resp, this.projeListesi[0])
     })
   }
   
   projedpChanged() {
    if(this.bosSecilen === null)
    return;
 
     
     this.yeniBildirim.ProjectId = this.bosSecilen.projectId;
   
     
     //console.log("SEÇİLEN PROJE", this.bosSecilen," PROJE ARRAY ALLTINDAKİ VERİ" ,this.bosSecilen.projectName)
   }

   formSUbmitted: boolean=false

   submitForm(form:NgForm){
    this.formSUbmitted=true;
    if(form.valid){
      form.reset()
    }
   }
  

}
