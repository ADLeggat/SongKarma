import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import styles from "./index.module.scss";

interface Props {
    href?: string;
    link: string;
    isActive?: boolean;
};

const NavLink = (props: Props) => {
    const { href, link, isActive } = props;

    let navLink = (
        <Nav.Link className={`${styles.LinkStyle} ${isActive && styles.Active}`}>
            {link}
        </Nav.Link>
    );

    if(href) {
        navLink = (
            <Link href={href} passHref>
                {navLink}
            </Link>
        );
    }

    return navLink;
}

export default NavLink;