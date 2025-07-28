import { Link } from 'react-router-dom';
import '../styles_admin/NavbarAdmin.css';
import "../styles/global.css";
import logo from '/MottosoLogoBlanco.png';
import { MdOutlineLogout } from "react-icons/md";
import { FaHome } from "react-icons/fa";
export default function NavbarAdmin() {
    return (
        <nav className="nav-admin">
            <img src={logo} alt="Mottoso" id="logo" />
            <ul className="nav-links-admin">
                <CustomLink to="/">Inicio<FaHome/></CustomLink>
                <CustomLink to="/">Cerrar Session<MdOutlineLogout/></CustomLink>
            </ul>
        </nav>

    );
}

function CustomLink({ to, children, ...props }) {
    const path = window.location.pathname;
    return (
        <li className={path === to ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}
