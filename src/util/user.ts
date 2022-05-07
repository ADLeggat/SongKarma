import { doCallout, POST } from "~/util/api";

export interface UserDetailsFormFields {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
    artistName: string,
    artistBio?: string;
    profilePic?: string;
    receiveNews: boolean;
};

export const signup = async (fields: unknown) => {
    const data = await doCallout(POST, "/api/users/signup", fields);
    return data;
};