/// <reference types="@angular/localize" />

import { bootstrapApplication } from "@angular/platform-browser";
import { MainComponent } from "@/main.component";
import { provideRouter, withHashLocation } from "@angular/router";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { LOCALE_ID } from "@angular/core";
import { HomeComponent } from "@/views/home/home.component";
import { ErrorComponent } from "@/views/error/error.component";
import { PokedexFetch } from "@/views/pokedex/pokedex-fetch.component";
import { PokedexHttp } from "@/views/pokedex/pokedex-http.component";
import { MyRoute } from "@/core/types/MyRoute";
import { PokedexFetchV2 } from "./views/pokedex-v2/pokedex-fetch.component";

export const ROUTES: MyRoute[] = [];
registerRoute("home", "Home", HomeComponent, "Home");
registerRoute("", "Home", HomeComponent);
registerRoute("pokedex-v2", "Pokedex V2", PokedexFetchV2, "Pokedex V2");
registerRoute("pokedex-fetch", "Pokedex Fetch", PokedexFetch, "Pokedex Fetch Api");
registerRoute("pokedex-http", "Pokedex Http", PokedexHttp, "Pokedex Http Api");
registerRoute("**", "Error", ErrorComponent);

bootstrapApplication(MainComponent, {
  providers: [
    provideRouter(ROUTES, withHashLocation()),
    provideHttpClient(withFetch()),
    { provide: LOCALE_ID, useValue: "en-US" }
  ]
}).catch((err) => console.error(err));

function registerRoute(path: string, title: string, component: any, titleLink = ""): void {
  ROUTES.push({
    path: path,
    title: title,
    titleLink: titleLink,
    component: component,
    show: titleLink.length > 0
  });
}
