import {DestinoViaje} from './destino-viaje.model';
import {BehaviorSubject, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../app.module';

export class DestinosApiClientModel {
  destinos: DestinoViaje[];
  current: Subject <DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

  constructor(private destinosApiClient: DestinosApiClientModel, private store: Store<AppState>) {
    this.destinos = [];
  }

  add(d: DestinoViaje) {
    this.destinos.push(d);
  }

  getAll(): DestinoViaje[] {
  return this.destinos;
  }

  getById(id: string): DestinoViaje {

    return this.destinos.filter(function(d) {
      return d.id.toString() === id; }) [0];
  }

  elegir(d: DestinoViaje){
    this.destinos.forEach(x => x.setSelected(false));
    d.setSelected(true);
    this.current.next(d);
  }

  subscribeOnChange(fn) {
    this.current.subscribe(fn);
  }

}
