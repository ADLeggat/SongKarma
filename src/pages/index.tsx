import { NextPage } from "next";
import Layout from "~/components/Layout";
import styles from "./index.module.scss";

const Home: NextPage = () => {
    return (
        <div>
            <Layout path="/" title="Home">
                <div className={styles.Strapline}>
                    The Peer <br/>
                    To Peer <br/>
                    Songwriter <br/>
                    Charts
                </div>
            </Layout>
        </div>
    );
};

export default Home;
