import BsNavbar from "react-bootstrap/Navbar";
import Image from "next/image";
import Nav from "react-bootstrap/Nav";
import NavLink from "~/components/Layout/NavLink";
import styles from "./index.module.scss";
import { Routes } from "~/util";
import { Session } from "next-auth";

interface Props {
    path: string;
    session: Session
};

const Navbar = (props: Props) => {
    const { path, session } = props;

    const pathMatches = (match: string) => {
        return path === match;
    }

    return (
        <BsNavbar expand="lg" className={styles.NavStyle}>
            <BsNavbar.Brand href='/' className={styles.Brand}>
                <Image src="/brand.png" width={260} height={200}/>
            </BsNavbar.Brand>
            <BsNavbar.Toggle aria-controls="responsive-navbar-nav" />
            <BsNavbar.Collapse id="responsive-navbar-nav">
                <Nav>
                    <NavLink href={Routes.HOW_IT_WORKS} link="How it Works" isActive={pathMatches(Routes.HOW_IT_WORKS)} />
                    
                    {session &&
                        <>
                            <NavLink href={Routes.NEWS} link="Karma News" isActive={pathMatches(Routes.NEWS)} />
                            <NavLink href={Routes.MY_KARMA} link="My Karma" isActive={pathMatches(Routes.MY_KARMA)} />
                            <NavLink href={Routes.CHARTS} link="Charts" isActive={pathMatches(Routes.CHARTS)} />
                            <NavLink href={Routes.RADIO} link="Radio" isActive={pathMatches(Routes.RADIO)} />
                            <NavLink href={Routes.CONTACT} link="Contact" isActive={pathMatches(Routes.CONTACT)} />
                        </>
                    }
                    {!session && 
                        <>
                            <NavLink href={Routes.AUTH} link="Login/Register" isActive={pathMatches(Routes.AUTH)} />
                        </>
                    }
                </Nav>
            </BsNavbar.Collapse>
        </BsNavbar>
    );
}

export default Navbar;