import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Pestania } from '../../../destinos/interfaces/pestania.interface';
import { Destino } from '../../../destinos/interfaces/destinos.interface';
import { ConsultasService } from '../../../destinos/services/consultas.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'shared-pestania',
  templateUrl: './pestania.component.html',
  styles: `i {
    font-size: 18px;
    margin-right: 8px;
  }
    .parent404{
      background: url('../../../../assets/astronauta.avif')  no-repeat center center;;
      height: 580px; /* Ajusta la altura según necesites */
      margin: 0 auto;
    }
  `
})
export class PestaniaComponent implements OnInit, OnChanges {

  constructor(private service:ConsultasService){

  }

  @Output()
  public emmit = new EventEmitter<string>();


  @Input()
  public destinosEncontrados?: Destino;

  @Input()
  public term:string="";
  public pestanias: Pestania[] = [];
  private isFirstLoad: boolean = true; // Bandera para evitar emisiones durante la carga inicial

  ngOnInit(): void {
    this.initializePestanias();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['destinosEncontrados'] && !this.isFirstLoad) {
      this.initializePestanias();
    }
    if (this.isFirstLoad) {
      this.isFirstLoad = false;
    }
  }

  public bandera404:boolean=false;

  private initializePestanias(): void {
    this.pestanias = [
      {
        nombre: "Destino",
        icono: "fa-solid fa-globe",
        destinos: this.destinosEncontrados
      },
      {
        nombre: "Playa",
        icono: "fa-solid fa-umbrella-beach",
        destinos: this.destinosEncontrados
      },
      {
        nombre: "Monumento",
        icono: "fa-solid fa-landmark",
        destinos: this.destinosEncontrados
      },
      {
        nombre: "Iglesia",
        icono: "fa-solid fa-church",
        destinos: this.destinosEncontrados
      },
      {
        nombre: "Puente",
        icono: "fa-solid fa-bridge",
        destinos: this.destinosEncontrados
      },
      {
        nombre: "Lago",
        icono: "fa-solid fa-water",
        destinos: this.destinosEncontrados
      }
    ];
  }

  public consultar(tipo: MatTabChangeEvent): void {
    const tipos: string[] = ['', 'Playa', 'Monumento', 'Iglesia', 'Puente','Lago'];
    const bus=tipos[tipo.index];
    var bandera=false;
    this.service.getDestinos(this.term,'',bus)
    .subscribe(
      (destino)=>{
        this.bandera404=destino?true:false;
        this.pestanias.forEach((x)=>{
          if(x.nombre===bus){
            x.destinos=destino;
            bandera=true;
          }
        })
      }
    )
    if(bandera)return
    this.service.getDestinos('',this.term,bus)
    .subscribe(
      (destino)=>{
        this.bandera404=destino?true:false;
        this.pestanias.forEach((x)=>{
          if(x.nombre===bus){
            x.destinos=destino;
            bandera=true;
          }
        })
      }
    )
    bandera=false;
  }

  getDestinosAux(term:string,tipo:string){
    const res=term?term:""
    this.term=res;
    const tipoFin=tipo?tipo:""
    this.service.getDestinos('',res,tipoFin)
    .subscribe(
      (destinos)=>{
        this.pestanias.forEach((x)=>{

        })
         /* destinos._bindings.forEach((destino)=>this.destAux.push(destino.nameDestino));
        this.destinosObj=destinos; */
      }
    )

  }

  public hasValidContent(destino: Destino | null): boolean {
    if (!destino) {
      return false;
    }
    if (Array.isArray(destino._bindings) && destino._bindings.length > 0) {
      return true;
    }
    return false;
  }
}
