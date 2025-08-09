import { Link, useNavigate } from 'react-router-dom';
import '../styles_admin/NavbarAdmin.css';
import "../styles/global.css";
import logo from '/MottosoLogoBlanco.png';
import { MdOutlineLogout } from "react-icons/md";
import { FaHome } from "react-icons/fa";

export default function NavbarAdmin() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Llamada a tu API PHP para destruir la sesión
            await fetch("/api/controller/logout.php", {
                method: "POST",
                credentials: "include" // Importante para enviar cookies de sesión
            });
        } catch (error) {
            console.error("Error cerrando sesión:", error);
        } finally {
            // Redirigir al login o inicio
            navigate("/admin/login");
        }
    };

    return (
        <nav className="nav-admin">
            <img src={logo} alt="Mottoso" id="logo" />
            <ul className="nav-links-admin">
                <CustomLink to="/">Inicio<FaHome/></CustomLink>
                <li onClick={handleLogout} style={{cursor: "pointer", color: "white"}}>
                    Cerrar Sesión <MdOutlineLogout/>
                </li>
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
