import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-degerlendirme',
  templateUrl: './degerlendirme.component.html',
  styleUrls: ['./degerlendirme.component.css']
})
export class DegerlendirmeComponent implements OnInit {


  departmanid:any;
  personelize:any;
  constructor( private service:DataService, public router:Router, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.departmanid=Number(localStorage.getItem('departmentid'))
    this.personelize = localStorage.getItem("personelid")?.toString()
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.bolumBilgileri(this.departmanid)
  }

  departman:any=[];
  bolumBilgileri(departmentid:number){
    this.service.departmanBilgileri(departmentid).subscribe((resp:any)=>{
      this.departman=resp.data

      console.log("DEPATMAN BİLGİLERİ", resp.data)
    })
  }

  popopen:any
  onClick(personelid:any){
    const url=this.router.createUrlTree(["performans/"+personelid])
    this.popopen=window.open(url.toString(), "mypopup", "resizable=no, toolbar=no,  menubar=no, status=no, directories=no, location=no, width=2000, height=1000, left=10 top=100");
  }

}
