import "../styles/contact.css";
import NavbarSeparator from "../components/Separator";
import MapEmbed from "../components/Maps";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';


// Banner
function Banner() {
    return (
        <>
            <div className="bn-container" id="titulo-tasaciones">
                <p className="fondo-texto">Contacta con Nosotros</p>
            </div>
        </>
    );
}
// Boton que habre la respuesta del FAQ
function OpenFaqs(e) {
    const button = e.currentTarget;
    const answer = button.nextElementSibling;

    document.querySelectorAll(".faq-answer.open").forEach(openAnswer => {
        if (openAnswer !== answer) {
            openAnswer.classList.remove("open");
            const openButton = openAnswer.previousElementSibling;
            if (openButton?.classList.contains("open")) {
                openButton.classList.remove("open");
            }
        }
    });

    answer.classList.toggle("open");
    button.classList.toggle("open");
}
// FAQS
function Faqs() {
    return (
        <>
            <div className="contenedor-faqs">
                <h2 className="titulo-faqs">Preguntas Frecuentes</h2>
                <div className="faq-item">
                    <button className="faq-question" onClick={OpenFaqs}>¿Qué servicios brinda una inmobiliaria como Mottoso?
                        <span id="arrow-item"><IoIosArrowDown /></span>
                    </button>
                    <div className="faq-answer">
                        <p>Informacion</p>
                    </div>
                </div>
                <div className="faq-item">
                    <button className="faq-question" onClick={OpenFaqs}>¿Qué documentación necesito para vender mi propiedad?
                        <span id="arrow-item"><IoIosArrowDown /></span>
                    </button>
                    <div className="faq-answer">
                        <p>Informacion</p>
                    </div>
                </div>
                <div className="faq-item">
                    <button className="faq-question" onClick={OpenFaqs}>¿Cobran comisión por comprar una propiedad?
                        <span id="arrow-item"><IoIosArrowDown /></span>
                    </button>
                    <div className="faq-answer">
                        <p>Informacion</p>
                    </div>
                </div>
                <div className="faq-item">
                    <button className="faq-question" onClick={OpenFaqs}>¿Qué significa que una propiedad es “apta crédito”?
                        <span id="arrow-item"><IoIosArrowDown /></span>
                    </button>
                    <div className="faq-answer">
                        <p>Informacion</p>
                    </div>
                </div>
            </div>
        </>
    );
}
// Funcion del boton que abre el formulario de contacto
function OpenContactForm(e) {
    const form = document.querySelector(".contenedor-formulario");
    if (form) {
        form.classList.toggle("contenedor-formulario-open");
    }
}
// Boton que abre el formulario de contacto
function OpenContactButton() {
    return (
        <>
            <button className="boton-contacto" onClick={OpenContactForm}>
                <IoIosArrowBack />
                <span className="tooltip">Contactanos</span>
            </button>
        </>
    );
}
// Formulario de contacto
function ContactForm() {
    return (
        <>
            <div className="contenedor-formulario">
                <form>
                    <h2>Formulario de Contacto</h2>
                    <div className="form-group">
                        <label htmlFor="name">Nombre y Apellido:</label>
                        <input type="text" id="name" name="name" placeholder="Ingrese su Nombre y Apellido" required />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Ingrese su email" required />

                        <label htmlFor="phone">Teléfono:</label>
                        <input type="tel" id="phone" name="phone" placeholder="Ingrese su número" required />

                        <label htmlFor="address">Direccion:</label>
                        <input type="text" id="address" name="address" placeholder="Ingrese su direccion" required />

                        <label htmlFor="typeofq">Tipo de consulta</label>
                        <select id="typeofq" name="typeofq">
                            <option value="">Seleccione una opción</option>
                            <option value="compra">Consulta por compra de propiedad</option>
                            <option value="venta">Consulta por venta de propiedad</option>
                            <option value="alquiler">Consulta por alquiler de propiedad</option>
                            <option value="tasacion">Solicitar tasación</option>
                            <option value="administracion">Consulta sobre administración de propiedades</option>
                            <option value="inversion">Asesoramiento en inversiones inmobiliarias</option>
                            <option value="credito">Consulta sobre créditos hipotecarios</option>
                            <option value="general">Otra consulta general</option>
                        </select>

                        <label htmlFor="message">Mensaje:</label>
                        <textarea id="message" name="message" rows="4" placeholder="Ingrese su mensaje" required></textarea>

                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </>
    );
}

function ContactSection() {
    return (
        <section className="contact-section">
            <h2>Formas de Contactarnos</h2>
            <p className="description">
                Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos. Estamos aquí para ayudarte con todas tus necesidades inmobiliarias.
            </p>

            <div className="contact-details">
                <div className="contact-item">
                    <div className="icon"><FaMapMarkerAlt /></div>
                    <div>
                        <strong>Direccion</strong>
                        <p>Av. Mitre 2450, Quilmes Centro, Buenos Aires</p>
                    </div>
                </div>

                <div className="contact-item">
                    <div className="icon"><FaPhoneAlt /></div>
                    <div>
                        <strong>Telefono</strong>
                        <p>+53 1112345678</p>
                    </div>
                </div>

                <div className="contact-item">
                    <div className="icon"><FaEnvelope /></div>
                    <div>
                        <strong>Correo</strong>
                        <p>mottoso@gmail.com</p>
                    </div>
                </div>
            </div>

            <hr />

            <div className="social">
                <p>Siguenos:</p>
                <div className="social-icons">
                    <a href="#"><FaTwitter /></a>
                    <a href="#"><FaFacebookF /></a>
                    <a href="#"><FaLinkedinIn /></a>
                </div>
            </div>
        </section>
    );
};


export default function Contact() {
    return (
        <>
            <header>
                <NavbarSeparator />
                <Banner />
            </header>
            <main className="contenedor-contacto">
                <div className="contenedor-formulario-header">
                    <ContactForm />
                    <OpenContactButton />
                </div>
                <div className="contenedor-contacto-maps">
                    <MapEmbed />
                    <ContactSection />
                </div>
                <Faqs />
            </main>
        </>
    );
}