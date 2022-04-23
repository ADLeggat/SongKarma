import { GetServerSideProps } from "next";
import { useState } from "react";
import Layout from "~/components/Layout";
import SignIn from "~/components/Auth/SignIn";
import SignUp from "~/components/Auth/SignUp";
import { Session } from "next-auth";
import { getPropsOrRedirect } from "~/util";

export const getServerSideProps: GetServerSideProps = async (context) => {
    return getPropsOrRedirect(context.req, { path: "/auth" });
};

interface Props {
    path: string;
    session: Session;
};

const index = (props: Props) => {
    const { path, session } = props;
    const [hasAccount, setHasAccount] = useState(true);

    return (
        <Layout path={path} session={session} title="Auth">
            {hasAccount ? 
                <SignIn setHasAccount={setHasAccount}/> : 
                <SignUp setHasAccount={setHasAccount}/>
            }
        </Layout>
    );
}

export default index;