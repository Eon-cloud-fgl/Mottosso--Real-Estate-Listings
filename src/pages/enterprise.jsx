import "../styles/enterprise.css";
import NavbarSeparator from "../components/Separator";



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
                <div className="au-contact-container">
                    <h3>Contáctanos</h3>
                    <p>Teléfono: (011) 1234-5678</p>
                    <p>Email: </p>
                    <p>Dirección: Av. Mitre 2450, Quilmes Centro</p>
                    <p>Horario: Lunes a Viernes de 9:00 a 18:00</p>
                    <p>¡Estamos aquí para ayudarte!</p>
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
        </>
    );
}