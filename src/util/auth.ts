import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";

export const getPropsOrRedirect = async (req: IncomingMessage, props: any) => {
    const session = await getSession({ req });
    if(!session && props.path !== "/") {
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