import BsNavbar from "react-bootstrap/Navbar";
import Image from "next/image";
import Nav from "react-bootstrap/Nav";
import NavLink from "../NavLink";
import styles from "./index.module.scss";

interface Props {
    path: string
};

const Navbar = (props: Props) => {
    const { path } = props;

    return (
        <BsNavbar expand="lg" className={styles.NavStyle}>
            <BsNavbar.Brand href='/' className={styles.Brand}>
                <Image src="/brand.png" width={260} height={200}/>
            </BsNavbar.Brand>
            <BsNavbar.Toggle aria-controls="responsive-navbar-nav" />
            <BsNavbar.Collapse id="responsive-navbar-nav">
                <Nav>
                    <NavLink link="How it Works" isActive={path === "howItWorks"} />
                    <NavLink link="Karma News" isActive={path === "news"} />
                    <NavLink link="My Karma" isActive={path === "myKarma"} />
                    <NavLink link="Charts" isActive={path === "charts"} />
                    <NavLink link="Radio" isActive={path === "radio"} />
                    <NavLink link="Contact" isActive={path === "contact"} />
                    <NavLink link="Login/Register" isActive={path === "login"} />
                </Nav>
            </BsNavbar.Collapse>
        </BsNavbar>
    );
}

export default Navbar;