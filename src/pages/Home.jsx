import "../styles/home.css";
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
                <div className="hero-search">
                    <input type="text" placeholder="Encontrar tu Hogar" disabled />
                    <button>Ir <GoChevronRight /></button>
                </div>
            </div>

            <div className="hero-form-bar">
                <input type="text" placeholder="Ciudad" />
                <select>
                    <option>Tipo</option>
                    <option>Compra</option>
                    <option>Apartamento</option>
                </select>
                <button>Buscar</button>
            </div>
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
                    <img src={`/info-banner-${imageN}.avif`} alt={title} />
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
            <MisItems imageN={1} title="Appraisals" info="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            <MisItems imageN="1" title="Appraisals" info="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            <MisItems imageN="1" title="Appraisals" info="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
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