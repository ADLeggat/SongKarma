import { NextApiResponse } from "next";
import { ApiRequest, tryCatchAsync } from "~/util";
import { Crud } from "./constants";
import { validate } from "./formValidation";


export const createWithValidation = async (req: ApiRequest, res: NextApiResponse, tableName: string, func: Function) => {
    const errors = await validate(req);
    if(errors.length !== 0){
        return getValidationErrorMessage(tableName, errors);
    }

    tryCatchAsync(
        async () => await func(), 
        err => getCrudErrorMessage(tableName, Crud.CREATING)
    );
};

const getValidationErrorMessage = (tableName: string, errors: string[]) => {
    return `${tableName} validation errors: ${errors}`;
}

const getCrudErrorMessage = (tableName: string, operation: string) => {
    return `There was a problem ${operation} the ${tableName}`;
};

export const buildResponse = (success: boolean, data: any) => {
    return {
        success,
        data
    };
}