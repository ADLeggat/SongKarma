export * from "./api";
export * from "./auth";
export * from "./constants";
export * from "./crud";
export * from "./formValidation";
export * from "./user";

// export type VoidPromiseFunction = (...params: unknown[]) => Promise<void>;
export type VoidPromiseFunction = () => Promise<any>;
export type OnError = (err: Error) => any;

export const tryCatchAsync = async (func: VoidPromiseFunction, onError: OnError) => {
    try {
        await func();
    } catch(err) {
        onError(err as Error);
    }
};