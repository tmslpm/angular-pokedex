import { NamedAPIResource } from "../types/PokemonData";
import { ResponsePokeApi } from "../types/ResponsePokeApi";

export abstract class PaginationResponse<T> {
    protected readonly _limit: number;
    protected _responsePagination: ResponsePokeApi<NamedAPIResource>;
    protected _currentIndex: number;
    protected _currentData: T | null;

    public constructor(limit: number, currentIndex: number) {
        this._limit = limit;
        this._responsePagination = { hasPrevious: false, previous: "", hasNext: false, next: "", results: [] };
        this._currentIndex = currentIndex;
        this._currentData = null;

        this.fetchData(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${this._limit}`).then(r => {
            this._currentData = r;
        })
    }

    public async previous() {
        if (this._currentIndex <= 0) {
            if (this._responsePagination.hasPrevious) {
                this._currentIndex = this._limit - 1;
                this._currentData = await this.fetchData(this._responsePagination.previous);
            }
        } else this._currentIndex--;
    }

    public async next() {
        if (this._currentIndex >= (this._limit - 1)) {
            if (this._responsePagination.hasNext) {
                this._currentIndex = 0;
                this._currentData = await this.fetchData(this._responsePagination.next);
            }
        } else this._currentIndex++;
    }

    protected async fetchData(endpoint: string): Promise<T> {
        return new Promise((resolve, reject) => {
            reject("not implemented")
        })
    }

    protected parseRestFullResponse<V>(data: any): ResponsePokeApi<V> {
        let isNullPrevious = !data.previous || data.previous === null;
        let isNullNext = !data.next || data.next === null;
        return {
            hasPrevious: !isNullPrevious, previous: isNullPrevious ? "" : data.previous,
            hasNext: !isNullNext, next: isNullNext ? "" : data.next,
            results: data.results
        }
    }

    public debug() {
        console.debug(this)
    }

    public get data(): T | null {
        return this._currentData;
    }

    public get currentIndex(): number {
        return this._currentIndex;
    }

}