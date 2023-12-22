import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MenuComponent } from "@/templates/components/Menu/menu.component";
import { FooterComponent } from "@/templates/components/Footer/footer.component";
import { NotificationComponent } from "./components/Notification/notification.component";

@Component({
  selector: "app-root",
  standalone: true,
  template: `
    <div class="wrapperBodyContent">
      <menu-component></menu-component>
      <main class="col-12 padding1">
        <router-outlet> </router-outlet> 
      </main> 
      <footer-component></footer-component>
      <notification-component></notification-component>
    </div>
  `,
  imports: [RouterOutlet, MenuComponent, FooterComponent, NotificationComponent]
})
export class MainComponent { }
