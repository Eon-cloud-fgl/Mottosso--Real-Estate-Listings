import "../../styles_admin/dashboard.css";
import { useState, useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Buttons({ onShowAdd, onShowModify, onDeleteItem, isDeleteDisabled }) {
  return (
    <>
      <div className="buttons-container">
        <button className="buttons" onClick={onShowAdd} id="addProduct">Agregar Producto</button>
        <button className="buttons" onClick={onShowModify} id="modifyProduct">Modificar Producto</button>
        <button className="buttons" id="deleteProduct" onClick={onDeleteItem} disabled={isDeleteDisabled}>
          Eliminar Producto
        </button>
        <form className="search-form"><input className="search" type="text" /><span id="search-icon"><IoIosSearch /></span></form>
      </div>
    </>
  )
}

function AddProduct({ onClose }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    formData.append("action", "addEstate");
    try {
      const response = await axios.post("http://localhost/Mottoso-Real-Estate-Listings/api/controller/estateController.php",
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

      if (response.data.success) {
        toast.success("Propiedad agregada exitosamente");
        onClose(); // Cierra el formulario al finalizar
      } else {
        toast.error("Error al agregar la propiedad");
      }
    } catch (error) {
      toast.error("Error al agregar la propiedad. Inténtalo de nuevo más tarde.");
      console.error("Error al agregar la propiedad:", error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="form-overlay" onClick={onClose}>
      <form className="form-add" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <button type="button" id="close2" onClick={onClose}>
          <IoCloseSharp />
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
            <option value="house">Casa</option>
            <option value="aparment">Departamento</option>
          </select>
        </label>

        <label>Operación:
          <select name="operation" required>
            <option value="">Seleccione</option>
            <option value="sale">Venta</option>
            <option value="rent">Alquiler</option>
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
            <option value="published">Publicado</option>
            <option value="draft">Borrador</option> 
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


function ModifyProduct({ onClose, estate, onUpdate }) {
  if (!estate) return null; // Por si estate es null, evita error
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    formData.append("action", "modifyEstate");
    formData.append("id", estate.id);

    try {
      const response = await axios.post("http://localhost/Mottoso-Real-Estate-Listings/api/controller/estateController.php",
        formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success("Propiedad modificada exitosamente");
        onClose(); // Cierra el formulario al finalizar
        onUpdate(); // Llama a la función para actualizar la lista de propiedades
      } else {
        toast.error("Error al modificar la propiedad");
      }
    } catch (error) {
      toast.error("Error al modificar la propiedad. Inténtalo de nuevo más tarde.");
      console.error("Error al modificar la propiedad:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="form-overlay" onClick={onClose} >
      <form className="form-modify" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <button type="button" id="close" onClick={onClose}>
          <IoCloseSharp />
        </button>
        <h2>Modificar Propiedad</h2>

        <label>ID de la propiedad:
          <input type="text" name="id" readOnly defaultValue={estate.id} />
        </label>

        <label>Título:
          <input type="text" name="title" required defaultValue={estate.title} />
        </label>

        <label>Descripción:
          <textarea name="description" required defaultValue={estate.description} />
        </label>

        <label>Tipo:
          <select name="type" required defaultValue={estate.type}>
            <option value="">Seleccione</option>
            <option value="house">Casa</option>
            <option value="apartment">Departamento</option>
            <option value="land">Terreno</option>
          </select>
        </label>

        <label>Operación:
          <select name="operation" required defaultValue={estate.operation}>
            <option value="">Seleccione</option>
            <option value="sale">Venta</option>
            <option value="rent">Alquiler</option>
          </select>
        </label>

        <label>Dirección:
          <input type="text" name="address" required defaultValue={estate.address} />
        </label>

        <label>Ciudad:
          <input type="text" name="city" required defaultValue={estate.city} />
        </label>

        <label>Provincia/Estado:
          <input type="text" name="state" required defaultValue={estate.state} />
        </label>

        <label>Precio:
          <input type="number" name="price" required defaultValue={estate.price} />
        </label>

        <label>Dormitorios:
          <input type="number" name="bedrooms" min="0" required defaultValue={estate.bedrooms} />
        </label>

        <label>Baños:
          <input type="number" name="bathrooms" min="0" required defaultValue={estate.bathrooms} />
        </label>

        <label>Superficie cubierta (m²):
          <input type="number" name="covered_area" min="0" defaultValue={estate.covered_area} />
        </label>

        <label>Superficie total (m²):
          <input type="number" name="total_area" min="0" defaultValue={estate.total_area} />
        </label>

        <label>Ambientes:
          <input type="number" name="rooms" min="0" defaultValue={estate.rooms} />
        </label>

        <label>Garage:
          <select name="garage" defaultValue={estate.garage}>
            <option value="no">No</option>
            <option value="si">Sí</option>
          </select>
        </label>

        <label>Estado:
          <select name="status" required defaultValue={estate.status}>
            <option value="published">Publicado</option>
            <option value="draft">Borrador</option>
            <option value="reserved">Reservado</option>
            <option value="sold">Vendido</option>
            <option value="rented">Rentado</option>
          </select>
        </label>

        <label>Imagen principal:
          <input type="file" name="main_image" accept="image/*" />
        </label>

        <button type="submit" disabled={loading}>{loading ? "Modificando..." : "Modificar Propiedad"}</button>
      </form>
    </div >
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
            estate={item}
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

function Item({ estate, onSelect, selected }) {
  return (
    <div className={`item ${selected ? "selected" : ""}`} onClick={onSelect}>
      <div
        className="item-img"
        style={{ backgroundImage: `url(/casa.avif)` }}
      ></div>
      <h2>{estate.title}</h2>
      <p>{estate.type} en {estate.operation}</p>
      <p>{estate.city}, {estate.state}</p>
      <p><strong>${estate.price.toLocaleString()}</strong></p>
      <p className={`status ${estate.status === "activo" ? "active" : "inactive"}`}>
        {estate.status}
      </p>
    </div>
  );
}



function AdminContainer({ onShowAdd, onShowModify }) {
  return (
    <>
      <Buttons onShowAdd={onShowAdd} onShowModify={onShowModify} />
      <ItemContainer />
    </>
  )
}


function Miscellaneous() {
  return (
    <>
      <div className="miscellaneous-container">
        <h1 className="title">Productos</h1>
      </div>
    </>
  )
}


export default function Dashboard() {
  const itemsPerPage = 8;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateFlag, setUpdateFlag] = useState(false);



  const fetchEstates = async () => {
    setLoading(true);

    try {
      const res = await axios.get("http://localhost/Mottoso-Real-Estate-Listings/api/controller/estateController.php", {
        params: {
          action: "getAllEstates"
        }
      });

      setItems(res.data);
      console.log("Ejemplo de item:", res.data);
    } catch (error) {
      console.error("Error cargando propiedades:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEstates();
  }, [updateFlag]);

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
    const confirmDelete = window.confirm("¿Estás seguro de que quieres desactivar este inmueble?");
    if (!confirmDelete) return;

    // Realiza la solicitud para eliminar el producto
    axios.post("http://localhost/Mottoso-Real-Estate-Listings/api/controller/estateController.php", {
      action: "deleteEstate",
      id: selectedItemId
    })
      .then(response => {
        if (response.data.success) {
          toast.success("Producto actualizado exitosamente");
          setUpdateFlag(prev => !prev); // Actualiza la lista de productos
          setSelectedItemId(null); // Resetea la selección
        } else {
          toast.error("Error al eliminar el producto");
        }
      })
      .catch(error => {
        console.error("Error al eliminar el producto:", error);
        toast.error("Error al eliminar el producto. Inténtalo de nuevo más tarde.");
      });
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
      {showFormModify && (
        <ModifyProduct
          onClose={() => setShowFormModify(false)}
          estate={items.find(item => item.id === selectedItemId)}
          onUpdate={() => setUpdateFlag(prev => !prev)}  // Callback para actualizar la lista
        />
      )}
      <ToastContainer />
    </>
  );
}