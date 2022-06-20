import { ReactNode } from "react";
import Head from "./Head";
import Navbar from "./Navbar";
import styles from "./index.module.scss";
import { Session } from "next-auth";

interface Props {
    children: ReactNode;
    path?: string;
    session?: Session
    title: string;
};

const Layout= (props: Props) => {
    const { children, path, session, title } = props;

    return (
        <>
            <Head title={title}/>
            <Navbar path={path} session={session}/>
            <div className={styles.Main}>
                {children}
            </div>
        </>
    )
}

export default Layout;
