import { FetchHttpClientPokedexApi } from "@/services/FetchHttpClientPokedexApi";
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { PokemonData } from "@/core/types/PokemonData";
import { NotificationService } from "@/services/Notification";
import { PokemonBaseComponent } from "./pokedex-base.component";

@Component({
  selector: "app-pokedex-http", standalone: true, imports: [CommonModule],
  templateUrl: "./pokedex.component.html"
})
export class PokedexHttp extends PokemonBaseComponent implements OnInit {
 
  private readonly _httpClientPokedexApi: FetchHttpClientPokedexApi;

  public constructor(httpClientPokedexApi: FetchHttpClientPokedexApi, notificationService: NotificationService) {
    super(notificationService);
    this._httpClientPokedexApi = httpClientPokedexApi;
  }

  public ngOnInit(): void {
    this._httpClientPokedexApi.init();
  }

  public onPokemonPaginationPrevious(): void {
    this._httpClientPokedexApi.previous();
  }

  public onPokemonPaginationNext(): void {
    this._httpClientPokedexApi.next();
  }

  public onPokemonLocationUpdate(): void {
 
  }
  public onPokemonLootUpdate(): void {
   
  }
  
  public get getCurrentPokemonData(): PokemonData | null {
    return !this.getPokemonData[this._httpClientPokedexApi.currentIndex] ? null : this._httpClientPokedexApi.data[this._httpClientPokedexApi.currentIndex];
  }

  public get getPokemonData(): PokemonData[] {
    return !this._httpClientPokedexApi.data ? [] : this._httpClientPokedexApi.data;
  }

  public get getPokemonDataStartIndex(): number {
    return this._httpClientPokedexApi.currentIndex;
  }

  public get hasStartedFetch(): boolean {
    return this._httpClientPokedexApi.hasStartedFetch;
  }
}
