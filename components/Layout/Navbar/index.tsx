import BsNavbar from "react-bootstrap/Navbar";
import Image from "next/image";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import styles from "./index.module.scss";

interface Props {
    path: string
};

const Navbar = (props: Props) => {
    return (
        <BsNavbar expand="lg" className={styles.NavStyle}>
            <BsNavbar.Brand href='/' className={styles.Brand}>
                <Image src="/brand.png" width={260} height={200}/>
            </BsNavbar.Brand>
            <BsNavbar.Toggle aria-controls="responsive-navbar-nav" />
            <BsNavbar.Collapse id="responsive-navbar-nav">
                <Nav>
                    <Link href='/' passHref>
                        <Nav.Link className={styles.LinkStyle}>
                            How it Works
                        </Nav.Link>
                    </Link>
                    <Link href='/' passHref>
                        <Nav.Link className={styles.LinkStyle}>
                            Karma News
                        </Nav.Link>
                    </Link>
                    <Link href='/' passHref>
                        <Nav.Link className={styles.LinkStyle}>
                            My Karma
                        </Nav.Link>
                    </Link>
                    <Link href='/' passHref>
                        <Nav.Link className={styles.LinkStyle}>
                            Charts
                        </Nav.Link>
                    </Link>
                    <Link href='/' passHref>
                        <Nav.Link className={styles.LinkStyle}>
                            Radio
                        </Nav.Link>
                    </Link>
                    <Link href='/' passHref>
                        <Nav.Link className={styles.LinkStyle}>
                            Contact
                        </Nav.Link>
                    </Link>
                    <Link href='/' passHref>
                        <Nav.Link className={styles.LinkStyle}>
                            Login/Register
                        </Nav.Link>
                    </Link>
                </Nav>
            </BsNavbar.Collapse>
        </BsNavbar>
    );
}

export default Navbar;