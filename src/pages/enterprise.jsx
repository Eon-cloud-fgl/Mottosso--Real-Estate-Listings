import "../styles/enterprise.css";
import NavbarSeparator from "../components/Separator";
import { FaHome, FaKey, FaBuilding, FaHandshake, FaFileSignature } from 'react-icons/fa';
import MapArray from "../components/Maps";




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
                    <MapArray
                        locations={[
                            {
                                name: "Nuestra Sucursal",
                                address: "Av. Talas del Tuyú 3295, San Clemente del Tuyu, Provincia de Buenos Aires",
                            },
                        ]}
                    />
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
                    <h3>Mottoso Joel</h3>
                    <p>Especialista en ventas residenciales</p>
                </div>
                <div className="agent-card">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 48 48"><path fill="#ff9800" d="m24 37l-5-6v-6h10v6z"/><g fill="#ffa726"><circle cx="33" cy="19" r="2"/><circle cx="15" cy="19" r="2"/></g><path fill="#ffb74d" d="M33 13c0-7.6-18-5-18 0v7c0 5 4 9 9 9s9-4 9-9z"/><path fill="#424242" d="M24 4c-6.1 0-10 4.9-10 11v2.3l2 1.7v-5l12-4l4 4v5l2-1.7V15c0-4-1-8-6-9l-1-2z"/><g fill="#784719"><circle cx="28" cy="19" r="1"/><circle cx="20" cy="19" r="1"/></g><path fill="#fff" d="m24 43l-5-12l5 1l5-1z"/><path fill="#d32f2f" d="m23 35l-.7 4.5l1.7 4l1.7-4L25 35l1-1l-2-2l-2 2z"/><path fill="#546e7a" d="m29 31l-5 12l-5-12S8 33 8 44h32c0-11-11-13-11-13"/></svg>
                    <h3>Mottoso Santiago</h3>
                    <p>Experto en alquileres comerciales</p>
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