import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { PokemonData } from "@/core/types/PokemonData";
import { NotificationService } from "@/services/Notification"; 
import { PokemonBaseComponent } from "./pokedex-base.component";
import { OldNativeFetchPokedexApi } from "@/services/OldNativeFetchPokedexApi";

@Component({
  selector: "app-home", standalone: true, imports: [CommonModule],
  templateUrl: "./pokedex.component.html"
})
export class PokedexFetch extends PokemonBaseComponent implements OnInit {

  private readonly _pokemonDataPagination: OldNativeFetchPokedexApi;

  public constructor(notificationService: NotificationService) {
    super(notificationService);
    this._pokemonDataPagination = new OldNativeFetchPokedexApi(9, notificationService);
  }

  public ngOnInit(): void {
    // todo idk but why not..: setInterval(() => { this._spriteIndexInverse = this._spriteIndexInverse >= 1 ? 0 : 1; }, 1600)
  }

  public onPokemonPaginationPrevious(): void {
    this._pokemonDataPagination.previous();
  }

  public onPokemonPaginationNext(): void {
    this._pokemonDataPagination.next();
  }

  public onPokemonLocationUpdate(): void {

  }

  public onPokemonLootUpdate(): void {

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

  public get hasStartedFetch(): boolean {
    return this._pokemonDataPagination.hasStartedFetch;
  }
}

