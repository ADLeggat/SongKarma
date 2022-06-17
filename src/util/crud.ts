import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { ApiRequest, createJsonPayload, doCallout, LogContexts, LOGGING_URI, LogTypes, POST } from "~/util";
import { Crud } from "./constants";
import { validate } from "./formValidation";

export const getRecords = async (tableName: string, func: Function) => {
    let session = await getSession();

    try{
        const records = await func();
        return createJsonPayload(true, getCrudSuccessMessage(tableName, Crud.RETRIEVED), records);
    } catch(err){
        await doCallout(POST, `${process.env.NEXTAUTH_URL}/${LOGGING_URI}`, {
            userId: session?.user.id,
            type: LogTypes.ERROR,
            context: LogContexts.CRUD,
            message: (err as Error).message
        });
        return createJsonPayload(false, getCrudErrorMessage(tableName, Crud.RETRIEVING));
    }
};

export const createWithValidation = async (req: ApiRequest, tableName: string, create: Function) => {
    return upsertWithValdiation(req, tableName, create, Crud.CREATING);
};

export const updateWithValidation = async (req: ApiRequest, tableName: string, update: Function) => {
    return upsertWithValdiation(req, tableName, update, Crud.UPDATING);
};

const upsertWithValdiation = async (req: ApiRequest, tableName: string, upsert: Function, operation: string) => {
    const errors = await validate(req);
    if(errors.length !== 0){
        return getValidationErrorMessage(tableName, errors);
    }

    return upsertRecord(req, tableName, upsert, operation);
};

export const upsertRecord = async (req: ApiRequest, tableName: string, upsert: Function, operation: string) => {
    const session = await getSession();

    try {
        return await upsert();
    } catch(err) {
        console.log(err);
        await doCallout(POST, `${process.env.NEXTAUTH_URL}/${LOGGING_URI}`, {
            userId: session?.user.id,
            email: req.body.email,
            type: LogTypes.ERROR,
            context: LogContexts.CRUD,
            message: (err as Error).message
        });
        return createJsonPayload(false, getCrudErrorMessage(tableName, operation));
    }
}

const getValidationErrorMessage = (tableName: string, errors: string[]) => {
    return `${tableName} validation errors: ${errors}`;
};

export const getCrudSuccessMessage = (tableName: string, operation: string) => {
    return `${capitalise(tableName)} successfully ${operation}`;
};

const capitalise = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const getCrudErrorMessage = (tableName: string, operation: string) => {
    return `There was a problem ${operation} the ${tableName}`;
};