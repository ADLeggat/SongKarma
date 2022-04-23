import { doCallout, POST } from "~/util/api";

export const signup = async (fields: unknown) => {
    const data = await doCallout(POST, "/api/users/signup", fields);
    return data;
};