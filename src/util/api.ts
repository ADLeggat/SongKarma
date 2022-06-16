import axios from "axios";
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
    validations?: ObjectSchema<any, any, any, any>;
    message?: string;
};

export interface ApiResponse {
    statusCode: number;
    success: boolean;
    message?: string;
    data?: any;
};

export const doCallout = async (method: string, url: string, data?: unknown) => {
    try {
        const res = await axios({method, headers: HEADERS, url, data});
    
        if(!res.data.success){
            throw new Error(res.statusText);
        } else {
            return res.data;
        }
    } catch(err) {
        console.log(err);
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
    let code = 200;

    if(resMessage.includes(Crud.CREATED)) {
        code = 201;
    } else if(resMessage === Api.METHOD_NOT_ALLOWED) {
        code = 405;
    }

    return code;
};