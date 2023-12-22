export function reducePokeApiEndpoint(endpoint: string): string {
    let endpointSplited = endpoint.split("api/v2/");
    let endpointWithoutDomain = endpointSplited[endpointSplited.length - 1];
    let endpointWithoutDomainSplited = endpointWithoutDomain.split("/");
    let reducedKey;
    switch (endpointWithoutDomainSplited[0]) {
        case "pokedex?offset=0&limit=60":
            reducedKey = "b";
            break;
        case "pokemon-species":
            reducedKey = "s";
            break;
        case "pokedex":
            reducedKey = "x";
            break;
        default:
            console.error(`/!\\ endpoint not reduced =>`, { endpoint: endpoint, lose_octet: endpoint.length * 2 });
            reducedKey = endpoint;
            break;
    }
    return endpointWithoutDomain.replace(endpointWithoutDomainSplited[0], reducedKey).replaceAll("/", "");
}

export function pokedexListEndpoint(offset: number, limit: number): string {
    return `https://pokeapi.co/api/v2/pokedex?offset=${offset}&limit=${limit}`;
}

export function pokemonSpecieEndpoint(id: number | string): string {
    return `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
}

export function pokemonDataEndpoint(id: number | string): string {
    return `https://pokeapi.co/api/v2/pokemon/${id}/`;
}

///////////////////////////////////////////////
///////////////// T Y P E /////////////////////

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

export interface LocationAreaEncounter {
    location_area: NamedAPIResource;
    version_details: any[];
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
    desc: string;
    name: string;
    pokemon: string[];
}

export interface PokemonEntry {
    entry_number: number;
    pokemon_species: NamedAPIResource;
}

export interface PokemonSpecies {
    id: number;
    name: string;
    order: number;
    gender_rate: number;
    capture_rate: number;
    base_happiness: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    hatch_counter: number;
    has_gender_differences: boolean;
    forms_switchable: boolean;
    growth_rate: NamedAPIResource;
    pokedex_numbers: PokemonSpeciesDexEntry[];
    egg_groups: NamedAPIResource[];
    color: NamedAPIResource;
    shape: NamedAPIResource;
    evolves_from_species: NamedAPIResource;
    evolution_chain: APIResource;
    habitat: NamedAPIResource;
    generation: NamedAPIResource;
    names: Name[];
    pal_park_encounters: PalParkEncounterArea[];
    flavor_text_entries: FlavorText[];
    form_descriptions: Description[];
    genera: Genus[];
    varieties: PokemonSpeciesVariety[];
}

export interface PokemonSpeciesParsed {
    id: number;
    name: string;
    desc: string;
    height: number;
    weight: number;
    sprite: string[];
    types: string;
}

export interface PokemonSpeciesDexEntry {
    entry_number: number;
    pokedex: NamedAPIResource;
}

export interface PalParkEncounterArea {
    base_score: number;
    rate: number;
    area: NamedAPIResource;
}

export interface Genus {
    genus: string;
    language: NamedAPIResource;
}

export interface PokemonSpeciesVariety {
    is_default: boolean;
    pokemon: NamedAPIResource;
}

export interface FlavorText {
    flavor_text: string;
    language: NamedAPIResource;
    version: NamedAPIResource;
}

export interface APIResource {
    url: string;
}

export interface Name {
    name: string;
    language: NamedAPIResource;
}

export interface Description {
    description: string;
    language: NamedAPIResource;
}

export interface NamedAPIResource {
    name: string;
    url: string;
}

export interface NamedAPIResourceList {
    count: number;
    next: string | null;
    previous: string | null;
    results: NamedAPIResource[];
}
