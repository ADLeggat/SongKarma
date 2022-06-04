export const LOGGING_URI = "/api/log";

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