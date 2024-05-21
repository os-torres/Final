import { Component, Input, OnInit } from '@angular/core';
import { Binding, Restaurante } from '../../interfaces/restaurante.interface';
import { ConsultasService } from '../../services/consultas.service';

@Component({
  selector: 'destinos-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent implements OnInit {

  public restaurantes:Restaurante|null=null;
  public rest!:Binding[];
  @Input()
  public idDestino:string=""


  constructor(private service:ConsultasService){}
  ngOnInit(): void {
    this.getRestaurantes();
  }

  public panelOpenState:boolean = false;

  getRestaurantes():void{
    this.service.getRestaurantesPorDestino(this.idDestino)
    .subscribe(
      (rest)=>{
        this.restaurantes=rest;
        this.rest=rest._bindings;
      }
    )
  }
}
