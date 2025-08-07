import "../../styles_admin/dashboard.css";
import { useState, useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";


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
            <option value="departamento">Departamento</option>
            <option value="casa">Casa</option>
            <option value="ph">PH</option>
            <option value="terreno">Terreno</option>
            <option value="local">Local</option>
            <option value="oficina">Oficina</option>
            <option value="otro">Otro</option>
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
          <select name="status" required defaultValue="borrador">
            <option value="nuevo">Nuevo</option>
            <option value="publicado">Publicado</option>
            <option value="borrador">Borrador</option>
          </select>
        </label>

        <label>Imagen principal:
          <input type="file" name="main_image" accept="image/*" />
        </label>

        <label>Galería de imágenes:
          <input type="file" name="gallery_images[]" accept="image/*" multiple />
        </label>

        <button type="submit">Agregar Propiedad</button>
      </form>
    </div>
  );
}


function ModifyProduct({ onClose, estate, onUpdate }) {
  if (!estate) return null;
  const [loading, setLoading] = useState(false);
  const [deleteImageId, setDeleteImageId] = useState(null);
  const handleDeleteImage = async (imageId) => {
    const confirm = window.confirm("¿Seguro que deseas eliminar esta imagen?");
    if (!confirm) return;

    try {
      const res = await axios.post("http://localhost/Mottoso-Real-Estate-Listings/api/controller/estateController.php", {
        action: "deleteImage",
        id_imagen: imageId
      });

      if (res.data.success) {
        toast.success("Imagen eliminada");
        onUpdate();  // Actualiza propiedades
      } else {
        toast.error("Error al eliminar imagen");
      }
    } catch (err) {
      toast.error("Error al eliminar imagen");
      console.error(err);
    }
  };

  const handleReplaceImage = async (imageId, newFile) => {
    const formData = new FormData();
    formData.append("action", "replaceImage");
    formData.append("id_imagen", imageId);
    formData.append("new_image", newFile);

    try {
      const res = await axios.post("http://localhost/Mottoso-Real-Estate-Listings/api/controller/estateController.php", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (res.data.success) {
        toast.success("Imagen reemplazada");
        onUpdate();
      } else {
        toast.error("Error al reemplazar imagen");
      }
    } catch (err) {
      toast.error("Error al reemplazar imagen");
      console.error(err);
    }
  };
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
            <option value="departamento">Departamento</option>
            <option value="casa">Casa</option>
            <option value="ph">PH</option>
            <option value="terreno">Terreno</option>
            <option value="local">Local</option>
            <option value="oficina">Oficina</option>
            <option value="otro">Otro</option>
          </select>
        </label>

        <label>Operación:
          <select name="operation" required defaultValue={estate.operation}>
            <option value="">Seleccione</option>
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
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
            <option value="publicado">Publicado</option>
            <option value="borrador">Borrador</option>
            <option value="reservado">Reservado</option>
            <option value="vendido">Vendido</option>
            <option value="alquilado">Alquilado</option>
            <option value="nuevo">Nuevo</option>
            <option value="destacado">Destacado</option>
            <option value="oferta">Rebaja</option>
          </select>
        </label>

        <label>Imagen principal:
          <input type="file" name="main_image" accept="image/*" />
        </label>
        <div className="gallery-preview">
          <h3>Galería Actual</h3>
          {estate.property_images && estate.property_images.map((img) => (
            <div key={img.id_imagen} className="gallery-image-box">
              <img src={`/${img.ruta_imagen}`} alt={`Imagen ${img.id_imagen}`} className="gallery-image" />
              <button
                type="button"
                onClick={() => handleDeleteImage(img.id_imagen)}
                className="gallery-button"
                aria-label="Eliminar imagen"
              >
                <FaTrash />
              </button>
              {/* <input
                type="file"
                accept="image/*"
                onChange={(e) => handleReplaceImage(img.id_imagen, e.target.files[0])}
              /> */}
            </div>
          ))}
          <label>Añadir imágenes:
            <input type="file" name="gallery_images[]" accept="image/*" multiple />
          </label>
        </div>
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
  console.log(`/${estate.main_image}`);
  return (
    <div className={`item ${selected ? "selected" : ""}`} onClick={onSelect}>
      <div className="item-img">
        <img
          src={`/${estate.main_image}`}
          alt={estate.title}
          className="it-image"
        />
      </div>
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
      <div className="dashboard-container">
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
      </div>
    </>
  );
}