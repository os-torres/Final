import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { EventosPageComponent } from './shared/pages/eventos-page/eventos-page.component';
import { InftransPageComponent } from './shared/pages/inftrans-page/inftrans-page.component';
import { DestinosPageComponent } from './shared/pages/destinos-page/destinos-page.component';

const routes: Routes = [
  {
    path:'',//DESTINOS
    loadChildren: ()=>import('./destinos/destinos-routing.module').then(m=>m.DestinosRoutingModule),
  },
  {
    path:'eventos',
    component:EventosPageComponent
  },
  {
    path:'transporte',
    component:InftransPageComponent
  },
  {
    path:'**',
    redirectTo:''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
