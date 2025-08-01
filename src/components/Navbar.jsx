import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import "../styles/global.css";
import logo from '/MottosoLogoPuro.png';
import { FaHome, FaHandHoldingUsd, FaNewspaper, FaPhone } from "react-icons/fa";
import { MdRealEstateAgent, MdBusinessCenter } from "react-icons/md";
import ScrollToTopButton from './ScrollToTop';

export default function Navbar() {
    return (
        <>
            <nav className="nav-glass">
                <div className="nav-logo">
                    <img src={logo} alt="Mottoso" id="logo" />
                    <img src="/logo-name.png" alt="Mottoso-name" className='lg-name' />
                </div>

                <ul className="nav-links">
                    <CustomLink to="/"><FaHome />Inicio</CustomLink>
                    <CustomLink to="/estate"><MdRealEstateAgent />Inmuebles</CustomLink>
                    <CustomLink to="/appraisals"><FaHandHoldingUsd />Tasaciones</CustomLink>
                    <CustomLink to="/news"><FaNewspaper />Novedades</CustomLink>
                    <CustomLink to="/enterprise"><MdBusinessCenter />La Empresa</CustomLink>
                    <CustomLink to="/contact"><FaPhone />Contacto</CustomLink>
                </ul>
            </nav>

            <ScrollToTopButton />
        </>
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