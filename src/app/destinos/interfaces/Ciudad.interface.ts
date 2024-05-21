export interface Ciudad {
  type:         string;
  vars:         string[];
  _bindings:    Binding[];
  _genbindings: null;
  askAnswer:    null;
  graph:        null;
}

export interface Binding {
  idCiudad: string;
  nameCity: string;
  imagen?:   string;
  postalCode?:number;
}
