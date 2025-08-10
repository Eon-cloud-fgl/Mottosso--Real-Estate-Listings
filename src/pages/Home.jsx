import React, { useState, useEffect } from "react";
import "../styles/home.css";
import AutocompleteInput from "../components/AutoCompleteMap";
import { useNavigate } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";
import { FiStar } from "react-icons/fi";
import { BsFillDiamondFill } from "react-icons/bs";
import axios from "axios";

function Banner() {
    return (
        <div className="hero-container">
            <img src="/banner/home-banner--b2.jpg" className="hero-background" />

            <div className="hero-content">
                <h1 className="hero-title">Encontrar tu nuevo hogar es sencillo</h1>
                <p className="hero-subtitle">
                    propiedadesmottoso.com es su destino ideal para encontrar la casa de alquiler perfecta para satisfacer sus necesidades..
                </p>
                <OpenEstate />
            </div>

            <Bar />

        </div>
    );
}

function OpenEstate() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/estate");
    }

    return (
        <div className="hero-search">
            <input type="text" placeholder="Encontrar tu Hogar" disabled />
            <button onClick={handleClick}>Ir <GoChevronRight /></button>
        </div>
    );
}

function Bar() {
    const [query, setQuery] = useState("");
    const [type, setType] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (query) params.set("query", query);
        if (type) params.set("type", type);
        navigate(`/estate?${params.toString()}`);
    };

    return (
        <div className="hero-form-bar">
            <div className="hero-form-bar--input">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar por Ficha..."
                />
            </div>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="" disabled hidden>Tipo de propiedad</option>
                <option value="">Todos</option>
                <option value="departamento">Departamento</option>
                <option value="casa">Casa</option>
                <option value="ph">PH</option>
                <option value="terreno">Terreno</option>
                <option value="local">Local</option>
                <option value="oficina">Oficina</option>
                <option value="oficina">Oficina</option>
                <option value="chacra">Chacra</option>
                <option value="chalet">Chalet</option>
                <option value="duplex">Duplex</option>
                <option value="otro">Otro</option>
            </select>
            <button onClick={handleSearch}>Buscar</button>
        </div>
    );
}

function Description() {
    return (
        <div className="contenedor-descripcion">
            <ImageItem />
            <DescriptionItem />
        </div>
    );
}

function DescriptionItem() {
    return (
        <div className="cd-item">
            <h6>Tu lugar, nuestra prioridad</h6>
            <p>En Mottoso Propiedades te ayudamos a encontrar el lugar ideal para vivir o invertir. Con asesoramiento profesional y una amplia variedad de opciones, hacemos que tu próxima propiedad esté más cerca.</p>
        </div>
    );
}

function ImageItem() {
    return (
        <div className="image-stack">
            <img src="/info-banner-1.avif" alt="Imagen 1" className="stack-img img-1" />
            <img src="/img/home-visual-1.jpg" alt="Imagen 2" className="stack-img img-2" />
            <img src="/img/home-visual-2.jpg" alt="Imagen 3" className="stack-img img-3" />
            <img src="/img/home-visual-3.jpg" alt="Imagen 4" className="stack-img img-4" />
        </div>
    );

}

function MisItems({ imageN, title, info, option }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${option}`);
    }

    return (
        <>
            <div className="contenedor-menor">
                <div className="contenedor-imagen">
                    <img src={`/img/home-micellaneous-${imageN}.jpg`} />
                </div>
                <div className="contenedor-article">
                    <p id="item-titulo">{title}</p>
                    <p id="item-info">{info}</p>
                    <div className="contenedor-boton">
                        <button onClick={handleClick}>Conocer Mas</button>
                    </div>
                </div>

            </div>

        </>
    );
}

function Miscellaneous() {
    return (
        <div className="contenedor-mayor">
            {/* <div className="outstanding-header">
                <h2 className="outstanding-title-main">Soluciones para vos</h2>
                <p className="outstanding-subtitle">“Desde la búsqueda hasta la tasación, estamos con vos en cada paso.”</p>
            </div> */}
            <div className="miscellaneous-items">
                <MisItems imageN={1} title="Propiedades" info="Destacadas Explorá los hogares más buscados, listos para mudarte o invertir." option="estate" />
                <MisItems imageN={2} title="Asesoramiento" info="Te acompañamos en cada paso para que tomes la mejor decisión." option="contact" />
                <MisItems imageN={3} title="Tasaciones" info="Te ayudamos a darle el valor que merece a tu hogar." option="appraisals" />
            </div>
        </div>
    );
}

function OutstandingItem({ estate }) {
    const navigate = useNavigate();

    const handleSelectEstate = () => {
        navigate(`/property?id=${estate.id}`);
    };

    const isValid = (value) =>
        !(value === 0 || value === "0" || value === null || value === undefined || value === "");

    return (
        <a className="outstanding-item" onClick={handleSelectEstate}>
            <div className="image-wrapper">
                <img src={estate.main_image} alt={estate.title} className="outstanding-image" />
                <span className="badge">Destacado</span>
            </div>
            <div className="outstanding-details">
                <h6 className="outstanding-title">{estate.title}</h6>
                <p className="outstanding-address">{estate.address}</p>
                {isValid(estate.price) && (
                    <p className="outstanding-price">${estate.price}</p>
                )}
                <p className="outstanding-separator"></p>
                <ul className="outstanding-features">
                    {isValid(estate.total_area) && <li>{estate.total_area} m²</li>}
                    {isValid(estate.rooms) && <li>{estate.rooms} Amb</li>}
                    {isValid(estate.bedrooms) && <li>{estate.bedrooms} Dorm</li>}
                    {isValid(estate.bathrooms) && <li>{estate.bathrooms} Baños</li>}
                </ul>
            </div>
        </a>
    );
}



function Outstanding() {
    const [estates, setEstates] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEstates = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/controller/estateController.php", {
                params: { action: "getEstateByOutstanding" },
            });
            setEstates(res.data);
        } catch (error) {
            console.error("Error cargando propiedades:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEstates();
    }, []);

    return (
        <section className="outstanding-section">
            <div className="outstanding-header">
                <h2 className="outstanding-title-main">Propiedades destacadas</h2>
                <p className="outstanding-subtitle">Una selección especial para vos</p>
            </div>

            <div className="outstanding-container">
                {loading ? (
                    <p>Cargando propiedades...</p>
                ) : (
                    estates.map((estate, index) => (
                        <div key={estate.id} className="outstanding-item-wrapper">
                            <OutstandingItem estate={estate} />
                            {index < estates.length - 1 && (
                                <div className="separator-icon">
                                    <BsFillDiamondFill />
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default function Home() {
    return (
        <>
            <header className="fondo-encabezado">
                <Banner />
            </header>
            <main>
                <Description />
                <Miscellaneous />
                <p id="text-final">Inversion Asegurada</p>
                <Outstanding />
            </main>
            <footer>
            </footer>
        </>
    );
}