import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor( private messagesrv:MessageService) { }

  success(message:string|undefined,title: string |undefined){
    this.messagesrv.add({severity:'success', summary:title,detail:message})
  }
  error(message:string|undefined,title: string |undefined){
    this.messagesrv.add({severity:'error', summary:title,detail:message})
  }
   warning(message:string|undefined,title: string |undefined){
    this.messagesrv.add({severity:'warning', summary:title,detail:message})
   }
  info(message:string|undefined,title: string |undefined){
    this.messagesrv.add({severity:'info', summary:title,detail:message})
  }

}
