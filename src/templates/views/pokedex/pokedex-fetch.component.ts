import { FetchPokeApiService } from "@/core/services/FetchPokeApi.service";
import { PokedexBase } from "./pokedex-base.component";
import { NotificationService } from "@/core/services/Notification.service";
import { TextToSpeechService } from "@/core/services/TTS.service";
import { Component } from "@angular/core";
import { ConvertUnitMeasure } from "@/core/pipes/ConvertUnitMeasure.pipe";
import { CommonModule } from "@angular/common";
import { Meta } from "@angular/platform-browser";

@Component({
  selector: "view-pokedex-fetch",
  standalone: true, imports: [CommonModule, ConvertUnitMeasure],
  templateUrl: "./pokedex.component.html"
})
export class PokedexFetch extends PokedexBase {
  public constructor(notificationService: NotificationService, pokemonApiService: FetchPokeApiService, ttSService: TextToSpeechService, meta: Meta) {
    super(notificationService, pokemonApiService, ttSService);
    let description = $localize`Explore a comprehensive Pokedex featuring detailed information on a wide range of Pokemon. Discover their names, types, heights, weights, and more. Dive into the world of Pokemon with this interactive Pokedex powered by Angular 17, TypeScript, and Sass.. Created by @tmslpm.`
    meta.updateTag({ name: 'description', content: description });
    meta.updateTag({ name: 'og:description', content: description });
    meta.updateTag({ name: 'og:title', content: $localize`Angular-Pokedex - Pokedex Fetch Page - by @tmslpm` });
  }
}
