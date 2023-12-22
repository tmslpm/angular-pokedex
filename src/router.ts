import { ErrorComponent } from "@/templates/views/error/error.component";
import { HomeComponent } from "@/templates/views/home/home.component";
import { PokedexFetchV2 } from "@/templates/views/pokedex-v2/pokedex-fetch.component";
import { PokedexHttp } from "@/templates/views/pokedex/pokedex-http.component";
import { ResolveData, Route } from "@angular/router";

export const ROUTES: MyRoute[] = [
  createMyRoute("home", "Home", HomeComponent, "Home"),
  createMyRoute("", "Home", HomeComponent),
  createMyRoute("pokedex-v2", "Pokedex V2", PokedexFetchV2, "Pokedex V2"),
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