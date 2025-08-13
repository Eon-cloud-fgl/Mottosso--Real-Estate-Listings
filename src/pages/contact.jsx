import "../styles/contact.css";
import React, { useState, useEffect } from "react";
import NavbarSeparator from "../components/Separator";
import MapArray from "../components/Maps";
import axios, { Axios } from 'axios';
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { useSearchParams } from "react-router-dom";


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
const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("action", "FormContacto");

    try {
        const response = await axios.post("/api/controller/contactController.php",
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
        });

        if (response.data.success) {
            console.log("Mail enviado correctamente");
        } else {
            console.log("Error en el envío", response.data);
        }
    } catch (err) {
        console.error("fallo:", err);
    }
};

// Formulario de contacto
function ContactForm() { 
    const [searchParams] = useSearchParams();
    const property = searchParams.get("property");
    const type = searchParams.get("type");

    const typeMap = {
        venta: "compra",
        compra: "venta",
        alquiler: "alquiler",
        tasacion: "tasacion",
        administracion: "administracion",
        inversion: "inversion",
        credito: "credito",
        general: "general"
    };

    const selectedType = typeMap[type] || "";

    useEffect(() => {
        // Si hay algún parámetro en la URL, abrir el formulario
        if (property || type) {
            const formContainer = document.querySelector(".contenedor-formulario");
            if (formContainer) {
                formContainer.classList.add("contenedor-formulario-open");
            }
        }
    }, [property, type]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // tu lógica para enviar el formulario
    };

    return (
        <div className="contenedor-formulario">
            <form className="contact-form" onSubmit={handleSubmit}>
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
                    <select id="typeofq" name="typeofq" defaultValue={selectedType}>
                        <option value="">Seleccione una opción</option>
                        <option value="compra">Consulta por adquisicion de propiedad</option>
                        <option value="venta">Consulta por venta de mi propiedad</option>
                        <option value="alquiler">Consulta por alquiler de propiedad</option>
                        <option value="tasacion">Solicitar tasación</option>
                        <option value="administracion">Consulta sobre administración de propiedades</option>
                        <option value="inversion">Asesoramiento en inversiones inmobiliarias</option>
                        <option value="credito">Consulta sobre créditos hipotecarios</option>
                        <option value="general">Otra consulta general</option>
                    </select>

                    <label htmlFor="message">Mensaje:</label>
                    <textarea id="message" name="message" rows="4" placeholder="Ingrese su mensaje" required></textarea>

                    {/* Campo oculto con el ID de propiedad */}
                    <input type="hidden" name="listing_id" value={property || ""} />
                    
                    <input type="hidden" name="action" value="FormContacto" />
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </div>
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
                        <p>Av. Talas de Tuyú N°3295, San Clementes del Tuyu, Provincia de Buenos Aires</p>
                    </div>
                </div>

                <div className="contact-item">
                    <div className="icon"><FaPhoneAlt /></div>
                    <div>
                        <strong>Telefono</strong>
                        <p>2252 485229</p>
                    </div>
                </div>

                <div className="contact-item">
                    <div className="icon"><FaPhoneAlt /></div>
                    <div>
                        <strong>Telefono</strong>
                        <p>2252 412525</p>
                    </div>
                </div>

                <div className="contact-item">
                    <div className="icon"><FaEnvelope /></div>
                    <div>
                        <strong>Correo</strong>
                        <p>mottosopropiedades@gmail.com</p>
                    </div>
                </div>
            </div>

            <hr />

            <div className="social">
                <p>Siguenos:</p>
                <div className="social-icons">
                    <a href="https://www.x.com/@mottosopropiedades" target="blank"><FaTwitter /></a>
                    <a href="https://www.facebook.com/people/Mottoso Propiedades" target="blank"><FaFacebookF /></a>
                    <a href="https://www.linkedin.com/in/Mottoso Propiedades" target="blank"><FaLinkedinIn /></a>
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
                    <MapArray
                        locations={[
                            {
                                name: "Nuestra Sucursal",
                                address: "Av. Talas del Tuyú 3295, San Clemente del Tuyu, Provincia de Buenos Aires",
                            },
                        ]}
                    />
                    <ContactSection />
                </div>
                <Faqs />
            </main>
        </>
    );
}