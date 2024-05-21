import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CiudadDestinoComponent } from './pages/ciudad-destino/ciudad-destino.component';
import { DestinosPageComponent } from '../shared/pages/destinos-page/destinos-page.component';

const routes:Routes=[
  {
    path:'',
    component:DestinosPageComponent
  },
  {
    path:'by/:id',
    component:CiudadDestinoComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DestinosRoutingModule { }
