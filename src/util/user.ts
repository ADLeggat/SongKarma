import { doCallout, POST } from "~/util/api";

export const signUp = async (fields: unknown) => {
    const data = await doCallout(POST, "/api/user/signup", fields);
    return data;
};