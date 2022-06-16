import prisma from "../../prisma/prisma";
import { Api, createJsonPayload, LogData, LogTypes } from "~/util";

export const log = async (logData: LogData) => {
    const loggingRes = createJsonPayload(false, Api.SOMETHING_WENT_WRONG);

    if(process.env.ENABLE_LOGGING !== "true") {
        return loggingRes;
    }

    switch(logData.type) {
        case LogTypes.ERROR:
            await commitErrorLog(logData);
            break;
    }

    return loggingRes;
};

const commitErrorLog = async (logData: LogData) => {
    await prisma.log.create({
        data: {
            ...logData,
            message: logData?.message as string
        } 
    });
};