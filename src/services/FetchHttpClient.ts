import { PaginationResponse } from "@/typescript/PaginationResponse";
import { PokemonDataPagination } from "@/typescript/PokemonDataPagination";
import { NamedAPIResource, PokemonData } from "@/typescript/types/PokemonData";
import { ResponsePokeApi } from "@/typescript/types/ResponsePokeApi";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, forkJoin, map, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FetchHttpClientPokedexApi {

    private readonly _fetchHttp: HttpClient;
    private _limit: number;
    protected _responsePagination: ResponsePokeApi<NamedAPIResource>;
    protected _currentIndex: number;
    protected _currentData: PokemonData[]

    public constructor(fetchHttp: HttpClient) {
        this._fetchHttp = fetchHttp;
        this._responsePagination = { hasPrevious: false, previous: "", hasNext: false, next: "", results: [] };
        this._currentIndex = 0;
        this._limit = 9;
        this._currentData = [];
    }

    public init() {
        this.getPokemon(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${this._limit}`);
    }

    public getPokemon(endpoint: string): void {
        this._fetchHttp
            .get<ResponsePokeApi<NamedAPIResource>>(endpoint, {})
            .pipe(map(response => PaginationResponse.parseRestFullResponse<NamedAPIResource>(response)))
            .subscribe({
                next: (response) => {
                    this._responsePagination = response;

                    let requests: Observable<any>[] = this._responsePagination.results.map(pokemon => this._fetchHttp.get(pokemon.url));
                    forkJoin(requests)
                        .subscribe({
                            next: (results: PokemonData[]) => {
                                results.map(item => {
                                    item.typesParsed = item.types.map(v => v.type.name).join(", ");
                                    item.spritesParsed = Object.values(item.sprites)
                                        .filter(v => typeof v === 'string' && v.startsWith("https"))
                                        .sort((a, b) => (a as string).length - (b as string).length) as string[];
                                })

                                this._currentData = results;
                            },
                            error: (error) => console.error(error)
                        });
                },
                error: (error) => console.error(error)
            });
    }

    public previous(): void {
        if (this._currentIndex <= 0) {
            if (this._responsePagination.hasPrevious) {
                this._currentIndex = this._limit - 1;
                this.getPokemon(this._responsePagination.previous);
            }
        } else this._currentIndex--;
    }

    public next(): void {
        if (this._currentIndex >= (this._limit - 1)) {
            if (this._responsePagination.hasNext) {
                this._currentIndex = 0;
                this.getPokemon(this._responsePagination.next);
            }
        } else this._currentIndex++;
    }

    // getter / setter
    public debug() {
        console.debug(this)
    }

    public set limit(limit: number) {
        this._limit = limit;
    }

    public get limit(): number {
        return this._limit
    }

    public get data(): PokemonData[] {
        return this._currentData;
    }

    public get currentIndex(): number {
        return this._currentIndex;
    }
}