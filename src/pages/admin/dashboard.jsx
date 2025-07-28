import "../../styles_admin/dashboard.css";
import { useState } from 'react';
import { IoCloseSharp} from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
function Buttons({ onShowAdd, onShowModify, onDeleteItem, isDeleteDisabled }){
    return(
        <>
        <div className="buttons-container">
            <button className="buttons" onClick={onShowAdd} id="addProduct">Agregar Producto</button>
            <button className="buttons" onClick={onShowModify} id="modifyProduct">Modificar Producto</button>
            <button className="buttons" id="deleteProduct" onClick={onDeleteItem} disabled={isDeleteDisabled}>
            Eliminar Producto
            </button>
            <form className="search-form"><input className="search" type="text" /><span id="search-icon"><IoIosSearch/></span></form>
        </div>
        </>
    )
}
function AddProduct({onClose}) {
  return (
    <div className="form-overlay" onClick={onClose}>
    <form className="form-add" onClick={(e) => e.stopPropagation()}>
      <button type="button" id="close2" onClick={onClose}>
         <IoCloseSharp/>
        </button>
      <h2>Agregar Propiedad</h2>
      <label>Título:
        <input type="text" name="title" required />
      </label>

      <label>Descripción:
        <textarea name="description" required />
      </label>

      <label>Tipo:
        <select name="type" required>
          <option value="">Seleccione</option>
          <option value="casa">Casa</option>
          <option value="departamento">Departamento</option>
        </select>
      </label>

      <label>Operación:
        <select name="operation" required>
          <option value="">Seleccione</option>
          <option value="venta">Venta</option>
          <option value="alquiler">Alquiler</option>
        </select>
      </label>

      <label>Dirección:
        <input type="text" name="address" required />
      </label>

      <label>Ciudad:
        <input type="text" name="city" required />
      </label>

      <label>Provincia/Estado:
        <input type="text" name="state" required />
      </label>

      <label>Precio:
        <input type="number" name="price" required />
      </label>

      <label>Dormitorios:
        <input type="number" name="bedrooms" min="0" required />
      </label>

      <label>Baños:
        <input type="number" name="bathrooms" min="0" required />
      </label>

      <label>Superficie cubierta (m²):
        <input type="number" name="covered_area" min="0" />
      </label>

      <label>Superficie total (m²):
        <input type="number" name="total_area" min="0" />
      </label>

      <label>Ambientes:
        <input type="number" name="rooms" min="0" />
      </label>

      <label>Garage:
        <select name="garage">
          <option value="no">No</option>
          <option value="si">Sí</option>
        </select>
      </label>

      <label>Estado:
        <select name="status" required>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </label>

      <label>Imagen principal:
        <input type="file" name="main_image" accept="image/*" />
      </label>

      <button type="submit">Agregar Propiedad</button>
    </form>
    </div>
  );
}
function ModifyProduct({onClose}) {
  return (
    <div className="form-overlay" onClick={onClose}>
    <form className="form-modify" onClick={(e) => e.stopPropagation()}>
      <button type="button" id="close" onClick={onClose}>
         <IoCloseSharp/>
        </button>
      <h2>Modificar Propiedad</h2>
      <label>ID de la propiedad:
        <input type="text" name="id" readOnly />
      </label>
      <label>Título:
        <input type="text" name="title" required />
      </label>

      <label>Descripción:
        <textarea name="description" required />
      </label>

      <label>Tipo:
        <select name="type" required>
          <option value="">Seleccione</option>
          <option value="casa">Casa</option>
          <option value="departamento">Departamento</option>
        </select>
      </label>

      <label>Operación:
        <select name="operation" required>
          <option value="">Seleccione</option>
          <option value="venta">Venta</option>
          <option value="alquiler">Alquiler</option>
        </select>
      </label>

      <label>Dirección:
        <input type="text" name="address" required />
      </label>

      <label>Ciudad:
        <input type="text" name="city" required />
      </label>

      <label>Provincia/Estado:
        <input type="text" name="state" required />
      </label>

      <label>Precio:
        <input type="number" name="price" required />
      </label>

      <label>Dormitorios:
        <input type="number" name="bedrooms" min="0" required />
      </label>

      <label>Baños:
        <input type="number" name="bathrooms" min="0" required />
      </label>

      <label>Superficie cubierta (m²):
        <input type="number" name="covered_area" min="0" />
      </label>

      <label>Superficie total (m²):
        <input type="number" name="total_area" min="0" />
      </label>

      <label>Ambientes:
        <input type="number" name="rooms" min="0" />
      </label>

      <label>Garage:
        <select name="garage">
          <option value="no">No</option>
          <option value="si">Sí</option>
        </select>
      </label>

      <label>Estado:
        <select name="status" required>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </label>

      <label>Imagen principal:
        <input type="file" name="main_image" accept="image/*" />
      </label>
      <button type="submit">Modificar Propiedad</button>
    </form>
    </div>
  );
}            
function ItemContainer({ items, selectedItemId, onSelectItem, currentPage, onPageChange, itemsPerPage }) {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIdx, startIdx + itemsPerPage);

  return (
    <>
      <div className="item-container">
        {currentItems.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            title={item.title}
            type={item.type}
            operation={item.operation}
            city={item.city}
            state={item.state}
            price={item.price}
            status={item.status}
            main_image={item.main_image}
            onSelect={() => onSelectItem(item.id)}
            selected={item.id === selectedItemId}
          />
        ))}
      </div>

      <div className="pagination-buttons">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </>
  );
}

function Item({ title, type, operation, city, state, price, status, onSelect, selected, main_image}) {
  return (
    <div className={`item ${selected ? "selected" : ""}`} onClick={onSelect} >
    <div className="item-img" style={{ backgroundImage: `url(${main_image})` }}></div>
      <h2>{title}</h2>
      <p>{type} en {operation}</p>
      <p>{city}, {state}</p>
      <p><strong>${price.toLocaleString()}</strong></p>
      <p className={`status ${status === "activo" ? "active" : "inactive"}`}>{status}</p>
    </div>
  );
}
function AdminContainer({ onShowAdd, onShowModify }){
    return(
        <>
        <Buttons onShowAdd={onShowAdd} onShowModify={onShowModify} />
        <ItemContainer/>
        </>
    )
}
function Miscellaneous(){
    return(
        <>
        <div className="miscellaneous-container">
            <h1 className="title">Productos</h1>
        </div>
        </>
    )
}
export default function Dashboard(){
const itemsPerPage = 8;
  const [items, setItems] = useState([...Array(20)].map((_, i) =>(
  {
    id: 1 + i,
    title: "Casa Moderna",
    type: "Casa",
    operation: "venta",
    city: "Córdoba",
    state: "Córdoba",
    price: 120000,
    status: "activo",
    main_image: "/img/home-micellaneous-3.jpg"
  }
  )));
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [showFormModify, setShowFormModify] = useState(false);

  const handleShowAdd = () => {
    setShowFormAdd(true);
    setShowFormModify(false);
  };

  const handleShowModify = () => {
    setShowFormModify(true);
    setShowFormAdd(false);
  };

  const handleSelectItem = (id) => {
    setSelectedItemId(id);
  };

  const handleDeleteItem = () => {
    if (selectedItemId === null) return;
    setItems(prev => prev.filter(item => item.id !== selectedItemId));
    setSelectedItemId(null);
  };

  return (
    <>
      <Miscellaneous />
      <Buttons
        onShowAdd={handleShowAdd}
        onShowModify={handleShowModify}
        onDeleteItem={handleDeleteItem}
        isDeleteDisabled={selectedItemId === null}
      />
      <ItemContainer
        items={items}
        selectedItemId={selectedItemId}
        onSelectItem={handleSelectItem}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
      {showFormAdd && <AddProduct onClose={() => setShowFormAdd(false)} />}
      {showFormModify && <ModifyProduct onClose={() => setShowFormModify(false)} />}
    </>
  );
}