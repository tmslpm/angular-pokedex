
import { pokemonSpecieEndpoint, reducePokeApiEndpoint, pokedexListEndpoint, pokemonDataEndpoint, NamedAPIResourceList, Pokedex, PokedexParsed, PokemonData, PokemonSpecies, PokemonSpeciesParsed } from "@/core/base/PokeApi";
import { batchPromise, fetchJSON } from "@/core/base/Fetch";
import { NotificationService } from "@/core/services/Notification.service";
import { Injectable } from "@angular/core";
import { LangSwitchComponent } from "@/templates/components/SwitchLang/switch-lang.component";
import { calculateSessionStorageSize, hasDataInSessionStorage } from "@/core/base/WebStore";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class FetchPokeApiService {
    private readonly _notificationService: NotificationService;

    private readonly _pokedexList: BehaviorSubject<PokedexParsed[]>;
    private readonly _obsPokedexList: Observable<PokedexParsed[]>;

    private readonly _pokemonListByPokedexId: BehaviorSubject<{ [key: string]: PokemonSpeciesParsed[] }>;
    private readonly _obsPokemonListByPokedex: Observable<{ [key: string]: PokemonSpeciesParsed[] }>;

    public constructor(notificationService: NotificationService) {
        this._notificationService = notificationService;
        this._pokedexList = new BehaviorSubject<PokedexParsed[]>([]);
        this._obsPokedexList = this._pokedexList.asObservable();
        this._pokemonListByPokedexId = new BehaviorSubject<{ [key: string]: PokemonSpeciesParsed[] }>({});
        this._obsPokemonListByPokedex = this._pokemonListByPokedexId.asObservable();
        this.fetchPokedexList();
        console.log(calculateSessionStorageSize());
    }

    // F e t c h  D a t a

    public fetchPokemonList(parsedPokedexFromCache: PokedexParsed) {
        if (!(parsedPokedexFromCache.id in this._pokemonListByPokedexId.value)) {
            this.initPokemonList(parsedPokedexFromCache);
        }

        batchPromise<string, PokemonSpeciesParsed>(parsedPokedexFromCache.pokemon, (pokemonId) => {
            const endpointPokemonData = pokemonDataEndpoint(pokemonId);
            const endpointPokemonSpecie = pokemonSpecieEndpoint(pokemonId);
            const keyEndpointPokedmon = reducePokeApiEndpoint(endpointPokemonSpecie);
            return new Promise<PokemonSpeciesParsed>((resolve, reject) => {
                // get data from API
                if (!hasDataInSessionStorage(keyEndpointPokedmon)) {
                    let pokemonSpecieDataFromApi: PokemonSpecies;
                    let pokemonDataFromApi: PokemonData;
                    Promise.all([
                        fetchJSON<PokemonSpecies>(endpointPokemonSpecie).then(v => pokemonSpecieDataFromApi = v),
                        fetchJSON<PokemonData>(endpointPokemonData).then(v => pokemonDataFromApi = v)
                    ]).then(() => {
                        let parsedPokemon = this.parsePokemon(pokemonSpecieDataFromApi, pokemonDataFromApi);
                        sessionStorage.setItem(keyEndpointPokedmon, JSON.stringify(parsedPokemon));
                        resolve(parsedPokemon);
                    }).catch(e => reject(e));
                }
                // get data from cache
                else {
                    try {
                        resolve(JSON.parse(sessionStorage.getItem(keyEndpointPokedmon) as string));
                    } catch (e) {
                        reject(e);
                    }
                }
            });
        }, (allData) => this.pushPokemonInList(parsedPokedexFromCache, allData))
        //, () => (this._pokemonListByPokedexId.get(parsedPokedexFromCache.id) || []).sort((a, b) => a.id - b.id));
    }

    public fetchPokedexList(): void {
        const endpointPokdexList = pokedexListEndpoint(0, 60);
        const keyEndpointPokedexList = reducePokeApiEndpoint(endpointPokdexList);
        const promises: Promise<PokedexParsed>[] = [];
        // get pokedex url list from API
        if (!hasDataInSessionStorage(keyEndpointPokedexList)) {
            fetchJSON<NamedAPIResourceList>(endpointPokdexList).then(pokedexListFromAPI => {
                const pokedexUrlList = pokedexListFromAPI.results.map(v => v.url);
                pokedexUrlList.forEach(pokedexUrl => promises.push(this.fetchPokedex(pokedexUrl)));
                sessionStorage.setItem(keyEndpointPokedexList, JSON.stringify(pokedexUrlList));
                // wait all promese before push pokedexlist
                Promise.all(promises).then(pokedexParsedList => this.pushPokedexInList(pokedexParsedList));
            });
        }
        // get pokedex url list from cache
        else {
            const pokedexUrlList: string[] = JSON.parse(sessionStorage.getItem(keyEndpointPokedexList) as string);
            pokedexUrlList.forEach(pokedexUrl => promises.push(this.fetchPokedex(pokedexUrl)));
            // wait all promese before push pokedexlist
            Promise.all(promises).then(pokedexParsedList => this.pushPokedexInList(pokedexParsedList));
        }
    }

    private async fetchPokedex(pokedexUrl: string): Promise<PokedexParsed> {
        const keyEndpointPokedex = reducePokeApiEndpoint(pokedexUrl);
        // get pokedex from cache
        if (hasDataInSessionStorage(keyEndpointPokedex))
            return new Promise((resolve, _) => resolve(JSON.parse(sessionStorage.getItem(keyEndpointPokedex) as string)));
        // else: get pokedex from API 
        return fetchJSON<Pokedex>(pokedexUrl).then(pokedexDataFromApi => {
            let pokedexDataParsed = this.parsePokedex(pokedexDataFromApi);
            sessionStorage.setItem(keyEndpointPokedex, JSON.stringify(pokedexDataParsed));
            return pokedexDataParsed;
        });
    }

    // U t i l s 

    private initPokemonList(pokedex: PokedexParsed) {
        this._pokemonListByPokedexId.next({
            ...this._pokemonListByPokedexId.value,
            [pokedex.id]: []
        });
    }

    private pushPokemonInList(pokedex: PokedexParsed, pokemonData: PokemonSpeciesParsed[]): void {
        this._pokemonListByPokedexId.next({
            ...this._pokemonListByPokedexId.value,
            [pokedex.id]: [...this._pokemonListByPokedexId.value[pokedex.id], ...pokemonData]
        });
    }

    private pushPokedexInList(pokedex: PokedexParsed[]) {
        this._pokedexList.next([...this._pokedexList.value, ...pokedex]);
    }

    // P a r s e  D a t a

    private parsePokedex(dataFromApi: Pokedex): PokedexParsed {
        let lang = LangSwitchComponent.getCurrentLang().locale.split("-")[0];
        let localNames = dataFromApi.names.filter(v => v.language.name.includes(lang));
        let localDescs = dataFromApi.descriptions.filter(v => v.language.name.includes(lang));
        return {
            id: dataFromApi.id,
            name: localNames.length > 0 && localNames[0].name.length > 0
                ? localNames[0].name
                : dataFromApi.name,
            desc: localDescs.length > 0 && localDescs[0].description.length > 0
                ? localDescs[0].description
                : "???",
            pokemon: dataFromApi.pokemon_entries.map(v => {
                let urlSplit = v.pokemon_species.url.split("/");
                return urlSplit[urlSplit.length - 1] === "" ? urlSplit[urlSplit.length - 2] : urlSplit[urlSplit.length - 1];
            })
        };
    }

    private parsePokemon(dataFromApi: PokemonSpecies, pokemonDataFromApi: PokemonData): PokemonSpeciesParsed {
        let lang = LangSwitchComponent.getCurrentLang().locale.split("-")[0];
        let localNames = dataFromApi.names.filter(v => v.language.name.includes(lang));
        let localDescription = dataFromApi.flavor_text_entries.filter(v => v.language.name.includes(lang));
        //let typesParsed = pokemonDataFromApi.types.map(v => v.type.name).join(", ");
        //let spritesParsed = Object.values(pokemonDataFromApi.sprites).filter(v => typeof v === "string" && v.startsWith("https"))
        //   .sort((a, b) => (a as string).length - (b as string).length) as string[];

        return {
            id: dataFromApi.id,
            name: localNames.length > 0 && localNames[0].name.length > 0 ? localNames[0].name : dataFromApi.name,
            height: pokemonDataFromApi.height,
            weight: pokemonDataFromApi.weight,
            sprite: [],
            types: "typesParsed",
            desc: localDescription.length > 0 && localDescription[0].flavor_text.length > 0
                ? localDescription[0].flavor_text.replaceAll("\n", "").replaceAll("\f", "").toLocaleLowerCase()
                : "???",
        };
    }

    // G e t t e r

    public get getObsPokedexList(): Observable<PokedexParsed[]> {
        return this._obsPokedexList;
    }

    public get getObsPokemonListByPokedexId(): Observable<{ [key: string]: PokemonSpeciesParsed[] }> {
        return this._obsPokemonListByPokedex;
    }

}
