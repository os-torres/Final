import { Component, Input, OnInit } from '@angular/core';
import { ConsultasService } from '../../services/consultas.service';
import { Binding, Evento } from '../../interfaces/evento.interface';

@Component({
  selector: 'destinos-eventos',
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent implements OnInit {

  constructor(private service:ConsultasService){}

  public panelOpenState:boolean = false;

  ngOnInit(): void {
    this.getEventos();
  }

  public eventos:Evento|null=null;
  public evento!:Binding[];
  @Input()
  public idDestino:string=""

  getEventos():void{
    this.service.getEventosPorDestino(this.idDestino)
    .subscribe(
      (eve)=>{
        this.eventos=eve;
        this.evento=eve._bindings;
      }
    )
  }

}
