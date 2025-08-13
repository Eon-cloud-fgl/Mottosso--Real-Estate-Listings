import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "../styles/estate.css";
import Filters from "../components/FilterForm";
import NavbarSeparator from "../components/Separator";
import AutocompleteInput from "../components/AutoCompleteMap";
import { AiFillPhone, AiOutlineKey, AiFillFilter } from "react-icons/ai";
import { RxHome, RxRulerSquare, RxDimensions } from "react-icons/rx";
import { FaHome, FaExchangeAlt } from "react-icons/fa";
import { PiToiletPaper } from "react-icons/pi";
import { useNavigate } from "react-router-dom";


function EstateItem({ estate }) {
    const navigate = useNavigate();

    const handleSelectEstate = () => {
        navigate(`/property?id=${estate.id}`);
    };

    const getBadgeClass = (status) => {
        const normalized = status?.toLowerCase();
        if (normalized === "destacado") return "destacado";
        if (normalized === "nuevo") return "nuevo";
        if (normalized === "oferta") return "oferta";
        return "default";
    };

    const handleContact = () => {
        navigate(`/contact?type=${estate.operation}&property=${estate.listing_id}`);
    };

    return (
        <a onClick={handleSelectEstate} className="ce-item-link">
            <div className="ce-item">
                <img src={`/${estate.main_image}`} className="ce-item-img" alt="" />
                {estate.status?.toLowerCase() !== "publicado" && (
                    <span className={`badge-estate ${getBadgeClass(estate.status)}`}>
                        {estate.status}
                    </span>
                )}
                <div className="ce-item-content">
                    <div className="ce-item-info">
                        <h2 className="ce-info--title">{estate.title}</h2>
                        <h6 className="ce-info--price">
                            ${estate.price} {estate.currency}
                        </h6>
                        <span className="ce-info--address">{estate.address}</span>

                        <div className="ce-info--icon">
                            <span>
                                <RxHome /> {estate.total_area && estate.total_area !== 0 ? `${estate.total_area}m² terreno` : "Sin info"}
                            </span>
                            <span>
                                <RxRulerSquare /> {estate.covered_area && estate.covered_area !== 0 ? `${estate.covered_area}m² cubiertos` : "Sin info"}
                            </span>
                            <span>
                                <RxDimensions /> {estate.rooms && estate.rooms !== 0 ? `${estate.rooms} ambientes` : "Sin info"}
                            </span>
                            <span>
                                <PiToiletPaper /> {estate.bathrooms && estate.bathrooms !== 0 ? `${estate.bathrooms} baños` : "Sin info"}
                            </span>
                        </div>

                        <p className="ce-info--description">{estate.description}</p>
                    </div>

                    <div className="ce-item-actions">
                        <button
                            className="ce-action--icon"
                            onClick={(e) => {
                                e.stopPropagation(); // evita el click del <a>
                                handleContact();     // sigue ejecutando la acción del botón
                            }}
                        >
                            <AiFillPhone />
                        </button>
                    </div>
                </div>
            </div>
        </a>
    );
}


function Filter({ onFilterChange }) {
    const [showForm, setShowForm] = useState(false);
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("listing_id") || "");
    const [type, setType] = useState(searchParams.get("type") || "");
    const [operation, setOperation] = useState(searchParams.get("operation") || "");

    const handleAddEmployee = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };


    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentParams = Object.fromEntries(searchParams.entries());

            const filters = {
                ...currentParams,
                query,
                type,
                operation,
            };

            onFilterChange(filters);
        }, 400);

        return () => clearTimeout(timeout);
    }, [query, type, operation]);

    return (
        <div className="ce-filter">
            <div className="ce-filter--search">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar por Ficha..."
                />

                <span><AiOutlineKey /></span>
            </div>

            <div className="ce-filter--options">
                <div className="ce-filter--wrapper">
                    <FaHome className="ce-filter--icon" />
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="ce-filter--select"
                    >
                        <option value="" disabled hidden>Tipo de propiedad</option>
                        <option value="">Todos</option>
                        <option value="casa">Casa</option>
                        <option value="departamento">Apartamento</option>
                        <option value="terreno">Terreno</option>
                        <option value="local">Local</option>
                        <option value="oficina">Oficina</option>
                        <option value="chacra">Chacra</option>
                        <option value="chalet">Chalet</option>
                        <option value="duplex">Duplex</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>

                <div className="ce-filter--wrapper">
                    <FaExchangeAlt className="ce-filter--icon" />
                    <select value={operation} onChange={(e) => setOperation(e.target.value)} className="ce-filter--select">
                        <option value="" disabled hidden>Operación</option>
                        <option value="">Todos</option>
                        <option value="sale">Compra</option>
                        <option value="rent">Alquiler</option>
                    </select>
                </div>


                <button onClick={handleAddEmployee}><AiFillFilter /> Filtros</button>

                {showForm && <Filters onClose={handleCloseForm} onFilterChange={onFilterChange} />}
            </div>
        </div>
    );
}


export default function Estate() {
    const [estates, setEstates] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEstates = async (filters = {}) => {
        setLoading(true);

        try {
            const res = await axios.get("/api/controller/estateController.php", {
                params: {
                    action: "getPublishedEstates",
                    ...filters,
                },
            });

            setEstates(res.data);
        } catch (error) {
            console.error("Error cargando propiedades:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEstates(); // Si no pasás filtros, igual se manda action=getAllEstates
    }, []);



    // Lógica de contenido a renderizar
    let content;
    if (loading) {
        content = <p>Cargando propiedades...</p>;
    } else if (estates.length === 0) {
        content = <p>No hay propiedades disponibles.</p>;
    } else {
        content = estates.map((estate) => (
            <EstateItem key={estate.id} estate={estate} />
        ));
    }

    return (
        <div className="ce-container">
            <NavbarSeparator />

            <Filter onFilterChange={fetchEstates} />
            <div className="ce-items">
                {content}
            </div>
        </div>
    );
}
