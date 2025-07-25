import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/filters.css";

export default function Filters({ onClose, onFilterChange }) {
    const [rooms, setRooms] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [garages, setGarages] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setRooms(searchParams.get("rooms") || "");
        setBedrooms(searchParams.get("bedrooms") || "");
        setBathrooms(searchParams.get("bathrooms") || "");
        setGarages(searchParams.get("garages") || "");
    }, []);

    const handleApplyFilters = () => {
        const filters = { rooms, bedrooms, bathrooms, garages };

        // Actualizar searchParams en la URL
        const updatedParams = new URLSearchParams(searchParams);
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                updatedParams.set(key, value);
            } else {
                updatedParams.delete(key);
            }
        });

        setSearchParams(updatedParams);
        onFilterChange(filters);
        onClose();
    };

    const handleClearFilters = () => {
        setRooms("");
        setBedrooms("");
        setBathrooms("");
        setGarages("");

        const updatedParams = new URLSearchParams(searchParams);
        ["rooms", "bedrooms", "bathrooms", "garages"].forEach((key) => {
            updatedParams.delete(key);
        });

        setSearchParams(updatedParams);
        onFilterChange({ rooms: "", bedrooms: "", bathrooms: "", garages: "" });
    };
    const handleBackdropClick = (e) => {
        if (e.target.classList.contains("filters")) {
            onClose();
        }
    };

    return (
        <section className="filters" onClick={handleBackdropClick}>
            <div className="filters-container">
                <div className="filters-header">
                    <h2>Filtros</h2>
                    <button className="close-filters" onClick={onClose}>
                        X
                    </button>
                </div>

                <article className="filters-group">
                    <div className="filter-group">
                        <label className="filter-title">Precio</label>
                        <div className="price-inputs">
                            <input type="number" placeholder="Desde" />
                            <input type="number" placeholder="Hasta" />
                        </div>
                    </div>

                    <div className="filter-group">
                        <label className="filter-title">Ambientes</label>
                        <div className="options">
                            {["1", "2", "3", "4", "+5"].map((value) => (
                                <label
                                    key={value}
                                    className={`radio-btn ${rooms === value ? "selected" : ""}`}
                                >
                                    <input
                                        type="radio"
                                        name="rooms"
                                        value={value}
                                        checked={rooms === value}
                                        onChange={(e) => setRooms(e.target.value)}
                                    />
                                    {value}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <label className="filter-title">Dormitorios</label>
                        <div className="options">
                            {["1", "2", "3", "+4"].map((value) => (
                                <label
                                    key={value}
                                    className={`radio-btn ${bedrooms === value ? "selected" : ""}`}
                                >
                                    <input
                                        type="radio"
                                        name="bedrooms"
                                        value={value}
                                        checked={bedrooms === value}
                                        onChange={(e) => setBedrooms(e.target.value)}
                                    />
                                    {value}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <label className="filter-title">Baños</label>
                        <div className="options">
                            {["1", "2", "+3"].map((value) => (
                                <label
                                    key={value}
                                    className={`radio-btn ${bathrooms === value ? "selected" : ""}`}
                                >
                                    <input
                                        type="radio"
                                        name="bathrooms"
                                        value={value}
                                        checked={bathrooms === value}
                                        onChange={(e) => setBathrooms(e.target.value)}
                                    />
                                    {value}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <label className="filter-title">Cochera</label>
                        <div className="options">
                            {["1", "2", "3", "+4"].map((value) => (
                                <label
                                    key={value}
                                    className={`radio-btn ${garages === value ? "selected" : ""}`}
                                >
                                    <input
                                        type="radio"
                                        name="garages"
                                        value={value}
                                        checked={garages === value}
                                        onChange={(e) => setGarages(e.target.value)}
                                    />
                                    {value}
                                </label>
                            ))}
                        </div>
                    </div>
                </article>

                <div className="filter-actions">
                    <button className="clear" onClick={handleClearFilters}>Limpiar filtros</button>
                    <button className="apply" onClick={handleApplyFilters}>Ver resultados</button>
                </div>
            </div>
        </section>
    );
}
