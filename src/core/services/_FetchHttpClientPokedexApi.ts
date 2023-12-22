import { NamedAPIResource, PokemonData } from "@/core/base/PokeApi"; 
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, forkJoin, map } from "rxjs";
import { NotificationService } from "@/core/services/Notification.service";

@Injectable({ providedIn: "root" })
export class FetchHttpClientPokedexApi {
    private readonly _fetchHttp: HttpClient;
    private readonly _notificationService: NotificationService;
    private _limit: number;
    private _hasStartedRequest: boolean;
    private _currentIndex: number;
    private _currentResponse: ResponsePaginationApi<NamedAPIResource[], PokemonData[]>;

    public constructor(fetchHttp: HttpClient, notificationService: NotificationService) {
        this._fetchHttp = fetchHttp;
        this._notificationService = notificationService;
        this._currentResponse = { hasPrevious: false, previous: "", hasNext: false, next: "", results: [], other: [] };
        this._currentIndex = 0;
        this._limit = 9;
        this._hasStartedRequest = false;
    }

    public init() {
        this.getPokemon(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${this._limit}`);
    }

    public getPokemon(endpoint: string): void {
        this._hasStartedRequest = true;
        this._fetchHttp
            .get<ResponsePaginationApi<NamedAPIResource, PokemonData>>(endpoint, {})
            .pipe(map(response => FetchHttpClientPokedexApi.parseRestFullResponse<NamedAPIResource[], PokemonData[]>(response)))
            .subscribe({
                next: (response) => {
                    this._currentResponse = response;
                    let requests: Observable<any>[] = this._currentResponse.results.map(pokemon => this._fetchHttp.get(pokemon.url));
                    forkJoin(requests).subscribe({
                        next: (results: PokemonData[]) => {
                            results.map(item => {
                                item.typesParsed = item.types.map(v => v.type.name).join(", ");
                                item.spritesParsed = Object.values(item.sprites)
                                    .filter(v => typeof v === "string" && v.startsWith("https"))
                                    .sort((a, b) => (a as string).length - (b as string).length) as string[];
                            })

                            this._currentResponse.other = results;
                        },
                        error: (error) => {
                            console.error(error);
                            this._notificationService.addNetworkError();
                        }
                    });
                    this._hasStartedRequest = false;
                },
                error: (error) => {
                    console.error(error);
                    this._notificationService.addNetworkError();
                }
            });
    }

    public static parseRestFullResponse<V0, V1>(data: any): ResponsePaginationApi<V0, V1> {
        let isNullPrevious = !data.previous || data.previous === null;
        let isNullNext = !data.next || data.next === null;
        return {
            hasPrevious: !isNullPrevious, previous: isNullPrevious ? "" : data.previous,
            hasNext: !isNullNext, next: isNullNext ? "" : data.next,
            results: data.results,
            other: data.other
        };
    }

    public previous(): void {
        if (this._currentIndex <= 0) {
            if (this._currentResponse.hasPrevious) {
                this._currentIndex = this._limit - 1;
                this.getPokemon(this._currentResponse.previous);
            }
        } else this._currentIndex--;
    }

    public next(): void {
        if (this._currentIndex >= (this._limit - 1)) {
            if (this._currentResponse.hasNext) {
                this._currentIndex = 0;
                this.getPokemon(this._currentResponse.next);
            }
        } else this._currentIndex++;
    }

    public set limit(limit: number) {
        this._limit = limit;
    }

    public get limit(): number {
        return this._limit
    }

    public get data(): PokemonData[] {
        return this._currentResponse.other;
    }

    public get currentIndex(): number {
        return this._currentIndex;
    }

    public get hasStartedFetch(): boolean {
        return this._hasStartedRequest
    }

}

export type ResponsePaginationApi<V0, V1> = {
    hasPrevious: boolean,
    previous: string,
    hasNext: boolean,
    next: string,
    results: V0,
    other: V1,
}