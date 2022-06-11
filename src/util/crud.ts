import { NextApiResponse } from "next";
import { ApiRequest, tryCatch } from "~/util";
import { Crud } from "./constants";
import { validate } from "./formValidation";


export const createWithValidation = async (req: ApiRequest, res: NextApiResponse, tableName: string, create: Function) => {
    const errors = await validate(req);
    if(errors.length !== 0){
        return getValidationErrorMessage(tableName, errors);
    }

    return await tryCatch(
        async () => await create(), 
        err => getCrudErrorMessage(tableName, Crud.CREATING)
    );
};

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