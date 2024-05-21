import { Component, Input, OnInit } from '@angular/core';
import { ConsultasService } from '../../services/consultas.service';
import { Hotel,Binding } from '../../interfaces/hotel.interface';

@Component({
  selector: 'destinos-hotel',
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css'
})
export class HotelComponent implements OnInit {

  constructor(private service:ConsultasService){


  }

  public panelOpenState:boolean = false;

  ngOnInit(): void {
    this.getHoteles();
  }

  public hoteles:Hotel|null=null;
  public hot!:Binding[];
  @Input()
  public idDestino:string=""

  getHoteles():void{
    this.service.getHotelesPorDestino(this.idDestino)
    .subscribe(
      (hot)=>{
        this.hoteles=hot;
        this.hot=hot._bindings;
      }
    )
  }

}
