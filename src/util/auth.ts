import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";

export const getPropsOrRedirect = async (req: IncomingMessage, props: object = {}) => {
    const session = await getSession({ req });
    if(!session) {
        return loggedOutRootRedirect();
    }

    return {
        props: {
            session,
            ...props
        }
    };
}

const loggedOutRootRedirect = () => {
    return {
        redirect: {
            destination: "/",
            permanent: false,
        }
    }
}