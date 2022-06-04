export interface LogData {
    userId: string;
    type: string;
    context: string;
    error?: Error;
};

export const LogTypes = {
    ERROR: "error"
};

export const LogContexts = {
    API: "api",
    CLIENT: "client",
    CRUD: "crud"
};

export const log = (logData: LogData) => {

    if(process.env.ENABLE_LOGGING !== "true") {
        return;
    }

    console.log("LOGGING");

    switch(logData.type) {
        case LogTypes.ERROR:
            commitErrorLog(logData);
            break;
    }
};

const commitErrorLog = (logData: LogData) => {
    // extract error log data
    // save to db
};