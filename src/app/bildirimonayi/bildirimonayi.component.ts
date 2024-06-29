import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { getbildirimModelDTO } from '../models/getbildirimModelDTO';
import { topluOnayModelDTO } from '../models/topluOnayModelDTO';
import { DataService } from '../services/data.service';
import { OpsService } from '../services/ops.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-bildirimonayi',
  templateUrl: './bildirimonayi.component.html',
  styleUrls: ['./bildirimonayi.component.css']
})
export class BildirimonayiComponent implements OnInit {
personelid:any
worksheetid:any

visibility:boolean=false

loading:boolean=false

onaylama:topluOnayModelDTO={
  workids: [],
  statusid: 0
}
  constructor(public spinner:NgxSpinnerService, public service:DataService,private route:ActivatedRoute, public tost:ToastService, public operations:OpsService) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
    this.departmentid=localStorage.getItem("departmentid")
    this.personelize = localStorage.getItem("personelid")?.toString()
    
    this.tumBildirimler(this.departmanBildirimleri);
    
    
  }

  //tablo arama
  searchText: any;
  
  
  
  departmanBildirimleri:any=[];
  departmentid:any;
  personelize:any
  personelBildirimleri:any=[]
  bildirimStatus:any=getbildirimModelDTO
 
  adSoyad:any;
  secilenBildirim: any = []



  tumBildirimler(departmentid:number){
    this.service.bolumBildirimleri(this.departmentid).subscribe((resp:any)=>{
      this.departmanBildirimleri=resp.data
      
    })
  }

  // donenkod = 0;
  // bildirimOnay (worksheetid:any,statusid:any){
  //   this.service.bildirimOnayla(worksheetid,statusid).subscribe((resp:any)=>{
  //     this.donenkod=resp.status
    
  //   //  console.log("RESP STAT", resp.statusid)
  //     if(resp.statusid===3){       
  //       this.tost.success("Bildirim Onaylandı","")
  //      // console.log("IF ONAYLANDI",resp.status)
  //     }else(resp.statusid===4)
  //       //console.log(resp.data.statusid)
  //     this.tost.error("Bildirim Reddedildi","")      
  //    // console.log(resp.statusid)  
  //   })
  //   //console.log(this.donenkod)
  //   this.tumBildirimler(this.departmentid)
  // }

  donenkod = 0;
  bildirimOnayla(worksheetid:any,statusid:any){
    this.service.bildirimOnayla(worksheetid,statusid).subscribe((resp:any)=>{
      this.donenkod=resp.status
      this.tost.info("Bildirim Onaylandı","")
    })
  
    this.tumBildirimler(this.departmanBildirimleri)
  }
  
  bildirimReddet(worksheetid:any,statusid:any){
    this.service.bildirimOnayla(worksheetid,statusid).subscribe((resp:any)=>{
      this.donenkod=resp.status
      this.tost.info("Bildirim Reddedildi","")
    })
    this.tumBildirimler(this.departmanBildirimleri)
  }

  topluBildirimOnay(){
 
    this.onaylama.workids = this.checkBoxitems;
    this.onaylama.statusid = 3
    console.log("onay butonu",this.onaylama )
    this.service.topluOnay(this.onaylama).subscribe((resp:any)=>{
      this.tost.info("Seçilen Bildirimler Onaylanmıştır","")

      //herbişey bittikten sonra 
      this.secilenBildirim=[];
      this.onaylama.workids = [];
      this.onaylama.statusid = 0;
    })
    this.tumBildirimler(this.departmanBildirimleri)
  }
  topluBildirimRed(){
  
    this.onaylama.workids = this.checkBoxitems;
    this.onaylama.statusid = 4
    console.log("red butonu",this.onaylama )
    this.service.topluOnay(this.onaylama).subscribe((resp:any)=>{

      this.tost.info("Seçilen Bildirimler Reddedilmiştir","")


       //herbişey bittikten sonra 
      this.secilenBildirim=[];
      this.onaylama.workids = [];
      this.onaylama.statusid = 0;
      
    })
    this.tumBildirimler(this.departmanBildirimleri)
  }

  
   //CHECKBOX SEÇME - ÇIKARTMA VE EKLEME
   onCheckboxChange(event:any, worksheetid:any){
    if(this.checks){
      if(!event.target.checked)
      {
        if(this.checkBoxitems.length>0)
        {
          var sildir =this.checkBoxitems.indexOf(worksheetid);
          this.checkBoxitems.splice(sildir,1)
     //     console.log("Tek tek kaldırmada liste",this.checkBoxitems)
        }
      }else{
    //    console.log("Buraya Geldi valla");

        this.checkBoxitems.push(worksheetid);
   //     console.log("Tek tek eklemede liste",this.checkBoxitems)

        
      }
    }else{
      if(worksheetid!=undefined){
    
     
        
        let ws = this.secilenBildirim.filter((x:any)=> x ===worksheetid);
        let ind = this.secilenBildirim.findIndex((x:any)=> x===worksheetid);
    //    console.log("Index Of Eleman :",ind);
        if(ind != -1){
          this.secilenBildirim.splice(ind,1)
    //   console.log("BU Listede seçimi kaldırdıktan sonraki hali",this.secilenBildirim);

        }
        else
        {
          this.secilenBildirim.push(worksheetid);
        }
      }
      // else
      // return
    }
 //   console.log("Bu benim List amq:", this.secilenBildirim)

    //console.log("CHCKBX", this.checkBoxitems,this.checks)
  }

  checks = false;
  checkBoxitems:number[] = [];
  //TÜM CHECKBOXLARI SEÇME
  tumBildirimSec(e:any){
  
    if(e.target.checked===true){
      this.checks=true
      console.log(this.checks)
      var temp  = this.departmanBildirimleri.filter(function(x:any) {  
        return x.worksheetid != -1;
      }); 

      for (let index = 0; index < temp.length; index++) {
        const element = temp[index];
        if(element.statusid===1)
          this.checkBoxitems.push(element.worksheetid);
        
      }
    
      
    }else{
      e.target.checked = false;
      console.log("Dururmu :",e.target.checked)
      this.checks=false
      this.checkBoxitems = [];
   

    }
    console.log("TOPLU CHCX", this.checkBoxitems)
  }
  

  spinnerStart(){
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  
  }
 




  

}
