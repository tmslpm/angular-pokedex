import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { PokedexParsed, PokemonSpeciesParsed } from "@/core/base/PokeApi";
import { NotificationService } from "@/core/services/Notification.service";
import { FetchPokeApiService } from "@/core/services/FetchPokeApi.service";
import { TTSService } from "@/core/services/TTS.service";
import { Subscription } from "rxjs";

@Component({
  selector: "view-pokedex-v2", standalone: true, imports: [CommonModule],
  templateUrl: "./pokedex.component.html"
})
export class PokedexFetchV2 implements OnInit, OnDestroy, OnChanges {
  private static readonly TRANSPARENT_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAANSURBVBhXY2BgYGAAAAAFAAGKM+MAAAAAAElFTkSuQmCC";
  public static readonly SCREEN_STATES = { INFO: 0, LOCATION: 1, LOOT: 2, SPELL: 3 };
  private readonly _notificationService: NotificationService;

  private _subscriptions: Subscription[];

  private readonly _pokemonApiService: FetchPokeApiService;
  private _pokedexList: PokedexParsed[];
  private _pokemonListByPokedexId: { [key: string]: PokemonSpeciesParsed[] };

  private readonly _TTSService: TTSService;
  private _hasAnimationTTSPlayed: boolean;

  private readonly _screenPokemonList: ScreenList;
  private readonly _screenPokedexList: ScreenList;
  private _currScreenList: ScreenList;

  private _currSpriteIndex: number;
  private _hasAnimationLedPlayed: boolean;

  public constructor(notificationService: NotificationService, pokemonApiService: FetchPokeApiService, TTSService: TTSService) {
    this._subscriptions = [];

    this._notificationService = notificationService;
    this._TTSService = TTSService;
    this._pokemonApiService = pokemonApiService;
    this._pokedexList = [];
    this._pokemonListByPokedexId = {};

    this._screenPokemonList = new ScreenList(9);
    this._screenPokedexList = new ScreenList(9);
    this._currScreenList = this._screenPokedexList;
    this._currSpriteIndex = 0;

    this._hasAnimationLedPlayed = false;
    this._hasAnimationTTSPlayed = false;
  }

  // E v e n t: L i f e C y c l e

  public ngOnInit(): void {
    this._subscriptions = [
      this._pokemonApiService.getObsPokedexList.subscribe(v => this._pokedexList = v),
      this._pokemonApiService.getObsPokemonListByPokedexId.subscribe(v => this._pokemonListByPokedexId = v),
      this._TTSService.getObsSpeak.subscribe(v => this._hasAnimationTTSPlayed = v)
    ];
  }

  public ngOnDestroy() {
    this._subscriptions.forEach(v => v.unsubscribe());
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.error("missing on change =>", changes);
  }

  // E v e n t: UI

  public onClickBtnLeftCross(btnName: string): void {
    this.onPlayLedAnimation();
    switch (btnName) {
      case "top":
        this._currSpriteIndex = 0;
        this._currScreenList.onPrevious();
        break;
      case "bot":
        this._currSpriteIndex = 0;
        this._currScreenList.onNext(this.getCurrScreenList == this.getScreenPokemonList ? this.getSelectedPokemonList.length : this.getPokedexList.length);
        break;
      case "left":
        //if (this.getPokemon != null) this._currSpriteIndex = this._currSpriteIndex <= 0 ? (this.getPokemon.spritesParsed.length - 1) : this._currSpriteIndex - 1;
        break;
      case "right":
        //if (this.getPokemon != null) this._currSpriteIndex = this._currSpriteIndex >= (this.getPokemon.spritesParsed.length - 1) ? 0 : this._currSpriteIndex + 1;
        break;
    }
  }

  public onClickBtnTTS(rightScreenInformationText: HTMLElement) {
    if (!this._TTSService.enabled)
      return;
    if (!this._TTSService.speaks(rightScreenInformationText.querySelectorAll("p")))
      this._notificationService.addWarn("Aie! No text was found...");
  }

  public onClickBtnRight(screenStates: number): void {
    this.onPlayLedAnimation();
    this._screenPokemonList.setScreenState = screenStates;
  }

  public onChangeScreenList(screenList: ScreenList): void {
    this._currScreenList = screenList;
    if (screenList == this._screenPokemonList) // /!\ because need pokedex cursor (selection) /!\
      this._currScreenList.onResetSelector();
  }

  public onPlayLedAnimation(): void {
    if (this._hasAnimationLedPlayed) return;
    this._hasAnimationLedPlayed = true;
    setTimeout(() => this._hasAnimationLedPlayed = false, 1200);
  }

  // G e t t e r

  public get getPokedexList(): PokedexParsed[] {
    return this._pokedexList;
  }

  public get getSelectedPokedex(): PokedexParsed | null {
    let tryGetPokedex = this._pokedexList[this._screenPokedexList.getSelectorIndex];
    return tryGetPokedex ? tryGetPokedex : null;
  }

  public get getSelectedPokemon(): PokemonSpeciesParsed | null {
    let tryGetPokemon = this.getSelectedPokemonList[this._screenPokemonList.getSelectorIndex];
    return tryGetPokemon ? tryGetPokemon : null;
  }

  public get getSelectedPokemonList(): PokemonSpeciesParsed[] {
    if (this.getSelectedPokedex) {
      if (!this._pokemonListByPokedexId[this.getSelectedPokedex.id])
        this._pokemonApiService.fetchPokemonList(this.getSelectedPokedex);
      return this._pokemonListByPokedexId[this.getSelectedPokedex.id];
    }
    return [];
  }

  public get getNextSprite(): string {
    return PokedexFetchV2.TRANSPARENT_IMAGE
    //this.getPokemon != null ? this.getPokemon.spritesParsed[this._currSpriteIndex] : PokedexFetchV2.TRANSPARENT_IMAGE
  }

  public get getCurrScreenList(): ScreenList {
    return this._currScreenList;
  }

  public get getScreenPokemonList(): ScreenList {
    return this._screenPokemonList;
  }

  public get getScreenPokedexist(): ScreenList {
    return this._screenPokedexList;
  }

  public get getScreenStates() {
    return PokedexFetchV2.SCREEN_STATES;
  }

  public get hasAnimationLedPlayed(): boolean {
    return this._hasAnimationLedPlayed;
  }

  public get hasAnimationTTSPlayed(): boolean {
    return this._hasAnimationTTSPlayed;
  }

  //////////////////////////////////////// O L D =  G E T T E R

  public get getPokemonLocation(): string {
    return "???";
  }

}

class ScreenList {
  private readonly _maxItemDisplayed: number;
  private _selectorIdx: number;
  private _screenStates: number;

  public constructor(maxItemDisplayed: number) {
    this._maxItemDisplayed = maxItemDisplayed;
    this._selectorIdx = 0;
    this._screenStates = PokedexFetchV2.SCREEN_STATES.INFO;
  }

  public onResetSelector() {
    this._selectorIdx = 0;
  }

  public onNext(listLength: number) {
    if (this._selectorIdx >= (listLength - 1)) return;
    this._selectorIdx++;
  }

  public onPrevious() {
    if (this._selectorIdx <= 0) return;
    this._selectorIdx--;
  }

  public get getSelectorIndex(): number {
    return this._selectorIdx;
  }

  public get getStartIndex(): number {
    return this._selectorIdx - (this._selectorIdx % this._maxItemDisplayed);
  }

  public get getScreenStates(): number {
    return this._screenStates;
  }

  public set setScreenState(v: number) {
    this._screenStates = v;
  }

}

