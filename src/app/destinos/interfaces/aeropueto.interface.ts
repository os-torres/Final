export interface Aeropuerto {
  type:         string;
  vars:         string[];
  _bindings:    Binding[];
  _genbindings: null;
  askAnswer:    null;
  graph:        null;
}

export interface Binding {
  idAirport:   string;
  nameAirport: string;
  iataCode:    string;
  icaoCode:    string;
  dirAirport:  string;
  nameCity:    string;
  idCity:      string;
}
