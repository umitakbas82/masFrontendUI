import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-personeldetay',
  templateUrl: './personeldetay.component.html',
  styleUrls: ['./personeldetay.component.css']
})
export class PersoneldetayComponent implements OnInit {
  personelaize:any  
  departmanid:any
  constructor(private service:DataService, private route:ActivatedRoute,) { }

  ngOnInit(): void {
    this.personelaize = Number(this.route.snapshot.paramMap.get('personelid'));
    this.departmanid=Number(localStorage.getItem('departmentid'))
    
    this.donemListele();
    this.personelBilgi(this.departmanid)
    
  }

  personelDonem:any =[]
  donemListele(){
    this.service.getBildirimDonem(this.personelaize).subscribe((resp:any)=>{
      this.personelDonem=resp.data
     
      //console.log("DONEM BİLGİLERİ" ,this.personelDonem)
      //console.log( "AY BİLGİLERİ", this.personelDonem[0])
    })
  }

  aylikIsler:any=[]
  onSelect(works:any){
   
    this.personelDonem.find((x:any)=> x.aylikListe.isleri===x.works)
    this.aylikIsler=works
    //console.log("AYLİK İSLER", this.aylikIsler)
    //console.log( "SEÇİLEN BİLDİRİM", this.personelDonem[0].aylikListe ) 
  }
  pdata:any=[]
  bilgiler:any=[] 
  personelBilgi(departmanid:number){
    this.service.departmanBilgileri(departmanid).subscribe((resp:any)=>{

      this.bilgiler=resp.data
      let peleman = this.bilgiler.filter((x:any)=> x.personnelid===this.personelaize );
     this.pdata=peleman

      
    

    //console.log("PERSONEL BİLGİLER ARRAY" ,peleman.adSoyad ,"BURASI PDATA" ,this.pdata)
    })
   
  }


}
