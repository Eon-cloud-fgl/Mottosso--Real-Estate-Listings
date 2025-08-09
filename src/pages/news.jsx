import "../styles/news.css";
import NavbarSeparator from "../components/Separator";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaRulerCombined,
  FaCouch,
  FaBed,
  FaBath,
} from "react-icons/fa";
import axios from 'axios'

function Banner() {
  return (
    <div className="contenedor-novedades-principal">
      <p id="item-titulo-principal">Novedades</p>
    </div>
  );
}

function MisItems({ estate, invertido }) {
  const navigate = useNavigate();

  const handleSelectEstate = () => {
    navigate(`/property?id=${estate.id}`);
  };

  const isValid = (value) =>
    !(value === 0 || value === "0" || value === null || value === undefined || value === "");

  return (
    <div className={`contenedor-novedades-menor ${invertido ? "invertido" : ""} fade-slide-in`}>
      <div className="contenedor-novedades-menor-imagen">
        {estate.status && (
          <span className={`etiqueta-item ${estate.status.toLowerCase()}`}>
            {estate.status}
          </span>
        )}
        <img src={`/${estate.main_image}`} alt={estate.title} />
      </div>

      <div className="contenedor-novedades-menor-article">
        <h6 className="outstanding-title">{estate.title}</h6>

        {isValid(estate.address) && (
          <p className="outstanding-address">
            <FaMapMarkerAlt style={{ marginRight: "6px" }} />
            {estate.address}
          </p>
        )}

        {isValid(estate.price) && (
          <p className="outstanding-price">
            <FaDollarSign style={{ marginRight: "6px" }} />
            {estate.price === "Consultar" ? "Precio a consultar" : `$${estate.price}`}
          </p>
        )}

        <p className="outstanding-separator"></p>

        <ul className="outstanding-features">
          {isValid(estate.total_area) && (
            <li><FaRulerCombined style={{ marginRight: "4px" }} />{estate.total_area} m²</li>
          )}
          {isValid(estate.rooms) && (
            <li><FaCouch style={{ marginRight: "4px" }} />{estate.rooms} Amb</li>
          )}
          {isValid(estate.bedrooms) && (
            <li><FaBed style={{ marginRight: "4px" }} />{estate.bedrooms} Dorm</li>
          )}
          {isValid(estate.bathrooms) && (
            <li><FaBath style={{ marginRight: "4px" }} />{estate.bathrooms} Baños</li>
          )}
        </ul>

        <button className="btn-detalles" onClick={handleSelectEstate}>Ver más detalles</button>
      </div>
    </div>
  );
}


function CarruselPorEtiqueta({ titulo, etiqueta }) {
  const [estates, setEstates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEstates = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/controller/estateController.php", {
        params: { action: "getNewsEstate" },
      });
      setEstates(res.data);
      console.log("Respuesta:", res.data);
    } catch (error) {
      console.error("Error cargando propiedades:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstates();
  }, [])



  const filtrados = estates.filter((estate) => estate.status === etiqueta);

  const [indice, setIndice] = useState(0);

  const siguiente = () => {
    setIndice((prev) => (prev + 1) % filtrados.length);
  };

  const anterior = () => {
    setIndice((prev) => (prev - 1 + filtrados.length) % filtrados.length);
  };

  if (filtrados.length === 0) return null;

  const itemActual = filtrados[indice];

  return (
    <div className="contenedor-carrusel-etiqueta">
      <h2 className="categoria-titulo">{titulo}</h2>
      <div className="separador-carrusel"></div>
      <div className="carrusel-contenido">
        <button className="btn-carrusel" onClick={anterior} title="Anterior">
          <FaChevronLeft size={24} />
        </button>
        <MisItems key={indice} estate={itemActual} invertido={indice % 2 !== 0} />
        <button className="btn-carrusel" onClick={siguiente} title="Siguiente">
          <FaChevronRight size={24} />
        </button>
      </div>
      <div className="indicadores">
        {filtrados.map((_, i) => (
          <span
            key={i}
            className={`indicador ${i === indice ? "activo" : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default function News() {
  return (
    <>
      <NavbarSeparator />
      <Banner />
      <CarruselPorEtiqueta titulo="Destacados" etiqueta="destacado" />
      <CarruselPorEtiqueta titulo="Nuevos" etiqueta="nuevo" />
      <CarruselPorEtiqueta titulo="En Rebajas" etiqueta="oferta" />
    </>
  );
}
