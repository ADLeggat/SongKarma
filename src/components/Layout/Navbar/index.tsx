import BsNavbar from "react-bootstrap/Navbar";
import Image from "next/image";
import Nav from "react-bootstrap/Nav";
import NavLink from "~/components/Layout/NavLink";
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
                    <NavLink href="/howItWorks" link="How it Works" isActive={path === "howItWorks"} />
                    <NavLink href="/news" link="Karma News" isActive={path === "news"} />
                    <NavLink href="/myKarma" link="My Karma" isActive={path === "myKarma"} />
                    <NavLink href="/charts" link="Charts" isActive={path === "charts"} />
                    <NavLink href="/radio" link="Radio" isActive={path === "radio"} />
                    <NavLink href="/contact" link="Contact" isActive={path === "contact"} />
                    <NavLink href="" link="Login/Register" isActive={path === "login"} />
                </Nav>
            </BsNavbar.Collapse>
        </BsNavbar>
    );
}

export default Navbar;