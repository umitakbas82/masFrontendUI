import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-performans',
  templateUrl: './performans.component.html',
  styleUrls: ['./performans.component.css']
})
export class PerformansComponent implements OnInit {

  constructor(private service:DataService, private route:ActivatedRoute) { }

  personelaize:any;
  departmanid:any;
  ngOnInit(): void {
    this.personelaize = Number(this.route.snapshot.paramMap.get('personelid'));
    this.departmanid=Number(localStorage.getItem('departmentid'))
    this.personelBilgi(this.departmanid)
  }



  pdata:any=[]
  bilgiler:any=[] 
  personelBilgi(departmanid:number){
    this.service.departmanBilgileri(departmanid).subscribe((resp:any)=>{

      this.bilgiler=resp.data
      let peleman = this.bilgiler.filter((x:any)=> x.personnelid===this.personelaize );
     this.pdata=peleman

      
    

    console.log("PERSONEL BİLGİLER ARRAY" ,peleman.adSoyad ,"BURASI PDATA" ,this.pdata,)
    })
   
  }
}
