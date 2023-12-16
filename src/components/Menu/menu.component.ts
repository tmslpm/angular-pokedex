 
import { Component, OnInit } from "@angular/core"; 
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { SwitchThemeButton } from "@/components/SwitchTheme/switch-theme.component";
import { LangSwitchComponent } from "@/components/SwitchLang/switch-lang.component";
import { MyRoute, ROUTES } from "@/main";

@Component({
    selector: "menu-component",
    standalone: true,
    templateUrl: "./menu.component.html",
    styleUrl: "./menu.component.scss",
    imports: [
        SwitchThemeButton,
        CommonModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        LangSwitchComponent
    ]
})

export class MenuComponent implements OnInit {
  private _expand: boolean = false;
  private _menu: MyRoute[] = [];

  public ngOnInit(): void {
    this._menu = [];
    for (let v of ROUTES) {
      if (v.show)
        this._menu.push(v);
    }
  }

  public onExpandMenu(onlyIfOpened = false): void {
    this._expand = !this._expand;
  }

  public get menu(): MyRoute[] {
    return this._menu;
  }


  public get expand(): boolean {
    return this._expand;
  }

}
