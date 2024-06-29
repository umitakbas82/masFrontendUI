import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { PersonelComponent } from './personel/personel.component';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



import { DialogModule } from 'primeng/dialog';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BildirimonayiComponent } from './bildirimonayi/bildirimonayi.component';
import {ToastModule} from 'primeng/toast';
import { AuthInterceptor } from './services/interceptor';
import { MessageService } from 'primeng/api';
import { NgxSpinnerModule } from "ngx-spinner";
import {DropdownModule} from 'primeng/dropdown';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxPrintModule } from 'ngx-print';
import {Ng2SearchPipeModule} from'ng2-search-filter';
import {CalendarModule} from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {InputTextModule} from 'primeng/inputtext';
import { YonetimPaneliComponent } from './yonetim-paneli/yonetim-paneli.component';
import { BildirimtakvimiComponent } from './bildirimtakvimi/bildirimtakvimi.component';
import {ButtonModule} from 'primeng/button';
import { PersoneldetayComponent } from './personeldetay/personeldetay.component';
import { KisikayitComponent } from './kisikayit/kisikayit.component';
import { BolumistatistikComponent } from './bolumistatistik/bolumistatistik.component';
import { ProjedetayComponent } from './projedetay/projedetay.component';
import { DegerlendirmeComponent } from './degerlendirme/degerlendirme.component';
import { PerformansComponent } from './performans/performans.component';










@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    PersonelComponent,

   
   
    LoginComponent,
    NavBarComponent,
    BildirimonayiComponent,
    YonetimPaneliComponent,
    BildirimtakvimiComponent,
    PersoneldetayComponent,
    KisikayitComponent,
    BolumistatistikComponent,
    ProjedetayComponent,
    DegerlendirmeComponent,
    PerformansComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    DialogModule,
    NgbModule,
    NgbTimepickerModule,
    FormsModule,
    NgxSpinnerModule,
    ToastModule,
    DropdownModule,
    SelectDropDownModule,
    NgxPrintModule,
    Ng2SearchPipeModule,
    CalendarModule,
    TableModule,
    MultiSelectModule,
    ContextMenuModule,
    InputTextModule,
    ButtonModule
    
    
    
    
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },PersonelComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
