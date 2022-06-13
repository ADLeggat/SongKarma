import prisma from "../../prisma/prisma";
import { Api, createJsonPayload, LogData, LogTypes } from "~/util";

export const log = async (logData: LogData) => {

    if(process.env.ENABLE_LOGGING !== "true") {
        return;
    }

    switch(logData.type) {
        case LogTypes.ERROR:
            await commitErrorLog(logData);
            break;
    }

    return createJsonPayload(false, Api.SOMETHING_WENT_WRONG);
};

const commitErrorLog = async (logData: LogData) => {
    await prisma.log.create({
        data: {
            ...logData,
            message: logData?.message as string
        } 
    });
};