import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-bildirimtakvimi',
  templateUrl: './bildirimtakvimi.component.html',
  styleUrls: ['./bildirimtakvimi.component.css']
})
export class BildirimtakvimiComponent implements OnInit {


  personelize:any

  
  constructor(private service:DataService) { }

  ngOnInit(): void {
    this.personelize = localStorage.getItem("personelid")?.toString()
    this.donemListele();
  }

  personelDonem:any =[]
  donemListele(){
    this.service.getBildirimDonem(this.personelize).subscribe((resp:any)=>{
      this.personelDonem=resp.data
     
      console.log("DONEM BİLGİLERİ" ,this.personelDonem)
      console.log( "AY BİLGİLERİ", this.personelDonem[0])
    })
  }

  aylikIsler:any=[]
  onSelect(works:any){
   
    this.personelDonem.find((x:any)=> x.aylikListe.isleri===x.works)
    this.aylikIsler=works
    console.log("AYLİK İSLER", this.aylikIsler)
    console.log( "SEÇİLEN BİLDİRİM", this.personelDonem[0].aylikListe ) 
  }

}
