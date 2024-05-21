import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultasService } from '../../services/consultas.service';
import { switchMap } from 'rxjs';
import { Binding, Destino } from '../../interfaces/destinos.interface';
import {Restaurante } from '../../interfaces/restaurante.interface';


@Component({
  selector: 'destinos-ciudad-destino',
  templateUrl: './ciudad-destino.component.html',
  styleUrl: './ciudad-destino.component.css'
})
export class CiudadDestinoComponent implements OnInit{

  public destino:Binding|null=null;
  public latitud:number=0;
  public longitud:number=0;


  constructor(private activateRoute:ActivatedRoute,
    private service:ConsultasService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.activateRoute.params
    .pipe(
      switchMap(({id})=>this.service.getDestinosById(id))
    )
    .subscribe((destino)=>{
      if(!destino){
        this.router.navigateByUrl('');
      }else {
        if(destino.location && destino.location.includes("O")){
          destino.location=destino.location.replace("O", "W");
        }
        this.destino = destino;
      }
    }
  )}


  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

}
