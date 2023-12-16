import { FetchHttpClientPokedexApi } from "@/services/FetchHttpClient";
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { PokemonData } from "@/typescript/types/PokemonData";

@Component({
  selector: "app-pokedex-http",
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: "./pokedex-http.component.html"
})

export class PokedexHttp implements OnInit {
  private _spriteIndex: number;
  private _playAnimation: boolean;
  private readonly _httpClientPokedexApi: FetchHttpClientPokedexApi;

  public constructor(httpClientPokedexApi: FetchHttpClientPokedexApi) {
    this._playAnimation = false;
    this._spriteIndex = 0;
    this._httpClientPokedexApi = httpClientPokedexApi;
  }

  public ngOnInit(): void {
    this._httpClientPokedexApi.init();
  }

  public onClickBtnLeftCross(btnName: string) {
    if (!this._playAnimation) {
      this._playAnimation = true;
      setTimeout(() => this._playAnimation = !this._playAnimation, 1200)
    }

    switch (btnName) {
      case "top":
        this._spriteIndex = 0;
        this._httpClientPokedexApi.previous();
        break;
      case "bot":
        this._spriteIndex = 0;
        this._httpClientPokedexApi.next();
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

  public get getCurrentPokemonData(): PokemonData | null {
    return this._httpClientPokedexApi.data[this._httpClientPokedexApi.currentIndex] == null
      ? null
      : this._httpClientPokedexApi.data[this._httpClientPokedexApi.currentIndex];
  }

  public get getPokemonData(): PokemonData[] {
    return this._httpClientPokedexApi.data == null
      ? []
      : this._httpClientPokedexApi.data;
  }

  public get getPokemonDataStartIndex(): number {
    return this._httpClientPokedexApi.currentIndex;
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
