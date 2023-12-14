import { NgModule } from "@angular/core";
import { Route, Router, RouterModule } from "@angular/router";
import { HomeComponent } from "@/views/home/home.component";
import { ErrorComponent } from "@/views/error/error.component";
import { PokedexFetch } from "@/views/pokedex-fetch/pokedex-fetch.component";
import { PokedexHttp } from "@/views/pokedex-http/pokedex-http.component";

export interface MyRoute extends Route {
    show: boolean,
    titleLink?: string | "unused",
}

export const ROUTES: MyRoute[] = [
    registerRoute("home", "Home", HomeComponent, "Home"),
    registerRoute("", "Home", HomeComponent),
    registerRoute("pokedex-fetch", "Pokedex Fetch", PokedexFetch, "Pokedex Fetch Api"),
    registerRoute("pokedex-http", "Pokedex Http", PokedexHttp, "Pokedex Http Api"),
    registerRoute("**", "Error", ErrorComponent)
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, { enableTracing: false })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {
    constructor(private router: Router) { }

    redirectToSomePage() {
        this.router.navigate(['/some-route']);
    }
}

function registerRoute(path: string, title: string, component: any, titleLink = ""): MyRoute {
    return {
        path: path,
        title: title,
        titleLink: titleLink,
        component: component,
        show: titleLink.length > 0
    }
}