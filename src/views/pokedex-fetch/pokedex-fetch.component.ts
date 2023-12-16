import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { PokemonData } from "@/core/types/PokemonData";
import { NotificationService } from "@/services/Notification";
import { NativeFetchPokedexApi } from "@/services/NativeFetchPokedexApi";

@Component({
  selector: "app-home", standalone: true, imports: [CommonModule],
  templateUrl: "./pokedex-fetch.component.html"
})
export class PokedexFetch implements OnInit {
  private readonly _pokemonDataPagination: NativeFetchPokedexApi;
  private readonly _notificationService: NotificationService;

  private _spriteIndex: number;
  private _playAnimation: boolean;

  public constructor(notificationService: NotificationService) {
    this._notificationService = notificationService;
    this._pokemonDataPagination = new NativeFetchPokedexApi(9, notificationService);
    this._spriteIndex = 0;
    this._playAnimation = false;
  }

  public ngOnInit(): void {
    // todo idk but why not..: setInterval(() => { this._spriteIndexInverse = this._spriteIndexInverse >= 1 ? 0 : 1; }, 1600)
  }

  public onClickBtnLeftCross(btnName: string) {
    if (!this._playAnimation) {
      this._playAnimation = true;
      setTimeout(() => this._playAnimation = !this._playAnimation, 1200)
    }

    if (this._pokemonDataPagination.hasStartedFetch)
      return;

    switch (btnName) {
      case "top":
        this._spriteIndex = 0;
        this._pokemonDataPagination.previous();
        break;
      case "bot":
        this._spriteIndex = 0;
        this._pokemonDataPagination.next();
        break;
      case "left":
        if (this.getCurrentPokemonData != null)
          this._spriteIndex = this._spriteIndex <= 0 ? (this.getCurrentPokemonData.spritesParsed.length - 1) : this._spriteIndex - 1;
        break;
      case "right":
        if (this.getCurrentPokemonData != null)
          this._spriteIndex = this._spriteIndex >= (this.getCurrentPokemonData.spritesParsed.length - 1) ? 0 : this._spriteIndex + 1;
        break;
    }
  }

  public onClickNoAction() {
    this._notificationService.addInfo("Sorry, this button has no action available..");
  }

  public get getCurrentPokemonData(): PokemonData | null {
    return !this.getPokemonData[this._pokemonDataPagination.currentIndex] ? null : this._pokemonDataPagination.data[this._pokemonDataPagination.currentIndex];
  }

  public get getPokemonData(): PokemonData[] {
    return !this._pokemonDataPagination.data ? [] : this._pokemonDataPagination.data;
  }

  public get getPokemonDataStartIndex(): number {
    return this._pokemonDataPagination.currentIndex;
  }

  public get getPlayAnimation(): boolean {
    return this._playAnimation;
  }

  public getNextSprite(): string {
    return this.getCurrentPokemonData != null
      ? this.getCurrentPokemonData.spritesParsed[this._spriteIndex]
      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAANSURBVBhXY2BgYGAAAAAFAAGKM+MAAAAAAElFTkSuQmCC"
  }

}

