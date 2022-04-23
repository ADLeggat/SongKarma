import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";
import { protectedRoutes } from "./constants";

export const getPropsOrRedirect = async (req: IncomingMessage, props: any) => {
    const session = await getSession({ req });

    if(!session && protectedRoutes.includes(props.path)) {
        return redirect("/");
    } else if(session && props.path === "/auth") {
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
}