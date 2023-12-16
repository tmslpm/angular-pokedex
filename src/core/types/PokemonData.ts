
/** https://pokeapi.co/docs/v2#pokemon */
export type PokemonData = {
    /** The identifier for this pokemon */
    id: number,
    /** The name for this pokemon */
    name: string,
    /** The base experience gained for defeating this pokemon */
    base_experience: number,
    /** The height of this pokemon in decimetres */
    height: number,
    /** Set for exactly one pokemon used as the default for each species */
    is_default: boolean,
    /** Order for sorting. Almost national order, except families are grouped together */
    order: number,
    /** The weight of this pokemon in hectograms */
    weight: number,
    /** A list of abilities this pokemon could potentially have */
    abilities: PokemonAbility[],
    /* A link to a list of location areas, as well as encounter details pertaining to specific versions. */
    location_area_encounters: string;
    /** A list of forms this pokemon can take on */
    forms: NamedAPIResource[],
    /**	A set of sprites used to depict this Pokémon in the game */
    sprites: PokemonSprites,
    spritesParsed: string[],
    /** The species this pokemon belongs to */
    species: NamedAPIResource,
    /** A list of base stat values for this pokemon */
    stats: PokemonStat[],
    /** A list of details showing types this pokemon has */
    types: PokemonType[],
    typesParsed: string,
}
 
/** https://pokeapi.co/docs/v2#pokemonsprites */
export type PokemonSprites = {
    /** The default depiction of this pokemon from the front in battle */
    front_default: string | null,
    /** The shiny depiction of this pokemon from the front in battle */
    front_shiny: string | null,
    /** The female depiction of this pokemon from the front in battle */
    front_female: string | null,
    /** The shiny female depiction of this pokemon from the front in battle */
    front_shiny_female: string | null,
    /** The default depiction of this pokemon from the back in battle */
    back_default: string | null,
    /** The shiny depiction of this pokemon from the back in battle */
    back_shiny: string | null,
    /** The female depiction of this pokemon from the back in battle */
    back_female: string | null,
    /** The shiny female depiction of this pokemon from the back in battle */
    back_shiny_female: string | null
}

/** https://pokeapi.co/docs/v2#pokemontype */
export type PokemonType = {
    /** The order the pokemon's types are listed in. */
    slot: number,
    /** The type the referenced Form has. */
    type: NamedAPIResource
}

/** https://pokeapi.co/docs/v2#pokemonstat */
export type PokemonStat = {
    /** The stat the pokemon has. */
    stat: NamedAPIResource,
    /** The effort points (EV) the pokemon has in the stat. */
    effort: number,
    /** The base value of the stat. */
    base_stat: number
}

/** https://pokeapi.co/docs/v2#pokemonability */
export type PokemonAbility = {
    /** Whether or not this is a hidden ability */
    is_hidden: boolean,
    /** The slot this ability occupies in this Pokémon species */
    slot: number,
    /** The ability the Pokémon may have */
    ability: NamedAPIResource
}

/** https://pokeapi.co/docs/v2#namedapiresource */
export type NamedAPIResource = {
    /** The name of the referenced resource. */
    name: string,
    /** The URL of the referenced resource. */
    url: string
}

export type LocationAreaEncounter = {
    /** The location area the referenced Pokémon can be encountered in */
    location_area: NamedAPIResource,
    /** A list of versions and encounters with the referenced Pokémon that might happen */
    version_details: any[],
}