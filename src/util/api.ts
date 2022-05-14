import { NextApiRequest } from "next";
import { ObjectSchema } from "yup";
import { Api, Crud } from "./constants";

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
    validations?: ObjectSchema<any, any, any, any>
};

export interface ApiResponse {
    statusCode: number;
    success: boolean;
    message?: string;
    data?: any;
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

export const createJsonPayload = (success: boolean, message: string, data: any=null) => {
    const payload: ApiResponse = {
        statusCode: getStatusCode(success, message),
        success,
        message
    };

    if(data){
        payload.data = data;
    }

    return payload;
};

const getStatusCode = (success: boolean, resMessage: string) => {
    let code = success? 200 : 400;

    if(resMessage.includes(Crud.CREATED)) {
        code = 201;
    } else if(resMessage === Api.METHOD_NOT_ALLOWED) {
        code = 405;
    }

    return code;
};