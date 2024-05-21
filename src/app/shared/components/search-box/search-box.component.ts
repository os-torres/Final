import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConsultasService } from '../../../destinos/services/consultas.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @Input()
  public terminos:string[]=[]; //CAMBIAR ESTO POR STRING
  @Input()
  public placeholder:string="";

  @Output()
  public emit=new EventEmitter<string>();

  public selectedTerm:string="";

  public filteredTerms:string[]=[];


  filterTerm(event: AutoCompleteCompleteEvent) {
    let filtered: string[] = [];
    let query = event.query;
    for (let i = 0; i < (this.terminos.length); i++) {
        let ciudad:string = (this.terminos as string[])[i];
        if (ciudad && ciudad.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(ciudad);
        }
    }
    this.filteredTerms = filtered;
  }

  public emmitValue(){
    this.emit.emit(this.selectedTerm);
  }
}
