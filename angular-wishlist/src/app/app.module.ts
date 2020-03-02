// @ts-ignore
import { BrowserModule } from '@angular/platform-browser';
// @ts-ignore
import { NgModule } from '@angular/core';
// @ts-ignore
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule as NgRxStoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';
import {DestinosApiClientModel} from './models/destinos-api-client.model';
import {
  DestinosViajesEffects,
  DestinosViajesStateModel,
  initializeDestinosViajesStateModel,
  reducerDestinosViajes
} from './models/destinos-viajes-state.model';
import {ActionReducerMap} from '@ngrx/store';
// @ts-ignore
import { LoginComponent } from './app/components/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import {UsuarioLogueadoGuard} from './guards/usuario-logueado/usuario-logueado.guard';
import {AuthService} from './services/auth.service';
import { VuelosComponentComponent } from './components/vuelos/vuelos-component/vuelos-component.component';
import { VuelosMainComponentComponent } from './components/vuelos/vuelos-main-component/vuelos-main-component.component';
import { VuelosMasInfoComponentComponent } from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component.component';
import { VuelosDetalleComponentComponent } from './components/vuelos/vuelos-detalle-component/vuelos-detalle-component.component';
import { ReservasModule } from './reservas/reservas.module';

export const childrenRoutesVuelos: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: VuelosMainComponentComponent},
  {path: 'mas-info', component: VuelosMasInfoComponentComponent},
  {path: ':id', component: VuelosDetalleComponentComponent}
];

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: ListaDestinosComponent},
  {path: 'destino/:id', component: DestinoDetalleComponent},
  {path: 'login', component: LoginComponent},
  {path: 'protected', component: ProtectedComponent, canActivate: [UsuarioLogueadoGuard]},
  {path: 'vuelos', component: VuelosComponentComponent, canActivate: [UsuarioLogueadoGuard], children: childrenRoutesVuelos}
];

// redux init
export interface AppState {
  destinos: DestinosViajesStateModel;
}

const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes
};

const reducersInitialState = {
  destinos: initializeDestinosViajesStateModel()
};
// redux fin init

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponentComponent,
    VuelosMainComponentComponent,
    VuelosMasInfoComponentComponent,
    VuelosDetalleComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    NgRxStoreModule.forRoot(reducers, {initialState: reducersInitialState}),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument(),
    ReservasModule
  ],
  providers: [
    AuthService,
    UsuarioLogueadoGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
