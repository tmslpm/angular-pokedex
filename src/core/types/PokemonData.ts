export interface PokemonData {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: PokemonAbility[];
    location_area_encounters: string;
    forms: NamedAPIResource[];
    sprites: PokemonSprites;
    spritesParsed: string[];
    species: NamedAPIResource;
    stats: PokemonStat[];
    types: PokemonType[];
    typesParsed: string;
}

export interface PokemonSprites {
    front_default: string | null;
    front_shiny: string | null;
    front_female: string | null;
    front_shiny_female: string | null;
    back_default: string | null;
    back_shiny: string | null;
    back_female: string | null;
    back_shiny_female: string | null;
}

export interface PokemonType {
    slot: number;
    type: NamedAPIResource;
}

export interface PokemonStat {
    stat: NamedAPIResource;
    effort: number;
    base_stat: number;
}

export interface PokemonAbility {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResource;
}

export interface Pokedex {
    id: number;
    name: string;
    is_main_series: boolean,
    descriptions: Description[];
    names: Name[];
    pokemon_entries: PokemonEntry[];
    region: NamedAPIResource | null;
    version_groups: NamedAPIResource[];
}

export interface PokedexParsed {
    id: number, 
    localDescription: string;
    localName: string;
    pokemon_entries: PokemonEntry[];
}

export interface PokemonEntry {
    entry_number: number;
    pokemon_species: NamedAPIResource;
}

export interface LocationAreaEncounter {
    location_area: NamedAPIResource;
    version_details: any[];
}

export interface Description {
    description: string;
    language: NamedAPIResource;
}

export interface Name {
    name: string;
    language: NamedAPIResource;
}

export interface NamedAPIResourceList {
    count: number;
    next: string | null;
    previous: string | null;
    results: NamedAPIResource[];
}

export interface NamedAPIResource {
    name: string;
    url: string;
}