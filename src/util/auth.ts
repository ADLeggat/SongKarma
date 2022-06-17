import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";
import { promisify } from "util";
import { randomBytes } from "crypto";
import { Routes } from "./constants";
import { doCallout, PATCH } from "./api";

export const getPropsOrRedirect = async (req: IncomingMessage, props: any) => {
    const session = await getSession({ req });

    if(!session && Routes.PROTECTED.includes(props.path)) {
        return redirect("/");
    } else if(session && (props.path === "/auth" || props.path === "/")) {
        return redirect("/myKarma");
    }

    return {
        props: {
            session,
            ...props
        }
    };
};

const redirect = (path: string) => {
    return {
        redirect: {
            destination: path,
            permanent: false,
        }
    }
};

export const generateToken = async (size: number) => {
    const getRandomBytes = promisify(randomBytes);
    const buffer = await getRandomBytes(size);
    const token = buffer.toString('hex');
    return token;
};

export const updateUserOnEmailVerification = async (id: string, fields: unknown) => {
    return await doCallout(PATCH, `/api/auth/verify/${id}`, fields);
}