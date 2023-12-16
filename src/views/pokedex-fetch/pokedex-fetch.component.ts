import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { PokemonData } from "@/typescript/types/PokemonData";
import { PokemonDataPagination } from "@/typescript/PokemonDataPagination";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./pokedex-fetch.component.html"
})

export class PokedexFetch implements OnInit {
  private readonly _pokemonDataPagination: PokemonDataPagination;
  private _spriteIndex: number;
  private _playAnimation: boolean;

  public constructor() {
    this._pokemonDataPagination = new PokemonDataPagination(9);
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

  public get getCurrentPokemonData(): PokemonData | null {
    return this._pokemonDataPagination.data == null
      ? null
      : this._pokemonDataPagination.data[this._pokemonDataPagination.currentIndex];
  }

  public get getPokemonData(): PokemonData[] {
    return this._pokemonDataPagination.data == null
      ? []
      : this._pokemonDataPagination.data;
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

