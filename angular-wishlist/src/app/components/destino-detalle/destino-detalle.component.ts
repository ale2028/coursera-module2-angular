import {Component, Inject, InjectionToken, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DestinosApiClientModel} from '../../models/destinos-api-client.model';
import {DestinoViaje} from '../../models/destino-viaje.model';
import {AppState} from '../../app.module';
import {Store} from '@ngrx/store';

class DestinosApiClientViejo {
  getById(id: string): DestinoViaje {
    console.log('llamado por la clase vieja!');
    return null;
  }
}

interface AppConfig {
  apiEndpoint: string;
}

const APP_CONIFG_VALUE: AppConfig = {
  apiEndpoint: 'mi_api.com'
};

const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

class DesinosApliClientDecorated extends DestinosApiClientModel {
  constructor(@Inject(APP_CONFIG) private config: AppConfig, store: Store<AppState>) {
    // @ts-ignore
    super(store);
  }
  getById(id: string): DestinoViaje {
    console.log('llamado por la clase decorada!');
    console.log('config: ' + this.config.apiEndpoint);
    return super.getById(id);
  }
}

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [
    {provide: APP_CONFIG, useValue: APP_CONIFG_VALUE},
    {provide: DestinosApiClientModel, useClass: DesinosApliClientDecorated},
    {provide: DestinosApiClientViejo, useExisting: DestinosApiClientModel}
  ]
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje;

  constructor(private route: ActivatedRoute, private destinosApiClientModel: DestinosApiClientViejo) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // @ts-ignore
    this.destino = this.destinoApiClient.getById();
  }

}
