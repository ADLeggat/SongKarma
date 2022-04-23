import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import Layout from "~/components/Layout";
import FAQ from "~/components/HowItWorks/FAQ";
import { getPropsOrRedirect } from "~/util";

export const getServerSideProps: GetServerSideProps = async (context) => {
    return getPropsOrRedirect(context.req, { path: "/howItWorks" });
};
interface Props {
    path: string;
    session: Session;
};

const index = (props: Props) => {
    const { path, session } = props;
    
    return (
        <Layout path={path} session={session} title="How it Works">
            <div className="mt-5 mx-5">
                <FAQ/>
            </div>
        </Layout>
    );
};

export default index;