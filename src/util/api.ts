const HEADERS = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};

export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const PATCH = "PATCH";
export const DELETE = "DELETE";

export const doCallout = async (method: string, endpoint: string, body: unknown=null) => {
    if(body) {
        body = JSON.stringify(body);
    }

    const res = await fetch(endpoint, {
        method,
        headers: HEADERS,
        body: body as BodyInit
    });
    if(!res.ok){
        throw new Error(res.statusText);
    } else {
        const data = await res.json();
        return data;
    }
    
};