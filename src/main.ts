/// <reference types="@angular/localize" /> 
import { bootstrapApplication } from "@angular/platform-browser";
import { MainComponent } from "@/templates/main.component";
import { provideRouter, withHashLocation } from "@angular/router";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { LOCALE_ID } from "@angular/core";
import { ROUTES } from "./router"; 

bootstrapApplication(MainComponent, {
  providers: [
    provideRouter(ROUTES, withHashLocation()),
    provideHttpClient(withFetch()),
    { provide: LOCALE_ID, useValue: "en-US" }
  ]
}).catch((err) => console.error(err)); 
