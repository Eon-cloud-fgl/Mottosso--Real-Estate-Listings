import React, { useState } from "react";
import "../styles/home.css";
import AutocompleteInput from "../components/AutoCompleteMap";
import { useNavigate } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";

function Banner() {
    return (
        <div className="hero-container">
            <img src="/banner/home-banner--b1.jpg" className="hero-background" />

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
                <AutocompleteInput value={query} onChange={setQuery} />
            </div>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Tipo</option>
                <option value="house">Casa</option>
                <option value="apartment">Apartamento</option>
                <option value="land">Terreno</option>
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

function MisItems({ imageN, title, info }) {
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
                        <button>Conocer Mas</button>
                    </div>
                </div>

            </div>

        </>
    );
}

function Miscellaneous() {
    return (
        <div className="contenedor-mayor">
            <MisItems imageN={1} title="Propiedades" info="Destacadas Explorá los hogares más buscados, listos para mudarte o invertir." />
            <MisItems imageN={2} title="Asesoramiento" info="Te acompañamos en cada paso para que tomes la mejor decisión." />
            <MisItems imageN={3} title="Tasaciones" info="Te ayudamos a darle el valor que merece a tu hogar." />
        </div>
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
            </main>
            <footer>
                <p id="text-final">Inversion Asegurada</p>
            </footer>
        </>
    );
}