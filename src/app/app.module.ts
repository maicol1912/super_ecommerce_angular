import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthModule} from "./auth/auth.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {AppMetaReducers, AppReducers} from "./state";
import {EffectsModule} from "@ngrx/effects";
import {Effects} from "./state/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {CryptoLibrary} from "./helpers/crypto.library";
import { provideQueryClientOptions } from '@ngneat/query';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialModule,
    AuthModule,
    DashboardModule,
    HttpClientModule,
    StoreModule.forRoot(AppReducers, { metaReducers: AppMetaReducers }),
    EffectsModule.forRoot([
      ...Effects,
    ]),
    StoreDevtoolsModule.instrument({
      name: 'DIGIZONE',
      logOnly: true
    }),
  ],
  exports:[
    MaterialModule
  ],
  providers: [
    CryptoLibrary,
    { provide: LOCALE_ID, useValue: "es-CO" },
    provideQueryClientOptions({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
        },
      },
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
