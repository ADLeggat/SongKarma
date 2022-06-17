import { doCallout, GET, POST } from "~/util/api";

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
    return await doCallout(POST, "/api/users/signup", fields);;
};

export const getUser = async (id: string, isSignup: boolean) => {
    return await doCallout(GET, `/api/users/${id}?su=${isSignup}`);
};