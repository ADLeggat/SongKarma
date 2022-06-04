import { GetServerSideProps } from "next";
import { getPropsOrRedirect } from "~/util";
import Layout from "~/components/Layout";
import { Session } from "next-auth";

export const getServerSideProps: GetServerSideProps = async (context) => {
    return getPropsOrRedirect(context.req, { path: "/myKarma" });
};
interface Props {
    path: string;
    session: Session
};

const index = (props: Props) => {
    const { path, session } = props;
    return (
        <Layout path={path} session={session} title="My Karma">
            MY KARMA
        </Layout>
    );
}

export default index;