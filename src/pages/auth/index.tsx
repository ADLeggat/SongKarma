import { GetServerSideProps } from "next";
import { useState } from "react";
import Layout from "~/components/Layout";
import { SignIn, SignUp } from "~/components/Auth";
import { Session } from "next-auth";
import { getPropsOrRedirect } from "~/util";
import { withMessage } from "~/hocs";

export const getServerSideProps: GetServerSideProps = async (context) => {
    return getPropsOrRedirect(context.req, { path: "/auth" });
};

interface Props {
    path: string;
    session: Session;
    updateMessage(setShowModal: Function|null, success: boolean, message: string): void;
};

const index = (props: Props) => {
    const { path, session, updateMessage } = props;
    const [hasAccount, setHasAccount] = useState(true);

    return (
        <Layout path={path} session={session} title="Auth">
            {hasAccount ? 
                <SignIn setHasAccount={setHasAccount} updateMessage={updateMessage}/> : 
                <SignUp setHasAccount={setHasAccount} updateMessage={updateMessage}/>
            }
        </Layout>
    );
}

export default withMessage(index);