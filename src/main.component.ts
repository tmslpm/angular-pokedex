import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MenuComponent } from "@/components/Menu/menu.component";
import { FooterComponent } from "@/components/Footer/footer.component";
import { NotificationComponent } from "./components/Notification/notification.component";

@Component({
  selector: "app-root", standalone: true,
  template: `
    <div class="wrapperBodyContent">
      <menu-component class="wrapperMenu"></menu-component>
      <main class="col-12 padding1">
        <router-outlet > </router-outlet> 
      </main> 
      <footer-component></footer-component>
      <notification-component></notification-component>
    </div>
  `,
  styles: `
    .wrapperMenu {
      z-index: 9999;
    }
  `,
  imports: [RouterOutlet, MenuComponent, FooterComponent, NotificationComponent]
})
export class MainComponent { }
