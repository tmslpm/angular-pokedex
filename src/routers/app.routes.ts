import { NgModule } from "@angular/core";
import { Route, Router, RouterModule } from "@angular/router";
import { HomeComponent } from "@/views/home/home.component";
import { ErrorComponent } from "@/views/error/error.component";

export interface MyRoute extends Route {
    show: boolean,
    titleLink?: string | "unused",
}

export const ROUTES: MyRoute[] = [
    registerRoute("pokedex", "Pokedex", HomeComponent, "Pokedex"),
    registerRoute("", "Home", HomeComponent),
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