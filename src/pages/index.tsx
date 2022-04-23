import Image from "next/image";
import Container from "react-bootstrap/Container";
import Layout from "~/components/Layout";
import styles from "./index.module.scss";

const index = () => {
    return (
        <div>
            <Layout path="/" title="Home">
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
