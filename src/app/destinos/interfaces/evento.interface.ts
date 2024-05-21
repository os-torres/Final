export interface Evento {
  type:         string;
  vars:         string[];
  _bindings:    Binding[];
  _genbindings: null;
  askAnswer:    null;
  graph:        null;
}

export interface Binding {
  idEvento:     string;
  nameEvento:   string;
  posterEvento: string;
  idDestino:    string;
  nameDestino:  string;
}
