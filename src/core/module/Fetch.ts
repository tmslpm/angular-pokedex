export const responseIsJSON = (r: Response) => {
    let contentType = r.headers.get("content-type");
    return (contentType && contentType.indexOf("application/json") !== -1)
}

export const getJSON = async (endpoint: string) => {
    const r = await fetch(endpoint);
    if (!r.ok) throw new Error("no response received");
    if (!responseIsJSON(r)) throw new Error("bad content-type");
    return await r.json();
};

export async function fetchJSON<T>(endpoint: string): Promise<T> {
    const r = await fetch(endpoint);
    if (!r.ok)
        throw new Error("no response received");
    if (!responseIsJSON(r))
        throw new Error("bad content-type");
    return r.json();
}
