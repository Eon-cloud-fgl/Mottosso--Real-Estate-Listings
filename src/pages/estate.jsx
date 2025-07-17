import "../styles/estate.css";
import { AiFillPhone, AiOutlineKey, AiFillFilter } from "react-icons/ai";
import { RxHome, RxRulerSquare, RxDimensions } from "react-icons/rx";
import { PiToiletPaper } from "react-icons/pi";

function EstateItem() {
    return (
        <a href="">
            <div className="ce-item">

                <img src={`/info-banner-1.avif`} alt="" />

                <div className="ce-item-content">
                    <div className="ce-item-info">
                        <h6 className="ce-info--price">Precio</h6>
                        <span className="ce-info--address">address</span>
                        <div className="ce-info--icon">
                            <span> <RxHome /> 337m² terreno </span>
                            <span> <RxRulerSquare /> 240m² cubiertos </span>
                            <span> <RxDimensions /> 3 habitaciones </span>
                            <span> <PiToiletPaper /> 2 baños </span>
                        </div>
                        <p className="ce-info--description">Descripcion breve del in mueble, con detalles importantes como ubicacion, precio y caracteristicas.</p>
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
    return (
        <>
            <div className="ce-container">
                <Filter />
                <div className="ce-items">
                    <EstateItem />
                    <EstateItem />
                </div>
            </div>
        </>
    );
}