import Layout from "~/components/Layout";
import { GetServerSideProps } from "next";
import { getPropsOrRedirect } from "~/util";
import { Session } from "next-auth";

export const getServerSideProps: GetServerSideProps = async (context) => {
    return getPropsOrRedirect(context.req, { path: "/contact" });
};

interface Props {
    path: string;
    session: Session;
};

const index = (props: Props) => {
    const { path, session } = props;
    return (
        <Layout path={path} session={session} title="Contact">
            CONTACT
        </Layout>
    );
}

export default index;