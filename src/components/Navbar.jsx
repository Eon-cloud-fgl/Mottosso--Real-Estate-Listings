import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '/MottosoLogo.png';
export default function Navbar() {
    return (
        <nav className='nav'>
            <img src={logo} alt="Mottoso" id='logo'/>
            <ul>
            <CustomLink to="/">Inicio</CustomLink>
            <CustomLink to="/estate">Inmuebles</CustomLink>
            <CustomLink to="/appraisals">Tasaciones</CustomLink>
            <CustomLink to="/news">Novedades</CustomLink>
            <CustomLink to="/enterprise">La Empresa</CustomLink>
            <CustomLink to="/contact">Contacto</CustomLink>
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
