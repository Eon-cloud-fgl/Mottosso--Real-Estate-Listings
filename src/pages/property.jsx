import "../styles/property.css";
import { FaWhatsapp } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { FaFacebookSquare } from "react-icons/fa";
import { MdOutlineBedroomChild } from "react-icons/md";
import { FaCouch } from "react-icons/fa";
import { MdOutlineBathroom } from "react-icons/md";
import { MdSignalCellularAlt } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { VscSymbolProperty } from "react-icons/vsc";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";



export default function Property() {
    return (
        <>
            <header>
                <Banner />
            </header>

            <main>
                <Description />

                <div className="image-contact-wrapper">
                    {/* columna izquierda (imagen y características) */}
                    <div className="image-characteristics-group" id="image-background">
                        <div className="container-image-wrapper">
                            <Image />
                            <ContactIcons /> 
                        </div>
                        
                    <Characteristics />
                    <AboutProperty />
                </div>

                    {/* columna derecha (ubicación y formulario) */}
                    <div className="right-side-column">
                        <LocationDescription />

                        <div id="mapa-google">
                            {/* mapa */}  
                        </div>


                    </div>
                </div>

            

                <PhoneContactButton />
            </main>
        </>
    );
}



function Banner() {
    return (
        <div className="bn-container" id="Titulo-inmuebles">
            <h1 className="fondo-texto">Nuestros Inmuebles</h1>
        </div>
    );
}

function Description() {
    return (
        <div id="description-major">
            <h2>La descripcion principal del inmueble</h2>
        </div>
    );
}

function LocationDescription() {
    return (
        <div className="description_location">
            <IoLocationOutline />
            <p>Ubicacion: Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
        </div>
    );
}

function PhoneContactButton() {
    return (
        <a className="phone-contact-button">
            <FaPhone size={40} />
        </a>
    );
}


function Image() {
  return (
    <>
    
        <div className="container-image">
            <img src="/casa.avif" />
        </div>
        
    </>
  );
}

function ContactIcons() {
    return (
        <div className="contact-icons-wrapper">
            <FaWhatsapp size={30} />
            <CgMail size={30} />
            <FaFacebookSquare size={30} />
        </div>
    );
}

function Characteristics() {
    return (
        <div className="characteristics">
            <div className="feature">
                <MdOutlineBedroomChild size={30} />
                <span>Dormitorios</span>
            </div>
            <div className="feature">
                <FaCouch size={30} />
                <span>Ambientes</span>
            </div>
            <div className="feature">
                <MdOutlineBathroom size={30} />
                <span>Baños</span>
            </div>
            <div className="feature">
                <MdSignalCellularAlt size={30} />
                <span>Señal</span>
            </div>
            <div className="feature">
                <IoMdPerson size={30} />
                <span>Disponible</span>
            </div>
            <div className="feature">
                <VscSymbolProperty size={30} />
                <span>Estado de la propiedad</span>
            </div>
        </div>
    );
}

function AboutProperty() {
    return (
        <div className="about-property">
            <h3>Sobre la propiedad</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
        </div>
    );
}

