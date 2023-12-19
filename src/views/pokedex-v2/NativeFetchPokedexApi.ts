import { NamedAPIResourceList, Pokedex, PokedexParsed } from "@/core/types/PokemonData";
import { fetchJSON } from "@/core/module/Fetch";
import { NotificationService } from "@/services/Notification";
import { PokemonApi } from "../../services/PokemonApi";
import { Injectable } from "@angular/core";
import { LangSwitchComponent } from "@/components/SwitchLang/switch-lang.component";

@Injectable({ providedIn: "root" })
export class NativeFetchPokedexApi {
    private readonly _notificationService: NotificationService;

    private _pokedexParseds: PokedexParsed[];


    public constructor(notificationService: NotificationService) {
        this._notificationService = notificationService;
        this._pokedexParseds = [];

        //fetchJSON("https://pokeapi.co/api/v2/pokemon/90/").then(r => console.log(r))

        // sessionStorage.clear();  
        this.fetchAllPokedex();

        
    }

    public fetchAllPokedex() {
        PokemonApi.getAllPokedex<NamedAPIResourceList>((endpoint) => fetchJSON<NamedAPIResourceList>(endpoint))
            .then(finalPokedexListData => {
                // parse pokedex data
                finalPokedexListData.results.forEach(item => {
                    PokemonApi.execPromiseRequest<Pokedex>(item.url, (endpoint) => fetchJSON<Pokedex>(endpoint))
                        .then(finalPokedexData => {
                            let lang = LangSwitchComponent.getCurrentLang().locale.split("-")[0];
                            let localNames = finalPokedexData.names.filter(v => v.language.name.includes(lang));
                            let localDescs = finalPokedexData.descriptions.filter(v => v.language.name.includes(lang));
                            this._pokedexParseds.push({
                                id: finalPokedexData.id,
                                localName: localNames.length > 0 && localNames[0].name.length > 0 ? localNames[0].name : finalPokedexData.name,
                                localDescription: localDescs.length > 0 && localDescs[0].description.length > 0 ? localDescs[0].description : "???",
                                pokemon_entries: finalPokedexData.pokemon_entries
                            });
                        });
                });

                //console.log("=>", pokedexParseds) 
            });
    }

    public fetchVersionsInfos(endpoint: string) {
        PokemonApi.execPromiseRequest<Pokedex>(endpoint, (endpoint) => fetchJSON<Pokedex>(endpoint))
            .then(finalPokedexData => {
                console.log(finalPokedexData)
            })
    }

    // G e t t e r

    public getPokedex(index: number): PokedexParsed {
        return this._pokedexParseds[index];
    }

    public get currentPokedexList(): PokedexParsed[] {
        return this._pokedexParseds;
    }

}

