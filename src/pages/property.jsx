import React, { useState, useEffect } from "react";
import "../styles/property.css";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import {
    FaChevronLeft,
    FaChevronRight,
    FaCouch,
    FaDollarSign,
    FaFacebookSquare,
    FaPhone,
    FaRegClock,
    FaWhatsapp,
    FaCar
} from "react-icons/fa";

import { CgMail } from "react-icons/cg";

import { IoLocationOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";

import {
    MdOutlineBathroom,
    MdOutlineBedroomChild,
    MdSignalCellularAlt
} from "react-icons/md";


import NavbarSeparator from "../components/Separator";




export default function Property() {
    const [searchParams] = useSearchParams();
    const propertyId = searchParams.get("id");
    const [property, setProperty] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProperty = async () => {
        try {
            const response = await axios.get(`http://localhost/Mottoso-Real-Estate-Listings/api/controller/estateController.php`, {
                params: {
                    action: "getProperty",
                    id: propertyId,
                },
            });
            
            setProperty(response.data);
        } catch (error) {
            console.error("Error cargando propiedades:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (propertyId) {
            fetchProperty();
        }
    }, [propertyId]);
    
    
    
    return (
        <>
            <NavbarSeparator />
            <main className="property-page">
                <div className="property-container">
                    <Description property={property} />

                    <div className="image-contact-wrapper">
                        {/* columna izquierda (imagen y características) */}
                        <div className="image-characteristics-group" id="image-background">
                            <div className="container-wrapper">
                                <Image />
                                <Characteristics property={property} />
                            </div>
                            <Details property={property}/>
                            <AboutProperty property={property} />
                        </div>

                        {/* columna derecha (ubicación y formulario) */}
                        <div className="right-side-column">
                            <LocationDescription property={property} />
                        </div>
                    </div>
                    <PhoneContactButton />
                </div>
            </main>
        </>
    );
}


function Description({property}) {
    return (
        <div id="description-major">
            <h2>{property.title}</h2>
            <span className="description-code">Ficha: {property.listing_id}</span>
        </div>
    );
}

function LocationDescription({property}) {
    return (
        <div className="description-location">
            <IoLocationOutline />
            <div className="location-details">
                <p>Direccion: {property.address}</p>
                <p>Localidad: {property.city}</p>
            </div>
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


const images = [
    "/casa.avif",
    "/mottoso-fondo.png",
    "/casa.avif",
    "/mottoso-fondo.png",
    "/casa.avif",
    "/mottoso-fondo.png",
    "/casa.avif",
];

function Image() {
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    };

    const prev = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleThumbnailClick = (index) => {
        setCurrent(index);
    };

    // Mostrar 3 thumbnails relacionadas al current
    const getVisibleThumbnails = () => {
        const total = images.length;
        if (total <= 3) return images.map((src, idx) => ({ src, idx }));

        const indices = [];
        for (let i = -1; i <= 1; i++) {
            indices.push((current + i + total) % total);
        }

        return indices.map(idx => ({ src: images[idx], idx }));
    };

    const visibleThumbnails = getVisibleThumbnails();

    return (
        <div className="gallery-wrapper">


            <div className="container-image-wrapper">
                <div className="container-image">
                    <img src={images[current]} alt={`Imagen ${current + 1}`} />
                </div>
                <div className="carousel-controls">
                    <button className="carousel-btn" onClick={prev}><FaChevronLeft /></button>
                    <span className="carousel-indicator">{current + 1} / {images.length}</span>
                    <button className="carousel-btn" onClick={next}><FaChevronRight /></button>
                </div>
                <ContactIcons />
            </div>

            <div className="thumbnails-column">
                {visibleThumbnails.map(({ src, idx }) => (
                    <img
                        key={idx}
                        src={src}
                        className={`thumbnail ${idx === current ? "active" : ""}`}
                        onClick={() => handleThumbnailClick(idx)}
                    />
                ))}
            </div>
        </div>
    );
}


function ContactIcons() {
    return (
        <div className="contact-icons-wrapper">
            <FaWhatsapp size={35} />
            <CgMail size={35} />
            <FaFacebookSquare size={35} />
        </div>
    );
}

function Characteristics({property}) {
    return (
        <div className="characteristics">
            <div className="price">
                <h3>${property.price}</h3>
            </div>
            <div className="features">
                <div className="feature">
                    <FaCouch size={30} />
                    <span>Ambientes</span>
                    <p>{property.rooms}</p>
                </div>
                <div className="feature">
                    <MdOutlineBedroomChild size={30} />
                    <span>Dormitorios</span>
                    <p>{property.bedrooms}</p>
                </div>
                <div className="feature">
                    <MdOutlineBathroom size={30} />
                    <span>Baños</span>
                    <p>{property.bathrooms}</p>
                </div>
                <div className="feature">
                    <IoMdPerson size={30} />
                    <span>Tipo</span>
                    <p>{property.operation}</p>
                </div>
            </div>
        </div>
    );
}

function Details({property}) {
    return (
        <div className="details">
            <h3>Detalles de la propiedad</h3>
            <ul className="property-details">
                <li><FaDollarSign /> Precio: ${property.price}</li>
                <li><MdSignalCellularAlt /> Superficie: {property.total_area} m²</li>
                <li><IoLocationOutline /> Ubicación: {property.address}, {property.city}</li>
                <li><FaCouch /> Tipo: {property.type}</li>
                <li><FaRegClock /> Antigüedad: 5 años</li>
                <li><FaCar />Cochera: {property.garage}</li>

            </ul>
        </div>
    );
}

function AboutProperty({property}) {
    return (
        <div className="about-property">
            <h3>Sobre la propiedad</h3>
            <p>{property.description}</p>
        </div>
    );
}

