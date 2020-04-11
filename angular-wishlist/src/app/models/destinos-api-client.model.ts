import {forwardRef, Inject, Injectable} from '@angular/core';
import {DestinoViaje} from './destino-viaje.model';
import {Store} from '@ngrx/store';
import {APP_CONFIG, AppConfig, AppState} from '../app.module';
import {ElegidoFavoritoAction, NuevoDestinoAction} from './destinos-viajes-state.model';
import {HttpClient, HttpClientModule, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';

@Injectable()
export class DestinosApiClientModel {
  destinos: DestinoViaje[] = [];

  constructor(
    private store: Store<AppState>,
    @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
    private http: HttpClient
    ) {
    this.store
      .select(state => state.destinos)
      .subscribe((data) => {
        console.log('destinos sub store');
        console.log(data);
        this.destinos = data.items;
      });
    this.store
      .subscribe((data) => {
        console.log('all store');
        console.log(data);
      });
  }

  add(d: DestinoViaje) {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', {nuevos: d.nombre},{headers});
    this.http.request(req).subscribe((data: HttpResponse<{}>) => {
      id (data.status === 200){
        this.store.dispatch(new NuevoDestinoAction(d));
      }
    });
  }

  getById(id: string): DestinoViaje {
    return this.destinos.filter(function (d) {return d.id.toString() === id; }) [0];
  }

  getAll(): DestinoViaje[] {
    return this.destinos;
  }

  elegir(d: DestinoViaje) {
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }
}
