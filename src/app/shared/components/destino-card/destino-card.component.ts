import { Component, Input, OnInit } from '@angular/core';
import { Pestania } from '../../../destinos/interfaces/pestania.interface';
import { Binding, Destino } from '../../../destinos/interfaces/destinos.interface';
@Component({
  selector: 'shared-destino-card',
  templateUrl: './destino-card.component.html',
  styleUrl: './destino-card.component.css'
})
export class DestinoCardComponent implements OnInit{
  ngOnInit(): void {
  }


  @Input()
  public destino?:Destino;

}
