export * from "./api";
export * from "./auth";
export * from "./constants";
export * from "./crud";
export * from "./formValidation";
export * from "./logging";
export * from "./testUtil";
export * from "./user";

export type OnError = (err: Error) => any;

export const tryCatch = (func: Function, onError: OnError) => {
    try {
        return func();
    } catch(err) {
        return onError(err as Error);
    }
};