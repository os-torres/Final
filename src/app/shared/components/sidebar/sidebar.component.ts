import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  constructor(){
    this.setActive('btn1');
  }
  ngOnInit(): void {

  }



  activeButton: string | null = null;

  setActive(buttonId: string) {
    this.activeButton = buttonId;
  }
}
