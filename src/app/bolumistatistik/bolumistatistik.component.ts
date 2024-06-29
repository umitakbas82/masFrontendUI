import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-bolumistatistik',
  templateUrl: './bolumistatistik.component.html',
  styleUrls: ['./bolumistatistik.component.css']
})
export class BolumistatistikComponent implements OnInit {

  constructor(private service:DataService, private route:Router) { }

  departmanid:any
  ngOnInit(): void {
    this.departmanid=Number(localStorage.getItem('departmentid'));
    
    this.bolumBilgileri(this.departmanid)
  }
  departman :any=[];
  bolumBilgileri(departmentid:number){
    this.service.getBolumIstatistik(departmentid).subscribe((resp:any)=>{
      this.departman=resp.data
      console.log("DEPATMAN BİLGİLERİ", resp.data)      
    })
    
  }
  yil:any=""
  ay:any=''
  indexId:any
  indexArray:any=[]
  indexBul(ayData:any){
    this.departman.find((x:any)=> x ===x.ayData)
    this.indexId=ayData.ay+ayData.yil
    this.indexArray=ayData.projeListe
    this.ay=ayData.ay
    this.yil=ayData.yil
    console.log("Index No",this.indexId,)
    console.log("Indax Array",this.indexArray)
    
  }

  popopen:any
  onClick(indexId:any){
    
 
     
    const url=this.route.createUrlTree(["/projedetay/"+this.indexId]);
    url.queryParams = this.indexArray;
   
    console.log("Create URL OBJECT",url);

    //  this.popopen= window.open(url.toString(), "mypopup", "resizable=no, toolbar=no,  menubar=no, status=no, directories=no, location=no, width=2000, height=800, left=10 top=100");
    //  this.indexArray
    console.log("POPUP", this.popopen)
    console.log("INDEX" ,indexId )
    console.log("Open")
 }

}
