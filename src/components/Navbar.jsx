import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
export default function Navbar() {
    return (
        <nav className='nav'>
            <Link to="/" className='site-title'>Montosso</Link>
            <ul>
            <CustomLink to="/pricing">Pricing</CustomLink>
            <CustomLink to="/about">About</CustomLink>
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