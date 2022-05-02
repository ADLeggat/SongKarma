import { NextApiResponse } from "next";
import { ApiRequest, tryCatchAsync } from "~/util";
import { Crud } from "./constants";
import { validate } from "./formValidation";


export const createWithValidation = async (req: ApiRequest, res: NextApiResponse, tableName: string, create: Function) => {
    const errors = await validate(req);
    if(errors.length !== 0){
        return getValidationErrorMessage(tableName, errors);
    }

    return await tryCatchAsync(
        async () => { 
            const response = await create();
            return response;
        }, 
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