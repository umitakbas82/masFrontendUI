import {  Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BildirimonayiComponent } from './bildirimonayi/bildirimonayi.component';
import { BildirimtakvimiComponent } from './bildirimtakvimi/bildirimtakvimi.component';
import { BolumistatistikComponent } from './bolumistatistik/bolumistatistik.component';
import { DegerlendirmeComponent } from './degerlendirme/degerlendirme.component';
import { LoginComponent } from './login/login.component';
import { PerformansComponent } from './performans/performans.component';
import { PersonelComponent } from './personel/personel.component';
import { PersoneldetayComponent } from './personeldetay/personeldetay.component';
import { ProjedetayComponent } from './projedetay/projedetay.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RoleGuardGuard } from './services/role-guard.guard';
import { YonetimPaneliComponent } from './yonetim-paneli/yonetim-paneli.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'anasayfa',component:PersonelComponent, canActivate:[AuthGuardService,]},
  {path:'bildirimtakvimi',component:BildirimtakvimiComponent, canActivate:[AuthGuardService,]},
  {path:'bolumistatistik',component:BolumistatistikComponent, canActivate:[AuthGuardService,RoleGuardGuard]},
  {path:'projedetay/:indexId',component:ProjedetayComponent, canActivate:[AuthGuardService,RoleGuardGuard]},
  {path:'personeldetay/:personelid',component:PersoneldetayComponent, canActivate:[AuthGuardService,]},
  {path:'degerlendirme',component:DegerlendirmeComponent, canActivate:[AuthGuardService,RoleGuardGuard]},
  {path:'performans/:personelid',component:PerformansComponent, canActivate:[AuthGuardService,RoleGuardGuard]}, 
  {path:'bildirimonayi',component:BildirimonayiComponent, canActivate:[AuthGuardService,RoleGuardGuard]},
  {path:'yonetimpaneli',component:YonetimPaneliComponent, canActivate:[AuthGuardService,RoleGuardGuard]},
  {path:'**',component:LoginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
