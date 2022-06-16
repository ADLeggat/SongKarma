import { compare, hashSync } from "bcryptjs";
import prisma from "../../prisma/prisma";
import { 
    Api, ApiRequest, createJsonPayload, createWithValidation, Crud, generateToken, getCrudSuccessMessage, 
    passwordValidation, userDetailsValidation, UserEntity, UserDetailsFormFields, sendEmail, getSignupEmailParams, getRecords
} from "~/util";
import { User } from "next-auth";
import { getSession } from "next-auth/react";
interface GetUserWhereClause {
    id?: string;
    authToken?: string;
};

export const getUser = async (req: ApiRequest) => {
    return getRecords(UserEntity.TABLE_NAME, async() => {
        const where = await buildGetUserWhereClause(req);
        return await prisma.user.findUnique({ where });
    });
};

const buildGetUserWhereClause = async (req: ApiRequest) => {
    const isSignup = req.query.su === "true";
    const id = isSignup? req.query.authToken as string : (await getSession())!.user.id;

    const where: GetUserWhereClause = {};
    if(isSignup) {
        where.authToken = id;
    } else {
        where.id = id;
    }

    return where;
}

export const signup = async (req: ApiRequest) => {
    req.validations = userDetailsValidation.concat(passwordValidation);

    return await createWithValidation(req, UserEntity.TABLE_NAME, async () => {
        let user = await findUserByEmail(req.body.email);

        if(!user) {
            const authToken = await generateToken(32);
            await createUser(req.body, authToken);
            await sendEmail(getSignupEmailParams(req.body.email, authToken));
            return createJsonPayload(true, getCrudSuccessMessage(UserEntity.TABLE_NAME, Crud.CREATED));
        } else {
            return createJsonPayload(false, UserEntity.USER_EXISTS);
        }
    });
};

const createUser = async (data: UserDetailsFormFields, authToken: string) => {
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