export interface Hotel {
  type:         string;
  vars:         string[];
  _bindings:    Binding[];
  _genbindings: null;
  askAnswer:    null;
  graph:        null;
}

export interface Binding {
  hotelId:        string;
  hotelName:      string;
  tipoHotel:      string;
  hotelDireccion: string;
  hotelImagen:    string;
  destinoId:      string;
  nameDestino:    string;
}
