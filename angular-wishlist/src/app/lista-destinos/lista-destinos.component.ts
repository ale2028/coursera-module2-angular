// @ts-ignore
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DestinoViaje} from '../models/destino-viaje.model';
// @ts-ignore
import {DestinosApiClient} from '../models/destinos-api-client.model';
import {DestinosApiService} from "../models/destinos-api.service";
// @ts-ignore
@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;

  constructor(private destinosApiClient: DestinosApiService) {
    this.onItemAdded = new EventEmitter();
  }

  ngOnInit() {
  }

  agregado(d: DestinoViaje) {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(e: DestinoViaje) {
    this.destinosApiClient.getAll().forEach(x => x.setSelected(false));
    e.setSelected(true);
  }
}
