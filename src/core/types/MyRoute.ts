import { Route } from "@angular/router";

export interface MyRoute extends Route {
  show: boolean;
  titleLink?: string | "unused";
}
