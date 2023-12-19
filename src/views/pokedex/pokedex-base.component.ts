import { PokemonData } from "@/core/types/PokemonData";
import { NotificationService } from "@/services/Notification";

export abstract class PokemonBaseComponent {
    protected readonly _notificationService: NotificationService;
    protected _spriteIndex: number;
    protected _playAnimation: boolean;
    protected _currentScreenInfo: number;
    protected _pokemonLocation: string;

    public constructor(notificationService: NotificationService) {
        this._notificationService = notificationService;
        this._spriteIndex = 0;
        this._currentScreenInfo = this.screenInfo;
        this._playAnimation = false;
        this._pokemonLocation = "???";
    }

    public onClickBtnLeftCross(btnName: string): void {
        this.onPlayLedAnimation();

        if (this.hasStartedFetch)
            return;

        switch (btnName) {
            case "top":
                this._spriteIndex = 0;
                this.onPokemonPaginationPrevious();
                break;
            case "bot":
                this._spriteIndex = 0;
                this.onPokemonPaginationNext();
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

    public onClickBtnRight(btnIndex: number): void {
        this.onPlayLedAnimation();
        switch (btnIndex) {
            case this.screenInfo:
                this._currentScreenInfo = this.screenInfo;
                break;
            case this.screenLocation:
                this._currentScreenInfo = this.screenLocation;
                this.onPokemonLocationUpdate();
                break;
            case this.screenLoot:
                this._currentScreenInfo = this.screenLoot;
                this.onPokemonLootUpdate();
                break;
        }
    }

    public onPlayLedAnimation(): void {
        if (!this._playAnimation) {
            this._playAnimation = true;
            setTimeout(() => this._playAnimation = !this._playAnimation, 1200)
        }
    }

    public getNextSprite(): string {
        return this.getCurrentPokemonData != null
            ? this.getCurrentPokemonData.spritesParsed[this._spriteIndex]
            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAANSURBVBhXY2BgYGAAAAAFAAGKM+MAAAAAAElFTkSuQmCC"
    }

    public onClickNoAction(): void {
        this._notificationService.addInfo("Sorry, this button has no action available..");
    }

    public abstract onPokemonPaginationPrevious(): void;
    public abstract onPokemonPaginationNext(): void;
    public abstract onPokemonLocationUpdate(): void;
    public abstract onPokemonLootUpdate(): void; 

    public abstract get getCurrentPokemonData(): PokemonData | null;

    public abstract get getPokemonData(): PokemonData[];

    public abstract get getPokemonDataStartIndex(): number;

    public abstract get hasStartedFetch(): boolean;

    public get getPokemonLocation(): string {
        return this._pokemonLocation;
    }

    public get getPlayAnimation(): boolean {
        return this._playAnimation;
    }

    public get currentScreenInfo(): number {
        return this._currentScreenInfo;
    }

    public get screenInfo(): number {
        return 0;
    }

    public get screenLocation(): number {
        return 1;
    }

    public get screenLoot(): number {
        return 2;
    }
}