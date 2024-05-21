export interface Restaurante {
  type:         string;
  vars:         string[];
  _bindings:    Binding[];
  _genbindings: null;
  askAnswer:    null;
  graph:        null;
}

export interface Binding {
  idRestaurant:   string;
  typeFood:       string;
  nameRestaurant: string;
  sitioWebRest:   string;
  direccionRest:  string;
  imagen:         string;
  destinoId:      string;
  nameDestino:    string;
}
