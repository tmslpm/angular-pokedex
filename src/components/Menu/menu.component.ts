import { MyRoute } from '@/routers/app.routes';
import { Component, OnInit } from '@angular/core';
import { ROUTES } from '@/routers/app.routes';
import { NgForOf } from '@angular/common';
import { SwitchThemeButton } from "../SwitchTheme/switch-theme.component";
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'menu-component',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  imports: [NgForOf,
    SwitchThemeButton,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ]
})

export class MenuComponent implements OnInit {

  private _menu: MyRoute[] = [];

  ngOnInit(): void {
    this._menu = [];
    for (let v of ROUTES) {
      if (v.show)
        this._menu.push(v);
    }
  }


  public get menu(): MyRoute[] {
    return this._menu;
  }


}
