import { NextApiResponse } from "next";
import { User } from "@prisma/client";
import db from "../../prisma/prisma";
import { 
    ApiRequest, buildResponse, createWithValidation, generateToken, passwordValidation, userDetailsValidation, UserEntity 
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

    return createWithValidation(req, res, UserEntity.TABLE_NAME, async () => {
        let user = await db.user.findUnique({
            where: {
                email: req.body.email
            }
        });

        if(!user) {
            const authToken = await generateToken(32);
            user = await db.user.create({
                data: {
                    ...req.body,
                    authToken
                }
            });
            const sessionUser = createSessionUser(user);
            return buildResponse(true, sessionUser);
        } else {
            return buildResponse(false, null);
        }
    });
};

const createSessionUser = (user: User) => {
    return {
        id: user.id,
        username: user.username
    };
};

export const login = async (credentials: Record<string, string>): Promise<LoginResponse> => {
    return { user: { id: "1", username: "test" } };
};