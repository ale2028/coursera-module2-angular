import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DestinosApiClientModel} from '../models/destinos-api-client.model';
import {DestinoViaje} from '../models/destino-viaje.model';

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css']
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje;

  constructor(private route: ActivatedRoute, private destinoApiCliente: DestinosApiClientModel) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = null;
  }

}
