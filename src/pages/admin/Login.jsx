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
    return (
        <div className="login-container">
            <form className="login-form">
                <h2>Iniciar sesión</h2>

                <label>
                    <span>Nombre de usuario</span>
                    <input type="text" name="nombre" placeholder="Tu nombre de usuario" required />
                </label>

                <label>
                    <span>Correo electrónico</span>
                    <input type="email" name="email" placeholder="tucorreo@abc.com" required />
                </label>

                <label>
                    <span>Contraseña</span>
                    <input type="password" name="contraseña" placeholder="********" required />
                </label>

                <div className="login-footer">
                    <label className="checkbox-label">
                        <span>Recuérdame</span>
                        <input type="checkbox" name="recordame" id="micheckbox"/>
                        <button type="submit">Ingresar</button>
                    </label>
                </div>
                
                

            </form>
        </div>
    );
}