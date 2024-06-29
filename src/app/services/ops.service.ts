import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OpsService {
  fileName='mas-tablo.xlsx'

  roleid:any
  isAdmin = false;
  yetkiler!: string[];
  constructor(private router:Router,public authservice:AuthService) { }

  
  
  
  @ViewChild('htmlData') htmlData!: ElementRef;
  
  
  
  exportExcel():void{

    //tablo idsi excel-table olmalı
    let element=document.getElementById('excel-table');
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(element);
    //çaşlışma kitabı ve sayfası oluşturuldu
    const wb:XLSX.WorkBook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    //excele kaydet
    XLSX.writeFile(wb, this.fileName);

    console.log('hah excel indi')

  }

    


 








   openPdf():void{
    let DATA:any=document.getElementById('excel-table');
    html2canvas(DATA).then((canvas)=>{
      let fileWidth=208;
      let fileHeight=(canvas.height*fileWidth)/canvas.width;
      const FILEURI= canvas.toDataURL('image/png');
      let PDF =new jsPDF('p','mm', "a4");
      let position =0;
      PDF.addImage(FILEURI,'PDF',0, position,fileWidth,fileHeight);
      PDF.save('mas-tablo')
    })
  }



  

  

}
