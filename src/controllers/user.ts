import { NextApiResponse } from "next";
import { hashSync } from "bcryptjs";
import prisma from "../../prisma/prisma";
import { 
    ApiRequest, buildResponse, createWithValidation, generateToken, passwordValidation, userDetailsValidation, 
    UserEntity, UserDetailsFormFields
} from "~/util";

interface LoginResponse {
    user: SessionUser
}

interface SessionUser {
    id: string;
    username: string;
};

export const signup = async (req: ApiRequest, res: NextApiResponse) => {
    req.validations = userDetailsValidation.concat(passwordValidation);

    return await createWithValidation(req, res, UserEntity.TABLE_NAME, async () => {
        let user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });

        if(!user) {
            const sessionUser = await createUser(req.body);
            return buildResponse(true, sessionUser);
        } else {
            return buildResponse(false, null);
        }
    });
};

const createUser = async (data: UserDetailsFormFields) => {
    try {
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
    
        return {
            id: user.id,
            username: user.username
        };
    } catch(err) {
        // return error respnose
    }
};

export const login = async (credentials: Record<string, string>): Promise<LoginResponse> => {
    return { user: { id: "1", username: "test" } };
};