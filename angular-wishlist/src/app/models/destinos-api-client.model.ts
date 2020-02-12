import {DestinoViaje} from './destino-viaje.model';
import {BehaviorSubject, Subject} from "rxjs";

export class DestinosApiClientModel {
  destinos: DestinoViaje[];
  current: Subject <DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

  constructor() {
    this.destinos = [];
  }

  add(d: DestinoViaje) {
    this.destinos.push(d);
  }

  getAll(): DestinoViaje[] {
  return this.destinos;
  }

  getById(id: String): DestinoViaje {

    return this.destinos.filter(function(d) {
      return d.id.toString() === id; }) [0];
  }

}
