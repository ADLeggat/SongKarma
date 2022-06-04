import prisma from "../../prisma/prisma";
import { LogData, LogTypes } from "~/util";

export const log = async (logData: LogData) => {
    console.log("log LOG DATA: ", logData)

    if(process.env.ENABLE_LOGGING !== "true") {
        return;
    }

    switch(logData.type) {
        case LogTypes.ERROR:
            await commitErrorLog(logData);
            break;
    }
};

const commitErrorLog = async (logData: LogData) => {

    await prisma.log.create({
        data: {
            ...buildBaseLog(logData),
            line: 1,
            message: logData?.message as string
        } 
    });
};

const buildBaseLog = (logData: LogData) => {
    return {
        type: logData.type,
        context: logData.context
    };
}