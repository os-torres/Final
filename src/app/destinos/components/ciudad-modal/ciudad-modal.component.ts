import { Component, Input, OnInit } from '@angular/core';
import { ConsultasService } from '../../services/consultas.service';
import { Binding, Ciudad } from '../../interfaces/Ciudad.interface';
import { Aeropuerto } from '../../interfaces/aeropueto.interface';
import {Terminal } from '../../interfaces/terminal.interface';

@Component({
  selector: 'destinos-ciudad-modal',
  templateUrl: './ciudad-modal.component.html',
  styleUrl: './ciudad-modal.component.css'
})
export class CiudadModalComponent implements OnInit{

  constructor(private service:ConsultasService){

  }
  ngOnInit(): void {
    this.getCiudadDelDestino();
  }

  @Input()
  public destinoId:string=""
  public ciudades:Ciudad|null=null;
  public city:Binding|null=null;
  public aeropuertos:Aeropuerto|null=null;
  public terminal:Terminal|null=null;

  getCiudadDelDestino(){
    this.service.getCiudadDestino(this.destinoId)
    .subscribe(
      (ciudad)=>{
        if(ciudad._bindings.length>1)return
        this.city=ciudad._bindings[0];
        this.getAeropuertosPorCiudad();
        this.getTerminalesPorCiudad();
      }
    )
  }

  getAeropuertosPorCiudad(){
    this.service.getAeropuertosDestino(this.destinoId)
    .subscribe(
      (aeropuerto)=>{
        this.aeropuertos=aeropuerto;
      }
    )
  }

  getTerminalesPorCiudad(){
    this.service.getTerminalesDestino(this.destinoId)
    .subscribe(
      (terminal)=>{
        this.terminal=terminal;
      }
    )
  }
}
