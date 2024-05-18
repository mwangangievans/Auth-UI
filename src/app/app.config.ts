import { ApplicationConfig } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from './api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    HttpClient,
    ApiService,
    provideRouter(routes),
    provideClientHydration(),
    BrowserModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
};
