import { LangDetails } from "@/core/types/LangDetails";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "btn-switch-lang", standalone: true, imports: [CommonModule],
  templateUrl: "./switch-lang.component.html", styleUrl: "./switch-lang.component.scss"
})
export class LangSwitchComponent {
  private static LANGs: LangDetails[] = [
    { locale: "en-US", name: "English" },
    { locale: "fr-FR", name: "French" }
  ];

  private readonly _currentLang: LangDetails;

  public constructor() {
    this._currentLang = LangSwitchComponent.LANGs.find(v => window.location.pathname.includes(v.locale)) || LangSwitchComponent.LANGs[0];
  }

  public get langs(): LangDetails[] {
    return LangSwitchComponent.LANGs;
  }

  public get currentLang(): LangDetails {
    return this._currentLang
  }

  public get currentLocationHash(): string {
    return window.location.hash
  }
}

