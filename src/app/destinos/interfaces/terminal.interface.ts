export interface Terminal {
  type:         string;
  vars:         string[];
  _bindings:    Binding[];
  _genbindings: null;
  askAnswer:    null;
  graph:        null;
}

export interface Binding {
  idTerminal:   string;
  nameTerminal: string;
  dirTerminal:  string;
  tipo:         Tipo;
  nameCity:     string;
  idCity:       string;
}

export enum Tipo {
  Terminal = "Terminal",
}
