import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DestinosApiClientModel} from '../../models/destinos-api-client.model';
import {DestinoViaje} from '../../models/destino-viaje.model';

class DestinosApiClientViejo {
  getById(id: string): DestinoViaje {
    console.log('llamado por la clase vieja!');
    return null;
  }
}

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [DestinosApiClientModel, {provide: DestinosApiClientViejo, useExisting: DestinosApiClientModel}]
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje;

  constructor(private route: ActivatedRoute, private destinoApiCliente: DestinosApiClientViejo) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = null;
  }

}
