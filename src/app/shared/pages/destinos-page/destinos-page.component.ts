import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../../../destinos/services/consultas.service';
import { Destino, FiltrosDestino} from '../../../destinos/interfaces/destinos.interface';
import { Ciudad } from '../../../destinos/interfaces/Ciudad.interface';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Pestania } from '../../../destinos/interfaces/pestania.interface';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-destinos-page',
  templateUrl: './destinos-page.component.html',
  styleUrl:'./destinos-page.component.css'
})
export class DestinosPageComponent implements OnInit {

  public filtroNameCiudad:string="";
  public filtroNameDestino:string="";
  public filtroTipoDestino:string="";

  constructor(private consultasService:ConsultasService){}
  ngOnInit(): void {
    this.getDestinosPorCiudad('','');
    this.getCiudades();
  }


  public destinosObj!:Destino;//los destinos
  public ciudadesObj!:Ciudad;
  public ciudadesNames:string[]=[];
  public placeHolderPadre:string="Ingresar nombre del destino, ciudad o departamento";
  public tipoDestino:string="";
  public getTerm:string=""
  public bandera=false;
  public destAux:string[]=[];

  public getDestinos():void{
    this.consultasService.getDestinos(this.filtroNameCiudad,this.filtroNameDestino,this.filtroTipoDestino).subscribe(
      (destinos)=>{
        this.destinosObj=destinos;
      }
    );
  }

  public getDestinos2():void{
    this.consultasService.getDestinos('','','').subscribe(
      (destinos)=>{
        destinos._bindings.forEach(x=>this.ciudadesNames.push(x.nameDestino));
      }
    );
  }

  public getCiudades():void{
    this.consultasService.getCiudades()
    .subscribe(
      (cities)=>{
        this.ciudadesObj=cities;
        cities._bindings.forEach((city)=>this.ciudadesNames.push(city.nameCity))
      }
    )
  }

  getDestinosPorCiudad(term:string,tipo:string){
    console.log("Termino-->",term,"\nTipo---->",tipo)
    const res=term?term:""
    this.getTerm=res;
    const tipoFin=tipo?tipo:""
    var flag=false;
    this.consultasService.getDestinos(res,'',tipoFin)
    .subscribe(
      (destinos)=>{
        if(this.hasValidContent(destinos)){
          this.destinosObj=destinos
        }else{
          this.getDestinosAux(term,tipo);
        }
      }
    )
  }

  getDestinosAux(term:string,tipo:string){
    console.log("hola")
    const res=term?term:""
    this.getTerm=res;
    const tipoFin=tipo?tipo:""
    this.consultasService.getDestinos('',res,tipoFin)
    .subscribe(
      (destinos)=>{
        destinos._bindings.forEach((destino)=>this.destAux.push(destino.nameDestino));
        this.destinosObj=destinos;
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
