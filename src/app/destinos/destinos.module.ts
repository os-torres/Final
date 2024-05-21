import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CiudadDestinoComponent } from './pages/ciudad-destino/ciudad-destino.component';
import { DestinosRoutingModule } from './destinos-routing.module';
import { MaterialModule } from '../material/material.module';
import { ButtonModule } from 'primeng/button';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { HotelComponent } from './pages/hotel/hotel.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { CiudadModalComponent } from './components/ciudad-modal/ciudad-modal.component';



@NgModule({
  declarations: [
    CiudadDestinoComponent,
    RestaurantComponent,
    HotelComponent,
    EventosComponent,
    CiudadModalComponent,
  ],
  imports: [
    CommonModule,
    DestinosRoutingModule,
    MaterialModule,
    ButtonModule
  ]
})
export class DestinosModule { }
