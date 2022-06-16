import { NextApiResponse } from "next";
import { compare, hashSync } from "bcryptjs";
import prisma from "../../prisma/prisma";
import { 
    Api, ApiRequest, createJsonPayload, createWithValidation, Crud, generateToken, getCrudSuccessMessage, 
    passwordValidation, userDetailsValidation, UserEntity, UserDetailsFormFields
} from "~/util";
import { User } from "next-auth";
interface SessionUser {
    id: string;
    username: string;
};

export const signup = async (req: ApiRequest) => {
    req.validations = userDetailsValidation.concat(passwordValidation);

    return await createWithValidation(req, UserEntity.TABLE_NAME, async () => {
        let user = await findUserByEmail(req.body.email);

        if(!user) {
            const sessionUser = await createUser(req.body);
            return createJsonPayload(true, getCrudSuccessMessage(UserEntity.TABLE_NAME, Crud.CREATED), sessionUser);
            return {};
        } else {
            return createJsonPayload(false, UserEntity.USER_EXISTS);
        }
    });
};

const createUser = async (data: UserDetailsFormFields) => {
    const authToken = await generateToken(32);
    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: hashSync(data.password, 12),
            username: data.username,
            artistName: data.artistName,
            artistBio: data.artistBio,
            receiveNews: data.receiveNews,
            isEmailVerified: false,
            authToken
        }
    });

    return getSessionUser(user);
};

export const login = async (credentials: Record<string, string>) => {
    const { email, password } = credentials;
    const user = await findUserByEmail(email);
    
    if(user) {
        return await getSessionUserIfPasswordMatch(user, password);
    }

    return createJsonPayload(false, UserEntity.NO_USER_FOUND);
};

const getSessionUserIfPasswordMatch = async (user: User, password: string) => {
    const passwordsMatch = await compare(password, user.password);

    if(passwordsMatch){
        const sessionUser = getSessionUser(user);
        return createJsonPayload(true, Api.GENERIC_SUCCESS_MESSAGE, sessionUser);
    } else {
        return createJsonPayload(false, UserEntity.PASSWORD_ENTERED_INCORRECTLY);
    }
};

const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email
        }
    });
};

const getSessionUser = (user: User) => {
    return {
        id: user.id,
        username: user.username
    };
};