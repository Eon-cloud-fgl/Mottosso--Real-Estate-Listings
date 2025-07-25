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



export default function Property() {
    return (
        <>
            <header>
                <Banner />
            </header>

            <main>
                <Description />

                <div className="image-contact-wrapper">

                    <div className="image-characteristics-group" draggable="false"> 
                        <Image />
                        <Characteristics />
                    </div>

                <div className="location-wrapper">
                    <LocationDescription />
                    <ContactsSection />
                </div>

            </div>
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
            <p>Ubicacion</p>
        </div>
    );
}


function Image() {
    return (
        <div className="container-image">
            <img src="/casa.avif" />
        </div>
    );
}

function ContactsSection() {
    return (
        <div className="container-section">
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



