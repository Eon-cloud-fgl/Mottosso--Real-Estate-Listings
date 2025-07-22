import "../../styles_admin/login.css";

export default function Login () {
    return(
    <>
    <main>
        <Login_form/>
    </main>
    </>
    )
}

function Login_form() {
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

            <label>
                <span id="recuerdame">Recuerdame</span>
                <input type="checkbox" name="recordame" value={true} id="micheckbox"/>
            </label>

            <button type="submit">Ingresar</button>
        </form>
    </div>
    );
}