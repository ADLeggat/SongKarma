export * from "./api";
export * from "./auth";
export * from "./constants";
export * from "./crud";
export * from "./formValidation";
export * from "./testUtil";
export * from "./user";

export type AnyPromiseFunction = () => Promise<any>;
export type OnError = (err: Error) => any;

export const tryCatchAsync = async (func: AnyPromiseFunction, onError: OnError) => {
    try {
        return await func();
    } catch(err) {
        return onError(err as Error);
    }
};