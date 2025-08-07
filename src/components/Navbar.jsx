import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import "../styles/global.css";
import logo from '/MottosoLogoPuro.png';
import { FaHome, FaHandHoldingUsd, FaNewspaper, FaPhone, FaBars, FaTimes } from "react-icons/fa";
import { MdRealEstateAgent, MdBusinessCenter } from "react-icons/md";
import ScrollToTopButton from './ScrollToTop';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <nav className="nav-glass">
                <div className="nav-logo">
                    <img src={logo} alt="Mottoso" id="logo" />
                    <img src="/logo-name.png" alt="Mottoso-name" className='lg-name' />
                </div>


                <div className="menu-toggle" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>

    
                <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <CustomLink to="/" closeMenu={closeMenu}><FaHome />Inicio</CustomLink>
                    <CustomLink to="/estate" closeMenu={closeMenu}><MdRealEstateAgent />Inmuebles</CustomLink>
                    <CustomLink to="/appraisals" closeMenu={closeMenu}><FaHandHoldingUsd />Tasaciones</CustomLink>
                    <CustomLink to="/news" closeMenu={closeMenu}><FaNewspaper />Novedades</CustomLink>
                    <CustomLink to="/enterprise" closeMenu={closeMenu}><MdBusinessCenter />La Empresa</CustomLink>
                    <CustomLink to="/contact" closeMenu={closeMenu}><FaPhone />Contacto</CustomLink>
                </ul>
            </nav>

            <ScrollToTopButton />
        </>
    );
}

function CustomLink({ to, children, closeMenu, ...props }) {
    const path = window.location.pathname;
    return (
        <li className={path === to ? "active" : ""} onClick={closeMenu}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}