import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MenuComponent } from "@/components/Menu/menu.component";
import { FooterComponent } from "@/components/Footer/footer.component";

@Component({
  selector: "app-root",
  standalone: true,
  template: `
    <div class="wrapperBodyContent">
      <menu-component></menu-component>
      <main class="col-12 padding1">
        <router-outlet > </router-outlet> 
      </main> 
      <footer-component></footer-component>
    </div>
  `,
  imports: [RouterOutlet, MenuComponent, FooterComponent]
})

export class MainComponent { }
