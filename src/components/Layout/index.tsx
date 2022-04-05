import { ReactNode } from "react";
import Head from "./Head";
import Navbar from "./Navbar";
import styles from "./index.module.scss";

interface Props {
    children: ReactNode;
    path: string;
    title: string;
};

const Layout= (props: Props) => {
    const { children, path, title } = props;

    return (
        <>
            <Head title={title}/>
            <Navbar path={path}/>
            <div className={styles.Main}>
                {children}
            </div>
        </>
    )
}

export default Layout;
