import { ErrorComponent } from "@/templates/views/error/error.component";
import { HomeComponent } from "@/templates/views/home/home.component";
import { PokedexFetch } from "@/templates/views/pokedex/pokedex-fetch.component";
import { ResolveData, Route } from "@angular/router";
import { PokedexHttp } from "./templates/views/pokedex/pokedex-http.component";

export const ROUTES: MyRoute[] = [
  createMyRoute("home", "Home", HomeComponent, "Home"),
  createMyRoute("", "Home", HomeComponent),
  createMyRoute("pokedex-fetch", "Pokedex Fetch", PokedexFetch, "Pokedex Fetch Api"),
  createMyRoute("pokedex-http", "Pokedex Http", PokedexHttp, "Pokedex Http Api"),
  createMyRoute("**", "Error", ErrorComponent),
];

export interface MyRoute extends Route {
  show: boolean;
  titleLink?: string | "unused";
}

function createMyRoute(path: string, title: string, component: any, titleLink = "", resolve: ResolveData = {}): MyRoute {
  return {
    path: path,
    title: title,
    titleLink: titleLink,
    component: component,
    show: titleLink.length > 0
  };
}