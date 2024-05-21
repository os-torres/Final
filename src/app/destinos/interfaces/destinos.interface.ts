export interface Destino {
  type:         string;
  vars:         string[];
  _bindings:    Binding[];
  _genbindings: null;
  askAnswer:    null;
  graph:        null;
}

export interface Binding {
  idDestino:   string;
  nameDestino: string;
  location?:    string;
  visitantes?:  string;
  alturaLocation?:string;
  tipoDestino: string;
  imagenDestino:string;
  idCity:      string;
  nameCity:    string;

}

export interface FiltrosDestino{
  filterNameCity:string,
  filterNameDestino:string,
  filterTipoDestino:string
}
