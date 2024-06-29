import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getbildirimModelDTO } from '../models/getbildirimModelDTO';
import { responseModelDTO } from '../models/responseModelDTO';
import { sifreDesgistirModelDTO } from '../models/sifreDegistirModelDTO';
import { topluOnayModelDTO } from '../models/topluOnayModelDTO';
import { yenibildirimModelDTO } from '../models/yenibildirimModelDTO';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //apiUrl="http://192.168.2.125:5000/api/"

  apiUrl="http://mas.tumas.com.tr/Masapi/api/"

  constructor( private http:HttpClient) { }

  getBildirim(personelid:number){
    //console.log("SERVİSE GELEN PERSONEL İD",personelid);
    return this.http.get<responseModelDTO>(this.apiUrl+'bildirim/GetPersonelBildirimleri?personelid='+personelid)
  }
  

  addBildirim(data:yenibildirimModelDTO){  
    
    //console.log("YeniBildirim Objesi",data);  
    return this.http.post<any>(this.apiUrl+'bildirim',data)    
  }

  editBildirim(data:getbildirimModelDTO){
    return this.http.post<getbildirimModelDTO>(this.apiUrl+"bildirim/BildirimGuncelle",data)
  }
  
  getAllProj(){
    return this.http.get<any>(this.apiUrl+'proje/GetAllProjects')
  }

  bildirimOnayla(workid:any,statusid:any){
    return this.http.get<any>(this.apiUrl+"bildirim/BildirimOnayla?workid="+workid+"&statusid="+statusid)//bak bakalım jr niye 0 geliyor :)
  }

  topluOnay(workids:topluOnayModelDTO){
    return this.http.post<any>(this.apiUrl+"bildirim/TopluBildirimGuncelle",workids)   
  }


  postPassw(data:sifreDesgistirModelDTO){
    return this.http.post<any>(this.apiUrl+'auth/ChangePasword',data)
  }

  personelToplam(personelid:number){
    return this.http.get<responseModelDTO>(this.apiUrl+"personel/PersonelToplamSaat?personelid="+personelid)
  }

  peronelHaftalik(personelid:number){
    return this.http.get<responseModelDTO>(this.apiUrl+'personel/PersonelHaftalikCalismaSaati?personelid='+personelid)
  }

  personelAylik(personelid:number){
    return this.http.get<responseModelDTO>(this.apiUrl+'personel/PersonelAylikCalismaSaati?personelid='+personelid)
  }

  bolumBildirimleri(departmentid:number){
    return this.http.get<any>(this.apiUrl+'bildirim/BolumBildirimleri?departmentid='+departmentid)
  }

  departmanBilgileri(departmentid:number){
    return this.http.get<any>(this.apiUrl+'bildirim/BolumPersonelListesi?departmentid='+departmentid)
  }
  getBolumIstatistik(departmentid:number){
    return this.http.get<any>(this.apiUrl+'hesapla/GetBolumIstatistik?departmentid='+departmentid)
  }

  duyurular(){
    return this.http.get<any>(this.apiUrl+'')
  }
  getBildirimDonem(personelid:any){
    return this.http.get<responseModelDTO>(this.apiUrl+"personel/PersonelDoldurmaTakvimi?personelid="+personelid)
  }

}
