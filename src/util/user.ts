import { doCallout, POST } from "~/util/api";

export interface UserDetailsFormFields extends UserLoginFormFields {
    confirmPassword: string;
    username: string;
    artistName: string,
    artistBio?: string;
    profilePic?: string;
    receiveNews: boolean;
};

export interface UserLoginFormFields {
    email: string;
    password: string;
};

export const signup = async (fields: unknown) => {
    const data = await doCallout(POST, "/api/users/signup", fields);
    return data;
};