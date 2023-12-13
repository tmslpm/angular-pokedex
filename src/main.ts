import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { ROUTES } from '@/routers/app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(ROUTES, withHashLocation())
  ]
};


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
