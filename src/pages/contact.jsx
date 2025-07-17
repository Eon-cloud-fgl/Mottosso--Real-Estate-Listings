import "../styles/contact.css";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
// Banner
function Banner() {
    return (
        <div className="contenedor-titulo-encabezado">
            <p id="titulo-banner-contact">Mottoso siempre <br />con vos</p>
        </div>
    );
}
// Boton que habre la respuesta del FAQ
function OpenFaqs(e) {
  const button = e.currentTarget;
  const answer = button.nextElementSibling;

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
                <button className="faq-question" onClick={ OpenFaqs }>¿Qué servicios brinda una inmobiliaria como Mottoso?
                    <span id="arrow-item"><IoIosArrowDown/></span>
                </button>
                <div className="faq-answer">
                    <p>Informacion</p>
                </div>
            </div>
            <div className="faq-item">
                <button className="faq-question" onClick={ OpenFaqs }>¿Qué documentación necesito para vender mi propiedad?
                    <span id="arrow-item"><IoIosArrowDown/></span>
                </button>
                <div className="faq-answer">
                    <p>Informacion</p>
                </div>
            </div>
            <div className="faq-item">
                <button className="faq-question" onClick={ OpenFaqs }>¿Cobran comisión por comprar una propiedad?
                    <span id="arrow-item"><IoIosArrowDown/></span>
                </button>
                <div className="faq-answer">
                    <p>Informacion</p>
                </div>
            </div>
            <div className="faq-item">
                <button className="faq-question" onClick={ OpenFaqs }>¿Qué significa que una propiedad es “apta crédito”?
                    <span id="arrow-item"><IoIosArrowDown/></span>
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
        <button className="boton-contacto" onClick={ OpenContactForm }><span id="arrow-item-back"><IoIosArrowBack /></span></button>
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
export default function Contact() {
    return (
        <>
        <header className="fondo-encabezado-contacto">
            <div className="contenedor-formulario-header">
            <ContactForm />
            <OpenContactButton />
            </div>
            
            <Banner />
        </header>
        <main className="contenedor-contacto">
            <Faqs />
        </main>
        </>
    );
}