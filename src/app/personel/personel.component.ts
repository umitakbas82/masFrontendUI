import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { NgxSpinnerService } from 'ngx-spinner';
import { duyuruModelDTO } from '../models/duyuruModelDTO';

import { getbildirimModelDTO } from '../models/getbildirimModelDTO';
import { getprojelerModelDTO } from '../models/getprojelerModelDTO';
import { responseModelDTO } from '../models/responseModelDTO';

import { yenibildirimModelDTO } from '../models/yenibildirimModelDTO';
import { DataService } from '../services/data.service';
import { OpsService } from '../services/ops.service';
import { ToastService } from '../services/toast.service';



@Component({
  selector: 'app-personel',
  templateUrl: './personel.component.html',
  styleUrls: ['./personel.component.css'],
  providers: []
})
export class PersonelComponent implements OnInit {

  projeId = []


  //YENİ BİLDİRİM MODELİ
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


  ///BİLDİRİM LİSTESİ MODELİ

  bildirimListesi:getbildirimModelDTO={
    worksheetid: 0,
    personelid: -1,
    projectId: 0,
    projeNo: '',
    status: '',
    statusid: 0,
    workDescription: '',
    workDate: '',
    workHour: 0,
    workMinute: 0,
    createdtime: '',
    updatedTime: '',
    projeName: '',
    workType: 0,
    //adSoyad: ''
  }

 

  ///PROJE LİSTESİ MODELİ

  projeList:getprojelerModelDTO={
    projectId: 0,
    projectStatusId: 0,
    projectTypeId: 0,
    projectCustomer: '',
    projectName: '',
    projectDescription: '',
    isActive: true,
    isDelete: false,
    createDate: '',
    updateDate: ''
  }

  personelize:any;
  bildirimId:any;
  bolumAdi:any;
  meslekAdi:any;
  rolAdi:any;


  duyuru:duyuruModelDTO={
    title: '',
    description: '',
    createdTime: new Date(),
  }

  
  dateTime = new Date();

  constructor(public operations: OpsService, private spinner: NgxSpinnerService, private service: DataService, public tost: ToastService, private route: ActivatedRoute) {
    this.dateTime.setDate(this.dateTime.getDate() );    
   }





  ngOnInit(): void {
    this.personelize = localStorage.getItem("personelid")?.toString()
    this.bolumAdi=localStorage.getItem('bolumAdi');
    this.meslekAdi=localStorage.getItem('meslekAdi');
    this.rolAdi=localStorage.getItem('rolAdi')

    //console.log("XXX--->" ,this.personelize)
    this.yeniBildirim.PersonnelId = Number(this.personelize);
    
    // this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 1000);

    this.bildirimListele();
    this.projeListele();
    this.toplamSaat(this.personelize);
    this.haftalikSaat(this.personelize);
    this.aylikSaat(this.personelize);
    //this.duyuruGonder();

  //console.log("STATUS ID", )
   //this.getpersonelId=this.personelid
   
  
  }

  time = { hour: this.yeniBildirim.saat, minute: this.yeniBildirim.dakika };
  spinners = false
  toggleSpinners() {
    this.spinners = !this.spinners;

  
   
  }




  //ANA OPERASYONLAR//


 //BİLDİRİM YAP


bildirimGonder=this.yeniBildirim

 bildirimEkle(){
  var saat:number=this.time.hour

  this.bildirimGonder.saat=this.time.hour;
  this.bildirimGonder.dakika=this.time.minute
  
  var wt = Number(this.yeniBildirim.WorkType);
  this.yeniBildirim.WorkType = wt;  
  

  this.service.addBildirim(this.bildirimGonder).subscribe((resp:any)=>{

   //console.log(resp, resp.success)

    if(resp.success){
      //console.log("tost true");
      this.tost.success('Bildiriminiz Kaydedilmiştir',"");
    }
    else if(!resp.success)
      {
      //console.log("tost false")
      this.tost.error('Hata: ' + resp.message, 'Lütfen Bilgilerinizi Kontrol Ediniz')
      }
    else
    {
      //artık yapacak bişey yok
    }

    
  })
  
  setTimeout(()=>{
    window.location.reload();
  }, 600);;

  this.bildirimListele();
 }

 //TÜM BİLDİRİMLERİ LİSTELE

 //getpersonelId:any
 getallBildirim: any = [];
 bildirimListele(){
  console.log("BİLDİRİMDEKİ PersonelID",this.personelize);
this.service.getBildirim(this.personelize).subscribe((resp:any)=>{

  this.getallBildirim=resp.data

  console.log("PERSONELİN BİLDİRİMLERİ", resp, )
})


 }


 bildirimUpdate: getbildirimModelDTO = new getbildirimModelDTO
 updatedata = this.bildirimUpdate

 ///GÜNCELLEMEYİ MODALA ÇEK

updateBildirim(bildirimUpdate:any){
  //console.log("GÜNCELLEME İSTEĞİ MODALA GELDİ")
  
  this.updatedata = bildirimUpdate;
  this.bildirimUpdate = this.bildirimListesi
  //this.bildirimUpdate.workDescription = this.getbildirim.workDescription

  //console.log("GÜNCELLEME MODALI", bildirimUpdate, this.bildirimUpdate.workDescription)
}

////GÜNCELLENEN BİLDİRİMİ GÖNDER

bildirimGuncelle() {
  //console.log("GÜNCELLEME İSTEĞİ", this.updatedata)
  this.updatedata.workHour = this.time.hour;
  this.updatedata.workMinute = this.time.minute;
  var wt = Number(this.bildirimListesi.workType);
  this.bildirimListesi.workType = wt; 

  this.service.editBildirim(this.updatedata).subscribe((resp: any) => {

 //   this.updatedata.projeid = this.bosSecilen.projectId;

 if(resp.success=true){
  this.tost.success('Güncelleme Başarılı',"")
 }else{
  this.tost.error('HATA: ' + resp.message, 'Lütfen Bilgilerinizi Kontrol Ediniz')
 }

    //console.log("GÜNCELLENEN VERİ", resp)

  })

  setTimeout(()=>{
    window.location.reload();
  }, 600);;

  this.bildirimListele();
}
///PROJELERİ LİSTELE VE SEÇ

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
  //console.log("BOM BOŞ SEÇİLEN Projeid",this.bosSecilen.projectId)
  
  this.yeniBildirim.ProjectId = this.bosSecilen.projectId;

  // this.bosSecilen.data
  // this.bosSecilen.projeId
 // console.log("SEÇİLEN PROJE", this.bosSecilen," PROJE ARRAY ALLTINDAKİ VERİ" ,this.bosSecilen.projectName)
}

updatedpChanged(){
  this.updatedata.projeName = this.bosSecilen.projectName;
  this.updatedata.projectId = this.bosSecilen.projectId;
}


///PERSONEL ÇALIŞMA SAATLERİ

toplamCalisma:any=[]
toplamSaat(perosnelid:number){
  this.service.personelToplam(this.personelize).subscribe((resp:any)=>{
    this.toplamCalisma=resp;

    //console.log("PERSONEL TOPLAM SAAT",resp, this.toplamCalisma.data)

  })
}

haftalikCalisma:any=[]
haftalikSaat(perosnelid:number){
  this.service.peronelHaftalik(this.personelize).subscribe((resp:any)=>{
    this.haftalikCalisma=resp;
   // console.log("PERONEL HAFTALIK SAAT", resp)
  })
}

aylikCalisma:any=[]
aylikSaat(perosnelid:number){
  this.service.personelAylik(this.personelize).subscribe((resp:any)=>{
    this.aylikCalisma=resp;
    //console.log("PERSONEL AYLIK SAAT", resp)
  })
}


// duyuruGonder(){
//   this.service.duyurular().subscribe((resp:any)=>{
//     this.duyuru=resp
//   })
// }


  ////YARDIMCI OPERASYONLAR/////


  
  ///tablo arama
  searchText: any;


  //dropdown arama

  DropConfig = {
    displayKey: "projectName", // if objects array passed which key to be displayed defaults to description
    search: true,
    searchPlaceholder: 'Ara', // limitTo: 3
    placeholder: 'Seçiniz',
    height: '250px',
    noResultsFound: 'Kayıt Bulunamadı!'

   
  };
  searchChange($event: any) {
    //console.log($event)
  }


  ///anasayfa counterler
  haftalikprojectCount: number = 0;

  aylikCount: number = 0;



  projectcountstop: any = setInterval(() => {
    this.haftalikprojectCount++;
    //we need to stop this at  particular point; will use if condition
    if (this.haftalikprojectCount == 200) {
      //clearinterval will stop tha function
      clearInterval(this.projectcountstop);
    }

  }, 1) //10 is milisecond you can control it

  clientcountstop: any = setInterval(() => {
    this.aylikCount++;
    if (this.aylikCount ===Number(this.toplamCalisma.data) ) {

      clearInterval(this.clientcountstop);
      //console.log(this.toplamCalisma.data)
    }
  }, 1)

  



}
