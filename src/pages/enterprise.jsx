import "../styles/enterprise.css";
import NavbarSeparator from "../components/Separator";
import { FaHome, FaKey, FaBuilding, FaHandshake, FaFileSignature } from 'react-icons/fa';



function Banner() {
    return (
        <>
            <div className="bn-container" id="titulo-tasaciones">
                <p className="fondo-texto">Sobre Nosotros</p>
            </div>
        </>
    );
}

function AboutUs() {
    return (
        <div className="about-us-container">
            <div className="au-img-container">
                <img src="/banner/about-us-banner.jpg" alt="about us" className="au-img" />
            </div>
            <div className="au-content-container">
                <div className="au-text-container">
                    <h2>Conoce a Mottoso Propiedades</h2>
                    <h3>En Mottoso Propiedades no solo acompañamos transacciones, acompañamos personas.</h3>
                    <p> Nos dedicamos a brindar servicios inmobiliarios integrales, con una mirada humana y un fuerte enfoque en la experiencia del cliente. Nuestra propuesta va más allá de mostrar propiedades: trabajamos para construir vínculos de confianza que perduren.</p>
                    <p>No creemos que este sea simplemente un negocio de metros cuadrados. Para nosotros, se trata de acompañar decisiones importantes, escuchar historias, entender necesidades y ofrecer soluciones reales.
                        Porque sabemos que detrás de cada búsqueda hay un proyecto de vida, un sueño por cumplir o una nueva etapa por comenzar.</p>

                    <h4>Para quienes buscan su próximo hogar</h4>

                    <p>Nuestro objetivo es brindar una atención cercana, transparente y personalizada, con la sensibilidad que requiere una decisión tan importante como mudarse.
                        No se trata de venderte una propiedad, se trata de ayudarte a encontrar ese lugar donde te sientas vos.
                        Te acompañamos durante todo el proceso, desde la primera consulta hasta el día en que abrís la puerta de tu nuevo espacio.</p>

                    <br />

                    <p><span>En Mottoso Propiedades, creemos que no vendemos casas: ayudamos a construir futuros.</span></p>



                </div>

                <Local />

            </div>

        </div>
    );
}

function Local() {
    return (
        <div className="local-container">
            <h2>Nuestra Sucursal</h2>
            <div className="local-content">
                <div className="local-text">
                    <p>Nos encontramos en la Av. Talas de Tuyú N°3295, Ciudad Autónoma de Buenos Aires.</p>
                </div>
                <div className="local-img">
                    <img src="/img/enterprise-local-1.jpg" alt="Local Mottoso Propiedades" width="600px"/>
                </div>
                <div className="local-map">
                    <iframe
                        title="Mapa de ubicación"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3212.499993663974!2d-56.72049612332963!3d-36.372888353074956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959c1b154dda6499%3A0x369ec85d5d646157!2sAv.%20Talas%20del%20Tuy%C3%BA%203295%2C%20B7105%20San%20Clemente%20del%20Tuyu%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1753822676361!5m2!1ses!2sar"
                        width="600"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

function Services() {
    return (
        <div className="services-container">
            <h1>¿Que Ofrecemos?</h1>
            <h2>Nuestros Servicios</h2>
            <ul>
                <li>
                    <FaKey /> Gestión de alquiler y venta de propiedades
                    <span>Administramos procesos de alquiler y comercialización inmobiliaria.</span>
                </li>
                <li>
                    <FaBuilding /> Administración de Consorcio
                    <span>Nos encargamos de la gestión operativa y contable de edificios.</span>
                </li>
                <li>
                    <FaHandshake /> Asesoramiento
                    <span>Te guiamos en cada paso para tomar decisiones seguras.</span>
                </li>
                <li>
                    <FaFileSignature /> Gestoría Inmobiliaria
                    <span>Trámites legales y documentación sin complicaciones.</span>
                </li>
            </ul>
        </div>
    );
}

function Agents() {
    return (
        <div className="agents-container">
            <h1>Nuestro Equipo</h1>
            <h2>Conocé a nuestros agentes</h2>
            <div className="agents-list">
                <div className="agent-card">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 48 48"><path fill="#ff9800" d="m24 37l-5-6v-6h10v6z"/><g fill="#ffa726"><circle cx="33" cy="19" r="2"/><circle cx="15" cy="19" r="2"/></g><path fill="#ffb74d" d="M33 13c0-7.6-18-5-18 0v7c0 5 4 9 9 9s9-4 9-9z"/><path fill="#424242" d="M24 4c-6.1 0-10 4.9-10 11v2.3l2 1.7v-5l12-4l4 4v5l2-1.7V15c0-4-1-8-6-9l-1-2z"/><g fill="#784719"><circle cx="28" cy="19" r="1"/><circle cx="20" cy="19" r="1"/></g><path fill="#fff" d="m24 43l-5-12l5 1l5-1z"/><path fill="#d32f2f" d="m23 35l-.7 4.5l1.7 4l1.7-4L25 35l1-1l-2-2l-2 2z"/><path fill="#546e7a" d="m29 31l-5 12l-5-12S8 33 8 44h32c0-11-11-13-11-13"/></svg>
                    <h3>Agente 1</h3>
                    <p>Especialista en ventas residenciales</p>
                </div>
                <div className="agent-card">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 48 48"><path fill="#ff9800" d="m24 37l-5-6v-6h10v6z"/><g fill="#ffa726"><circle cx="33" cy="19" r="2"/><circle cx="15" cy="19" r="2"/></g><path fill="#ffb74d" d="M33 13c0-7.6-18-5-18 0v7c0 5 4 9 9 9s9-4 9-9z"/><path fill="#424242" d="M24 4c-6.1 0-10 4.9-10 11v2.3l2 1.7v-5l12-4l4 4v5l2-1.7V15c0-4-1-8-6-9l-1-2z"/><g fill="#784719"><circle cx="28" cy="19" r="1"/><circle cx="20" cy="19" r="1"/></g><path fill="#fff" d="m24 43l-5-12l5 1l5-1z"/><path fill="#d32f2f" d="m23 35l-.7 4.5l1.7 4l1.7-4L25 35l1-1l-2-2l-2 2z"/><path fill="#546e7a" d="m29 31l-5 12l-5-12S8 33 8 44h32c0-11-11-13-11-13"/></svg>
                    <h3>Agente 2</h3>
                    <p>Experta en alquileres comerciales</p>
                </div>
            </div>
        </div>
    );
}


export default function Enterprise() {
    return (
        <>
            <NavbarSeparator />
            <Banner />
            <AboutUs />
            <Services />
            <Agents />
        </>
    );
}