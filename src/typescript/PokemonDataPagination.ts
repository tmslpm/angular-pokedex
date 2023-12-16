import { PaginationResponse } from "./PaginationResponse";
import { getJSON } from "./module/Fetch";
import { PokemonData, NamedAPIResource } from "./types/PokemonData";

export class PokemonDataPagination extends PaginationResponse<PokemonData[]> {

    constructor(limite: number) {
        super(limite, 0);
    }

    protected override async fetchData(endpoint: string): Promise<PokemonData[]> {
        let allPromise: Promise<PokemonData>[] = [];
        await getJSON(endpoint)
            .then(response => {
                this._responsePagination = PaginationResponse.parseRestFullResponse<NamedAPIResource>(response);
                this._responsePagination.results.forEach(resource => allPromise.push(this.fetchPokemonData(resource.url)));
            })
            .catch(errorFetchPokemonList => {
                console.error(errorFetchPokemonList);
            })
        return Promise.all(allPromise);
    }

    private fetchPokemonData(endpoint: string): Promise<PokemonData> {
        return new Promise<PokemonData>((resolve, reject) => getJSON(endpoint)
            .then((responsePokemonData: PokemonData) => {
                // get types and parse to string
                responsePokemonData.typesParsed = responsePokemonData.types.map(v => v.type.name).join(", ");

                // get sprite and parse to string (filter null value)
                responsePokemonData.spritesParsed = Object.values(responsePokemonData.sprites)
                    .filter(v => typeof v === "string" && v.startsWith("https"))
                    .sort((a, b) => (a as string).length - (b as string).length) as string[];

                resolve(responsePokemonData);
            }).catch(e => reject(e))
        )
    }

}
