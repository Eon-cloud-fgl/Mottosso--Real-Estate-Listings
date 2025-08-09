import "../styles/appraisals.css";
import NavbarSeparator from "../components/Separator";
import { useState } from "react";
import { FaWhatsapp, FaHome, FaBuilding } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import WhatsAppButton from "../components/WhatsappBtn.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { MdLandscape } from "react-icons/md";
import { PiOfficeChairFill } from "react-icons/pi";

function Banner() {
    return (
        <>
            <div className="bn-container" id="titulo-tasaciones">
                <p className="fondo-texto">Solicitud de tasacion</p>
            </div>
        </>
    );
}


function Description() {
    return (
        <div className="ds-container">
            <h2>Tasasiones Inmobiliarias con Propiedades Mottoso</h2>
            <p>
                Realizamos el análisis de su inmueble basado en un profundo análisis, para brindar un valor real del mercado, tomando en cuenta la ubicación, superficie, comodidades y las características únicas de tu hogar.
            </p>

            {/* Invisible en responsive*/}
            <div className="property-types">
                <h3>¿Qué tipo de propiedades se pueden tasar?</h3>
                <ul>
                    <li><span className="icon-descripcion"><FaHome /></span>Casas</li>
                    <li><span className="icon-descripcion"><FaBuilding /></span>Departamentos</li>
                    <li><span className="icon-descripcion"><MdLandscape /></span>Terrenos</li>
                    <li><span className="icon-descripcion"><FaShop /></span>Locales comerciales</li>
                    <li><span className="icon-descripcion"><PiOfficeChairFill /></span>Oficinas</li>
                </ul>
            </div>

            <span>No lo dudes más, la inversión es el éxito que te espera</span>
        </div>
    );
}



function Form() {
    const [step, setStep] = useState(0);
    const totalSteps = 4;
    const [loading, setLoading] = useState(false);

    const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        formData.append("action", "appraisalsMail");

        try {
            const response = await axios.post("/api/controller/contactController.php",
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                toast.success("Solicitud enviada con éxito. Nos pondremos en contacto pronto.");
                setStep(0); // Reset the form after successful submission
            } else {
                toast.error("Error al enviar la solicitud. Por favor, inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
            toast.error("Error al enviar la solicitud. Por favor, inténtalo de nuevo.");
        } finally {
        setLoading(false);
        }
    };


            return (
                <div className="form-container">
                    <h3>Formulario de Tasación</h3>

                    {/* Barra de progreso */}
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${((step + 1) / (totalSteps + 1)) * 100}%` }}></div>
                    </div>

                    <form onSubmit={handleSubmit} className="appraisal-form">
                        {step === 0 && (
                            <div className="form-step">
                                <label htmlFor="address">Dirección:</label>
                                <input type="text" id="address" name="address" placeholder="Ingrese la dirección" required />
                            </div>
                        )}

                        {step === 1 && (
                            <div className="form-step">
                                <label htmlFor="locality">Localidad:</label>
                                <input type="text" id="locality" name="locality" placeholder="Ingrese la localidad" required />
                            </div>
                        )}

                        {step === 2 && (
                            <div className="form-step">
                                <label htmlFor="property-type">Tipo de Propiedad:</label>
                                <select id="property-type" name="property-type">
                                    <option value="casa">Casa</option>
                                    <option value="departamento">Departamento</option>
                                    <option value="terreno">Terreno</option>
                                    <option value="local-comercial">Local Comercial</option>
                                    <option value="oficina">Oficina</option>
                                </select>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="form-step">
                                <label htmlFor="operation-type">Tipo de Operación:</label>
                                <select id="operation-type" name="operation-type">
                                    <option value="venta">Venta</option>
                                    <option value="alquiler">Alquiler</option>
                                    <option value="ambos">Ambos</option>
                                </select>

                                <label htmlFor="description">Descripción:</label>
                                <textarea id="description" name="description" rows="4" placeholder="Ingrese una descripción" required></textarea>
                            </div>
                        )}

                        {step === 4 && (
                            <div>
                                <div className="form-step">
                                    <label htmlFor="contact-name">Nombre:</label>
                                    <input type="text" id="contact-name" name="name" placeholder="Ingrese su nombre" required />
                                </div>
                                <div className="form-step">
                                    <label htmlFor="contact-email">Email:</label>
                                    <input type="email" id="contact-email" name="email" placeholder="Ingrese su email" required />
                                </div>

                                <div className="form-step">
                                    <label htmlFor="contact-phone">Teléfono:</label>
                                    <input type="tel" id="contact-phone" name="phone" placeholder="Ingrese su número" required />
                                </div>

                            </div>
                        )}

                        <div className="form-buttons">
                            {step > 0 && (
                                <button type="button" className="btn secondary" onClick={prevStep}>
                                    Anterior
                                </button>
                            )}
                            {step < totalSteps ? (
                                <button type="button" className="btn primary" onClick={nextStep}>
                                    Siguiente
                                </button>
                            ) : (
                                <button type="submit" className="btn submit">
                                    Enviar Solicitud
                                </button>
                            )}
                        </div>
                    </form>

                    <Contact />

                </div>
            );
        }



function Contact() {
            return (
                <div className="contact-info">
                    <h3>Tambien podes contactarnos por Whatsapp</h3>
                    <p>Nuestros Agentes atenderan tus consultas</p>
                    <WhatsAppButton
                        phone="2252412525"
                        message="Hola, estoy interesado en tazar una propiedad."
                    />

                </div>
            );
        }

        function Advice() {
            return (
                <div className="advice-container">
                    <h3>¿Buscas un Asesoramiento Personalizado?</h3>
                    <div className="advice-info">
                        <WhatsAppButton
                            phone="2252412525"
                            message="Hola, estoy interesado en Asesoramiento Personalizado."
                        />
                        <button className="btn-secondary">Contactar</button>
                    </div>
                </div>
            );
        }

        export default function Appraisals() {
            return (
                <>
                    <NavbarSeparator />
                    <header>
                        <Banner />
                    </header>

                    <main>
                        <div className="flex-wrapper">
                            <Description />

                            <Form />
                        </div>
                        <Advice />
                    </main>

                </>
            )
        }


