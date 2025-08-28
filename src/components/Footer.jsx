import "../styles/footer.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram } from "react-icons/fa";

function Footerinfo() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Contacto</h4>
                    <p><FaPhoneAlt /> 2252-4852-290</p>
                    <p><FaPhoneAlt /> 2252-412-525</p>
                    <p><FaEnvelope /> mottosopropiedades@gmail.com</p>
                </div>
                <div className="footer-section">
                    <h4>Donde nos encontramos</h4>
                    <p><FaMapMarkerAlt /> Av. Talas del Tuyú Nº 3295, San Clemente</p>
                </div>
                <div className="footer-section">
                    <h4>Seguinos</h4>
                    <p><FaInstagram /> @mottosopropiedades</p>
                    <p><FaFacebook /> Mottoso Propiedades</p>
                </div>
            </div>
            <div className="footer-bottom">
                © {new Date().getFullYear()} Mottoso. Todos los derechos reservados.
            </div>
        </footer>
    );
}

function CreatorLinks() {
    return (
        <div className="creator-links">
            <p>Desarrollado por <a href="https://ottersolutions.netlify.app/" target="_blank" rel="noopener noreferrer">Otter Solutions</a></p>
        </div>
    );
}

export default function Footer() {
    return (
        <>
            <Footerinfo />
            <CreatorLinks />
        </>
    );
}
