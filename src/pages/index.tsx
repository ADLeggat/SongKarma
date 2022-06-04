import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Layout from "~/components/Layout";
import styles from "./index.module.scss";
import { getPropsOrRedirect } from "~/util";

export const getServerSideProps: GetServerSideProps = async (context) => {
    return getPropsOrRedirect(context.req, { path: "/" });
};
interface Props {
    path: string;
    session: Session;
};

const index = (props: Props) => {
    const { path, session } = props;
    return (
        <div>
            <Layout path={path} session={session} title="Home">
                <Container className={styles.Container}>
                    <div className={styles.Strapline}>
                        The Peer <br/>
                        To Peer <br/>
                        Songwriter <br/>
                        Charts
                    </div>
                    <div className={styles.Brand}>
                        <Image src="/brandWordless.png" height="620" width="750" layout="responsive" priority></Image>
                    </div>
                </Container>
            </Layout>
        </div>
    );
};

export default index;
