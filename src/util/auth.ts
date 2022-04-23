import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";

export const getPropsOrRedirect = async (req: IncomingMessage, props: any) => {
    const session = await getSession({ req });

    if(!session && props.path !== "/") {
        return loggedOutRedirect();
    } else if(session && props.path === "auth") {
        return loggedInRedirect();
    }

    return {
        props: {
            session,
            ...props
        }
    };
};

const loggedOutRedirect = () => {
    return {
        redirect: {
            destination: "/",
            permanent: false,
        }
    }
};

const loggedInRedirect = () => {
    return {
        redirect: {
            destination: "/myKarma",
            permanent: false,
        }
    }
};