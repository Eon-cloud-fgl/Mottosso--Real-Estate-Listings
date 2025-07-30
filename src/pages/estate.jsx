import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "../styles/estate.css";
import Filters from "../components/FilterForm";
import NavbarSeparator from "../components/Separator";
import AutocompleteInput from "../components/AutoCompleteMap";
import { AiFillPhone, AiOutlineKey, AiFillFilter } from "react-icons/ai";
import { RxHome, RxRulerSquare, RxDimensions } from "react-icons/rx";
import { PiToiletPaper } from "react-icons/pi";

function EstateItem({ estate }) {
    return (
        <a href="">
            <div className="ce-item">
                <img src={`/info-banner-1.avif`} alt="" />

                <div className="ce-item-content">
                    <div className="ce-item-info">
                        <h6 className="ce-info--price">${estate.price}</h6>
                        <span className="ce-info--address">{estate.address}</span>
                        <div className="ce-info--icon">
                            <span><RxHome /> {estate.total_area}m² terreno</span>
                            <span><RxRulerSquare /> {estate.covered_area}m² cubiertos</span>
                            <span><RxDimensions /> {estate.rooms} ambientes</span>
                            <span><PiToiletPaper /> {estate.bathrooms} baños</span>
                        </div>
                        <p className="ce-info--description">{estate.description}</p>
                    </div>
                    <div className="ce-item-actions">
                        <button className="ce-action--icon"><AiFillPhone /></button>
                    </div>
                </div>
            </div>
        </a>
    );
}

function Filter({ onFilterChange }) {
    const [showForm, setShowForm] = useState(false);
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query") || "");
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
                <AutocompleteInput value={query} onChange={setQuery} />
                <span><AiOutlineKey /></span>
            </div>

            <div className="ce-filter--options">
                <select value={type} onChange={(e) => setType(e.target.value)} className="ce-filter--select">
                    <option value="">Tipo de propiedad</option>
                    <option value="house">Casa</option>
                    <option value="apartment">Apartamento</option>
                    <option value="land">Terreno</option>
                </select>

                <select value={operation} onChange={(e) => setOperation(e.target.value)} className="ce-filter--select">
                    <option value="">Operación</option>
                    <option value="sale">Compra</option>
                    <option value="rent">Alquiler</option>
                </select>

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
            const res = await axios.get("http://localhost/Mottoso-Real-Estate-Listings/api/controller/estateController.php", {
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
