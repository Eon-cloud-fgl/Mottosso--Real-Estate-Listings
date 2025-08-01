import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "../../styles_admin/login.css";

export default function Login () {
    return(
        <main className="main-bg">
            <div className="main-bg-overlay">
                <div id="logo-login">
                    <img src="/logo-cabeza.png" draggable="false" alt="Logo Mottoso"/>
                </div>
                <LoginForm/>
            </div>
        </main>
    );
}

function LoginForm() {
    
    const [input, setInput] = useState({
            name: "",
            email: "",
            password: "",
            rememberme: ""
        });
    const [respuesta, setRespuesta] = useState("");

    const handleChange = (e) => {
        setInput({
        ...input,
        [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost/Mottoso-Real-Estate-Listings/api/controller/userController.php",
                { ...input, action: "LoginForm" },
                { headers: { "Content-Type": "application/json" },
                withCredentials: true 
                }  
            );

        setRespuesta(response.data.message);
        toast.success(response.data.message);
        } catch (error) {
             //console.error("Error:", error); esto es por si quieren ver el error que tira el axios
            if (error.response && error.response.data && error.response.data.message) {
                setRespuesta(error.response.data.message);
                toast.error(error.response.data.message);
            } else {
                setRespuesta("Error desconocido");
                toast.error("Error desconocido");
            }
        }
    };
    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Iniciar sesión</h2>

                <label>
                    <span>Nombre de usuario</span>
                    <input type="text" name="name" value={input.name} onChange={handleChange} placeholder="Tu nombre de usuario" required />
                </label>

                <label>
                    <span>Correo electrónico</span>
                    <input type="email" name="email" value={input.email} onChange={handleChange} placeholder="tucorreo@abc.com" required />
                </label>

                <label>
                    <span>Contraseña</span>
                    <input type="password" name="password" value={input.password} onChange={handleChange} placeholder="********" required />
                </label>

                <div className="login-footer">
                    <label className="checkbox-label">
                        <span>Recuérdame</span>
                        <input type="checkbox" name="rememberme" checked={input.rememberme} onChange={handleChange} id="micheckbox"/>
                        <button type="submit">Ingresar</button>
                        <ToastContainer />
                    </label>
                </div>
            </form>
        </div>
    );
}

