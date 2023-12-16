import { NamedAPIResource, PokemonData } from "@/core/types/PokemonData";
import { ResponsePaginationApi } from "@/core/types/ResponsePaginationApi";
import { getJSON } from "@/core/module/Fetch";
import { NotificationService } from "@/services/Notification";

export class NativeFetchPokedexApi {
    private readonly _limit: number;
    private readonly _notificationService: NotificationService
    private _currentIndex: number;
    private _currentResponse: ResponsePaginationApi<NamedAPIResource[], PokemonData[]>;
    private _startedFetch: boolean;

    public constructor(limit: number, notificationService: NotificationService) {
        this._limit = limit;
        this._notificationService = notificationService;
        this._currentResponse = { hasPrevious: false, previous: "", hasNext: false, next: "", results: [], other: [] };
        this._currentIndex = 0;

        this._startedFetch = true;
        NativeFetchPokedexApi.fetchData(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${this._limit}`)
            .then(r => {
                this._currentResponse = r;
                this._startedFetch = false;
                //NativeFetchPokedexApi.fetchData(this._currentResponse.next).then(r1 => this._nextResponse = r1);
            })
            .catch(e => {
                console.error(e);
                this._notificationService.addNetworkError();
            });
    }

    public previous(): void {
        if (this._currentIndex <= 0) {
            if (this._currentResponse.hasPrevious) {
                this._currentIndex = this._limit - 1;

                //this._nextResponse = this._currentResponse; this._currentResponse = this._previousResponse; 
                //if (this._currentResponse.hasPrevious) NativeFetchPokedexApi.fetchData(this._currentResponse.previous).then(r => this._previousResponse = r);

                this._startedFetch = true;
                NativeFetchPokedexApi.fetchData(this._currentResponse.previous)
                    .then(r => {
                        this._currentResponse = r
                        this._startedFetch = false;
                    })
                    .catch(e => {
                        console.error(e);
                        this._notificationService.addNetworkError();
                    });
            }
        } else this._currentIndex--;
    }

    public next(): void {
        if (this._currentIndex >= (this._limit - 1)) {
            if (this._currentResponse.hasNext) {
                this._currentIndex = 0;

                //this._previousResponse = this._currentResponse; this._currentResponse = this._nextResponse; 
                //if (this._currentResponse.hasNext) NativeFetchPokedexApi.fetchData(this._currentResponse.next).then(r => this._nextResponse = r);

                this._startedFetch = true;
                NativeFetchPokedexApi.fetchData(this._currentResponse.next)
                    .then(r => {
                        this._currentResponse = r
                        this._startedFetch = false;
                    })
                    .catch(e => {
                        console.error(e);
                        this._notificationService.addNetworkError();
                    });
            }
        } else this._currentIndex++;
    }

    private static fetchData(endpoint: string): Promise<ResponsePaginationApi<NamedAPIResource[], PokemonData[]>> {
        return new Promise<ResponsePaginationApi<NamedAPIResource[], PokemonData[]>>((resolve, reject) => {
            getJSON(endpoint).then(pokemonList => {
                let responseWithPagination = NativeFetchPokedexApi.parseRestFullResponse<NamedAPIResource[], PokemonData[]>(pokemonList);
                responseWithPagination.other = [];
                responseWithPagination.results.forEach(r => {
                    this.fetchPokemonData(r.url).then(pokemonData => {
                        responseWithPagination.other.push(pokemonData)
                    }).catch(e => reject(e))
                });
                resolve(responseWithPagination);
            }).catch(e => reject(e))
        });
    }

    private static fetchPokemonData(endpoint: string): Promise<PokemonData> {
        return new Promise<PokemonData>((resolve, reject) => getJSON(endpoint)
            .then((r: PokemonData) => {
                r.typesParsed = r.types.map(v => v.type.name).join(", ");
                r.spritesParsed = Object.values(r.sprites)
                    .filter(v => typeof v === "string" && v.startsWith("https"))
                    .sort((a, b) => (a as string).length - (b as string).length) as string[];
                resolve(r);
            })
            .catch(e => reject(e)));
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

    public get data(): PokemonData[] {
        return this._currentResponse.other;
    }

    public get currentIndex(): number {
        return this._currentIndex;
    }

    public get hasStartedFetch(): boolean {
        return this._startedFetch;
    }

}