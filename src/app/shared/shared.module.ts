import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DestinosPageComponent } from './pages/destinos-page/destinos-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { EventosPageComponent } from './pages/eventos-page/eventos-page.component';
import { InftransPageComponent } from './pages/inftrans-page/inftrans-page.component';
import { RouterModule } from '@angular/router';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { DestinoCardComponent } from './components/destino-card/destino-card.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PestaniaComponent } from './components/pestania/pestania.component';



@NgModule({
  declarations: [
    SidebarComponent,
    DestinosPageComponent,
    HomePageComponent,
    EventosPageComponent,
    InftransPageComponent,
    SearchBoxComponent,
    DestinoCardComponent,
    PestaniaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    AutoCompleteModule
  ],
  exports:[
    SidebarComponent,
    DestinosPageComponent,
    HomePageComponent,
    EventosPageComponent,
    InftransPageComponent,
  ]
})
export class SharedModule { }
