import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BolumistatistikComponent } from '../bolumistatistik/bolumistatistik.component';
import { DataService } from '../services/data.service';
import { OpsService } from '../services/ops.service';

@Component({
  selector: 'app-projedetay',
  templateUrl: './projedetay.component.html',
  styleUrls: ['./projedetay.component.css']
})
export class ProjedetayComponent implements OnInit {
  @Input()indexArraylar:any=[]

  constructor(private service:DataService,public operations:OpsService, public koyariz:BolumistatistikComponent,private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

}
