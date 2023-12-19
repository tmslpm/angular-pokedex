
export class PokemonApi {
    public static DEBUG = false;

    public static getAllPokedex<T>(fnRequest: (endpoint: string) => Promise<T>): Promise<T> {
        return PokemonApi.execPromiseRequest(PokemonApi.pokedexListEndpoint(0, 60), fnRequest);
    }

    public static getPokedex<T>(endpoint: string | string, fnRequest: (endpoint: string) => Promise<T>): Promise<T> {
        return PokemonApi.execPromiseRequest(endpoint, fnRequest);
    }

    public static execPromiseRequest<T>(endpoint: string, fnRequest: (endpoint: string) => Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            let tryGetFromCache = sessionStorage.getItem(endpoint);
            if (tryGetFromCache) {
                if (PokemonApi.DEBUG) console.debug(`(DEBUG) /!\\ data used from cache, endpoint_key: ${endpoint}`);
                try {
                    let data = JSON.parse(tryGetFromCache);
                    if (PokemonApi.DEBUG) console.debug("(DEBUG) from cache => ", data);
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            } else {
                fnRequest(endpoint)
                    .then(data => {
                        if (PokemonApi.DEBUG) console.debug("(DEBUG) from api => ", data);
                        sessionStorage.setItem(endpoint, JSON.stringify(data));
                        resolve(data);
                    })
                    .catch(error => reject(error))
            }
        })
    }

    //////////////////////////: ENDPOINT

    private static pokedexListEndpoint(offset: number, limit: number): string {
        return `https://pokeapi.co/api/v2/pokedex?offset=${offset}&limit=${limit}`;
    }

    private static pokedexEndpoint(id: number | string): string {
        return `https://pokeapi.co/api/v2/pokedex/${id}`;
    }

    private static pokemonSpecieEndpoint(id: number | string): string {
        return `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    }

}