export * from "./constants";
export * from "./formValidation";

export type VoidPromiseFunction = (...params: unknown[]) => Promise<void>;
export type OnError = (err: Error) => void;

export const attempt = async (func: VoidPromiseFunction, onError: OnError) => {
    try {
        await func();
    } catch(err) {
        onError(err as Error);
    }
};