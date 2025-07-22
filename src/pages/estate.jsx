import { useEffect, useState } from "react";
import "../styles/estate.css";
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
                            <span><RxHome /> {estate.terrain_size}m² terreno</span>
                            <span><RxRulerSquare /> {estate.covered_area}m² cubiertos</span>
                            <span><RxDimensions /> {estate.rooms} habitaciones</span>
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

function Filter() {
    return (
        <div className="ce-filter">
            <div className="ce-filter--search">
                <input type="text" placeholder="Buscar por ubicación, precio, etc." />
                <span> <AiOutlineKey /> </span>
            </div>

            <div className="ce-filter--options">
                <select name="type" id="" className="ce-filter--select">
                    <option value="">Tipo de propiedad</option>
                    <option value="house">Casa</option>
                    <option value="apartment">Apartamento</option>
                    <option value="land">Terreno</option>
                </select>

                <select name="price" id="" className="ce-filter--select">
                    <option value="purchase">Compra</option>
                    <option value="rental">Alquiler</option>
                </select>

                <button> <AiFillFilter /> Filtros</button>
            </div>

        </div>
    );
}

export default function Estate() {
    const [estates, setEstates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost/Mottoso-Real-Estate-Listings/api/controller/estateController.php?action=getAllEstates")
            .then((res) => res.json())
            .then((data) => {
                setEstates(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error cargando propiedades:", err);
                setLoading(false);
            });
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
            <Filter />
            <div className="ce-items">
                {content}
            </div>
        </div>
    );
}
