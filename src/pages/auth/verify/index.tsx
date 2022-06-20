import { GetServerSideProps } from "next";
import { getPropsOrRedirect } from "~/util";
import { Session } from "next-auth";
import Layout from "~/components/Layout";

export const getServerSideProps: GetServerSideProps = async (context) => {
    return getPropsOrRedirect(context.req, { path: "/auth/verify" });
};

interface Props {
    path: string;
    session: Session;
};

const index = (props: Props) => {
    const { path, session } = props;

    return (
        <Layout path={path} session={session} title="Verify">
            <p className="centre mt-5">
                Thank you for signing up.
                Please check your email inbox for a verification email.
            </p>
        </Layout>
    );
}

export default index;