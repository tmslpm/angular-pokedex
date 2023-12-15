/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideRouter, withHashLocation } from '@angular/router';
import { ROUTES } from '@/routers/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES, withHashLocation()),
    provideHttpClient(withFetch()),
    { provide: LOCALE_ID, useValue: 'en-US' }
  ]
}).catch((err) => console.error(err));

