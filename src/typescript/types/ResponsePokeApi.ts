export type ResponsePokeApi<V> = {
    hasPrevious: boolean,
    previous: string,
    hasNext: boolean,
    next: string,
    results: V[],
}