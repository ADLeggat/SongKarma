import { NextApiRequest } from "next";
import { ObjectSchema } from "yup";

const HEADERS = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};

export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const PATCH = "PATCH";
export const DELETE = "DELETE";

export interface ApiRequest extends NextApiRequest {
    validations: ObjectSchema<any, any, any, any>
};

export const doCallout = async (method: string, endpoint: string, body?: unknown) => {
    const params: RequestInit = {
        method,
        headers: HEADERS
    };

    if(body) {
        params.body = JSON.stringify(body);
    }

    const res = await fetch(endpoint, params);

    if(!res.ok){
        throw new Error(res.statusText);
    } else {
        const data = await res.json();
        return data;
    }
    
};