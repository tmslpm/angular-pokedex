import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MenuComponent } from "@/templates/components/Menu/menu.component";
import { FooterComponent } from "@/templates/components/Footer/footer.component";
import { NotificationComponent } from "./components/Notification/notification.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: `./main.component.html`,
  imports: [RouterOutlet, MenuComponent, FooterComponent, NotificationComponent]
})
export class MainComponent { }
