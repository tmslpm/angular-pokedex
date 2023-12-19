import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NamedAPIResourceList, PokedexParsed, PokemonData } from "@/core/types/PokemonData";
import { NotificationService } from "@/services/Notification";
import { NativeFetchPokedexApi } from "@/views/pokedex-v2/NativeFetchPokedexApi";
import { TTS } from "@/core/module/TTS";
import { LangSwitchComponent } from "@/components/SwitchLang/switch-lang.component";

@Component({
  selector: "view-pokedex-v2", standalone: true, imports: [CommonModule],
  templateUrl: "./pokedex.component.html"
})
export class PokedexFetchV2 implements OnInit {
  private static readonly TRANSPARENT_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAANSURBVBhXY2BgYGAAAAAFAAGKM+MAAAAAAElFTkSuQmCC";
  private static readonly SCREEN_STATES = { INFO: 0, LOCATION: 1, LOOT: 2, SPELL: 3, POKEDEX_LIST: 4, POKEDEX: 5 };

  private readonly _notificationService: NotificationService;
  private readonly _pokemonApiService: NativeFetchPokedexApi;
  private readonly _TTS: TTS;

  private readonly _maxItemDisplayedLeftScreen: number;
  private _currentLeftScreenStates: number;
  private _currentLeftScreenSelectorIdx: number;
  private _currentRightScreenStates: number;

  private _currentSpriteIndex: number;
  private _hasAnimationPlayed: boolean;

  public constructor(notificationService: NotificationService, pokemonApiService: NativeFetchPokedexApi) {
    this._notificationService = notificationService;
    this._pokemonApiService = pokemonApiService;
    this._TTS = new TTS(LangSwitchComponent.getCurrentLang().locale);

    // left screen
    this._maxItemDisplayedLeftScreen = 9;
    this._currentLeftScreenStates = PokedexFetchV2.SCREEN_STATES.POKEDEX_LIST;
    this._currentLeftScreenSelectorIdx = 0;

    // right screen
    this._currentRightScreenStates = PokedexFetchV2.SCREEN_STATES.POKEDEX_LIST;

    // left bottom screen
    this._currentSpriteIndex = 0;

    // led animation
    this._hasAnimationPlayed = false;
  }

  public ngOnInit(): void {
    console.log("enable");
 

  }

  // E v e n t

  public onClickBtnLeftCross(btnName: string): void {
    this.onPlayLedAnimation(); 
    // if (this.hasStartedFetch) return; 
    switch (btnName) {
      case "top":
        this._currentSpriteIndex = 0;
        this.onPreviousLeftListSelector();
        break;
      case "bot":
        this._currentSpriteIndex = 0;
        this.onNextLeftListSelector();
        break;
      case "left":
        if (this.getCurrentPokemonData != null)
          this._currentSpriteIndex = this._currentSpriteIndex <= 0 ? (this.getCurrentPokemonData.spritesParsed.length - 1) : this._currentSpriteIndex - 1;
        break;
      case "right":
        if (this.getCurrentPokemonData != null)
          this._currentSpriteIndex = this._currentSpriteIndex >= (this.getCurrentPokemonData.spritesParsed.length - 1) ? 0 : this._currentSpriteIndex + 1;
        break;
    }

    if (this._TTS.enabled) {
      this._TTS.speak(this.getPokedex.localName);
    }

  }

  public onClickBtnRight(screenStates: number): void {
    this.onPlayLedAnimation();
    this._currentRightScreenStates = screenStates;
  }

  public onPlayLedAnimation(): void {
    if (this._hasAnimationPlayed) return;
    this._hasAnimationPlayed = true;
    setTimeout(() => this._hasAnimationPlayed = !this._hasAnimationPlayed, 1200)
  }

  public onClickNoAction(): void {
    this._notificationService.addInfo("Sorry, this button has no action available..");
  }

  private onNextLeftListSelector() {
    if (this._currentLeftScreenSelectorIdx >= (this.getPokedexList.length - 1))
      return;

    this._currentLeftScreenSelectorIdx++;
  }

  private onPreviousLeftListSelector() {
    if (this._currentLeftScreenSelectorIdx <= 0)
      return;

    this._currentLeftScreenSelectorIdx--;
  }

  // G e t t e r

  public get getPokedex(): PokedexParsed {
    return this._pokemonApiService.getPokedex(this._currentLeftScreenSelectorIdx);
  }

  public get getPokedexList(): PokedexParsed[] {
    return this._pokemonApiService.currentPokedexList;
  }

  public get getNextSprite(): string {
    return this.getCurrentPokemonData != null ? this.getCurrentPokemonData.spritesParsed[this._currentSpriteIndex] : PokedexFetchV2.TRANSPARENT_IMAGE
  }

  public get getCurrentRightScreenStates(): number {
    return this._currentRightScreenStates;
  }

  public get getCurrentLeftScreenStates(): number {
    return this._currentLeftScreenStates;
  }

  public get getCurrentSelectorIndex(): number {
    return this._currentLeftScreenSelectorIdx;
  }

  public get getCurrentStartIndex(): number {
    return this._currentLeftScreenSelectorIdx - (this._currentLeftScreenSelectorIdx % this._maxItemDisplayedLeftScreen)
  }

  public get hasAnimationPlayed(): boolean {
    return this._hasAnimationPlayed;
  }

  public get getScreenStates() {
    return PokedexFetchV2.SCREEN_STATES;
  }



  //////////////////////////////////////// O L D =  G E T T E R

  public get getCurrentPokemonData(): PokemonData | null {
    return null;
    //return !this.getPokemonData[this._pokemonDataPagination.currentIndex] ? null : this._pokemonDataPagination.data[this._pokemonDataPagination.currentIndex];
  }

  public get getPokemonData(): PokemonData[] {
    return []
    //return !this._pokemonDataPagination.data ? [] : this._pokemonDataPagination.data;
  }

  public get getPokemonLocation(): string {
    return "???";
  }

}

