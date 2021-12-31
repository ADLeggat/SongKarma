import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import styles from "./index.module.scss";

interface Props {
    link: string;
    isActive: boolean;
};

const NavLink = (props: Props) => {
    const { link, isActive } = props;
    return (
        <Link href='/' passHref>
            <Nav.Link className={`${styles.LinkStyle} ${isActive && styles.Active}`}>
                {link}
            </Nav.Link>
        </Link>
    );
}

export default NavLink;