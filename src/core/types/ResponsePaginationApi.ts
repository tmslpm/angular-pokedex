export type ResponsePaginationApi<V0, V1> = {
    hasPrevious: boolean,
    previous: string,
    hasNext: boolean,
    next: string,
    results: V0,
    other: V1,
}