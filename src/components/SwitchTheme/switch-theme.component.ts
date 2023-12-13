import { KEY_STORE } from '@/typescript/module/EKeyStore';
import { WebStore } from '@/typescript/module/WebStore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'btn-switch-theme',
  standalone: true,
  imports: [],
  templateUrl: './switch-theme.component.html'
})

export class SwitchThemeButton implements OnInit {

  private _isDark: boolean = false;

  public constructor() {
    this.init();
  }

  public ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this._isDark = WebStore.getItemInLocalStorage(KEY_STORE.DARK_THEME, "false") === "true";
    document.documentElement.setAttribute("data-theme", this._isDark ? "dark" : "light");
  }

  public onSwitchTheme(): void {
    console.warn("test", this._isDark)
    this._isDark = !this._isDark;
    document.documentElement.setAttribute("data-theme", this._isDark ? "dark" : "light");
    WebStore.setItemInLocalStorage(KEY_STORE.DARK_THEME, this._isDark ? "true" : "false");

  }

  public get isDark(): boolean {
    return this._isDark;
  }


}
