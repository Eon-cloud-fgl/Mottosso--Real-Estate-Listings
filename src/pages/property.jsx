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
    FaCar,
    FaBed
} from "react-icons/fa";

import { MdMeetingRoom } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import { BiArea } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { FiType } from "react-icons/fi";

import {
    MdOutlineBathroom,
    MdOutlineBedroomChild,
    MdSignalCellularAlt
} from "react-icons/md";

import { RxDimensions } from "react-icons/rx";
import { PiToiletPaper } from "react-icons/pi";


import NavbarSeparator from "../components/Separator";
import MapArray from "../components/Maps"




export default function Property() {
    const [searchParams] = useSearchParams();
    const propertyId = searchParams.get("id");
    const [property, setProperty] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchProperty = async () => {
        try {
            const response = await axios.get(`/api/controller/estateController.php`, {
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

    const fetchImage = async () => {
        try {
            const response = await axios.get(`/api/controller/estateController.php`, {
                params: {
                    action: "getImagesById",
                    id: propertyId,
                },
            });

            setImages(response.data);
        } catch (error) {
            console.error("Error cargando propiedades:", error);
        }
    }

    useEffect(() => {
        if (propertyId) {
            fetchProperty();
            fetchImage();
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
                                <Image images={images} property={property} />
                                <div className="separato-image-property" />
                                <Characteristics property={property} />
                            </div>
                            <Details property={property} />
                            <AboutProperty property={property} />
                            <MapEmbed property={property} />
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


function Description({ property }) {
    return (
        <div id="description-major">
            <h2>{property.title}</h2>
            <span className="description-code">Ficha: {property.listing_id}</span>
        </div>
    );
}

function LocationDescription({ property }) {
    return (
        <div className="description-location">
            <a href="#map" className="location-title">
                <IoLocationOutline />
                <div className="location-details">
                    <p>Direccion: {property.address}</p>
                    <p>Localidad: {property.city}</p>
                </div>
            </a>
            {/* <div className="location-container">
                <MapArray
                    locations={[
                        {
                            name: property.title,
                            address: `${property.address}, ${property.city}, ${property.state}`,
                        },
                    ]}
                />

            </div> */}
        </div>
    );
}

function MapEmbed({ property }) {
    return (
        <div className="details" id="map">
            <h3>Ubicacion</h3>
            <p>{property.address}, {property.city}, {property.state}</p>
            <div className="location-container">
                <MapArray
                    locations={[
                        {
                            name: property.title,
                            address: `${property.address}, ${property.city}, ${property.state}`,
                        },
                    ]}
                />

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

function Image({ images, property}) {
    const [current, setCurrent] = useState(0);
    const [fade, setFade] = useState(false);

    const changeImage = (newIndex) => {
        setFade(true);
        setTimeout(() => {
            setCurrent(newIndex);
            setFade(false);
        }, 200); // tiempo de fade-out
    };

    const next = () => changeImage((current + 1) % images.length);
    const prev = () => changeImage((current - 1 + images.length) % images.length);
    const handleThumbnailClick = (index) => changeImage(index);

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
                    {images?.length > 0 && images[current] && (
                        <img
                            src={`/${images[current].image_url}`}
                            alt={`Imagen ${current + 1}`}
                            className={fade ? "fade-out" : ""}
                        />
                    )}
                </div>
                <div className="carousel-controls">
                    <button className="carousel-btn" onClick={prev}><FaChevronLeft /></button>
                    <span className="carousel-indicator">{current + 1} / {images.length}</span>
                    <button className="carousel-btn" onClick={next}><FaChevronRight /></button>
                </div>
                <ContactIcons property_id={property.listing_id}/>
            </div>

            <div className="thumbnails-column">
                {visibleThumbnails.map(({ src, idx }) => (
                    <img
                        key={idx}
                        src={`/${src.image_url}`}
                        className={`thumbnail ${idx === current ? "active fade-in" : ""}`}
                        onClick={() => handleThumbnailClick(idx)}
                    />
                ))}
            </div>
        </div>
    );
}


function ContactIcons({property_id}) {
    return (
        <div className="contact-icons-wrapper">
            <a
                href={`https://wa.me/2252412525?text=${encodeURIComponent(
                    `Hola, te consulto por la propiedad de ficha: ${property_id}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaWhatsapp size={35} />
            </a>
            <a href="mailto:mottosopropiedades@gmail.com?subject=Consulta" target="blank"><CgMail size={35} /></a>
            <a href="https://www.facebook.com/people/MottosoPropiedades" target="blank"><FaFacebookSquare size={35} /></a>
        </div>
    );
}

function Characteristics({ property }) {
    const isValid = (value) =>
        !(value === 0 || value === "0" || value === null || value === undefined || value === "");

    return (
        <div className="characteristics">
            {isValid(property.price) && (
                <div className="price">
                    <h3>${property.price}{property.currency}</h3>
                </div>
            )}

            <div className="features">
                {isValid(property.rooms) && (
                    <div className="feature">
                        <FaCouch size={30} />
                        <span>Ambientes</span>
                        <p>{property.rooms}</p>
                    </div>
                )}
                {isValid(property.bedrooms) && (
                    <div className="feature">
                        <MdOutlineBedroomChild size={30} />
                        <span>Dormitorios</span>
                        <p>{property.bedrooms}</p>
                    </div>
                )}
                {isValid(property.bathrooms) && (
                    <div className="feature">
                        <MdOutlineBathroom size={30} />
                        <span>Baños</span>
                        <p>{property.bathrooms}</p>
                    </div>
                )}
                {isValid(property.operation) && (
                    <div className="feature">
                        <FiType size={30} />
                        <span>Tipo</span>
                        <p>{property.operation}</p>
                    </div>
                )}
            </div>
        </div>
    );
}



function Details({ property }) {
    const showValue = (value, fallback = "No especificado") =>
        value === 0 || value === "0" || value === null || value === undefined || value === "" ? fallback : value;

    return (
        <div className="details">
            <h3>Detalles de la propiedad</h3>
            <ul className="property-details">
                <li><FaDollarSign /> Precio: ${showValue(property.price)}{property.currency}</li>
                <li><BiArea /> Superficie: {showValue(property.total_area)} m²</li>
                <li><IoLocationOutline /> Ubicación: {showValue(property.address)}, {showValue(property.city)}</li>
                <li><FiType /> Tipo: {showValue(property.type)}</li>
                <li><FaRegClock /> Antigüedad: {showValue(property.antique)}</li>
                <li><FaCar /> Cochera: {showValue(property.garage)}</li>
                <li><RxDimensions /> Ambientes: {showValue(property.rooms)}</li>
                <li><FaBed /> Habitaciones: {showValue(property.bedrooms)}</li>
                <li><PiToiletPaper /> Baños: {showValue(property.bathrooms)}</li>
            </ul>
        </div>
    );
}



function AboutProperty({ property }) {
    return (
        <div className="about-property">
            <h3>Sobre la propiedad</h3>

            <p>{property.description}</p>
        </div>
    );
}

