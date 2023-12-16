export const responseIsJSON = (r: Response) => {
    let contentType = r.headers.get("content-type");
    return (contentType && contentType.indexOf("application/json") !== -1)
}

export const postJSON = async (endpoint: string, data: any) => {
    const r = await fetch(endpoint, { method: "POST", body: JSON.stringify(data) });
    if (!r.ok) throw new Error("no response received");
    if (!responseIsJSON(r)) throw new Error("bad content-type");
    return await r.json();
};

export const getJSON = async (endpoint: string) => {
    const r = await fetch(endpoint);
    if (!r.ok) throw new Error("no response received");
    if (!responseIsJSON(r)) throw new Error("bad content-type");
    return await r.json();
};

