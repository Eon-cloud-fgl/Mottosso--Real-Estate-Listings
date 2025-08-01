import "../styles/news.css";
import NavbarSeparator from "../components/Separator";

// Componente que renderiza el banner principal
function Banner() {
    return(
        <>
        <div className="contenedor-novedades-principal">
            <p id="item-titulo-principal">Novedades</p>
        </div>
        
        </>
    );
}
// Componente que renderiza los items de novedades
function MisItems({ imageN, title, info, infooter, invertido, etiqueta }) {
    return (
        <div className={`contenedor-novedades-menor ${invertido ? 'invertido' : ''}`}>
            <div className="contenedor-novedades-menor-imagen">
                {etiqueta && <span className={`etiqueta-item ${etiqueta.toLowerCase()}`}>{etiqueta}</span>}
                <img src={`/info-banner-${imageN}.avif`} alt={title} />
            </div>
            <div className="contenedor-novedades-menor-article">
                <p id="item-titulo">{title}</p>
                <p id="item-info">{info}</p>
                <p id="item-footer">{infooter}</p>
            </div>
        </div>
    );
}
// array que almacena los items
const items = [];
// funcion que agrega items al array
function agregarItem(imageN, title, info, infooter, etiqueta) {
  items.push({ imageN, title, info, infooter, etiqueta });
}
// precargar los items
agregarItem(1, "USD 98.000. Financiación disponible.", "...", "...", "Destacado");
agregarItem(1, "USD 98.000. Financiación disponible.", "...", "...", "Nuevo");
agregarItem(1, "USD 98.000. Financiación disponible.", "...", "...", "Rebajas");

// componente que renderiza los items y se encarga de la logica de si es invertido o no
function Miscellaneous() {
    return (
        <>
        <div className="contenedor-novedades-mayor">
        {items.map((item, index) => (
            <MisItems
            key={index}
            imageN={item.imageN}
            title={item.title}
            info={item.info}
            infooter={item.infooter}
            etiqueta={item.etiqueta}
            invertido={index % 2 !== 0}
            />
        ))}
        </div>
        </>
    );
}

export default function News() {
    return (
        <>
            <NavbarSeparator />
            <Banner />
            <Miscellaneous />
        </>
    );
}